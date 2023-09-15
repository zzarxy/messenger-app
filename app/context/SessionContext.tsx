import { createContext, useContext, useEffect, useState } from 'react';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

const SessionContext = createContext<Session | null>(null);

interface AuthContextProps {
   children: React.ReactNode
}

export default function SessionProvider({ children }: AuthContextProps) {
   const { data: session, status } = useSession();
   const [storedSession, setStoredSession] = useState<Session | null>(null);

   useEffect(() => {
      if (status === "authenticated") {
         setStoredSession(session);
      }
   }, [status, session]);

   return (
      <SessionContext.Provider value={storedSession}>
         {children}
      </SessionContext.Provider>
   );
}

export function useStoredSession() {
   return useContext(SessionContext);
}
