import { CardWrapper } from "@/components/auth/card-wrapper"
import { NewPasswordForm } from "@/components/auth/new-password-form"

const NewPasswordPage = () => {
    return (
    <CardWrapper
      title="Reset Password"
      subtitle="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <NewPasswordForm />
    </CardWrapper>
    )
}

export default NewPasswordPage
