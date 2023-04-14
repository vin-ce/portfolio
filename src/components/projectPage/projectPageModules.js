import React, { useState } from "react"
import { InView } from 'react-intersection-observer';

import VideoPlayer from "../videoPlayer";

import {
  sectionDividerContainer,
  inViewEl,

  spread,
  spreadContained,
  halfHalfSpread,
  halfHalfContained,
  halfHalfOverflow,

  trio,
  trioSpread,

  bigOverflow,
  bigContained,
  noneBig,
  smallBig,

  text,
  essay,

  aboveDescriptionBox,
  contentContainer,
  content,
  video,
  image,
  col1,
  col2,
  row,



} from "../../styles/projectPageModules.module.styl"




export function SectionDivider({ sectionIndex, onSectionInView }) {

  const handleSectionInViewChange = (inView) => {
    if (inView) onSectionInView(sectionIndex)
  }

  return (
    <div className={sectionDividerContainer}>
      <InView className={inViewEl} as="div" onChange={handleSectionInViewChange} threshold={1} />
    </div>
  )

}

export function Spread({ humanIndex, data }) {
  return (
    <div id={`section_${humanIndex}`} className={[spread, aboveDescriptionBox].join(' ')} >
      <div className={image}>
        <img src={data.materials[0].src} />
      </div>
    </div>
  )
}


export function SpreadContained({ humanIndex, data }) {

  const [el, setEl] = useState(null)
  if (!el) {
    switch (data.materials[0].type) {
      case "video": {
        setEl(
          <div className={video}>
            <VideoPlayer
              id={`section-${humanIndex}_video`}
              src={data.materials[0].src}
              type="full"
              hasSound={data.materials[0].hasSound}
            />
          </div>
        )
        break
      }

      case "image": {
        setEl(
          <div className={image}>
            <img src={data.materials[0].src} />
          </div>
        )
        break
      }

    }
  }

  return (
    <div id={`section_${humanIndex}`} className={[spreadContained, aboveDescriptionBox].join(' ')} >
      {el}
    </div>
  )
}



export function HalfHalfSpread({ humanIndex, data }) {

  const [el, setEl] = useState(null)

  const numOfRows = Math.ceil(data.materials.length / 2)

  if (!el) {

    const tempEl = []

    for (let i = 0; i < numOfRows; i++) {

      const tempRow = []

      for (let j = 0; j < 2; j++) {
        const materialIndex = i * 2 + j
        const materialData = data.materials[materialIndex]

        if (!materialData) {
          // inserts blank ones to fill bottom row
          tempRow.push(
            <div key={`section-${humanIndex}_video-${materialIndex}`} className={content} />
          )
          continue
        }

        if (materialData.type === "video") {
          tempRow.push(
            <React.Fragment key={`section-${humanIndex}_video-${materialIndex}`} >
              <VideoPlayer
                propsClasses={[content, video].join(' ')}
                id={`section-${humanIndex}_video-${materialIndex}`}
                src={materialData.src}
                type="full"
                isAutoplay={materialData.autoplay}
              />
            </React.Fragment>
          )
        } else if (materialData.type === "image") {
          tempRow.push(
            <div key={`section-${humanIndex}_video-${materialIndex}`} className={content} >
              <img src={materialData.src} />
            </div>
          )
        }
      }

      tempEl.push(
        <div key={`section-${humanIndex}_row-${i}`} className={row}>
          {tempRow}
        </div>
      )

    }

    setEl(tempEl)

  }

  return (
    <div id={`section_${humanIndex}`} className={[halfHalfSpread, aboveDescriptionBox].join(' ')} >

      {el}

    </div>
  )

}



export function HalfHalfContained({ humanIndex, data }) {

  return (
    <div id={`section_${humanIndex}`} className={halfHalfContained} >

      <div className={contentContainer}>
        <div className={content}>
          <img src={data.materials[0].src} />

        </div>
        <div className={content}>
          <img src={data.materials[1].src} />
        </div>
      </div>

      <div className="rightCol" />

    </div>
  )
}


