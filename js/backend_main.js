'use strict';
const url = 'http://localhost:8000'; // change url when uploading to server

// select needed html elements
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const logOut = document.getElementById('logout-button');
const main = document.getElementById('main-content');
const header = document.getElementById('header');
const navbar = document.getElementById('navi');
const navContent = document.querySelector('#mysidenav');
const userInfo = document.querySelector('#user-info');
const addPhoto = document.querySelector('#adding_form');
const cardContainer = document.querySelector('#card_container');
const modalImage = document.querySelector('.modal-content');
const modalP = document.querySelector('.modal-text');
const cardContainer_user = document.querySelector('#card-container');
const usernameMyPage = document.querySelector('#username-mypage');
const modifyForm = document.querySelector('#modify_form');
const searchThemeForm = document.querySelector('#search-theme-form');
const searchThemeInput = document.querySelector('#search-theme-input');
const searchTagForm = document.querySelector('#search-tag-form');
const searchTagInput = document.querySelector('#search-tag-input');
const moveToTopBtn = document.querySelector('#move-to-top');

// GET ALL THE LIKES THAT USER HAS MADE
const get_likes = async () => {
  const user = sessionStorage.getItem('username');

  console.log('params', user);

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response = await fetch(url + '/like/user/' + user, options);
    const hasLiked = await response.json();
    console.log('vastaus', hasLiked);

    // Add pink hearts
    addHearts(hasLiked);

  } catch (e) {
    console.log(e.message);
  }
};


// CREATE ALL THE CARDS
const createPicCards = (pics) => {
  // clear cardcontainer
  cardContainer.innerHTML = '';

  pics.forEach((pic) => {
    // create each card
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + pic.filename;
    img.alt = pic.description;
    img.classList.add('card_img');

    // open larger image when clicking image, show caption
    img.addEventListener('click', () => {
      const file = url + '/' + pic.filename;
      modalImage.style.backgroundImage = "url(" + file + ")";
      modalP.innerHTML = 'Photo was added by ' + pic.username;
    });

    // Add heart(s)
    const p = document.createElement('p');
    const heart_liked = document.createElement('i');
    heart_liked.setAttribute('data-picid', pic.pic_id);
    heart_liked.setAttribute('data-likes', pic.likes);
    heart_liked.classList.add('like', 'fas', 'fa-heart');

    const heart_unliked = document.createElement('i');
    heart_unliked.setAttribute('data-picid', pic.pic_id);
    heart_unliked.setAttribute('data-likes', pic.likes);
    heart_unliked.classList.add('hide', 'unlike', 'fas', 'fa-heart');

    p.appendChild(heart_liked);
    p.appendChild(heart_unliked);

    // Add spans with text
    const likespan = document.createElement('span');

    if (pic.likes === 0) {
      likespan.style.display = 'none';
    } else if (pic.likes === 1) {
      likespan.innerHTML += pic.likes + ' like ';
    } else {
      likespan.innerHTML += pic.likes + ' likes ';
    }

    likespan.classList.add('textlike');

    const captionspan = document.createElement('span');
    captionspan.innerHTML = pic.description;
    captionspan.classList.add('description');

    const tagspan = document.createElement('span');
    tagspan.innerHTML = pic.tags;
    tagspan.classList.add('tags');

    p.appendChild(likespan);
    p.appendChild(captionspan);
    p.appendChild(tagspan);
    cardDiv.appendChild(img);
    cardDiv.appendChild(p);
    cardContainer.appendChild(cardDiv);

  });

  get_likes();
};


