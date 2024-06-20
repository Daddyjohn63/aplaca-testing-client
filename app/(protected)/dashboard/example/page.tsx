// 'use client';

// import { useCurrentUser } from '@/hooks/use-current-user';

// const ExamplePage = () => {
//   const user = useCurrentUser();

//   console.log('THE USER', user);

//   return <>.......</>;
// };

// export default ExamplePage;

// 'use client';

// import { useCurrentUser } from '@/hooks/use-current-user';
// import { useEffect, useState } from 'react';

// const ExamplePage = () => {
//   const { user, loading } = useCurrentUser();
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     if (!loading) {
//       setIsReady(true);
//     }
//   }, [loading]);

//   useEffect(() => {
//     console.log('Loading State:', loading);
//     console.log('User State:', user);
//     if (isReady) {
//       console.log('THE USER', user);
//     }
//   }, [isReady, user, loading]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!user) {
//     return <p>No user found</p>;
//   }

//   return <>....... {user.name}</>;
// };

// export default ExamplePage;

'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const ExamplePage = () => {
  const { data: session, status } = useSession();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (status !== 'loading') {
      setIsReady(true);
    }
  }, [status]);

  useEffect(() => {
    console.log('Session Data:', session);
    if (isReady) {
      console.log('THE USER', session?.user);
    }
  }, [isReady, session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return <p>No user found</p>;
  }

  return <>....... {session.user.name}</>;
};

export default ExamplePage;
