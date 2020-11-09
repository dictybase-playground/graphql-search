import React from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles({
  form: {
    marginBottom: "20px",
  },
})

type Props = {
  searchTerm: string | null
  setSearchTerm: (arg0: string) => void
}

const Dropdown = ({ searchTerm, setSearchTerm }: Props) => {
  const classes = useStyles()
  const history = useHistory()

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    history.push(`/strains?search=${event.target.value}`)
    setSearchTerm(event.target.value)
  }

  return (
    <FormControl className={classes.form}>
      <Select native value={searchTerm} onChange={handleChange}>
        <option value="all">All</option>
        <option value="bacterial">Bacterial Strains</option>
      </Select>
    </FormControl>
  )
}

export default Dropdown
