"use client"

import { useEffect, useState } from "react"
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormSuccess
} from "@/components/ui/popover-form"
import PersonSvg from "../svgs/person"
import IconEnvelopeFilled from "../svgs/email"
import { submitWaitlist } from "@/app/actions/submit-waitlist"
import { toast } from "sonner"

type FormState = "idle" | "loading" | "success"

export function WaitlistForm() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  async function submit() {
    setFormState("loading")

    try {
      await submitWaitlist({ name, email })
      setFormState("success")

      setTimeout(() => {
        setOpen(false)
        setFormState("idle")
        setName("")
        setEmail("")
      }, 2500)
    } catch (err) {
  console.error(err)


  let message = "Something went wrong!"

  if (err instanceof Error) {
    message = err.message
  } else if (typeof err === "string") {
    message = err
  } else if (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message?: unknown }).message === "string"
  ) {
    message = (err as { message: string }).message
  }

  toast.error(message)
  setFormState("idle")
  
}
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex w-50 items-center justify-center font-cutive-mono">
      <PopoverForm
        title="Join waitlist"
        open={open}
        setOpen={setOpen}
        width="420px"
        height="250px"
        showCloseButton={formState !== "success"}
        showSuccess={formState === "success"}
        openChild={
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!email || !name) {
                toast.error("Both fields are required.")
                return
              }
              submit()
            }}
            className="p-4"
          >
            {/* Name */}
            <div className="mb-4 space-y-2">
              <label className="block text-sm font-bold text-foreground mb-1">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="gauresh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <PersonSvg />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4 space-y-2">
              <label className="block text-sm font-bold text-foreground mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <IconEnvelopeFilled />
                </div>
              </div>
            </div>

            <PopoverFormButton
              loading={formState === "loading"}
              text={formState === "loading" ? "Submitting..." : "Join"}
            />
          </form>
        }
        successChild={
          <PopoverFormSuccess
            title="You're in!"
            description="Thanks for joining the waitlist."
          />
        }
      />
    </div>
  )
}
