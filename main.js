"use strict";
import './style.css'
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav__list");

hamburger.addEventListener("click", () => {
  if (!hamburger.classList.contains("active")) {
    hamburger.classList.add("active");
    navList.classList.remove("is__active");
    return;
  }
  hamburger.classList.remove("active");
  navList.classList.add("is__active");
})
