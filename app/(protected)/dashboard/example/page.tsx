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

// 'use client';

// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';

// const ExamplePage = () => {
//   const { data: session, status } = useSession();
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     if (status !== 'loading') {
//       setIsReady(true);
//     }
//   }, [status]);

//   useEffect(() => {
//     console.log('Session Data:', session);
//     if (isReady) {
//       console.log('THE USER', session?.user);
//     }
//   }, [isReady, session]);

//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (!session || !session.user) {
//     return <p>No user found</p>;
//   }

//   return <>....... {session.user.name}</>;
// };

// export default ExamplePage;

'use client';

import { useSession } from 'next-auth/react';

const ExamplePage = () => {
  const { data: session } = useSession({ required: true });
  //let hasAccess = ''
  console.log('CLIENT SESSION:', { session });
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-2xl font-bold">This is a client side protected page</h1>
        <h2 className="mt-4 font-medium">You are logged in as:</h2>
        <p className="mt-4">{session?.user?.name}</p>
        <p>email is {session?.user?.email}</p>
        {session?.user?.hasAccess && `You have full access`}
      </div>
    </section>
  );
};

export default ExamplePage;
// 'use client';

// import { useSession } from 'next-auth/react';

// interface CustomSession {
//   user?: {
//     name?: string;
//     email?: string;
//     image?: string;
//   };
//   expires?: string;
//   [key: string]: any; // For other possible session properties
// }

// const ExamplePage: React.FC = () => {
//   const { data: session, status, update } = useSession();

//   // Helper function to render session data
//   const renderSessionData = (data: any) => {
//     if (!data) return null;

//     return Object.keys(data).map(key => {
//       if (typeof data[key] === 'object' && data[key] !== null) {
//         return (
//           <div key={key} className="mt-2">
//             <strong>{key}:</strong>
//             {renderSessionData(data[key])}
//           </div>
//         );
//       }
//       return (
//         <div key={key} className="mt-2">
//           <strong>{key}:</strong> {data[key]?.toString()}
//         </div>
//       );
//     });
//   };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'unauthenticated') {
//     return <div>You are not authenticated</div>;
//   }

//   return (
//     <section className="py-24">
//       <div className="container">
//         <h1 className="text-2xl font-bold">This is a client side protected page</h1>
//         <h2 className="mt-4 font-medium">You are logged in as:</h2>
//         <p className="mt-4">{session?.user?.name}</p>
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold">Session Data:</h3>
//           {renderSessionData(session)}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ExamplePage;
