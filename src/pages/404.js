import { Link } from "gatsby"
import * as React from "react"
// import { Link } from "gatsby"
import Layout from "../components/layout"

const NotFoundPage = () => {
  return (
    <Layout type='home'>
      <div>you've hit the mysterious 404! <Link to="/">return home here</Link>.</div>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
