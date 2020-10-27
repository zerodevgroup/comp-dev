import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import TeamSelector from "../components/team-selector"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8)
  }
}));

export default function SystemPage() {
  const classes = useStyles();

  return (
    <Container className={classes.paper} fixed>
      <Typography variant="h6">
        {"System"}
      </Typography>
      <TeamSelector />
    </Container>
  );
}
