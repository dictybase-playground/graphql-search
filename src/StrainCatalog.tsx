import React from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import Dropdown from "./Dropdown"
import StrainCatalogList from "./StrainCatalogList"
import useSearchQuery from "./hooks/useSearchQuery"
import { GET_STRAIN_LIST, GET_BACTERIAL_STRAIN_LIST } from "./graphql/queries"

const StrainCatalog = () => {
  const query = useSearchQuery()
  const searchTerm = query.get("search")
  const { loading, error, data } = useQuery(GET_STRAIN_LIST, {
    variables: {
      cursor: 0,
      limit: 10,
      filter: "",
    },
  })
  const [getStrains, strainResult] = useLazyQuery(GET_STRAIN_LIST)
  const [getStrainList, bacterialResult] = useLazyQuery(
    GET_BACTERIAL_STRAIN_LIST,
  )

  React.useEffect(() => {
    console.log("render", searchTerm)
  }, [searchTerm])

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>got error :(</div>
  }

  let strains = []
  if (data && data.listStrains) {
    strains = data.listStrains.strains
  }
  if (data && data.listStrainsWithAnnotation) {
    strains = data.listStrainsWithAnnotation.strains
  }

  return (
    <div>
      <Dropdown />
      <div>search query is {searchTerm}</div>
      <div>
        <StrainCatalogList data={strains} />
      </div>
    </div>
  )
}

export default StrainCatalog
