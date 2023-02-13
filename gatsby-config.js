/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteUrl: `http://www.vincentli.space/`,
  },
  plugins: [
    `gatsby-plugin-stylus`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Vincent Li's Space`,
        short_name: `Vincent's Space`,
        start_url: `/`,
        background_color: `#F2F2F2`,
        theme_color: `#FFC738`,
        display: `browser`,
        icon: `static/favicon/enso.svg`
      }

    },
  ],
}
