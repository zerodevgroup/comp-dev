import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import TeamMemberManager from "../components/team-member-manager"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8)
  }
}));

export default function TeamMemberPage() {
  const classes = useStyles();

  return (
    <Container className={classes.paper} fixed>
      <TeamMemberManager />
    </Container>
  );
}
