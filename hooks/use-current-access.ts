import {useSession} from "next-auth/react";

export const useCurrentAccess = () => {
    const session = useSession();
    return session.data?.user?.hasAccess;

}
