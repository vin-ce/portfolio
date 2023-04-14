Built in Gatsby

Amazon S3 to store images, Vimeo to store video

YAML files in src/assets/data:
- homeData.yaml 
  - Subtitles
  - Intro text
  - Which projects are shown and in what order. Changes based on URL parameters

- presentationURLs.yaml + pages/present.js
  - Pushes `links` into browser history, presentation is navigated project to project by browser forward / back buttons

- projectsData.yaml, holds the data that goes on 
  - home page carousel modules (components/homeProjectModule.js)
  - project pages (components/projectPage.js)
    - project page sections are generated in components/projectPage/projectPageModules.js
    - each section's specific layout is determined by its "type" (e.g `bigContained`), and that maps to a particular component in projectPageModules.js

The Doodle Pad sends mail by backend via api/sendEmail.js - this is enabled by Netlify Functions, which can run backend Node code. 

