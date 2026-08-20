import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { routing } from "@/i18n/routing";

/**
 * Landing point for email confirmation and password-reset links. Supabase
 * sends the user here with a one-time code, which we exchange for a session
 * cookie before redirecting them back into the localised app.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  // Trust only our own locale list — `next` comes from a URL the user can edit.
  const requested = searchParams.get("locale");
  const locale = routing.locales.includes(requested as never)
    ? requested
    : routing.defaultLocale;

  const supabase = await getSupabaseServerClient();

  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/${locale}/login?error=callback`);
    }
  }

  return NextResponse.redirect(`${origin}/${locale}`);
}
