import React from "react"
import { ApolloProvider } from "@apollo/client"
import { BrowserRouter, Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Routes from "./Routes"
import useApolloClient from "./hooks/useApolloClient"

const useStyles = makeStyles({
  container: {
    paddingTop: "20px",
    "& a": {
      paddingRight: "15px",
    },
  },
  navbar: {
    marginBottom: "20px",
  },
})

const App = () => {
  const apolloClient = useApolloClient()
  const classes = useStyles()

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Container maxWidth="md" className={classes.container}>
          <Routes />
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
