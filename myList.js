

const name_tagList = document.querySelector('.name-tagList');
const popup_mylist = document.querySelector('.popup-mylist');

const openMyList = () => {
  popup_mylist.innerHTML = '';
  popup_mylist.style.display = 'flex';
  const myListHeader = document.createElement('div');
  myListHeader.className = 'myList-Header';
  myListHeader.innerHTML = `
             <h1 class="myList-header-title">My List</h1>
             `;
  popup_mylist.append(myListHeader);

  const myListbutton = document.createElement('h1');
  myListbutton.innerText = 'x';
  myListbutton.className = 'myList-header-button';

  myListbutton.addEventListener('click', () => {
    popup_mylist.style.display = 'none';
  });

  myListHeader.append(myListbutton);

  let movies = document.querySelectorAll('.movie a');

  const {title, poster_path} = data || {};
  movies.forEach(() => {
    let myListContent = document.createElement('div');
    myListContent.className = 'myList-content';
    myListContent.innerHTML = `
                <span class="x-icon-Mylist">&#10006;</span>
                <div class="content-Mylist">
                   <div class="img-content"><img src="${IMG_URL + poster_path}" alt="${title}">
                   <h3>${title}</h3>
                   </div>
                </div>
                `;
    popup_mylist.append(myListContent);

    let deleteBtn = myListContent.querySelector('.x-icon-Mylist');

    deleteBtn.addEventListener('click', () => {
      deleteMovie(title + IMG_URL + poster_path);
    });
  });
};

name_tagList.addEventListener('click', openMyList);

const deleteMovie = (id) => {
  const foundId = movies.find((element) => element.id === id);

  movies = movies.filter((moviesId) => {
    return moviesId !== foundId;
  });
  openMyList();
};


