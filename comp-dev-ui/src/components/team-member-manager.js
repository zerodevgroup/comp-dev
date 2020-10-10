import React, { useContext, useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import InputLabel from "@material-ui/core/InputLabel"
import { makeStyles } from "@material-ui/core/styles"
import MuiAlert from "@material-ui/lab/Alert"
import TextField from "@material-ui/core/TextField"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import { Redirect } from "react-router-dom"

import { StoreContext } from "../context/store-context"

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

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TeamMemberManager = () => {
  const { state, dispatch, actions } = useContext(StoreContext)
  const [teamMembers, setTeamMembers] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    // Load any data here
    console.log("Loading data...")

    if(teamMembers.length === 0) {
      getTeamMembers()
    }
  })

  const handleChange = (event) => {
    let name = event.target.name ? event.target.name : event.target.id
    let value = event.target.value

    console.log({
      name: name,
      value: value,
      teamMemberLookup: state.teamMemberLookup,
    })

    let teamMemberLookupData = { ...state.teamMemberLookup } 
    teamMemberLookupData[name] = value

    actions.teamMemberLookupUpdate(teamMemberLookupData)
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleLookup()
    }
  }

  const handleLookup = async () => {
    console.log("Lookup...")
    await getTeamMembers()

    let teamMemberLookupData = { ...state.teamMemberLookup } 
    if(teamMemberLookupData.searchValue) {
      teamMemberLookupData.type = "lookup"
      teamMemberLookupData.message = `Showing results for ${teamMemberLookupData.searchValue}`
    }
    else {
      teamMemberLookupData.type = "recent"
      teamMemberLookupData.message = "Showing most recent teamMember entries"
    }

    actions.teamMemberLookupUpdate(teamMemberLookupData)
  }

  const handleEdit = (_id) => {
    console.log(_id)
    actions.teamMemberCurrentSetInitialState()

    let teamMemberCurrent = { ...state.teamMemberCurrent } 

    teamMemberCurrent._id = _id
    actions.teamMemberCurrentUpdate(teamMemberCurrent)

    setIsEditing(true)
  }

  const handleDelete = (id) => {
    console.log(id)
  }

  const getTeamMembers = async () => {
    let data = await postData("https://milspec.io/comp-dev-api/list/team-members", {search: {value: state.teamMemberLookup.searchValue}, limit: 100, sort: {"timestamp": -1}})

    if(data.docs && data.docs.length > 0) {
      let teamMembers = data.docs
      setTeamMembers(teamMembers)
    }
    else {
      setTeamMembers([])
    }
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

  if(isEditing) {
    return <Redirect to="/TeamMemberUpdate" />
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={9}>
          <TextField className={classes.field} id="searchValue" value={state.teamMemberLookup.searchValue} label="Search Value" variant="outlined" fullWidth onChange={handleChange} onKeyPress={handleEnter} />
        </Grid>
        <Grid item md={3}>
          <Button variant="contained" color="primary" onClick={handleLookup}>
            Lookup
          </Button>
        </Grid>
        <Grid item md={12}>
          <Alert severity="info">{state.teamMemberLookup.message}</Alert>
        </Grid>

        <Grid item md={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Actions</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Member Id</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamMembers.map((teamMember) => (
                  <TableRow key={teamMember._id}>
                    <TableCell>
                      <IconButton color="primary" aria-label="Edit" component="span" onClick={() => handleEdit(teamMember._id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="primary" aria-label="Edit" component="span" onClick={() => handleDelete(teamMember._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{teamMember.role}</TableCell>
                    <TableCell>{teamMember.lastName}</TableCell>
                    <TableCell>{teamMember.firstName}</TableCell>
                    <TableCell>{teamMember.memberId}</TableCell>
                    <TableCell>{teamMember.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default TeamMemberManager

