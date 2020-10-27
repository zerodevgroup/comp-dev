import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Paper from "@material-ui/core/Paper"
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

const TeamSearchDialog = (props) => {
  const { state, actions } = useContext(StoreContext)
  const { onClose, open, handleListItemClick } = props

  const classes = useStyles()

  const handleClose = () => {
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
                      <div className={classes.title}>
                        {teamMember.memberId ? teamMember.memberId.toUpperCase() : ""}
                      </div>
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

export default TeamSearchDialog

