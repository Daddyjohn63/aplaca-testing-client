import { Button } from "@/components/ui/button"
import Link from "next/link"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"

interface SearchParams {
  id: string;
}

const OrderCompletePage = async ({searchParams}: {searchParams: SearchParams}) => {
  
  const {id} = searchParams;

  if(!id){
    return notFound()
  }

  const checkIfVerified = async () => {

    const user = await db.user.findFirst({
      where: {
        id: id
      },
      select: {
        emailVerified: true
      }
    })

    if(!user) {
      return notFound()
    }

    return !user.emailVerified ? false : true

  }

  const isVerified = await checkIfVerified()

  if(isVerified){
    return (
      <div className="min-h-[600px] flex justify-center items-center">
        <div className="text-center space-y-6">
          <div className="text-7xl">🎉</div>
          <div className="space-y-3">
            <h1 className="text-5xl font-black">Order Complete</h1>
            <p>Thank you for your order. Login to your dashboard to get access.</p>
          </div>
          <Button><Link href="/dashboard">Dashboard</Link></Button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="min-h-[600px] flex justify-center items-center">
        <div className="text-center space-y-6">
          <div className="text-7xl">✉️</div>
          <div className="space-y-3">
            <h1 className="text-5xl font-black">Order Complete</h1>
            <p>Thank you for your order. Check your email to confirm your account before loging in.</p>
          </div>
        </div>
      </div>
    )

  }

}

export default OrderCompletePage;
