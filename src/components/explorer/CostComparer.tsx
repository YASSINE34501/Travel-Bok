"use client";

import { useMemo, useState, useEffect, useId } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeftRight,
  Bus,
  Building2,
  Home,
  Minus,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
  Wifi,
  Zap,
} from "lucide-react";

import type { Country, Locale } from "@/lib/types";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { CountrySelect } from "@/components/ui/country-select";
import { money, percent, t as pick } from "@/lib/format";
import { cn } from "@/lib/utils";

type Props = {
  countries: Country[];
  defaultFrom?: string;
  defaultTo?: string;
};

/** Categories shown in the breakdown, in the order people actually budget them. */
const CATEGORIES = [
  { key: "rent", icon: Home, get: (c: Country) => c.cost.rentCenter },
  { key: "rentOutside", icon: Building2, get: (c: Country) => c.cost.rentOutside },
  { key: "groceries", icon: ShoppingCart, get: (c: Country) => c.cost.groceries },
  { key: "utilities", icon: Zap, get: (c: Country) => c.cost.utilities },
  { key: "transport", icon: Bus, get: (c: Country) => c.cost.transport },
  { key: "internet", icon: Wifi, get: (c: Country) => c.cost.internet },
  { key: "meal", icon: UtensilsCrossed, get: (c: Country) => c.cost.mealOut },
] as const;

/** Rent + food + bills + transport + internet: the unavoidable monthly floor. */
function coreCost(c: Country) {
  return (
    c.cost.rentCenter +
    c.cost.groceries +
    c.cost.utilities +
    c.cost.transport +
    c.cost.internet
  );
}