export function HalfHalfOverflow({ humanIndex, data }) {

  return (
    <div id={`section_${humanIndex}`} className={halfHalfOverflow} >

      <div className={contentContainer}>

        <div className={content}>
          <img src={data.materials[0].src} />
        </div>

        <div className={content}>
          <img src={data.materials[1].src} />
        </div>

      </div>

      <div className="rightCol" />

    </div>
  )
}




export function Trio({ humanIndex, data }) {

  return (
    <div id={`section_${humanIndex}`} className={trio} >

      <div className={contentContainer}>
        <span className={content}>
          <img src={data.materials[0].src} />
        </span>
        <span className={content}>
          <img src={data.materials[1].src} />
        </span>
        <span className={content}>
          <img src={data.materials[2].src} />
        </span>
      </div>

      <div className="rightCol" />

    </div>
  )
}



export function TrioSpread({ humanIndex, data }) {

  const [el, setEl] = useState(null)

  const numOfRows = Math.ceil(data.materials.length / 2)

  if (!el) {

    const tempEl = []

    for (let i = 0; i < numOfRows; i++) {

      const tempRow = []

      // 3 pieces per row
      const NUM_PER_ROW = 3

      for (let j = 0; j < NUM_PER_ROW; j++) {
        const materialIndex = i * NUM_PER_ROW + j
        const materialData = data.materials[materialIndex]

        if (!materialData) {
          // inserts blank ones to fill bottom row
          tempRow.push(
            <div key={`section-${humanIndex}_video-${materialIndex}`} className={content} />
          )
          continue
        }

        if (materialData.type === "video") {
          tempRow.push(
            <React.Fragment key={`section-${humanIndex}_video-${materialIndex}`} >
              <VideoPlayer
                propsClasses={[content, video].join(' ')}
                id={`section-${humanIndex}_video-${materialIndex}`}
                src={materialData.src}
                type="full"
                isAutoplay={materialData.autoplay}
                noHeight={true}
              />
            </React.Fragment>
          )
        } else if (materialData.type === "image") {
          tempRow.push(
            <div key={`section-${humanIndex}_video-${materialIndex}`} className={content} >
              <img src={materialData.src} />
            </div>
          )
        }
      }

      tempEl.push(
        <div key={`section-${humanIndex}_row-${i}`} className={row}>
          {tempRow}
        </div>
      )

    }

    setEl(tempEl)

  }

  return (
    <div id={`section_${humanIndex}`} className={[trioSpread, aboveDescriptionBox].join(' ')} >

      {el}

    </div>
  )

}




export function BigOverflow({ humanIndex, data }) {

  const [el, setEl] = useState(null)
  if (!el) {
    const tempEl = []

    data.materials.forEach((material, index) => {

      if (material.type === "image") {
        tempEl.push(
          <img key={`section-${humanIndex}_material-${index}`} src={material.src} />
        )

      } else if (material.type === "video") {

        tempEl.push(
          <React.Fragment key={`section-${humanIndex}_video-${index}`} >
            <VideoPlayer
              propsClasses={content}
              id={`section-${humanIndex}_video-${index}`}
              src={material.src}
              type="full"
              isAutoplay={material.autoplay}
            />
          </React.Fragment>
        )
      }

    })

    setEl(tempEl)

  }

  return (
    <div id={`section_${humanIndex}`} className={bigOverflow} >

      <div className={contentContainer}>
        {el}
      </div>

      <div className="rightCol" />

    </div>
  )
}




export function BigContained({ humanIndex, data }) {

  const [el, setEl] = useState(null)
  if (!el) {
    const tempEl = []

    data.materials.forEach((material, index) => {

      if (material.type === "image") {
        tempEl.push(
          <img key={`section-${humanIndex}_material-${index}`} src={material.src} />
        )
      } else if (material.type === "video") {

        tempEl.push(
          <React.Fragment key={`section-${humanIndex}_video-${index}`} >
            <VideoPlayer
              propsClasses={content}
              id={`section-${humanIndex}_video-${index}`}
              src={material.src}
              type="full"
              isAutoplay={material.autoplay}
              hasSound={material.hasSound}
            />
          </React.Fragment>
        )
      }

    })

    setEl(tempEl)

  }

  return (
    <div id={`section_${humanIndex}`} className={bigContained} >

      <div className={contentContainer}>
        {el}
      </div>

      <div className="rightCol" />

    </div>
  )
}


