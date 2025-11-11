"use server"

import { createClient } from "@supabase/supabase-js"

export async function submitWaitlist(formData: { name: string; email: string }) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! 
  )

  const { name, email } = formData

  const { error } = await supabase.from("waitlist").insert([{ name, email }])

  if (error) {
    console.error(error)

    const errorMessage =
    error.code ==='23505'
      ? "This email is already on the waitlist."
      : "Something went wrong. Try again!"


    throw new Error(errorMessage)
  }

  return { success: true }
}
