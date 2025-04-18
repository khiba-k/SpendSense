'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Onboardingcomplete } from './utils/OnboardingComplete'
import { OnboardingForm, OnboardingFormSchema } from './utils/OnboardingFormSchema'

export default function Onboarding() {
  const [error, setError] = React.useState('')
  const { user } = useUser()
  const router = useRouter()


  // Define form
  const form = useForm<OnboardingForm>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      name: user?.firstName || "",
      surname: user?.lastName || "",
      email: "",
      occupation: "",
      gender: "Male",
    },
  });

  // Reset form values when user is available
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.firstName || "",
        surname: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        occupation: "",
        gender: "Male",
      });
    }
  }, [user, form]);

  //Data submit handler.
  async function onSubmit(data: OnboardingForm) {
    const completeOnboarding = await Onboardingcomplete(data);
  }

  // Form fields
  const fields: Array<{
    name: "name" | "surname" | "email" | "occupation" | "gender";
    label: string;
    placeholder: string;
    disabled?: boolean;
  }> = [
      { name: "name", label: "Name", placeholder: "Enter your name" },
      { name: "surname", label: "Surname", placeholder: "Enter your surname" },
      { name: "email", label: "Email", placeholder: "Enter your email", disabled: true },
      { name: "occupation", label: "Occupation", placeholder: "Enter your occupation e.g Accountant, HR Manager" },
    ];

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-lg px-3 sm:h-full md:h-[630px] py-5'>
        <h1 style={{ color: "#01830A" }} className='text-2xl font-bold text-center mb-4'>$pend $ense</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name, Surname, Email, Occupation */}
            {fields.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={fieldConfig.placeholder} {...field} disabled={fieldConfig.disabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Gender dropdown */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full justify-end'>{form.formState.isSubmitting ?
              <Button disabled={true} type="submit" className='w-4'><LoaderIcon /></Button> :
              <Button type="submit">Submit</Button>}</div>
          </form>
        </Form>
      </Card>
    </div>
  );
}