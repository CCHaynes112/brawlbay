import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import ReactGA from 'react-ga'

import ContentHeader from '../ContentHeader'
import { UtilityClient } from '../../api_agent'

import headerImg from '../assets/img/maps/13 - qCo0Jbj.jpg'
import tinRank from '../assets/img/Rankings/Tin.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 60
  },
  paper: {
    padding: 40,
    textAlign: 'center'
  },
  gridContainer: {
    justifyContent: 'center',
    marginTop: 50
  },
  img: {
    width: '100%'
  },
  form: {
    display: 'grid',
    width: '80%',
    margin: 'auto'
  },
  textField: {
    color: theme.palette.text.primary
  },
  button: {
    color: theme.palette.text.secondary,
    width: '30%',
    margin: 30
  }
}))

export default function Contact () {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleSubject = (event) => {
    setSubject(event.target.value)
  }

  const handleMessage = (event) => {
    setMessage(event.target.value)
  }

  const sendEmail = (event) => {
    ReactGA.event({
      category: 'Send Email',
      action: 'User pressed the send email button'
    })
    const data = {
      email: email,
      subject: subject,
      message: message
    }
    UtilityClient.sendEmail(data)
      .then((res) => {
        setEmail('')
        setSubject('')
        setMessage('')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className={classes.root}>
      <ContentHeader title='Contact' headerImg={headerImg} />
      <Container maxWidth='md'>
        <Paper className={classes.paper}>
          <Typography variant='body1'>
            Please feel free to shoot me a message if you have any questions or comments!
          </Typography>
          <Grid container className={classes.gridContainer}>
            <Grid item sm={3}>
              <img className={classes.img} src={tinRank} alt='Tin' />
            </Grid>
            <Grid item sm={9}>
              <form noValidate className={classes.form}>
                <TextField
                  InputLabelProps={{
                    className: classes.textField
                  }}
                  label='Email'
                  required
                  value={email}
                  onChange={handleEmail}
                />
                <TextField
                  InputLabelProps={{
                    className: classes.textField
                  }}
                  label='Subject'
                  required
                  value={subject}
                  onChange={handleSubject}
                />
                <TextField
                  multiline
                  rows={4}
                  InputLabelProps={{
                    className: classes.textField
                  }}
                  label='Message'
                  required
                  value={message}
                  onChange={handleMessage}
                />
                <Button className={classes.button} variant='contained' color='secondary' onClick={sendEmail}>Submit</Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}
