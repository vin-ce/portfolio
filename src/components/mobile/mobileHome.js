import React from "react"
import { StaticImage } from "gatsby-plugin-image";
import scrollTo from 'gatsby-plugin-smoothscroll';
import { Link } from "gatsby";

import VideoPlayer from "../videoPlayer"
import Button from "../button";
import DoodlePad from "../doodlePad";

import DownIcon from "../../assets/icons/DownIcon.svg"
import VisitIcon from "../../assets/icons/VisitIcon.svg"


import {
  introContainer,
  topVideo,
  backgroundBlock,
  intro,
  downIcon,
  withCaptionContainer,
  caption,
  divider,
  mobileVersionText,

  topVideoContainer,

  profileImageContainer,
  currentProfileImage,
  childProfileImage,

  aboutDescription,
  contactButtonsContainer,
}
  from "../../styles/mobileHome.module.styl"
import MobileHomeProjects from "./mobileHomeProjects";
import homeData from "../../assets/data/homeData.yaml"

export default function MobileHome() {

  function createMarkup(text) {
    return { __html: text };
  }

  return (
    <React.Fragment>
      <div className={introContainer}>
        <div className={topVideoContainer}>
          <div className={topVideo}>
            <VideoPlayer
              id={`intro`}
              src="https://vimeo.com/804050618"
              type="full"
              hasSound={false}
              isAutoplay={true}
              isMobile={true}
            />
          </div>
          <div className={caption}>Representation of my creative process.</div>

        </div>
        <div className={intro} dangerouslySetInnerHTML={createMarkup(homeData.intro['default'].text)} />
        <br />
        <p>Feel free to look at selected projects below. Otherwise, there's more about me at the bottom of this page: <DownIcon className={downIcon} onClick={() => scrollTo("#about")} /></p>
        <p className={mobileVersionText}>
          <span className={backgroundBlock}>This is a minimalist mobile verison of the site. Please visit on desktop for the fuller experience.</span></p>
      </div>

      <div className={divider}>
        <div>+++</div>
        <div className={backgroundBlock}>Projects</div>
        <div>+++</div>
      </div>

      <MobileHomeProjects projectID="Dialogos" />
      <MobileHomeProjects projectID="OnMeaning" />
      <MobileHomeProjects projectID="Aera" />
      <MobileHomeProjects projectID="LikeAFlower" />
      <MobileHomeProjects projectID="MakingAPlaceOnTheWeb" />
      <MobileHomeProjects projectID="Three" />
      <MobileHomeProjects projectID="Scala" />
      <MobileHomeProjects projectID="OnlineMuseum" />
      <MobileHomeProjects projectID="Collection" />
      <MobileHomeProjects projectID="Motion" />

      <div className={divider}>
        <div>+++</div>
        <div className={backgroundBlock}>About</div>
        <div>+++</div>
      </div>

      <div id='about'>
        <div className={profileImageContainer}>
          <StaticImage className={currentProfileImage} src="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/profile_2020.jpg" alt="2020 picture of me" />
          <StaticImage className={childProfileImage} src="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/profile_2012.png" alt="2012 picture of me" />
          <div className={caption}>
            2020 me with shorter hair and <br /> 2012 mini-me with even shorter hair
          </div>
        </div>
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
      </div>

      <div className={divider}>
        <div>+++</div>
        <div className={backgroundBlock}>Contact</div>
        <div>+++</div>
      </div>

      <DoodlePad isMobile={true} />
      <div className={contactButtonsContainer}>
        <Button id={`about_email`} icon={<VisitIcon />} src="mailto:yc.li.vincent@gmail.com" text="yc.li.vincent@gmail.com" />
        <Button id={`about_twitter`} icon={<VisitIcon />} src="https://twitter.com/vincent_yc_li" text="Twitter" />
      </div>

    </React.Fragment>
  )
}