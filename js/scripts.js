'use strict';

// FIND FORM PARTS FOR THE MOVEMENT
const login_form = document.getElementById('login-form');
const register_form = document.getElementById('register-form');
const log_button = document.getElementById('switchFormButton');

// CHOOSE REGISTER FORM
const move_reg_button = document.getElementById('move-register-btn');

const move_register = () => {
  login_form.style.left = '-400px';
  register_form.style.left = '50px';
  log_button.style.left = '110px';
};

move_reg_button.addEventListener('click', move_register);

// CHOOSE LOG IN FORM
const move_log_button = document.getElementById('move-login-btn');

const move_login = () => {
  login_form.style.left = '50px';
  register_form.style.left = '450px';
  log_button.style.left = '0px';
};

move_log_button.addEventListener('click', move_login);


// SLIDESHOW
let slideIndex = 0;

// Move between slides
const showSlides = () => {
  let slides = document.getElementsByClassName('carousel_slide');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 7000); // Change image every 7 seconds
};

showSlides();


// OPENING CARD-MODAL
const card_modal = document.getElementById('card-modal');

const open_modal = () => {
  card_modal.style.display = 'flex';
};

const check_class = (e) => {
  const target = e.target;
  if (target.className === 'card_img') {
    open_modal();
  }
};

window.addEventListener('click', check_class);


// CLOSE CARD-MODAL BY CLICKING CROSS
const cross_modal = document.querySelector('#close-modal');

const close_modal_by_cross = () => {
  card_modal.style.display = 'none';
};

cross_modal.addEventListener('click', close_modal_by_cross);


// CLOSING MODALS BY CLICKING WINDOW
const close_modal = (event) => {
  if (event.target === card_modal || event.target === add_pic_modal || event.target === myPage || event.target === modify_modal) {
    card_modal.style.display = 'none';
    add_pic_modal.style.display = 'none';
    modify_modal.style.display = 'none';
    myPage.style.display = 'none';
  }
};

window.onclick = close_modal;


// OPENING ADDING PIC-MODAL
const plus_icon = document.getElementById('plus-icon');
const add_pic_modal = document.getElementById('adding_pic');

const open_add_modal = () => {
  add_pic_modal.style.display = 'flex';
};

plus_icon.addEventListener('click', open_add_modal);


// CLOSING ADD FORM/MODAL BY CLICKING THE ADD-BUTTON
const add_photo_button = document.querySelector('#add-photo-button');

const closing_add_photo = () => {
  add_pic_modal.style.display='none';
  infoArea.textContent = '';
};

add_photo_button.addEventListener('click', closing_add_photo);


// SHOW FILENAME IN ADDING PIC-MODAL
const infoArea = document.getElementById('file-upload-filename');
const fileInput = document.getElementById('file-upload');

const showFilename = (event) => {
  const input = event.srcElement;
  const filename = input.files[0].name;
  infoArea.textContent = 'Filename: ' + filename;
};

fileInput.addEventListener('change', showFilename);


// IF USER TYPES OWN THEME CLEAR ALL THE RADIOS
const own_theme_button = document.querySelector('#own-theme');

const clearRadios = () => {
  const radios = document.querySelectorAll('input[type=radio]');

  radios.forEach((radio) => {
    radio.checked = false;
  });
};

own_theme_button.addEventListener('click', clearRadios);


// HAMBURGER MENU MOVEMENT
const wrapperMenu = document.querySelector('.hamburger-menu');

const toggle_hamburger = () =>
    wrapperMenu.classList.toggle('open');

wrapperMenu.addEventListener('click', toggle_hamburger);


// NAVI OPEN AND CLOSE
const navigation = document.getElementById('navigation');
const naviContent = document.getElementById('mysidenav');

const showNav = () => {
  naviContent.classList.toggle('show');
  mainCont.classList.toggle('margin');
  console.log('nav open ');
};

navigation.addEventListener('click', showNav);


//OPENING USERS MYPAGE
const profileIcon = document.querySelector("#nav-profile-icon");
const myPage = document.querySelector("#myPage");
const mainCont = document.querySelector('#main-content');

const open_myPage = () => {
  myPage.style.display="flex";
  naviContent.classList.toggle('show');
  mainCont.classList.toggle('margin');
  wrapperMenu.classList.toggle('open');
  console.log('my page opening');
};

profileIcon.addEventListener('click',open_myPage);


// CLOSING USERS MYPAGE
const exit_arrow = document.querySelector('#exit');

const close_myPage = () => {
  myPage.style.display = "none";
  console.log('my page closing');
};

exit_arrow.addEventListener('click', close_myPage);


// CLOSING MODIFY CARD
const submitModifyBtn = document.querySelector('#submit-modify-btn');
const modify_modal = document.querySelector('#modify-post');

const close_modifyModal = () => {
  console.log('closing modify');
  myPage.style.display = "flex";
  modify_modal.style.display= "none";
};

submitModifyBtn.addEventListener('click', close_modifyModal);


// REPLACING THE DEFAULT VALIDATION MESSAGES ON REGISTRATION FORM
const registerUsername = document.querySelector('#register-username');
const registerEmail = document.querySelector('#register-email');
const registerPass1 = document.querySelector('#register-password1');
const registerPass2 = document.querySelector('#register-password2');

registerUsername.oninvalid = function(event) {
  event.target.setCustomValidity('Username has to have at least 3 characters');
};

registerUsername.onchange = (e) => {
  e.target.setCustomValidity('');
};

registerEmail.oninvalid = function(event) {
  event.target.setCustomValidity('Check that email-address is valid');
};

registerEmail.onchange = (e) => {
  e.target.setCustomValidity('');
};

registerPass1.oninvalid = function(event) {
  event.target.setCustomValidity('Password must contain at least 8 letters and one upper case');
};

registerPass1.onchange = (e) => {
  e.target.setCustomValidity('');
};

registerPass2.oninvalid = function(event) {
  event.target.setCustomValidity('Password must contain at least 8 letters and one upper case and they have to match');
};

registerPass2.onchange = (e) => {
  e.target.setCustomValidity('');
};