export function CostComparer({
  countries,
  defaultFrom = "ma",
  defaultTo = "de",
}: Props) {
  const t = useTranslations("Explorer");
  const locale = useLocale() as Locale;
  const id = useId();

  const [fromCode, setFromCode] = useState(defaultFrom);
  const [toCode, setToCode] = useState(defaultTo);
  // Held as text so the field can be cleared while typing. `income` is the
  // parsed value every calculation reads; an empty box means 0, not NaN.
  const [incomeText, setIncomeText] = useState("1200");
  const income = Number(incomeText) || 0;

  function handleIncome(event: React.ChangeEvent<HTMLInputElement>) {
    const sanitised = event.target.value
      // Arabic-Indic (٠-٩) and Eastern Arabic-Indic (۰-۹) numerals map to
      // Latin: an Arabic keyboard types these, and dropping them would leave
      // the field empty for exactly the audience this site is built for.
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
      // Drop everything from the first decimal separator on. Stripping it
      // instead would silently turn a pasted "2,500.75" into 250075.
      .split(/[.٫․]/)[0]
      // Then remove grouping separators, currency symbols and signs.
      .replace(/\D/g, "")
      .slice(0, 9);

    setIncomeText(sanitised);
  }

  const countryOptions = useMemo(
    () =>
      countries.map((c) => ({
        code: c.code,
        label: pick(c.name, locale),
        hint: pick(c.cost.city, locale),
      })),
    [countries, locale],
  );

  const source = countries.find((c) => c.code === fromCode) ?? countries[0];
  const destination = countries.find((c) => c.code === toCode) ?? countries[1];

  // Keep the selection in the URL so a comparison can be shared or bookmarked.
  // replaceState avoids a server round-trip on every dropdown change.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("from", fromCode);
    url.searchParams.set("to", toCode);
    window.history.replaceState(null, "", url);
  }, [fromCode, toCode]);

  const stats = useMemo(() => {
    const sourceCore = coreCost(source);
    const destCore = coreCost(destination);
    const diff = ((destCore - sourceCore) / sourceCore) * 100;

    return {
      sourceCore,
      destCore,
      diff,
      needed: income * (destCore / sourceCore),
      leftover: income - destCore,
      maxCategory: Math.max(
        ...CATEGORIES.map((c) => Math.max(c.get(source), c.get(destination))),
      ),
    };
  }, [source, destination, income]);

  const verdict =
    Math.abs(stats.diff) < 5
      ? "same"
      : stats.diff > 0
        ? "pricier"
        : "cheaper";

  const VerdictIcon =
    verdict === "same" ? Minus : verdict === "pricier" ? TrendingUp : TrendingDown;

  const swap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  return (
    <div className="space-y-6">
      {/* Controls — floating glass panel over the grid backdrop */}
      {/* One 10-column track on desktop, split 3 / 1 / 3 / 3.
          `items-start` is the fix for the old misalignment: with `items-end`
          the grid aligned item *bottoms*, and the income field is taller than
          the others because it carries helper text — which pushed its label and
          input 38px above the two country selects. Aligning to the top instead
          puts every label on one baseline and every control on the next, and
          lets the helper text hang below without moving anything. */}
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-line bg-surface/85 p-5 shadow-glass backdrop-blur-md backdrop-saturate-150 sm:grid-cols-2 sm:p-6 lg:grid-cols-10 lg:items-start">
          <Field
            label={t("from")}
            htmlFor={`${id}-from`}
            className="lg:col-span-3"
          >
            <CountrySelect
              id={`${id}-from`}
              label={t("from")}
              value={fromCode}
              onChange={setFromCode}
              options={countryOptions}
            />
          </Field>

          {/* 30px = the 26px a label plus its gap occupies, and half the 8px
              difference between the 48px control and this 40px button — so the
              button centres on the control row rather than the label row. */}
          <div className="hidden lg:col-span-1 lg:mt-[1.875rem] lg:flex lg:justify-center">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={swap}
              aria-label={t("swap")}
            >
              <ArrowLeftRight aria-hidden />
            </Button>
          </div>

          <Field
            label={t("to")}
            htmlFor={`${id}-to`}
            className="lg:col-span-3"
          >
            <CountrySelect
              id={`${id}-to`}
              label={t("to")}
              value={toCode}
              onChange={setToCode}
              options={countryOptions}
            />
          </Field>

          <Field
            label={t("income")}
            htmlFor={`${id}-income`}
            hint={t("salaryNote", {
              amount: money(source.cost.avgNetSalary, locale),
            })}
            // Two lines of text-xs, so swapping countries cannot resize the panel.
            hintClassName="min-h-8"
            className="lg:col-span-3"
          >
            <div className="relative">
              <Input
                id={`${id}-income`}
                // type="text" rather than "number": a number input still
                // accepts "e", "+" and "-", scrolls its value on wheel, and
                // reports an empty string for invalid input. Digits are
                // enforced below instead.
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={incomeText}
                onChange={handleIncome}
                aria-describedby={`${id}-income-currency`}
                className="tnum pe-16 text-start"
              />
              {/* No dir override here: `end-3.5` must resolve against the page
                  direction so the chip lands on the same side as the input's
                  reserved `pe-16`. Setting dir="ltr" flips one and not the
                  other, and the digits then run underneath it in Arabic. */}
              <span
                id={`${id}-income-currency`}
                className="pointer-events-none absolute inset-y-0 end-3.5 flex items-center text-sm font-medium text-ink-muted"
              >
                {t("incomeCurrency")}
              </span>
            </div>
          </Field>
      </div>

      {/* Verdict */}
      <Card>
        <CardBody className="pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-xl",
                  verdict === "cheaper" && "bg-positive-100 text-positive",
                  verdict === "pricier" && "bg-negative-100 text-negative",
                  verdict === "same" && "bg-brand-50 text-brand-700",
                )}
              >
                <VerdictIcon aria-hidden className="size-5" />
              </span>
              <div>
                <p className="text-lg font-semibold leading-snug text-ink">
                  {t(
                    verdict === "same"
                      ? "verdictSame"
                      : verdict === "pricier"
                        ? "verdictPricier"
                        : "verdictCheaper",
                    {
                      country: pick(destination.name, locale),
                      source: pick(source.name, locale),
                      pct: percent(stats.diff, locale),
                    },
                  )}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {t("needed", {
                    country: pick(destination.name, locale),
                    amount: money(stats.needed, locale),
                  })}
                </p>
              </div>
            </div>

            {/* One column on the narrowest phones: at 375px a two-column split
                leaves ~139px per cell, which wraps the longer Arabic labels
                across three lines. */}
            <dl className="grid shrink-0 grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-6 sm:text-end">
              <div>
                <dt className="text-xs text-ink-muted">{t("monthlyBudget")}</dt>
                <dd className="tnum whitespace-nowrap text-xl font-bold text-ink">
                  {money(stats.destCore, locale)}
                </dd>
                <dd className="text-xs text-ink-muted">{t("forOne")}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">
                  {stats.leftover >= 0 ? t("leftover") : t("leftoverNegative")}
                </dt>
                <dd
                  className={cn(
                    "tnum whitespace-nowrap text-xl font-bold",
                    stats.leftover >= 0 ? "text-positive" : "text-negative",
                  )}
                >
                  {money(Math.abs(stats.leftover), locale)}
                </dd>
              </div>
            </dl>
          </div>
        </CardBody>
      </Card>

      {/* Breakdown */}
      <Card>
        <CardBody className="pt-6">
          <h2 className="text-lg font-semibold text-ink">{t("breakdown")}</h2>

          <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {CATEGORIES.map((cat) => {
              const a = cat.get(source);
              const b = cat.get(destination);
              const Icon = cat.icon;
              return (
                <div key={cat.key}>
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon aria-hidden className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                      {t(cat.key)}
                    </span>
                    <span className="tnum shrink-0 text-sm text-ink-muted">
                      {money(a, locale)} → {money(b, locale)}
                    </span>
                  </div>

                  {/* Two bars on a shared scale make the gap readable at a glance. */}
                  <div className="mt-2.5 space-y-1.5 ps-[2.625rem]">
                    <Bar
                      value={a}
                      max={stats.maxCategory}
                      label={pick(source.name, locale)}
                      tone="source"
                    />
                    <Bar
                      value={b}
                      max={stats.maxCategory}
                      label={pick(destination.name, locale)}
                      tone="destination"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-baseline justify-between border-t border-line pt-4">
            <span className="font-semibold text-ink">{t("total")}</span>
            <span className="tnum font-semibold text-ink">
              {money(stats.sourceCore, locale)} → {money(stats.destCore, locale)}
            </span>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            {t("disclaimer")}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

function Bar({
  value,
  max,
  label,
  tone,
}: {
  value: number;
  max: number;
  label: string;
  tone: "source" | "destination";
}) {
  const width = max > 0 ? Math.max((value / max) * 100, 1.5) : 0;

  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-line/70"
      role="img"
      aria-label={`${label}: ${value}`}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // Tailwind gradient directions are physical, so the RTL variant
          // mirrors them — otherwise the fill points away from the bar's
          // growth direction on the Arabic side.
          "bg-linear-to-r rtl:bg-linear-to-l",
          tone === "source"
            ? "from-accent-500 to-accent-600"
            : "from-brand-500 to-brand-700",
        )}
        style={{ inlineSize: `${width}%` }}
      />
    </div>
  );
}
