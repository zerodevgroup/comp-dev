import React, { useContext, useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import CloseIcon from "@material-ui/icons/Close"
import { DateTime } from "luxon"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import InputLabel from "@material-ui/core/InputLabel"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import Select from "@material-ui/core/Select"
import Snackbar from "@material-ui/core/Snackbar"
import TextField from "@material-ui/core/TextField"


import { StoreContext } from "../context/store-context"
import { initialState } from "../context/reducers"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  field: {
    marginBottom: "30px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const TeamMemberUpdate = () => {
  console.log("TeamMemberUpdate")
  const { state, dispatch, actions } = useContext(StoreContext)
  const [teamMemberLoaded, setTeamMemberLoaded] = useState(false)
  const [saveFormSnackbarIsOpen, setSubmitFormSnackbarIsOpen] = React.useState(false)

  useEffect(() => {
    // Load any data here
    console.log("Loading data...")
    
    if(!teamMemberLoaded) {
      (async () => {
        await setTeamMemberLoaded(true)
        actions.teamMemberUpdate(initialState.teamMember)
        await getTeamMember()
      })()
    }
  })

  const getTeamMember = async () => {
    let data = await postData("https://milspec.io/comp-dev-api/find/teammembers", {find: {"_id": state.teamMemberCurrent._id}, limit: 0})

    if(data.docs && data.docs.length > 0) {
      let teamMemberData = data.docs[0]

      actions.teamMemberUpdate(teamMemberData)
    }
    else {
      console.log("TeamMember not found")
    }
  }

  const handleSubmit = async () => {
    let result = await postData("https://milspec.io/comp-dev-api/update/teammembers", state.teamMember)
    console.log(result)
    setSubmitFormSnackbarIsOpen(true)
  }

  const handleSubmitFormSnackbarClose = (event, reason) => {
    setSubmitFormSnackbarIsOpen(false)
  }

  const handleChange = (event) => {
    let name = event.target.name ? event.target.name : event.target.id
    let value = event.target.value

    let teamMemberData = { ...state.teamMember } 
    teamMemberData[name] = value

    actions.teamMemberUpdate(teamMemberData)
  }

  const postData = async (url = "", data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
          <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={saveFormSnackbarIsOpen}
              autoHideDuration={6000}
              onClose={handleSubmitFormSnackbarClose}
              message="TeamMember has been updated."
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleSubmitFormSnackbarClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
        </Grid>
        <Grid item md={3}>
          <></>
        </Grid>
        <Grid item md={3}>
          <></>
        </Grid>
        <Grid item md={3}>
          <></>
        </Grid>

        {/* First Name, Last Name */}
        <Grid item md={6}>
          <TextField className={classes.field} id="firstName" value={state.teamMember.firstName} label="First Name" variant="outlined" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item md={6}>
          <TextField className={classes.field} id="lastName" value={state.teamMember.lastName} label="Last Name" variant="outlined" fullWidth onChange={handleChange} />
        </Grid>

        {/* Role, Email */}
        <Grid item md={6}>
          <TextField className={classes.field} id="memberId" value={state.teamMember.memberId} label="Member Id" variant="outlined" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item md={6}>
          <TextField className={classes.field} id="email" value={state.teamMember.email} label="Email" variant="outlined" fullWidth onChange={handleChange} />
        </Grid>

        {/* Role, Email */}
        <Grid item md={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="roleLabel">Role</InputLabel>
            <Select labelId="roleLabel" label="Role" id="role" name="role" value={state.teamMember.role} onChange={handleChange}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={"Administrator"}>Administrator</MenuItem>
              <MenuItem value={"Customer Service Agent"}>Customer Service Agent</MenuItem>
              <MenuItem value={"Database Administrator"}>Database Administrator</MenuItem>
              <MenuItem value={"Systems Administrator"}>Systems Administrator</MenuItem>
              <MenuItem value={"Developer"}>Developer</MenuItem>
              <MenuItem value={"Tester"}>Tester</MenuItem>
              <MenuItem value={"Project Manager"}>Project Manager</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <></>
        </Grid>
      </Grid>
    </div>
  )
}

export default TeamMemberUpdate