// CREATING USERS OWN PICS
const createPicCards_user = (pics) => {
  // clear cardcontainer
  cardContainer_user.innerHTML = '';

  pics.forEach((pic) => {

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.classList.add('myprofile_cards');

    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + pic.filename;
    img.alt = pic.description;
    img.classList.add('card_img');

    // open larger image when clicking image, show description and tags
    img.addEventListener('click', () => {
      const file = url + '/' + pic.filename;
      modalImage.style.backgroundImage = "url(" + file + ")";
      modalP.innerHTML = '';
    });

    // Add heart(s)
    const p = document.createElement('p');

    const heart_liked = document.createElement('i');
    heart_liked.setAttribute('data-ownpicid', pic.pic_id);
    heart_liked.setAttribute('data-likes', pic.likes);
    heart_liked.classList.add('like', 'fas', 'fa-heart');

    const heart_unliked = document.createElement('i');
    heart_unliked.setAttribute('data-ownpicid', pic.pic_id);
    heart_unliked.setAttribute('data-likes', pic.likes);
    heart_unliked.classList.add('hide', 'unlike', 'fas', 'fa-heart');

    p.appendChild(heart_liked);
    p.appendChild(heart_unliked);

    // Add spans with texts
    const likespan = document.createElement('span');

    if (pic.likes === 0) {
      likespan.style.display = 'none';
    } else if (pic.likes === 1) {
      likespan.innerHTML += pic.likes + ' like ';
    } else {
      likespan.innerHTML += pic.likes + ' likes ';
    }

    likespan.classList.add('textlike');

    const captionspan = document.createElement('span');
    captionspan.innerHTML = pic.description;
    captionspan.classList.add('description');

    const tagspan = document.createElement('span');
    tagspan.innerHTML = pic.tags;
    tagspan.classList.add('tags');

    p.appendChild(likespan);
    p.appendChild(captionspan);
    p.appendChild(tagspan);

    //Modify post, add values to modify-form from the picture
    const modifyButton = document.createElement('button');
    const modifyModal = document.querySelector('#modify-post');

    modifyButton.innerHTML = 'Modify';
    modifyButton.classList.add('mod_upd_btn');

    modifyButton.addEventListener('click', () => {
      modifyModal.style.display = 'flex';

      const inputs = modifyForm.querySelectorAll('input');
      inputs[0].value = pic.description;
      inputs[1].value = pic.tags;
      inputs[2].value = pic.theme;
      inputs[3].value = pic.pic_id;

    });

    // Delete post
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('mod_upd_btn');

    deleteButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };

      try {
        const response = await fetch(url + '/pic/' + pic.pic_id, fetchOptions);
        const post = await response.json();
        console.log('deleted picture', post);

        const likes = await  fetch(url + '/like/deleteall/' + pic.pic_id, fetchOptions);
        const like = await likes.json();
        console.log('deleted likes', like);
        await search_users_pics();
        await getPic();

      } catch (e) {
        console.log(e);
      }

    });

    const buttons_p = document.createElement('p');
    buttons_p.classList.add('buttons_p');

    buttons_p.appendChild(modifyButton);
    buttons_p.appendChild(deleteButton);

    cardDiv.appendChild(img);
    cardDiv.appendChild(p);
    cardDiv.appendChild(buttons_p);
    cardContainer_user.appendChild(cardDiv);

  });

  get_likes();
};


// GET PICS
const getPic = async () => {
  console.log('getPic   token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/pic', options);
    const pics = await response.json();
    createPicCards(pics);
  } catch (e) {
    console.log(e.message);
  }
};

// SEARCH PICS WITH THE CHOSEN THEME
const searchThemes = async (evt) => {
  evt.preventDefault();

  let theme = searchThemeInput.value;
  // Remove the whitespace if necessary
  theme = theme.trim();
  // Change first letter to capital letter to match the database names
  theme = theme.substr(0, 1).toUpperCase() + theme.substr(1).toLowerCase();

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response = await fetch(url + '/pic/theme/' + theme, options);
    const pics = await response.json();
    createPicCards(pics);
  } catch (e) {
    console.log(e.message);
  }
};

searchThemeForm.addEventListener('submit', searchThemes);

