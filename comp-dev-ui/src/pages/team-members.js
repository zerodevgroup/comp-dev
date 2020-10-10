import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import TeamMemberManager from "../components/team-member-manager"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export default function TeamMembers() {
  const classes = useStyles();

  return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Team Members
          <TeamMemberManager />
        </Typography>
      </div>
  );
}
