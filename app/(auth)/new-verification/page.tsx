import { CardWrapper } from "@/components/auth/card-wrapper"
import { NewVerificationForm } from "@/components/auth/new-verification-form"

const NewVerificationPage = () => {
    return (
        <CardWrapper
            title="Verification Confirmation"
            subtitle="One moment while we confirm your verification"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <NewVerificationForm />
        </CardWrapper>
    )
}

export default NewVerificationPage