// SEARCH PICS BY TAG NAME
const searchByTag = async (evt) => {
  evt.preventDefault();

  // Get the tag that user typed and match it to database tags
  let tagi = searchTagInput.value;
  tagi = tagi.trim().toLowerCase();

  //Delete hashtag if needed
  if (tagi.substr(0, 1) === '#') {
    tagi = tagi.substr(1);
  }

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    const response = await fetch(url + '/pic/tag/' + tagi, options);
    const pics = await response.json();
    createPicCards(pics);
  } catch (e) {
    console.log(e.message);
  }
};

searchTagForm.addEventListener('submit', searchByTag);


// SUBMIT MODIFY-FORM
modifyForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const data = serializeJson(modifyForm);

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/pic', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  await search_users_pics();
  //await getPic();
});

// LOGIN
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);

  if (!json.user) {
    alert(json.message);
  } else {    // User was found, password ok

    // save token and username
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('username', json.user.username);

    // Hide login and show front page
    header.style.display = 'none';
    main.style.display = 'flex';
    navbar.style.display = 'flex';
    moveToTopBtn.style.display = 'flex';
    userInfo.innerHTML = `${json.user.username}`;   // Add username to navigation and mypage
    usernameMyPage.innerHTML = `${json.user.username}`;
    loginForm.reset();    // clear forms input-values

    await getPic();
  }
});

// LOGOUT
logOut.addEventListener('click', async (evt) => {
  evt.preventDefault();

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/auth/logout', options);
    const json = await response.json();
    console.log(json);

    // remove token and username
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    alert('You have logged out');

    // Hide frontpage and show login
    main.style.display = 'none';
    navbar.style.display = 'none';
    header.style.display = 'unset';
    moveToTopBtn.style.display = 'none';
    navContent.classList.toggle('show');
    wrapperMenu.classList.toggle('open');
  } catch (e) {
    console.log(e.message);
  }
});

// SUBMIT REGISTER FORM
registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(registerForm);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();

  // Alert user if there is problems in registration
  if (json.status === '409') {
    alert(json.message);
  }

  // save token and username
  sessionStorage.setItem('token', json.token);
  sessionStorage.setItem('username', json.user.username);

  // Hide login and show frontpage
  userInfo.innerHTML = `${json.user.username}`;
  usernameMyPage.innerHTML = `${json.user.username}`;
  header.style.display = 'none';
  main.style.display = 'flex';
  navbar.style.display = 'flex';
  moveToTopBtn.style.display = 'flex';
  registerForm.reset();   // Clear forms input-values
  await getPic();
});


// WHEN UPDATING THE PAGE -> CHECK THE TOKEN AND STAY IN FRONT-PAGE
if (sessionStorage.getItem('token')) {
  const username = sessionStorage.getItem('username');
  header.style.display = 'none';
  main.style.display = 'flex';
  navbar.style.display = 'flex';
  userInfo.innerHTML = username;
  usernameMyPage.innerHTML = username;
  searchTagForm.reset();
  searchThemeForm.reset();
  getPic();
}


// SUBMIT ADD-PHOTO FORM
addPhoto.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  let fdObject = new FormData(addPhoto);
  const user_id = sessionStorage.getItem('username');
  fdObject.append('username', user_id);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fdObject,
  };

  const response = await fetch(url + '/pic/', fetchOptions);
  const json = await response.json();
  console.log('add response', json);

  addPhoto.reset();
  await getPic();
});


// USERS OWN PICTURES SEARCH
const myProfileIcon = document.querySelector('#nav-profile-icon');

const search_users_pics = async () => {
  const username = sessionStorage.getItem('username');

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/pic/user/' + username, options);
    const pics = await response.json();
    console.log('search_users_pics', pics);

    createPicCards_user(pics);
  } catch (e) {
    console.log(e.message);
  }
};

myProfileIcon.addEventListener('click', search_users_pics);


