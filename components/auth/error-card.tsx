import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      title="Oops!"
      subtitle="Something went wrong."
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="w-full flex justify-center items-center pt-2">
        <ExclamationTriangleIcon className="text-descructive w-10 h-10" />
      </div>
    </CardWrapper>
  );
};
