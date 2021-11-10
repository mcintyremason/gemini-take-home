import React, { createContext } from 'react'

import { useAuthentication } from 'hooks/useAuthentication'
import { Navigate } from 'react-router-dom'
import { JwtPayload } from 'jsonwebtoken'
import { JobcoinJwt } from 'models/jobcoin'

type AuthorizedContainerProps = {
  children: React.ReactElement[] | React.ReactElement
}

export type AuthorizedContextType = {
  isAuthenticated: boolean
  jobcoinJwt: JobcoinJwt & (JwtPayload | string)
}

export const AuthorizedContext = createContext<AuthorizedContextType>(null)

const AuthorizedContainer: React.FC<AuthorizedContainerProps> = props => {
  const { isAuthenticated, jobcoinJwt } = useAuthentication()

  const authContextValue = {
    isAuthenticated,
    jobcoinJwt,
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />
  }

  return (
    <AuthorizedContext.Provider value={authContextValue}>
      {props.children}
    </AuthorizedContext.Provider>
  )
}

export default AuthorizedContainer
