import { render } from '@testing-library/react'
import { AppContext, AppContextType } from 'containers/AppContainer/appContainer'

import { AuthorizedContext } from 'containers/AuthorizedContainer'
import { AuthorizedContextType } from 'containers/AuthorizedContainer/authorizedContainer'
import { JobcoinAddressInfo, JobcoinJwt } from 'models/jobcoin'
import { MemoryRouter } from 'react-router-dom'
import { testJobcoinAddressInfo, testJobcoinJwt } from 'test/resources/jobcoinFixtures'

export const testAuthorizedContext: AuthorizedContextType = {
  isAuthenticated: true,
  jobcoinJwt: null,
}

export const testAppContext: AppContextType = {
  jobcoinAddressInfo: null,
  setJobcoinAddressInfo: () => null,
}

export const AuthorizedContextWith = (jobcoinJwt: JobcoinJwt) => {
  return { ...testAuthorizedContext, jobcoinJwt: jobcoinJwt }
}

export const AppContextWith = (jobcoinAddressInfo: JobcoinAddressInfo) => {
  return { ...testAppContext, jobcoinAddressInfo: jobcoinAddressInfo }
}

// Render with Authorized Context & routes
export const renderWithAuthorizedContextWithRoute = (
  component: any,
  context: AuthorizedContextType = AuthorizedContextWith(testJobcoinJwt)
) => {
  return render(
    <MemoryRouter>
      <AuthorizedContext.Provider value={context}>{component}</AuthorizedContext.Provider>
    </MemoryRouter>
  )
}

export const renderWithAppContextWithRoute = (
  component: any,
  context: AppContextType = AppContextWith(testJobcoinAddressInfo)
) => {
  return render(
    <MemoryRouter>
      <AppContext.Provider value={context}>{component}</AppContext.Provider>
    </MemoryRouter>
  )
}

export const renderWithAppAndAuthorizedContextWithRoute = (
  component: any,
  appContext: AppContextType = AppContextWith(testJobcoinAddressInfo),
  authContext: AuthorizedContextType = AuthorizedContextWith(testJobcoinJwt)
) => {
  return render(
    <MemoryRouter>
      <AppContext.Provider value={appContext}>
        <AuthorizedContext.Provider value={authContext}>{component}</AuthorizedContext.Provider>
      </AppContext.Provider>
    </MemoryRouter>
  )
}
