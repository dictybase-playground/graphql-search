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
  items: Array<{
    name: string
    value: string
  }>
}

const Dropdown = ({ searchTerm, setSearchTerm, items }: Props) => {
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
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default Dropdown
