"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { useTransition, useState } from "react";
import { type Plan } from "@/types";

export const RegisterForm = ({plan}:{plan?: Plan}) => {

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

    setError("");
    setSuccess("");

    const startStripeCheckout = async (plan: Plan, id: string, name?: string, email?: string) => {

        const res = await fetch('/api/stripe/create-checkout', {
          method: 'POST',
          headers: {
            'Content-type': 'json/application',
          },
          body: JSON.stringify({
            userId: id,
            userEmail: email,
            userName: name,
            priceId: plan.priceId,
            mode: plan.mode,
            successUrl: plan.successRedirect || window.location.href,
            cancelUrl: window.location.href,
          })
        })

        if(!res.ok) {
          console.error("something went wrong")
          return
        }

        const stripeData = await res.json()

        if(stripeData.error) {
          console.error(stripeData.error)
          return
        }

        window.location.href = stripeData.url;
    }

    startTransition(() => {
      register(values).then((data) => {

        if(data.error){
          setError(data.error);
        }

        if(data.success) {

          const {id, name, email} = data.userData

          if(!!plan) {
            //If user clicks buy now button with plan.
            startStripeCheckout(plan, id, name, email)

          } else {
            setSuccess(data.success);
          }
        }
      });
    });

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  placeholder="Marty McFly"
                />
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
                <Input
                  disabled={isPending}
                  {...field}
                  placeholder="marty.mcfly@hoverboards.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  placeholder="******"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-3">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Create an account
          </Button>
        </div>
      </form>
    </Form>
  );
};
