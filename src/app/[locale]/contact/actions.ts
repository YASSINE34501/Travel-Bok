"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export type ContactState = {
  status: "idle" | "sent" | "error" | "unavailable";
};

const MAX = { name: 120, email: 254, subject: 160, message: 4000 };

function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

/**
 * Writes to `contact_messages`, which has an insert-only RLS policy: anyone
 * may submit, nobody may read back. Length caps are enforced here as well as
 * in the database so a crafted request cannot bloat a row.
 */
export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.email);
  const subject = clean(formData.get("subject"), MAX.subject);
  const message = clean(formData.get("message"), MAX.message);

  if (!email.includes("@") || message.length < 10) {
    return { status: "error" };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) return { status: "unavailable" };

  const { error } = await supabase.from("contact_messages").insert({
    name: name || null,
    email,
    subject: subject || null,
    message,
  });

  return { status: error ? "error" : "sent" };
}
