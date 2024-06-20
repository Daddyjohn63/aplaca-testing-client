"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { contactUs } from "@/actions/contact-us"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ContactUsSchema } from "@/schemas"

export function ContactUsForm() {

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()


  const form = useForm<z.infer<typeof ContactUsSchema>>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit (values: z.infer<typeof ContactUsSchema>) {

    startTransition(() => {
      contactUs(values)
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={isPending} rows={7} className="bg-input text-black"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSuccess message={success}  />
        <FormError message={error} />
        <Button type="submit">Send Message</Button>
      </form>
    </Form>
  )
}

