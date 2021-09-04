import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChipWithBadge from '../../mylib/ChipWithBadge'

export default function EntityAssets({ entity }) {
  const assets = useSelector(state => state.assets)

  return (
    <section>
      <h3>Assets</h3>
      <ul style={{ display: "flex" }}>
        {entity.assets.map((a) => (
          <ChipWithBadge
            badgeContent={a[1]}
            itemType="asset"
            item={assets[a[0]]}
            badgeColor="primary"
          />
        ))}
      </ul>
    </section>
  )
}
