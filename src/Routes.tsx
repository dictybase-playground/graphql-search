import React from "react"
import { Switch, Route } from "react-router-dom"
import StrainCatalog from "./StrainCatalog"

const Routes = () => {
  return (
    <Switch>
      <Route path="/strains" component={StrainCatalog} />
    </Switch>
  )
}

export default Routes
