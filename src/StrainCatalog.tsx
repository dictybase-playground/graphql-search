import React from "react"
import { useQuery } from "@apollo/client"
import Dropdown from "./Dropdown"
import useSearchQuery from "./hooks/useSearchQuery"
import { GET_STRAIN_LIST } from "./graphql/queries"

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

  React.useEffect(() => {
    console.log("render", searchTerm)
  }, [searchTerm])

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>got error :(</div>
  }

  return (
    <div>
      <Dropdown />
      <div>search query is {searchTerm}</div>
      <div>
        {data.listStrains.strains.map((item: any) => (
          <p key={item.id}>{item.id}</p>
        ))}
      </div>
    </div>
  )
}

export default StrainCatalog
