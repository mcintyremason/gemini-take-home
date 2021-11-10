import './addressBalanceCard.css'

import React from 'react'
import { Card, Divider, CardActions, CardContent, Typography, Grid } from '@material-ui/core'

import { JobcoinAddressInfo } from 'models/jobcoin'

type AddressBalanceCardProps = {
  jobcoinAddressInfo: JobcoinAddressInfo
}

export const AddressBalanceCard: React.FC<AddressBalanceCardProps> = ({ jobcoinAddressInfo }) => {
  return (
    <Grid item xs={12}>
      <Card elevation={5} className="address-balance-card">
        <CardContent className="card-content">
          <Typography variant="h6" align="center">
            Jobcoin Balance
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className="card-actions">
          <Grid container direction="column" justifyContent="center">
            <Grid container justifyContent="center">
              <Typography variant="h6" align="center">
                {jobcoinAddressInfo?.balance ? jobcoinAddressInfo.balance : null}
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}
