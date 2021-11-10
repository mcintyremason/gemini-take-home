import './sendJobcoinCard.css'

import React, { ChangeEvent, useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { useJobcoinApi } from 'hooks/useJobcoinApi'

type SendJobcoinCardProps = {
  fromAddress: string
  reloadDashboard: () => void
}

export const SendJobcoinCard: React.FC<SendJobcoinCardProps> = ({
  fromAddress,
  reloadDashboard,
}) => {
  const { sendJobcoins } = useJobcoinApi()
  const [toAddress, setToAddress] = useState<string>('')
  const [amountToSend, setAmountToSend] = useState<string>('')

  const handleToAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToAddress(event.target.value)
  }

  const handleAmountToSendChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmountToSend(event.target.value)
  }

  const handleSendJobcoins = async () => {
    await sendJobcoins(toAddress, fromAddress, amountToSend)
    reloadDashboard()
  }

  return (
    <Grid item xs={12}>
      <Card elevation={5} className="send-jobcoin-card">
        <CardContent className="card-content">
          <Typography variant="h6" align="center">
            Send Jobcoins
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className="card-actions">
          <Grid container justifyContent="center">
            <FormGroup>
              <Grid container>
                <FormLabel component="legend" className="text-field-label-container">
                  Destination Address
                </FormLabel>
              </Grid>
              <Grid container className="text-field-label-container">
                <TextField
                  variant="outlined"
                  value={toAddress}
                  onChange={handleToAddressChange}
                  className="text-field"
                />
              </Grid>
              <Grid container>
                <FormLabel component="legend" className="text-field-label-container">
                  Amount to Send
                </FormLabel>
              </Grid>
              <Grid container className="text-field-label-container">
                <TextField
                  variant="outlined"
                  value={amountToSend}
                  onChange={handleAmountToSendChange}
                  className="text-field"
                />
              </Grid>
              <Grid container className="send-button-container">
                <Button variant="contained" onClick={handleSendJobcoins} className="card-button">
                  Send Jobcoins
                </Button>
              </Grid>
            </FormGroup>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}
