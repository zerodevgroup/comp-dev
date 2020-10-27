import React, { useContext, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"

import AddCircleIcon from "@material-ui/icons/AddCircle"
import Button from "@material-ui/core/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import Select from "@material-ui/core/Select"
import Typography from "@material-ui/core/Select"

import TeamSearchDialog from "./team-search-dialog"

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
      if(teamMember.memberId === selectedTeamMember.memberId) {
        teamMember.role = role
      }
    })

    actions.systemUpdate(systemData)
  }

  const handleDelete = (event, selectedTeamMember) => {
    let systemData = { ...state.system }

    let updatedTeamMembers = []
    systemData.teamMembers.forEach((teamMember) => {
      if(!(teamMember.memberId === selectedTeamMember.memberId)) {
        updatedTeamMembers.push(teamMember)
      }
    })

    systemData.teamMembers = updatedTeamMembers

    actions.systemUpdate(systemData)
  }

  const handleSearchOpen = (_id) => {
    console.log(_id)
    setOpen(true)
  }

  const handleSearchClose = () => {
    setOpen(false)
  }

  const handleListItemClick = async(event, selectedTeamMember) => {
    console.log(selectedTeamMember)
    let systemData = { ...state.system }

    systemData.teamMembers.push(selectedTeamMember)

    actions.systemUpdate(systemData)

    setOpen(false)
  }

  return(
    <React.Fragment>
      <TeamSearchDialog open={open} onClose={handleSearchClose} handleListItemClick={handleListItemClick} />
      <List component="nav" className={classes.root} aria-label="team-members">
        {state.system.teamMembers.map((teamMember, index) => (
          <ListItem key={teamMember.memberId}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={5}>
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
                  <Button component="span" onClick={(event) => { handleDelete(event, teamMember)}}><DeleteIcon /></Button>
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
        ))}
      </List>
      <Button component="span" onClick={handleSearchOpen}><AddCircleIcon /></Button>
    </React.Fragment>
  )
}

export default TeamSelector

