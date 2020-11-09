import React from "react"

const StrainCatalogList = ({ data }: any) => {
  return (
    <div>
      {data.map((item: any) => (
        <p key={item.id}>{item.id}</p>
      ))}
    </div>
  )
}

export default StrainCatalogList
