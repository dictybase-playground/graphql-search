import React from "react"
import { useApolloClient } from "@apollo/client"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import StrainCatalogList from "./StrainCatalogList"
import useSearchQuery from "./hooks/useSearchQuery"
import { GET_STRAIN_LIST, GET_BACTERIAL_STRAIN_LIST } from "./graphql/queries"

const normalizeBacterialStrainsData = (data: any) => {
  return {
    listStrains: {
      __typename: data.bacterialFoodSource.__typename,
      nextCursor: 0,
      totalCount:
        data.bacterialFoodSource.totalCount +
        data.symbioticFarmerBacterium.totalCount,
      strains: [
        ...data.bacterialFoodSource.strains,
        ...data.symbioticFarmerBacterium.strains,
      ],
    },
  }
}

const useStyles = makeStyles({
  form: {
    marginBottom: "20px",
  },
})

const StrainCatalog = () => {
  const query = useSearchQuery()
  const params = query.get("search")
  const client = useApolloClient()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [shownData, setShownData] = React.useState<any>(null)
  const classes = useStyles()
  const history = useHistory()
  const [searchTerm, setSearchTerm] = React.useState(params)

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    history.push(`/strains?search=${event.target.value}`)
    setSearchTerm(event.target.value)
  }

  React.useEffect(() => {
    const updateData = async () => {
      switch (searchTerm) {
        case "all":
          setLoading(true)
          const {
            data: listStrainData,
            error: listStrainError,
          } = await client.query({
            query: GET_STRAIN_LIST,
            variables: { cursor: 0, limit: 10, filter: "" },
          })
          setShownData(listStrainData)
          setLoading(false)
          setError(listStrainError)
          break
        case "bacterial":
          setLoading(true)
          const {
            data: bacterialStrainData,
            error: bacterialStrainError,
          } = await client.query({
            query: GET_BACTERIAL_STRAIN_LIST,
          })
          const mergedData = normalizeBacterialStrainsData(bacterialStrainData)
          setShownData(mergedData)
          setLoading(false)
          setError(bacterialStrainError)
          break
        default:
          console.log("not a search term")
      }
    }

    updateData()
  }, [client, searchTerm])

  let content = <div />
  if (loading) {
    content = <div>loading...</div>
  }
  if (error) {
    content = <div>got an error :(</div>
  }
  if (shownData) {
    content = <StrainCatalogList data={shownData.listStrains.strains} />
  }

  return (
    <div>
      <FormControl className={classes.form}>
        <Select native value={searchTerm} onChange={handleChange}>
          <option value="all">All</option>
          <option value="bacterial">Bacterial Strains</option>
        </Select>
      </FormControl>
      <div>search query is {searchTerm}</div>
      <div>{content}</div>
    </div>
  )
}

export default StrainCatalog