// ADD LIKE
const addLikes = async (user, picid) => {

  const addlike = [user, picid];

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };

  const response = await fetch(url + '/like/' + addlike, fetchOptions);
  const json = await response.json();
  console.log('added likes', json);

};


// DELETE LIKE
const deleteLikes = async (user, picid) => {

  const deletelike = [user, picid];

  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };

  const response = await fetch(url + '/like/' + deletelike, fetchOptions);
  const json = await response.json();
  console.log('deleted likes', json);

};


//  UPDATE LIKES
const updateLikes = async (luokka, picid) => {
  const upd = [picid, luokka];

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };

  const response = await fetch(url + '/like/' + upd, fetchOptions);
  const json = await response.json();
  console.log('updated likes', json);
};


// MAKE/DELETE NEW LIKES WHEN USER IS LOGGED IN
document.body.addEventListener('click', event => {

  // IF THE USER HAS NOT YET LIKED THE PICTURE
  if (event.target.nodeName === 'I' && event.target.className ===
      'like fas fa-heart') {
    const user = sessionStorage.getItem('username');
    let likes = event.target.getAttribute('data-likes');
    const luokka = 'like';
    likes++;

    let kuvaid;

    if (event.target.getAttribute('data-picid')) {
      kuvaid = event.target.getAttribute('data-picid');
    } else {
      kuvaid = event.target.getAttribute('data-ownpicid');
    }

    // Changes to database
    addLikes(user, kuvaid);
    updateLikes(luokka, kuvaid);

    // Changes in front-end
    event.target.setAttribute('data-likes', likes);
    event.target.nextElementSibling.setAttribute('data-likes', likes);
    event.target.classList.add('hide');
    event.target.nextElementSibling.classList.remove('hide');
    const span = event.target.parentNode.childNodes[2];

    if (likes === 1) {
      span.style.display = 'unset';
      span.innerHTML = likes + ' like ';
    } else {
      span.innerHTML = likes + ' likes ';
    }

    span.style.marginLeft = '5px';
  }

  // IF THE USER HAS ALREADY LIKED THE PICTURE
  if (event.target.nodeName === 'I' && event.target.className ===
      'unlike fas fa-heart') {

    const user = sessionStorage.getItem('username');
    let kuvaid;

    if (event.target.getAttribute('data-picid')) {
      kuvaid = event.target.getAttribute('data-picid');
    } else {
      kuvaid = event.target.getAttribute('data-ownpicid');
    }

    let likes = event.target.getAttribute('data-likes');
    const luokka = 'unlike';
    likes--;

    // Changes to database
    deleteLikes(user, kuvaid);
    updateLikes(luokka, kuvaid);

    // Changes in front-end
    event.target.setAttribute('data-likes', likes);
    event.target.previousElementSibling.setAttribute('data-likes', likes);
    event.target.classList.add('hide');
    event.target.previousElementSibling.classList.remove('hide');

    if (likes === 0) {
      event.target.nextElementSibling.style.display = 'none';
      event.target.nextElementSibling.innerHTML = '';
    } else if (likes === 1) {
      event.target.nextElementSibling.innerHTML = likes + ' like ';
    } else {
      event.target.nextElementSibling.innerHTML = likes + ' likes ';
    }
  }
});


// ADD PINK-HEARTS IF THE USER HAS LIKED PICTURE BEFORE (When user logs in, the page is updated...)
const addHearts = (likes) => {
  likes.forEach((like) => {
    const picid = like.pic_id;

    if (document.querySelector('[data-picid=\'' + picid + '\']')) {
      const main_cards = document.querySelector('[data-picid=\'' + picid + '\']');
      main_cards.classList.add('hide');
      main_cards.nextElementSibling.classList.remove('hide');
    }

    if (document.querySelector('[data-ownpicid=\'' + picid + '\']')) {
      const own_cards = document.querySelector('[data-ownpicid=\'' + picid + '\']');
      own_cards.classList.add('hide');
      own_cards.nextElementSibling.classList.remove('hide');
    }
  });
};

