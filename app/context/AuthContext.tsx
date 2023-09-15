"use client"

import { SessionProvider } from "next-auth/react"
import SessionContext from './SessionContext'

interface AuthContextProps {
   children: React.ReactNode
}

export default function AuthContext({
   children
}: AuthContextProps) {
   return (
      <SessionProvider>
         <SessionContext>
            {children}
         </SessionContext>
      </SessionProvider>
   )
}