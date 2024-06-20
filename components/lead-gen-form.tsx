"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { generateLead } from "@/actions/generate-lead"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LeadGenSchema } from "@/schemas"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function LeadGenForm() {

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()


  const form = useForm<z.infer<typeof LeadGenSchema>>({
    resolver: zodResolver(LeadGenSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  async function onSubmit (values: z.infer<typeof LeadGenSchema>) {

    startTransition(() => {
      generateLead(values)
        .then((data) => {
          if(data?.error){
            setError(data.error)
          }
          if(data?.success){
            setSuccess(data.success)
          }
        })
        .catch(() => {
          setError("Something went wrong!")
        })
    })
  }

  return (
<Card className="w-[400px] mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Subscribe to our newsletter!</CardTitle>
        <CardDescription>Be the first to know about new products, exclusive offers, and exciting news.</CardDescription>
      </CardHeader>
      <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="Marty McFly" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="marty@mcflyhoverboards.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            {/*
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="5558675309" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            */}
            <div className="pt-7">
        <FormSuccess message={success}  />
        <FormError message={error} />
        <Button type="submit" className="w-full">Sign Up</Button>
      </div>
      </form>
    </Form>
      </CardContent>
    </Card>
  )
}

