import { Link } from "gatsby"
import React from "react"
import {
  button
} from "../styles/button.module.styl"

export default function Button({ id, icon, src, text, propClasses, type }) {

  let linkEl = null
  if (!type) {
    // default external bound link
    linkEl = (
      <a href={src} target="_blank">
        {icon}
        <span>{text}</span>
      </a>
    )
  } else if (type === "internal") {
    linkEl = (
      <Link to={src}>
        {icon}
        <span>{text}</span>
      </Link>
    )
  }

  return (
    <div className={[propClasses, button].join(' ')}>
      {linkEl}
    </div>
  )
}