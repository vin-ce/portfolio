import React, { useEffect, useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import axios from "axios"
import { Link } from "gatsby";

import Button from "./button";
import VisitIcon from "../assets/icons/VisitIcon.svg"

import {
  aboutContainer,

  currentProfileImage,
  childProfileImage,
  profileCaption,

  aboutDescription,
  contactButtonsContainer,

  middleCol,

  imagesColumn,
  arenaModuleContainer,
  arenaTitle,
  arenaImage,
  arenaText,
  arenaCaption,
  arenaButton,


  textsColumn,
  colophonContainer,
  colophonModule,
  snapItMonoTypeface,

  arenaReadingShortModule,


} from "../styles/about.module.styl"




export default function About({ expandPadScrollTrigger, coverLetter }) {

  const [currentVibeEl, setCurrentVibeEl] = useState(null)
  const [imageOfTheDayEl, setImageOfTheDayEl] = useState(null)
  const [recentEssayEl, setRecentEssayEl] = useState(null)
  const [curReadingLongEl, setCurReadingLongEl] = useState(null)
  const [curReadingShortEl, setCurReadingShortEl] = useState(null)


  useEffect(() => {
    axios.get('https://api.are.na/v2/channels/vincentli-space-home-content/contents', {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers': '*',
      // }
    })
      .then((res) => {

        const data = res.data.contents
        const currentVibe = data[0]
        const imageOfTheDay = data[1]
        const recentEssay = data[2]
        const curReadingLong = data[3]
        const curReadingShort = data[4]

        const recentEssayData = JSON.parse(recentEssay.description)
        const curReadingLongData = JSON.parse(curReadingLong.description)
        const curReadingShortData = JSON.parse(curReadingShort.description)

        setImageOfTheDayEl(
          <div className={arenaModuleContainer}>
            <div className={arenaTitle}>Image of the Day</div>
            <img className={arenaImage} src={imageOfTheDay.image.display.url} />
            <div className={arenaCaption}>{imageOfTheDay.title}</div>
          </div>
        )

        setRecentEssayEl(
          <div className={arenaModuleContainer}>
            <div className={arenaTitle}>Recent Essay</div>
            <img className={arenaImage} src={recentEssay.image.display.url} />
            <div className={arenaText}>{recentEssayData.title}</div>
            <div className={arenaCaption}>{recentEssayData.subtitle}</div>
            <Button icon={<VisitIcon />} src={recentEssayData.src} text="Read" propClasses={arenaButton} />
          </div>
        )

        setCurrentVibeEl(
          <div className={arenaModuleContainer}>
            <div className={arenaTitle}>Current Vibe</div>
            <img className={arenaImage} src={currentVibe.image.display.url} />
            <div className={arenaCaption}>{currentVibe.title}</div>
          </div>
        )

        setCurReadingLongEl(
          <div className={arenaModuleContainer}>
            <div className={arenaTitle}>Currently Reading (Long)</div>
            <div className={arenaText}>
              <a href={curReadingLongData.src} target="_blank" >{curReadingLongData.title} </a>
            </div>
            <div className={arenaCaption}>{curReadingLongData.desc}</div>
          </div>
        )

        const curReadingShortModuleEls = []

        curReadingShortData.forEach((data, i) => {
          curReadingShortModuleEls.push(
            <div className={arenaReadingShortModule} key={`curReadingShort_${i}`}>

              <div className={arenaText}>
                <a href={data.src} target="_blank" >{data.title} </a>
              </div>
              <div className={arenaCaption}>{data.desc}</div>
            </div>
          )
        })

        setCurReadingShortEl(
          <div className={arenaModuleContainer}>
            <div className={arenaTitle}>Currently Reading (Short)</div>
            {curReadingShortModuleEls}
          </div>
        )


      })
      .catch((err) => {
        console.log('are.na err: ', err)
      })


  }, [])


  const [aboutDescriptionEl, setAboutDescriptionEl] = useState(
    <div className={aboutDescription}>
      <p>
        I’m a{' '}
        <a className={'link'} target='_blank' rel='noopener noreferrer' href='https://www.youtube.com/watch?v=yiKFYTFJ_kw'>
          kiwi
        </a>
        ! I’m currently pursuing a BFA in Graphic Design at the {/*  */}
        <a className={'link'} target='_blank' rel='noopener noreferrer' href='https://www.risd.edu/'>
          Rhode Island School of Design
        </a>
        .
      </p>
      <p>
        All that I do is grounded in a concept I call <em>bloomscrolling to awakening</em>.
      </p>
      <p>
        <em>Bloomscrolling</em> is my term for the opposite of <em>doomscrolling</em>, relating to the blooming of a flower, to flourishing. <em>Awakening</em> is used, in addition to the spiritual sense, to refer to the cultivation of meaning, to the complexification of thinking, to falling deeper in love with the world, and much more.
      </p>
      <p>
        I’m interested in digital tools and the magics of the web. How might we make tools and environments that, <a className={'link'} target='_blank' href='https://www.goodreads.com/quotes/467583-if-you-want-to-teach-people-a-new-way-of'>
          just by using them</a>, entice and enliven a new way of being?
      </p>
      <p>
        This might be through <a className={'link'} target='_blank' href="https://garden.vincentli.space/ds3-collection">periodically tending to a set of questions</a>, or through having <a className={'link'} target='_blank' href="http://www.vincentli.space/creation/interllective">more effective tools for learning</a>, or through a better way of co-evolving collective knowledge as we <Link className={'link'} to="/project/dialogos">extend how we can dialogue online</Link>, or through prompting the <a className={'link'} target='_blank' href="https://twitter.com/vincent_yc_li/status/1446296362107211776">expansion</a> of our <a className={'link'} target='_blank' href="https://twitter.com/vincent_yc_li/status/1446296340343009300">space of possibility</a> so we have more ways of not just maintaining our sanity, but actively raising the baseline of our happiness by tenfold.
      </p>
      <p>
        I’m currently focusing on the digital because I think that since the <a className={'link'} target='_blank' href="http://www.newmediareader.com/book_samples/nmr-26-kay.pdf">medium of computers is simulation</a>, its fluidity and reactivity holds potentials that can greatly enrich how we relate to ourselves and to one another. This is important because I believe that interdisciplinary collaborations between people and ideas are key to sparking <a className={'link'} target='_blank' href="https://vimeo.com/67076984">unthinkable thoughts</a>, and the web is unusually good (and can be even better!) at making such connections.
      </p>
      <p>
        All of this work is connected to the <a className={'link'} target='_blank' href="http://garden.vincentli.space/why-shit-is-fucked-up-and-what-we-might-do-about-it">meta-crisis</a>, and to my <em>very</em> tentative <a className={'link'} target='_blank' href="http://garden.vincentli.space/why-shit-is-fucked-up-and-what-we-might-do-about-it#my-theory-of-change">theory of change</a>.
      </p>
      <p>
        {/*  */}
        That’s all I have to say for now. Thanks a bunch, and I hope to hear from you soon ✨
      </p>

    </div>
  )

  function createMarkup(text) {
    return { __html: text };
  }

  useEffect(() => {

    if (coverLetter) setAboutDescriptionEl(
      <div className={aboutDescription} dangerouslySetInnerHTML={createMarkup(coverLetter)} />
    )
  }, [coverLetter])


  return (
    <div id="about" className={['rowContainer', aboutContainer].join(' ')}>
      <div className={'leftCol'}>
        <div>
          <StaticImage className={currentProfileImage} src="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/profile_2020.jpg" alt="2020 picture of me" />
          <StaticImage className={childProfileImage} src="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/profile_2012.png" alt="2012 picture of me" />
          <div className={profileCaption}>
            2020 me with shorter hair and <br /> 2012 mini-me with even shorter hair
          </div>
        </div>

        {aboutDescriptionEl}

        <div className={contactButtonsContainer}>
          <Button id={`about_email`} icon={<VisitIcon />} src="mailto:yc.li.vincent@gmail.com" text="Email" />
          <Button id={`about_twitter`} icon={<VisitIcon />} src="https://twitter.com/vincent_yc_li" text="Twitter" />
        </div>
      </div>


      <div className={['middleCol', middleCol].join(' ')}>
        <div className={imagesColumn}>
          {imageOfTheDayEl}
          {recentEssayEl}
          {currentVibeEl}
        </div>
        <div className={textsColumn}>
          <div className={colophonContainer}>
            <div className={arenaTitle}>Colophon</div>
            <div className={colophonModule}>
              <div className={arenaCaption}>Typefaces</div>
              <div><span>Lucette &</span><span className={snapItMonoTypeface}>& Snap-It Mono</span>
              </div>
            </div>
            <div className={colophonModule}>
              <div className={arenaCaption}>Tools</div>
              <div>Gatsby</div>
              <div>Are.na API</div>
            </div>
            <div className={colophonModule}>
              <div className={arenaCaption}>Site last updated</div>
              <div>30th Jan 2023</div>
            </div>
          </div>
          {curReadingLongEl}
          {curReadingShortEl}
        </div>
      </div>


      <div className={'rightCol'}>

      </div>
    </div>
  )
}