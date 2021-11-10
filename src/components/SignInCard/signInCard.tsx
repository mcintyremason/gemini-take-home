import './signInCard.css'

import React, { ChangeEvent, useContext, useState } from 'react'
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
import { isEmpty } from 'utils/baseUtils'
import { useAuthentication } from 'hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'containers/AppContainer/appContainer'
import { useJobcoinApi } from 'hooks/useJobcoinApi'

type SignInCardProps = {
  isValidAddress: boolean
  setIsValidAddress: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignInCard: React.FC<SignInCardProps> = ({ isValidAddress, setIsValidAddress }) => {
  const { setJobcoinAddressInfo } = useContext(AppContext)
  const { getAddressInfoFor } = useJobcoinApi()
  const [address, setAddress] = useState<string>('')

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const navigate = useNavigate()
  const { removeCookie, setCookie } = useAuthentication()

  const signInWith = async (addressToCheck: string) => {
    const response = await getAddressInfoFor(addressToCheck)

    const { data } = response

    if (!isEmpty(data) && data?.balance === '0' && isEmpty(data?.transactions)) {
      console.log('Invalid Address')
      setIsValidAddress(false)
      removeCookie()
    } else {
      setJobcoinAddressInfo({
        address: addressToCheck,
        balance: data?.balance,
        transactions: data?.transactions,
      })
      setCookie({ address: addressToCheck })
      navigate('/', { replace: true })
    }
  }

  const handleSignIn = async () => {
    await signInWith(address)
  }

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      await signInWith(address)
    }
  }

  return (
    <Card elevation={5} className="sign-in-card">
      <CardContent className="card-content">
        <Typography variant="h5" align="center">
          Welcome! Sign In With Your Jobcoin Address
        </Typography>
      </CardContent>
      <Divider />
      <CardActions className="card-actions">
        <Grid container justifyContent="center">
          <FormGroup>
            <Grid container>
              <FormLabel component="legend" className="text-field-label-container">
                Jobcoin Address
              </FormLabel>
            </Grid>
            <Grid container className="text-field-label-container">
              <TextField
                variant="outlined"
                value={address}
                onChange={handleAddressChange}
                onKeyUp={handleKeyPress}
                color={isValidAddress ? 'primary' : 'secondary'}
                className="text-field"
              />
            </Grid>
            <Grid container className="submit-container">
              <Button
                variant="contained"
                color={isValidAddress ? 'primary' : 'secondary'}
                onClick={handleSignIn}
                className="card-button"
              >
                Sign In
              </Button>
            </Grid>
          </FormGroup>
        </Grid>
      </CardActions>
    </Card>
  )
}
