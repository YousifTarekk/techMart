"use client";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressFormData {
  details: string;
  phone: string;
  city: string;
}

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => Promise<void>;
  isLoading: boolean;
}

export default function AddressForm({ onSubmit, isLoading }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>();

  return (
    <div className="mt-8 border-t border-border pt-6">
      <h3 className="font-semibold text-lg mb-4">Shipping Address</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="details">Address Details</Label>
          <Input
            id="details"
            placeholder="e.g. 123 Main St, Apt 4B"
            {...register("details", { required: "Address details are required" })}
          />
          {errors.details && (
            <span className="text-sm text-rose-500">{errors.details.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="e.g. 01010700999"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^01[0125][0-9]{8}$/,
                message: "Please enter a valid Egyptian phone number",
              },
            })}
          />
          {errors.phone && (
            <span className="text-sm text-rose-500">{errors.phone.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="e.g. Cairo"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <span className="text-sm text-rose-500">{errors.city.message}</span>
          )}
        </div>

        <Button type="submit" className="w-full mt-4" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Confirm Address & Checkout
        </Button>
      </form>
    </div>
  );
}

