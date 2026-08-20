import { getTranslations } from "next-intl/server";

/**
 * In-page contents for the long country guides. Plain anchor links — no JS,
 * no scroll spy. The ids match the sections rendered by GuideBody and by the
 * guide page itself, and they are locale-independent so an Arabic and an
 * English guide share the same fragment URLs.
 */
const SECTIONS = [
  { id: "routes", key: "routes", ns: "Guides" },
  { id: "requirements", key: "requirements", ns: "Guides" },
  { id: "residency", key: "residencyTitle", ns: "GuideSections" },
  { id: "cost", key: "costTitle", ns: "GuideSections" },
  { id: "jobs", key: "jobsTitle", ns: "GuideSections" },
  { id: "life", key: "lifeTitle", ns: "GuideSections" },
] as const;

export async function GuideToc() {
  const [guides, sections] = await Promise.all([
    getTranslations("Guides"),
    getTranslations("GuideSections"),
  ]);

  return (
    <nav
      aria-label={sections("contents")}
      className="mt-8 rounded-card border border-line bg-surface p-5"
    >
      <h2 className="text-sm font-semibold text-ink">{sections("contents")}</h2>
      <ol className="mt-3 grid gap-2 sm:grid-cols-2">
        {SECTIONS.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="inline-flex items-baseline gap-2 text-sm text-brand-700 transition-colors hover:text-brand-900 hover:underline"
            >
              <span className="tnum text-xs text-ink-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.ns === "Guides"
                ? guides(section.key as "routes" | "requirements")
                : sections(
                    section.key as
                      | "residencyTitle"
                      | "costTitle"
                      | "jobsTitle"
                      | "lifeTitle",
                  )}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
