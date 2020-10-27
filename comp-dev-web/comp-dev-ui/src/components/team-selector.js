import React, { useContext, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"

import AddCircleIcon from "@material-ui/icons/AddCircle"
import Button from "@material-ui/core/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import SearchIcon from "@material-ui/icons/Search"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Select"


import { StoreContext } from "../context/store-context"

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 860,
    minWidth: 360,
  },
  formControl: {
    margin: 2,
    minWidth: 120
  },
  paper: {
    padding: 2,
    textAlign: "center",
    width: "100%",
    minWidth: 120,
    maxWidth: 860,
  },
  title: {
    fontWeight: "bold",
    fontSize: "28px",
  },
}))

const SearchDialog = (props) => {
  const { state, dispatch, actions } = useContext(StoreContext)
  const { onClose, open } = props
  const [teamMemberListLoaded, setteamMemberListLoaded] = useState(false)

  const classes = useStyles()

  /*
  useEffect(() => {
    async function fetchData() {
      setSystemLoaded(true)
      await actions.systemRetrieve()
    }
    if(!systemLoaded) {
      fetchData()
    }
  }, []); // Or [] if effect doesn't need props or state
  */

  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = async(event, teamMember) => {
    console.log(teamMember)
    onClose()
  }

  const handleChange = (event) => {
    let name = event.target.name ? event.target.name : event.target.id
    let value = event.target.value

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
    // await getTeamMembers()
    actions.teamMemberListRetrieve()

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

  return(
    <React.Fragment>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="search-dialog-title"
        aria-describedby="search-dialog-description"
      >
        <DialogTitle id="search-dialog-title">{"Search Team Members"}</DialogTitle>
        <DialogContent>
          <TextField id="searchValue" value={state.teamMemberLookup.searchValue} label="Search Value" variant="outlined" fullWidth onChange={handleChange} onKeyPress={handleEnter}/>
          <List component="nav" className={classes.root} aria-label="search">
            {state.teamMemberList.map((teamMember, index) => (
              <ListItem button onClick={(event) => { handleListItemClick(event, teamMember)}}>
                <Paper className={classes.paper}>
                  <Grid container>
                    <Grid item xs={2}>
                      <Typography className={classes.title}>
                        {teamMember.memberId ? teamMember.memberId.toUpperCase() : ""}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography>
                        {teamMember.firstName} {teamMember.lastName}
                      </Typography>
                      <Typography>
                        {teamMember.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                  </Grid>
                </Paper>
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

const TeamSelector = (props) => {
  const { state, dispatch, actions } = useContext(StoreContext)
  const [open, setOpen] = React.useState(false)
  const [systemLoaded, setSystemLoaded] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    async function fetchData() {
      setSystemLoaded(true)
      await actions.systemRetrieve()
    }
    if(!systemLoaded) {
      fetchData()
    }
  }, [])


  const handleChange = (event, selectedTeamMember) => {
    let role = event.target.value


    let systemData = { ...state.system }

    systemData.teamMembers.forEach((teamMember) => {
      if(teamMember.memberId == selectedTeamMember.memberId) {
        teamMember.role = role
      }
    })

    actions.systemUpdate(systemData)
  }

  const handleSearchOpen = (_id) => {
    console.log(_id)
    setOpen(true)
  }

  const handleSearchClose = () => {
    setOpen(false)
  }

  /*
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }
  */

  return (
    <React.Fragment>
      <SearchDialog open={open} onClose={handleSearchClose} />
      <List component="nav" className={classes.root} aria-label="team-members">
        {state.system.teamMembers.map((teamMember, index) => (
          <ListItem key={teamMember.memberId}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={2}>
                  <Button component="span" onClick={handleSearchOpen}><SearchIcon /></Button>
                </Grid>
                <Grid item xs={2}>
                  <div className={classes.title}>
                    {teamMember.memberId ? teamMember.memberId.toUpperCase() : ""}
                  </div>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId={`role-label-${index}`}
                      id={`role-${index}`}
                      value={teamMember.role}
                      onChange={(event) => { handleChange(event, teamMember)}}
                    >
                      <MenuItem value="Application Architect">Application Architect</MenuItem>
                      <MenuItem value="Manager/SME">Manager/SME</MenuItem>
                      <MenuItem value="Domain Lead">Domain Lead</MenuItem>
                      <MenuItem value="Enterprise Architect">Enterprise Architect</MenuItem>
                      <MenuItem value="Developer">Developer</MenuItem>
                      <MenuItem value="SME">SME</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <div>
                    {teamMember.firstName} {teamMember.lastName}
                  </div>
                  <div>
                    {teamMember.email}
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <Button component="span" onClick={handleSearchClose}><DeleteIcon /></Button>
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
        ))}
      </List>
      <Button component="span"><AddCircleIcon /></Button>
    </React.Fragment>
  )
}

export default TeamSelector

