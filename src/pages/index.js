import * as React from "react"

import Layout from "../components/layout"
import Home from "../components/home";
import MobileHome from "../components/mobile/mobileHome";

const Index = ({ location }) => {

  const [homeEl, setHomeEl] = React.useState(false)


  React.useEffect(() => {

    const isBrowser = () => typeof window !== "undefined"

    if (isBrowser && !homeEl) {
      if (window.innerWidth < 1200) {
        setHomeEl(
          <MobileHome />
        )
      } else {
        setHomeEl(
          <Home location={location} />
        )
      }
    }

  }, [])



  return (
    <Layout type="home">
      {homeEl}
    </Layout>
  )
}


export default Index

export const Head = () => (
  <>
    <title>Vincent Li ✨</title>
  </>
)