import './headerBar.css'

import React, { useContext } from 'react'
import { AppBar, Avatar, Grid, Link, makeStyles, Typography } from '@material-ui/core'
import { useAuthentication } from 'hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'
import { stringToColor } from 'utils/baseUtils'
import { AuthorizedContext } from 'containers/AuthorizedContainer'

export const HeaderBar: React.FC = _ => {
  const navigate = useNavigate()
  const { jobcoinJwt } = useContext(AuthorizedContext)
  const { removeCookie } = useAuthentication()

  const handleSignOut = () => {
    removeCookie()
    navigate('/sign-in', { replace: true })
  }

  const avatarBgColor = stringToColor(jobcoinJwt.address)

  const useStyles = makeStyles(theme => ({
    avatarBg: {
      color: theme.palette.getContrastText(avatarBgColor),
      backgroundColor: avatarBgColor,
    },
  }))

  const classes = useStyles()

  return (
    <AppBar position="static" color="transparent" className="header-bar">
      <Grid container justifyContent="space-between">
        <Grid container item xs={6}>
          <Grid container justifyContent="center" item xs={2}>
            <img src="/logo.png" title="gemini-logo" alt="gemini-logo" className="gemini-logo" />
          </Grid>
          <Grid container direction="column" justifyContent="center" item xs={3}>
            <Typography>Jobcoin Sender</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={6}>
          <Grid container direction="column" justifyContent="center" item xs={2}>
            <Grid container justifyContent="center">
              <Avatar className={classes.avatarBg}>{jobcoinJwt.address[0]}</Avatar>
            </Grid>
          </Grid>
          <Grid container direction="column" justifyContent="center" item xs={2}>
            <Link onClick={handleSignOut} className="sign-out-link">
              Sign Out
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  )
}
