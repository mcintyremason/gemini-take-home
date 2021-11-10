import './dashboard.css'

import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'

import HeaderBar from 'components/HeaderBar'
import { AppContext } from 'containers/AppContainer'
import { useAuthentication } from 'hooks/useAuthentication'
import { useJobcoinApi } from 'hooks/useJobcoinApi'
import AddressBalanceCard from 'components/AddressBalanceCard'
import { SendJobcoinCard } from 'components/SendJobcoinCard/sendJobcoinCard'
import Chart from 'react-google-charts'

export const Dashboard: React.FC = _ => {
  const { jobcoinAddressInfo, setJobcoinAddressInfo } = useContext(AppContext)
  const { jobcoinJwt } = useAuthentication()
  const { getAddressInfoFor } = useJobcoinApi()
  const [chartData, setChartData] = useState([])

  const loadDashboardWith = async (addressToCheck: string) => {
    const response = await getAddressInfoFor(addressToCheck)

    const { data } = response

    setJobcoinAddressInfo({
      address: addressToCheck,
      balance: data?.balance,
      transactions: data?.transactions,
    })
  }

  const reloadDashboard = () => {
    loadDashboardWith(jobcoinJwt.address)
    setupChart()
  }

  const setupChart = () => {
    if (jobcoinAddressInfo?.transactions) {
      const columns = [
        { type: 'date', label: 'Time' },
        { type: 'number', label: 'Amount' },
      ]
      let rows = []

      let balanceOverTime = 0

      for (let row of jobcoinAddressInfo?.transactions) {
        const { amount, toAddress, fromAddress, timestamp } = row

        if (toAddress === jobcoinAddressInfo.address) {
          balanceOverTime += Number(amount)
        }

        if (fromAddress === jobcoinAddressInfo.address) {
          balanceOverTime -= Number(amount)
        }

        rows.push([new Date(Date.parse(timestamp)), balanceOverTime])
      }

      setChartData([columns, ...rows])
    }
  }

  useEffect(() => {
    if (jobcoinJwt?.address) {
      loadDashboardWith(jobcoinJwt.address)
    }
  }, [jobcoinJwt])

  useEffect(() => {
    if (jobcoinAddressInfo?.address) {
      setupChart()
    }
  }, [jobcoinAddressInfo])

  return (
    <>
      <HeaderBar />
      <Grid container justifyContent="space-between" className="dashboard">
        <Grid
          container
          direction="column"
          justifyContent="center"
          item
          xs={5}
          className="dashboard-left-container"
        >
          <Grid container justifyContent="center" className="card-container">
            <AddressBalanceCard jobcoinAddressInfo={jobcoinAddressInfo} />
          </Grid>
          <Grid container justifyContent="center" className="card-container">
            <SendJobcoinCard
              fromAddress={jobcoinAddressInfo?.address}
              reloadDashboard={reloadDashboard}
            />
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Chart
            width={'625px'}
            height={'625px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              hAxis: {
                title: 'Time',
              },
              vAxis: {
                title: 'Jobcoin Balance',
              },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </Grid>
      </Grid>
    </>
  )
}
