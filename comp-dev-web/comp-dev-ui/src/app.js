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
import TeamMemberPage from "./pages/team-member-page"
import TeamMemberUpdatePage from "./pages/team-member-update-page"

export default function App() {
  return (
    <Router>
      <div>
        <NavBar title="Component Development" />
      </div>
      <div>
        <Switch>
          <Route path="/team-member-page">
            <TeamMemberPage />
          </Route>
          <Route path="/team-member-update-page">
            <TeamMemberUpdatePage />
          </Route>
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
