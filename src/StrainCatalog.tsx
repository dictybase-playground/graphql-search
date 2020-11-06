import React from "react"
import { useLazyQuery } from "@apollo/client"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import StrainCatalogList from "./StrainCatalogList"
import useSearchQuery from "./hooks/useSearchQuery"
import { GET_STRAIN_LIST, GET_BACTERIAL_STRAIN_LIST } from "./graphql/queries"

const useStyles = makeStyles({
  form: {
    marginBottom: "20px",
  },
})

const StrainCatalog = () => {
  const query = useSearchQuery()
  const params = query.get("search")
  const [shownData, setShownData] = React.useState<any>(null)
  const [getStrains, strainResult] = useLazyQuery(GET_STRAIN_LIST, {
    onCompleted: (data) => {
      setShownData(data)
    },
    onError: (error) => console.log(error),
  })
  const [getBacterialStrains, bacterialResult] = useLazyQuery(
    GET_BACTERIAL_STRAIN_LIST,
    {
      onCompleted: (data) => {
        const mergedData = {
          listStrainsWithAnnotation: {
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
        setShownData(mergedData)
      },
      onError: (error) => console.log(error),
    },
  )
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
    switch (searchTerm) {
      case "all":
        getStrains({ variables: { cursor: 0, limit: 10, filter: "" } })
        break
      case "bacterial":
        getBacterialStrains()
        break
      default:
        console.log("not a search term")
    }
  }, [
    getStrains,
    getBacterialStrains,
    setShownData,
    searchTerm,
    shownData,
    bacterialResult.data,
    strainResult.data,
  ])

  let strains = []
  if (shownData && shownData.listStrains) {
    strains = shownData.listStrains.strains
  }
  if (shownData && shownData.listStrainsWithAnnotation) {
    strains = shownData.listStrainsWithAnnotation.strains
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
      <div>
        <StrainCatalogList data={strains} />
      </div>
    </div>
  )
}

export default StrainCatalog
