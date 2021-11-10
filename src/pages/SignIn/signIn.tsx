import './signIn.css'

import React, { useState } from 'react'
import { Grid, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import SignInCard from 'components/SignInCard'

export const SignIn: React.FC = _ => {
  const [isValidAddress, setIsValidAddress] = useState<boolean>(true)

  const handleSnackbarClose = () => {
    setIsValidAddress(true)
  }

  return (
    <Grid className="sign-in-container" container direction="column" justifyContent="center">
      <Grid container justifyContent="center">
        <Grid className="sign-in-card-container">
          <Grid container justifyContent="center" className="sign-in-logo">
            <img src="/logo.png" title="gemini-logo" alt="gemini-logo" />
          </Grid>
          <SignInCard isValidAddress={isValidAddress} setIsValidAddress={setIsValidAddress} />
        </Grid>
      </Grid>
      <Snackbar open={!isValidAddress} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          Error: Invalid Address
        </Alert>
      </Snackbar>
    </Grid>
  )
}
