import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'
import jwt from 'jsonwebtoken'
import { isValidAddress } from 'utils/jwtUtils'
import { JobcoinJwt } from 'models/jobcoin'

const cookies = new Cookies()

// should be retrieved from some secure source on app load
const jwtSecret = 'secret'

export const useAuthentication = () => {
  const location = useLocation()
  const jobcoinJWT = cookies.get('jobcoin-jwt')
  const decodedJWT = jobcoinJWT ? jwt.verify(jobcoinJWT, jwtSecret) : null
  const [jobcoinJwt, setJobcoinJwt] = useState<JobcoinJwt>(decodedJWT)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isValidAddress(decodedJWT))

  const removeCookie = () => {
    cookies.remove('jobcoin-jwt')
  }

  const setCookie = (payload: JobcoinJwt) => {
    cookies.set('jobcoin-jwt', jwt.sign(payload, jwtSecret))
  }

  const verifyCookie = () => {
    const jobcoinJWT = cookies.get('jobcoin-jwt')
    const decodedJWT = jobcoinJWT ? jwt.verify(jobcoinJWT, jwtSecret) : null
    setJobcoinJwt(decodedJWT)
  }

  useEffect(() => {
    // check cookie each time the route changes
    const recentJobcoinJWT = cookies.get('jobcoin-jwt')
    const recentDecodedJWT = recentJobcoinJWT ? jwt.verify(recentJobcoinJWT, jwtSecret) : null

    setJobcoinJwt(recentDecodedJWT)
    setIsAuthenticated(isValidAddress(recentDecodedJWT))
  }, [location.pathname])

  return { isAuthenticated, jobcoinJwt, removeCookie, setCookie, verifyCookie }
}
