import { RegisterForm } from "@/components/auth/register-form";
import { CardWrapper } from "@/components/auth/card-wrapper";

const RegisterPage = () => {
    return (
        <div>
            <CardWrapper
                title="Account Registration"
                subtitle="This is where the journey begins!"
                backButtonLabel="Already have an account? Sign in here!"
                backButtonHref="/login"
                showSocial
            >
                <RegisterForm />
            </CardWrapper>
        </div>
    )
}

export default RegisterPage;
