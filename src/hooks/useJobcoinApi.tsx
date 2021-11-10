import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const useJobcoinApi = () => {
  const makeApiCall = async (request: AxiosRequestConfig, timeout = 20000) => {
    let response: AxiosResponse = undefined

    const _useJobcoinApi: AxiosResponse = await axios(request)

    try {
      response = _useJobcoinApi
    } catch (e) {
      console.log(e)
    } finally {
      return response
    }
  }

  const getAddressInfoFor = async (address: string) =>
    await makeApiCall({
      url: `https://jobcoin.gemini.com/untainted-upgrade/api/addresses/${address}`,
      method: 'get',
    })

  const sendJobcoins = async (toAddress: string, fromAddress: string, amount: string) =>
    await makeApiCall({
      url: `https://jobcoin.gemini.com/untainted-upgrade/api/transactions`,
      method: 'post',
      data: {
        toAddress,
        fromAddress,
        amount,
      },
    })

  return { getAddressInfoFor, sendJobcoins }
}
