import React from "react"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import "./app.css"

// Components
import NavBar from "./components/nav-bar"

// Pages
import About from "./pages/about"
// import TeamMemberPage from "./pages/team-member-page"
// import TeamMemberUpdatePage from "./pages/team-member-update-page"
// import TeamMemberCreatePage from "./pages/team-member-create-page"
import SystemPage from "./pages/system-page"
// import SystemUpdatePage from "./pages/system-update-page"
// import SystemCreatePage from "./pages/system-create-page"

export default function App() {
  return (
    <Router>
      <div>
        <NavBar title="Component Development" />
      </div>
      <div>
        <Switch>
          {/*
          <Route path="/team-member-page">
            <TeamMemberPage />
          </Route>
          <Route path="/team-member-create-page">
            <TeamMemberCreatePage />
          </Route>
          <Route path="/team-member-update-page">
            <TeamMemberUpdatePage />
          </Route>
          */}
          <Route path="/system-page">
            <SystemPage />
          </Route>
          {/*
          <Route path="/system-create-page">
            <SystemCreatePage />
          </Route>
          <Route path="/system-update-page">
            <SystemUpdatePage />
          </Route>
          */}
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
