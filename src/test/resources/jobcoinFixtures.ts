import { JobcoinAddressInfo, JobcoinJwt } from 'models/jobcoin'

export const testJobcoinJwt: JobcoinJwt = {
  address: 'Mason',
}

export const testJobcoinAddressInfo: JobcoinAddressInfo = {
  address: 'Mason',
  balance: '48.45',
  transactions: [
    { timestamp: '2021-11-07T00:19:24.031Z', toAddress: 'Mason', amount: '50' },
    {
      timestamp: '2021-11-09T14:14:19.934Z',
      fromAddress: 'Alice',
      toAddress: 'Mason',
      amount: '0.5',
    },
    {
      timestamp: '2021-11-09T14:15:23.084Z',
      fromAddress: 'Mason',
      toAddress: 'Alice',
      amount: '0.5',
    },
    {
      timestamp: '2021-11-09T14:51:15.334Z',
      fromAddress: 'Mason',
      toAddress: 'Alice',
      amount: '0.5',
    },
    {
      timestamp: '2021-11-09T14:53:38.360Z',
      fromAddress: 'Mason',
      toAddress: 'Alice',
      amount: '0.5',
    },
    {
      timestamp: '2021-11-09T15:06:43.000Z',
      fromAddress: 'Mason',
      toAddress: 'Alice',
      amount: '0.5',
    },
    {
      timestamp: '2021-11-09T22:01:48.495Z',
      fromAddress: 'Mason',
      toAddress: 'Rachel',
      amount: '0.05',
    },
  ],
}
