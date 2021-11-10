import { JwtPayload } from 'jsonwebtoken'

type JobcoinTransaction = {
  amount: string
  fromAddress?: string
  toAddress: string
  timestamp: string
}

export type JobcoinAddressInfo = {
  address: string
  balance: string
  transactions: Array<JobcoinTransaction>
}

export type JobcoinJwt = {
  address?: string
} & (JwtPayload | string)
