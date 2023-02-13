import React from "react"
import CanvasDraw from "react-canvas-draw"
import UndoIcon from "../assets/icons/UndoIcon.svg"
import TrashIcon from "../assets/icons/TrashIcon.svg"
import SendIcon from "../assets/icons/SendIcon.svg"
import MoreIcon from "../assets/icons/MoreIcon.svg"
import LessIcon from "../assets/icons/LessIcon.svg"

import {
  doodlePadContainer,
  mobileDoodlePadContainer,

  headerContainer,
  headerLeftContainer,
  headerLeftIconsContainer,
  headerRightContainer,

  hide,

  canvasContainer,

  contactContainer,
  messageContainer,

  gone,


} from "../styles/doodlePad.module.styl"



export default function DoodlePad({ toggleDoodlePadFuncRef, isMobile }) {

  const canvasRef = React.createRef(null)
  const contactFieldRef = React.createRef(null)
  const messageFieldRef = React.createRef(null)

  const [hasDoodled, setHasDoodled] = React.useState(false)

  const CANVAS_SIZE = 320


  const OnClickUndo = () => {
    canvasRef.current.undo();
  }

  const OnClickTrash = () => {
    canvasRef.current.eraseAll();
  }


  const toggleDoodlePad = (isExpand) => {
    const moreEl = document.getElementById('pad_icon_more')
    const lessEl = document.getElementById('pad_icon_less')
    const undoEl = document.getElementById('pad_icon_undo')
    const trashEl = document.getElementById('pad_icon_trash')
    const sendEl = document.getElementById('pad_send')
    const contentEl = document.getElementById('pad_content')

    // expand doodle pad
    if (isExpand) {
      moreEl.classList.add(gone)
      lessEl.classList.remove(gone)

      undoEl.classList.remove(hide)
      trashEl.classList.remove(hide)
      sendEl.classList.remove(hide)
      contentEl.classList.remove(hide)

    }
    // collapse doodle pad
    else {
      lessEl.classList.add(gone)
      moreEl.classList.remove(gone)

      undoEl.classList.add(hide)
      trashEl.classList.add(hide)
      sendEl.classList.add(hide)
      contentEl.classList.add(hide)
    }
  }


  // mobile does not have ref, so additional layer of check
  if (!isMobile) {
    if (!toggleDoodlePadFuncRef.current) toggleDoodlePadFuncRef.current = toggleDoodlePad
  }


  async function OnSendForm() {

    let hasError = false

    if (!contactFieldRef.current.value) {
      contactFieldRef.current.placeholder = "⚠️ Please include a way to reach you"
      hasError = true
    }

    if (!messageFieldRef.current.value) {
      messageFieldRef.current.placeholder = "⚠️ Please write a message"
      hasError = true
    }

    if (hasError) {
      return
    }

    // check if canvas has been interacted with
    let doodleImage = null
    if (hasDoodled) doodleImage = canvasRef.current.getDataURL()


    // set value first
    const value = {
      doodleImage: doodleImage,
      contact: contactFieldRef.current.value,
      message: messageFieldRef.current.value,
    }

    // reset values for UI
    contactFieldRef.current.value = ""
    contactFieldRef.current.disabled = true

    messageFieldRef.current.value = ""
    messageFieldRef.current.disabled = true

    contactFieldRef.current.placeholder = "Sending..."
    messageFieldRef.current.placeholder = "💌"

    // send data to API to send email
    const response = await window.fetch(`/api/sendEmail`, {
      method: `POST`,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(value),
    }).then(res => res.json())

    if (response.error) {
      // if broken
      // oh no - something went wrong!
      contactFieldRef.current.placeholder = "Oh no — something went wrong!"
      messageFieldRef.current.placeholder = "Please send me an email at yc.li.vincent@gmail.com to let me know, it would be much appreciated!"

      console.log("EMAIL ERROR: ", response.error)

    } else {
      // if success

      // re-enable everything
      contactFieldRef.current.disabled = false
      messageFieldRef.current.disabled = false

      // update placeholder
      contactFieldRef.current.placeholder = "Sent!"
      messageFieldRef.current.placeholder = "✨"
    }

  }


  const onCanvasChange = () => {
    if (!hasDoodled) setHasDoodled(true)
  }



  let doodlePadClass = doodlePadContainer
  let canvasWidth = CANVAS_SIZE
  if (isMobile) {
    doodlePadClass = mobileDoodlePadContainer

    const isBrowser = () => typeof window !== "undefined"
    if (isBrowser) {
      canvasWidth = window.innerWidth - 32
    }

  }


  // pos relative to get it to be sticky???
  return (
    <div className={doodlePadClass}>

      <div className={headerContainer}>
        <div className={headerLeftContainer}>
          <span>Doodle Pad</span>
          <div className={headerLeftIconsContainer}>
            <MoreIcon className={gone} id={`pad_icon_more`} onClick={() => toggleDoodlePad(true)} />
            <LessIcon id={`pad_icon_less`} onClick={() => toggleDoodlePad(false)} />
            <UndoIcon id={`pad_icon_undo`} onClick={OnClickUndo} />
            <TrashIcon id={`pad_icon_trash`} onClick={OnClickTrash} />
          </div>
        </div>
        <div id={`pad_send`} className={headerRightContainer} onClick={OnSendForm}>
          <SendIcon />
          <span>Send</span>
        </div>
      </div>

      <span id={`pad_content`}>
        <div className={canvasContainer}>
          <CanvasDraw
            onChange={onCanvasChange}
            canvasWidth={canvasWidth}
            canvasHeight={CANVAS_SIZE}
            brushRadius={5}
            brushColor="#FFC738"
            lazyRadius={5}
            hideGrid={true}
            hideInterface={true}
            catenaryColor="#000"
            imgSrc="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/canvasBG.png"
            ref={canvasRef}
          />
        </div>

        <div className={contactContainer}>

          <div>Contact</div>
          <input type="text" id="contact" name="contact" placeholder="What's your name & how do I reach you?" ref={contactFieldRef}></input>

        </div>

        <div className={messageContainer}>

          <div>Message</div>
          <textarea id="message" name="message" rows="4" placeholder="What's on your heart?" ref={messageFieldRef}>
          </textarea>
        </div>

      </span>
    </div>
  )
}

