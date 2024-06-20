import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
    return (
        <div>
            <CardWrapper
                title="Login"
                subtitle="Welcome back"
                backButtonLabel="Don't have an account? Sign up!"
                backButtonHref="/register"
                showSocial
            >
                <LoginForm />
            </CardWrapper>
        </div>
    )
}

export default LoginPage;
