import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();
  // console.log('Session Data:', session);
  return session.data?.user;
};

// import { useSession } from 'next-auth/react';

// export const useCurrentUser = () => {
//   const { data: session, status } = useSession();
//   const loading = status === 'loading';

//   console.log('Session Data:', session); // Add this line to log the session data

//   return { user: session?.user, loading };
// };
