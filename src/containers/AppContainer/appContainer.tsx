import React, { createContext, useState } from 'react'

import { JobcoinAddressInfo } from 'models/jobcoin'

type AppContainerProps = {
  children: React.ReactElement[] | React.ReactElement
}

export type AppContextType = {
  jobcoinAddressInfo: JobcoinAddressInfo
  setJobcoinAddressInfo: React.Dispatch<React.SetStateAction<JobcoinAddressInfo>>
}

export const AppContext = createContext<AppContextType>(null)

const AppContainer: React.FC<AppContainerProps> = props => {
  const [jobcoinAddressInfo, setJobcoinAddressInfo] = useState<JobcoinAddressInfo>()
  const [isValidAddress, setIsValidAddress] = useState<boolean>(true)

  const appContextValue = {
    jobcoinAddressInfo,
    isValidAddress,
    setJobcoinAddressInfo,
    setIsValidAddress,
  }

  return <AppContext.Provider value={appContextValue}>{props.children}</AppContext.Provider>
}

export default AppContainer
