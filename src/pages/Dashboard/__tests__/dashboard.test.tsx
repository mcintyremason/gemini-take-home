import Dashboard from 'pages/Dashboard'
import { screen } from '@testing-library/react'
import {
  AppContextWith,
  AuthorizedContextWith,
  renderWithAppAndAuthorizedContextWithRoute,
} from 'test/utils'
import { testJobcoinAddressInfo, testJobcoinJwt } from 'test/resources/jobcoinFixtures'

describe('Dashboard', () => {
  it('Shows the title for the Jobcoin Balance card', () => {
    renderWithAppAndAuthorizedContextWithRoute(
      <Dashboard />,
      AppContextWith(testJobcoinAddressInfo),
      AuthorizedContextWith(testJobcoinJwt)
    )
    expect(screen.getByText('Jobcoin Balance')).toBeInTheDocument()
  })

  it('Shows the title for the Send Jobcoins Card', () => {
    renderWithAppAndAuthorizedContextWithRoute(
      <Dashboard />,
      AppContextWith(testJobcoinAddressInfo),
      AuthorizedContextWith(testJobcoinJwt)
    )
    expect(screen.getAllByText('Send Jobcoins')[0]).toBeInTheDocument()
  })

  it('Shows the current amount after the last transaction was made', () => {
    renderWithAppAndAuthorizedContextWithRoute(
      <Dashboard />,
      AppContextWith(testJobcoinAddressInfo),
      AuthorizedContextWith(testJobcoinJwt)
    )
    expect(screen.getByText('48.45')).toBeInTheDocument()
  })
})
