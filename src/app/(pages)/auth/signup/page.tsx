"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import apiService from "@services/api"

// Define validation schema
const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email (e.g: user@example.com)"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  rePassword: z.string().min(1, "Please confirm your password"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+?20|0)?1[0-2]\d{8}$/, "Enter a valid Egyptian phone number (e.g: 01001234567)"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur", // Validate on blur
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const password = watch("password")

  async function onSubmit(data: SignupFormData) {
    setIsLoading(true)
    try {
      const res = await apiService.signup({
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        phone: data.phone,
      })

      if (res.message === "success") {
        toast.success("Account created successfully! You can now sign in.")
        router.push("/auth/signin")
      } else {
        setIsLoading(false)
        toast.error(res.message || "Failed to create account")
      }
    } catch (error) {
      setIsLoading(false)
      toast.error("An error occurred during signup.")
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full sm:max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Sign up to start shopping exactly what you need.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-signup" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Full Name Field */}
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="signup-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="signup-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="example@gmail.com"
                      autoComplete="email"
                      type="email"
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="signup-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      type="password"
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                    {!fieldState.error && password && (
                      <FieldDescription>
                        ✓ Password is strong
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />

              {/* Confirm Password Field */}
              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-repassword">Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      id="signup-repassword"
                      aria-invalid={fieldState.invalid}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      type="password"
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                    {!fieldState.error && field.value && password === field.value && (
                      <FieldDescription>
                        ✓ Passwords match
                      </FieldDescription>
                    )}
                  </Field>
                )}
              />

              {/* Phone Field */}
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-phone">Phone Number</FieldLabel>
                    <Input
                      {...field}
                      id="signup-phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="01001234567"
                      autoComplete="tel"
                      type="tel"
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                    <FieldDescription>
                      Egyptian phone number (starts with 01)
                    </FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button
            disabled={isLoading || isSubmitting}
            type="submit"
            form="form-signup"
            className="w-full"
          >
            {isLoading || isSubmitting ? "Creating..." : "Sign Up"}
          </Button>
          <p className="text-sm text-muted-foreground w-full text-center">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
