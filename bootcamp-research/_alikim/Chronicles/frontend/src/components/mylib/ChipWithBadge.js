import React from 'react'
import Badge from '@material-ui/core/Badge'


export default function ChipWithBadge({ badgeContent, badgeColor, item, itemType }) {
  return (
    <li key={item.id} className="chip-con hvr">

      <section className="hvr-info">
        <h4>{item.title} <i><small>({itemType})</small></i></h4>
        <p>{item.description}</p>
      </section>

      <Badge badgeContent={badgeContent} color={badgeColor} >
        {item.image &&
          <div className="chip" style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover" }}></div>
        }
        {!item.image &&
          <div className="chip">

            <i className={`fas fa-2x fa-${item.icon} lo-center`} style={{ position: "absolute", color: item.color }}></i>
          </div>
        }
      </Badge>
    </li >
  )
}