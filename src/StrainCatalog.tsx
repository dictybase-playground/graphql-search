import React from "react"
import { useApolloClient } from "@apollo/client"
import Dropdown from "./Dropdown"
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

const StrainCatalog = () => {
  const query = useSearchQuery()
  const params = query.get("search")
  const client = useApolloClient()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [shownData, setShownData] = React.useState<any>(null)
  const [searchTerm, setSearchTerm] = React.useState(params)

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
          const normalizedData = normalizeBacterialStrainsData(
            bacterialStrainData,
          )
          setShownData(normalizedData)
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
      <Dropdown searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>search query is {searchTerm}</div>
      <div>{content}</div>
    </div>
  )
}

export default StrainCatalog
