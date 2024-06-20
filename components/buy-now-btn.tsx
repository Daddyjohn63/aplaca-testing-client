'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LoginForm } from "./auth/login-form"
import { RegisterForm } from "./auth/register-form"
import Social from "./auth/social";
import { useState } from "react";
import { FormError } from "./form-error"

import { Plan } from "@/types"

export const BuyNowBtn = ({user, plan}: {user: any, plan: Plan}) => {

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const {name, priceId, mode, successRedirect} = plan;

  const createCheckout = async () => {

    setError(undefined)

    const res = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: {
        'Content-type': 'json/application',
      },
      body: JSON.stringify({
        userId: user.id,
        userEmail: user.email || '',
        userName: user.name,
        priceId: priceId,
        mode: mode,
        successUrl: successRedirect || window.location.href,
        cancelUrl: window.location.href,
      })
    })

    if(!res.ok) {
      console.error("something went wrong")
      return
    }

    const data = await res.json()

    if(data.error) {
      setError("Something went wrong, contact support!")
      console.error(data.error)
      return
    }

    window.location.href = data.url;
  }

  return (
    <div>
      {!!user ? (
        <div>
          <FormError message={error} />
          <Button 
            className="w-full bg-primary text-primary-foreground"
            onClick={createCheckout}
          >
            Get {name}
          </Button>
        </div>
      ): (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-primary text-primary-foreground" >
                {name}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-10">
              {!showLoginForm ? (
                <div>
                  <DialogHeader className="mb-4">
                    <DialogTitle className="text-center text-2xl">Register Account First</DialogTitle>
                    <DialogDescription className="text-center text-foreground">Must be signed in first before purchasing product!</DialogDescription>
                  </DialogHeader>
                  <RegisterForm plan={plan} />
                  <div className="flex items-center justify-center p-3">
                    <div className="flex-grow border-t border-muted-foreground"></div>
                    <span className="px-4 text-muted-foreground">or</span>
                    <div className="flex-grow border-t border-muted-foreground"></div>
                  </div>
                  <Social />
                    <div className="text-center pt-3">
                  <Button variant="link" onClick={() => setShowLoginForm(true)}>Already have an account? Login here</Button>
                </div>
                </div>
              ): (
                  <div>
                  <DialogHeader className="mb-4">
                    <DialogTitle className="text-center text-2xl">Login First</DialogTitle>
                    <DialogDescription className="text-center text-foreground">Must be signed in first before purchasing product!</DialogDescription>
                  </DialogHeader>
                  <LoginForm />
                  <div className="flex items-center justify-center p-3">
                    <div className="flex-grow border-t border-muted-foreground"></div>
                    <span className="px-4 text-muted-foreground">or</span>
                    <div className="flex-grow border-t border-muted-foreground"></div>
                  </div>
                  <Social />
                    <div className="text-center pt-3">
                  <Button variant="link" onClick={() => setShowLoginForm(false)}>Need an account? Register here</Button>
                </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
      )}
    </div>
  )
}
