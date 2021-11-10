import HeaderBar from 'components/HeaderBar'
import { screen } from '@testing-library/react'
import { AuthorizedContextWith, renderWithAuthorizedContextWithRoute } from 'test/utils'
import { testJobcoinJwt } from 'test/resources/jobcoinFixtures'

describe('HeaderBar', () => {
  it('Shows the first letter of the authenticated address', () => {
    renderWithAuthorizedContextWithRoute(<HeaderBar />, AuthorizedContextWith(testJobcoinJwt))
    expect(screen.getByText('M')).toBeInTheDocument()
  })
})
