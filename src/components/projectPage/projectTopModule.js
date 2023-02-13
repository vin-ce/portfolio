import * as React from "react"
import {
  container,
  tableContainer,
  tableRow,
  tableCell,
  cellTitle,

  name,
  subtitle,

  type,
  tools,
  year,
  task,
  idea,

  col1,
  col2,
  col3,

} from "../../styles/projectTopModule.module.styl"

import Button from "../button"
import HomeIcon from "../../assets/icons/HomeIcon.svg"
import WatchIcon from "../../assets/icons/PlayIcon.svg"
import VisitIcon from "../../assets/icons/VisitIcon.svg"

export default function ProjectTopModule({ data, projectSectionData, mode }) {

  const [toolsEl, setToolsEl] = React.useState(null)
  const [topMaterialEl, setTopMaterialEl] = React.useState(null)
  const [buttonsEl, setButtonsEl] = React.useState(null)



  // TOOLS LIST
  if (!toolsEl) {
    const tempToolsEl = []
    data.tools.forEach((tool, i) => {
      tempToolsEl.push(
        <span key={`topModule_tool_${i}`}>
          {tool}
        </span>
      )
    })

    setToolsEl(tempToolsEl)
  }

  // TOP MATERIAL
  // top material is image / gif etc in the 3rd column
  if (!topMaterialEl) {
    const topMaterialData = projectSectionData[0].materials[0]
    if (topMaterialData.type === "image") {
      setTopMaterialEl(
        <img src={topMaterialData.src} />
      )
    }
  }

  // =============
  // BUTTONS

  if (!buttonsEl) {
    const tempButtonsEl = []

    data.buttons.forEach((button, index) => {
      if (button.icon === "MoreIcon") return

      if (button.icon === "VisitIcon") {

        tempButtonsEl.push(
          <React.Fragment key={`section-1_button-${index}`}>
            <Button icon={<VisitIcon />} src={button.src} text={button.text} />
          </React.Fragment>
        )
      } else if (button.icon === "WatchIcon") {
        tempButtonsEl.push(
          <React.Fragment key={`section-1_button-${index}`}>
            <Button icon={<WatchIcon />} src={button.src} text={button.text} />
          </React.Fragment>
        )
      }
    })

    if (mode !== "presentation") {
      // all projects have a return home icon, unless if in presentation mode
      tempButtonsEl.push(
        <React.Fragment key={`section-1_button-home`}>
          <Button icon={<HomeIcon />} src={"/"} text="Return Home" type="internal" />
        </React.Fragment>
      )
    }

    setButtonsEl(tempButtonsEl)
  }



  // ========
  // DOM



  return (
    <div id={"section_1"} className={['rowContainer', container].join(' ')}>

      <div className={col1}>
        <div className={name}>{data.name}</div>
        <div className={subtitle}>{data.subtitle}</div>

        {buttonsEl}
      </div>

      <div className={col2}>

        {/* TABLE */}
        <div className={tableContainer}>

          {/* TOP ROW */}
          <div className={tableRow}>
            {/* TYPE */}
            <div className={[tableCell, type].join(' ')}>
              <span className={cellTitle}>Type</span>
              <span>{data.type}</span>
            </div>
            {/* TOOLS */}
            <div className={[tableCell, tools].join(' ')}>
              <span className={cellTitle}>Tools</span>
              {toolsEl}
            </div>
            {/* YEAR */}
            <div className={[tableCell, year].join(' ')}>
              <span className={cellTitle}>Year</span>
              {data.dateAndPlace}
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className={tableRow}>
            {/* TASK */}
            <div className={[tableCell, task].join(' ')}>
              <span className={cellTitle}>Task</span>
              {data.task}
            </div>
            {/* IDEA */}
            <div className={[tableCell, idea].join(' ')}>
              <span className={cellTitle}>Idea</span>
              {data.idea}
            </div>
          </div>
        </div>
      </div>

      {/* MATERIAL - image, video etc */}
      <div className={col3}>
        {topMaterialEl}
      </div>


      <div className={'rightCol'}>
        {/* empty - description module is in main project page */}
      </div>
    </div>
  )
}


// ======================
// ALTERNATE LAYOUTS

// const threeColLayout = (
//   <React.Fragment>

//     <div className={col1}>
//       <div className={name}>{data.name}</div>
//       <div className={subtitle}>{data.subtitle}</div>

//       {buttonsEl}
//     </div>

//     <div className={col2}>

//       {/* TABLE */}
//       <div className={tableContainer}>

//         {/* TOP ROW */}
//         <div className={tableRow}>
//           {/* TYPE */}
//           <div className={[tableCell, type].join(' ')}>
//             <span className={cellTitle}>Type</span>
//             <span>{data.type}</span>
//           </div>
//           {/* TOOLS */}
//           <div className={[tableCell, tools].join(' ')}>
//             <span className={cellTitle}>Tools</span>
//             {toolsEl}
//           </div>
//           {/* YEAR */}
//           <div className={[tableCell, year].join(' ')}>
//             <span className={cellTitle}>Year</span>
//             {data.dateAndPlace}
//           </div>
//         </div>

//         {/* BOTTOM ROW */}
//         <div className={tableRow}>
//           {/* TASK */}
//           <div className={[tableCell, task].join(' ')}>
//             <span className={cellTitle}>Task</span>
//             {data.task}
//           </div>
//           {/* IDEA */}
//           <div className={[tableCell, idea].join(' ')}>
//             <span className={cellTitle}>Idea</span>
//             {data.idea}
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* MATERIAL - image, video etc */}
//     <div className={[col3, topMaterialContainer].join(' ')}>
//       {topMaterialEl}
//     </div>
//   </React.Fragment>
// )

// const twoColLayout = (
//   <React.Fragment>

//     <div className={col1}>
//       <div className={name}>{data.name}</div>
//       <div className={subtitle}>{data.subtitle}</div>

//       {buttonsEl}
//     </div>

//     <div className={col2}>

//       {/* TABLE */}
//       <div className={tableContainer}>

//         {/* TOP ROW */}
//         <div className={tableRow}>
//           {/* TYPE */}
//           <div className={[tableCell, type].join(' ')}>
//             <span className={cellTitle}>Type</span>
//             <span>{data.type}</span>
//           </div>
//           {/* TOOLS */}
//           <div className={[tableCell, tools].join(' ')}>
//             <span className={cellTitle}>Tools</span>
//             {toolsEl}
//           </div>
//           {/* YEAR */}
//           <div className={[tableCell, year].join(' ')}>
//             <span className={cellTitle}>Year</span>
//             {data.dateAndPlace}
//           </div>
//         </div>

//         {/* BOTTOM ROW */}
//         <div className={tableRow}>
//           {/* TASK */}
//           <div className={[tableCell, task].join(' ')}>
//             <span className={cellTitle}>Task</span>
//             {data.task}
//           </div>
//           {/* IDEA */}
//           <div className={[tableCell, idea].join(' ')}>
//             <span className={cellTitle}>Idea</span>
//             {data.idea}
//           </div>
//         </div>
//       </div>


//       {/* MATERIAL - image, video etc */}
//       {topMaterialEl}
//     </div>
//   </React.Fragment>
// )