export function NoneBig({ humanIndex, data }) {

  return (
    <div id={`section_${humanIndex}`} className={noneBig} >

      <div className={contentContainer}>
        <div className={col1} />
        <div className={col2}>
          <img src={data.materials[0].src} />
        </div>
      </div>

      <div className="rightCol" />

    </div>
  )
}

export function SmallBig({ humanIndex, data }) {

  return (
    <div id={`section_${humanIndex}`} className={smallBig} >

      <div className={contentContainer}>
        <div className={col1}>
          <img src={data.materials[0].src} />
        </div>
        <div className={col2}>
          <img src={data.materials[1].src} />
        </div>
      </div>

      <div className="rightCol" />

    </div>
  )
}

export function Text({ humanIndex, data }) {

  const [el, setEl] = useState(null)

  if (!el) {

    const tempEl = []

    data.materials.forEach((material, index) => {

      switch (material.type) {
        case "default": {
          tempEl.push(
            <div key={`section-${humanIndex}_text-${index}`} dangerouslySetInnerHTML={createMarkup(material.text)} />
          )
          break
        }

        case "essay": {
          tempEl.push(
            <div key={`section-${humanIndex}_text-${index}`} className={essay} dangerouslySetInnerHTML={createMarkup(material.text)} />
          )
          break
        }

        case "numberedList": {
          const tempListEl = []

          material.items.forEach((item, i) => {
            tempListEl.push(
              <li key={`section-${humanIndex}_text-${index}_item-${i}`} dangerouslySetInnerHTML={createMarkup(item)} />
            )
          })


          tempEl.push(
            <ol key={`section-${humanIndex}_text-${index}`}>
              {tempListEl}
            </ol>
          )

          break
        }

        case "bulletList": {
          const tempListEl = []

          material.items.forEach((item, i) => {
            tempListEl.push(
              <li key={`section-${humanIndex}_text-${index}_item-${i}`} dangerouslySetInnerHTML={createMarkup(item)} />
            )
          })

          tempEl.push(
            <ul key={`section-${humanIndex}_text-${index}`}>
              {tempListEl}
            </ul>
          )
          break
        }
      }
    })

    setEl(tempEl)


  }


  return (
    <div id={`section_${humanIndex}`} className={text} >

      <div className={contentContainer}>
        {el}
        {/* <div className={col1}>
        </div>
        <div className={col2}>
        </div> */}
      </div>

      <div className="rightCol" />

    </div>
  )
}


// =================
// HELPER FUNCS

function createMarkup(text) {
  return { __html: text };
}


export function generateProjectSections(data, onSectionInView) {

  const projectSections = []

  data.forEach((sectionData, i) => {
    // skip first section, which is the top module
    if (i === 0) return

    // this is what is referred to in curSectionIndex
    const humanIndex = i + 1

    // https://stackoverflow.com/questions/37947145/in-react-how-to-add-key-prop-to-element-passed-as-object
    // React.Fragment is used to add key without needing to wrap it with a span or something
    projectSections.push(
      <React.Fragment key={`section-divider_${humanIndex}`}>
        <SectionDivider sectionIndex={humanIndex} onSectionInView={onSectionInView} />
      </React.Fragment>
    )

    switch (sectionData.type) {
      case "spread": {

        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <Spread humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "spreadContained": {

        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <SpreadContained humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "halfHalfSpread": {

        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <HalfHalfSpread humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "halfHalfContained": {

        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <HalfHalfContained humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "halfHalfOverflow": {

        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <HalfHalfOverflow humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "trio": {
        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <Trio humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "trioSpread": {
        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <TrioSpread humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "bigOverflow": {
        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <BigOverflow humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "bigContained": {
        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <BigContained humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "noneBig": {
        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <NoneBig humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "smallBig": {
        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <SmallBig humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }

      case "text": {

        projectSections.push(
          <React.Fragment key={`section-${humanIndex}`}>
            <Text humanIndex={humanIndex} data={sectionData} />
          </React.Fragment>
        )
        break
      }
    }

  })

  return projectSections
}