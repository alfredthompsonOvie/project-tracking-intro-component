"use strict";
import './style.css';
import barba from '@barba/core';
import { gsap } from 'gsap';

const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav__list");
// const attributionBtn = document.querySelector(".attribution--btnClose");
const loader = document.querySelector(".loader");
// const attributionBtnOpen = document.querySelector(".attribution--btn-open");
// const attributionContainer = document.querySelector(".attribution__container");

// attributionBtnOpen.addEventListener("click", () => {
//   attributionContainer.classList.remove("abs")
// })
// attributionBtn.addEventListener("click", () => {
//   attributionContainer.classList.add("abs")
// })

const barz = gsap.timeline({
  // reversed: true
  // paused: true
  onStart: () => {
    navList.classList.remove("is__active");
  },
  onReverseComplete: () => {
    navList.classList.add("is__active");
    gsap.to([".nav__list", ".list__item"], {
      clearProps: "all",
    });
  }
});

barz
  .to(".hamburger .middle", {
    autoAlpha: 0,
    xPercent: 100,
  })
  .to(".hamburger .top", {
    y: 1,
    rotate: 45,
    transformOrigin: "left",
  }, 0)
  .to(".hamburger .bottom", {
    y: 1,
    rotate: -45,
    transformOrigin: "left",
  }, 0)
  .from([".nav__list"], {
    autoAlpha: 0.01,
    x: 40,
  }, 0);
barz.reversed(true);
function toggleMenu() {
  barz.reversed(!barz.reversed())
}

hamburger.addEventListener("click", () => {
  if (!hamburger.classList.contains("active")) {
    hamburger.classList.add("active");
    toggleMenu()
    // navList.classList.remove("is__active");
    return;
  }
  hamburger.classList.remove("active");
  // navList.classList.add("is__active");
  toggleMenu()
})
window.addEventListener("resize", () => {
  gsap.to([".nav__list", ".list__item"], {
    clearProps: "all",
  });
})
window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 767) {
    gsap.to([".nav__list", ".list__item"], {
      clearProps: "all",
    });
  }
})
function pageAnimation() {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to([
        "#app",
        ".branding", ".hambuger", ".nav__item",
        ".hero__illustration",
        ".heading--text",
        ".new",
        ".title--span",
        ".description",
        ".preview",
        ".cta"
      ], {
        clearProps: true
      })
    }
  })

  tl
    .fromTo("#app", {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: 0
    })
    .from([".branding", ".hamburger", ".nav__item"], {
      autoAlpha: 0.01,
      x: 10,
      stagger: 0.2,
    })
    .fromTo(".hero__illustration", {
      // autoAlpha: 0.01,
      // y: 20
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
    }, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
    })
    .from(".heading--text", {
      autoAlpha: 0.01,
      x: 60,
      stagger: 0.2
    })
    .from(".new", {
      autoAlpha: 0.01
    })
    .from(".title--span", {
      autoAlpha: 0.01,
      x: -20,
      stagger: 0.2
    })
    .from(".description", {
      autoAlpha: 0.01,
      y: 40,
    })
    .from(".preview", {
      autoAlpha: 0.01,
      x: -40,
    })
    .from(".cta", {
      autoAlpha: 0.01
    })
}

barba.init({
  transitions: [{
    name: 'default-transition',
    // sync: true,
    beforeOnce() {
      // console.log("beforeOnce");
      gsap.set("#app", {
        autoAlpha: 0,
      })
    },
    once(data) {
      // console.log("once");
      // console.log(data);
      gsap.to(".page-transtion-listItem", {
        yPercent: -100,
        duration: 2,
        ease: "power4.out",
        delay: .5,
        stagger: 0.2,
        onComplete: () => {
          loader.classList.add("is--ready")
          pageAnimation()
        }
      })
    },
  }]
});