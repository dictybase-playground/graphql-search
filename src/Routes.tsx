import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import StrainCatalog from "./StrainCatalog"

const Routes = () => {
  return (
    <Switch>
      <Route path="/strains" component={StrainCatalog} />
      <Redirect to="/strains?search=all" />
    </Switch>
  )
}

export default Routes
