const API_KEY = 'api_key=eda5662758296035b1514926e4b4bb1e';
const BASE_URL = 'https://api.themoviedb.org/3';
let API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
let searchURL = `${BASE_URL}/search/movie?${API_KEY}`;

const IMG_URL = 'https://image.tmdb.org/t/p/original';

const requests = {
  fertchPopular: `${BASE_URL}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${API_KEY}`,
  fetchTrending: `${BASE_URL}/trending/all/week?${API_KEY}&language=en=US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?${API_KEY}&with_networks=123`,
  fetchActionMovies: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=35`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?${API_KEY}&with_genres=27`,
};

const genres = [
  {
    "id": 28,
    "name": "Action",
    "backgroundImage": "imagenes/action.gif"
  },
  {
    "id": 12,
    "name": "Adventure",
    "backgroundImage": "imagenes/adventure.gif"
  },
  {
    "id": 16,
    "name": "Animation",
    "backgroundImage": "imagenes/animation.gif"
  },
  {
    "id": 35,
    "name": "Comedy",
    "backgroundImage": "imagenes/comedy.gif"
  },
  {
    "id": 18,
    "name": "Drama",
    "backgroundImage": "imagenes/drama.gif"
  },
  {
    "id": 27,
    "name": "Horror",
    "backgroundImage": "imagenes/horror.gif"
  },
  {
    "id": 878,
    "name": "Science Fiction",
    "backgroundImage": "imagenes/scienceFiction.gif"
  },
  {
    "id": 53,
    "name": "Thriller",
    "backgroundImage": "imagenes/thriller.gif"
  }, 
]

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const banner = document.getElementById('banner');
const banner_title = document.getElementById('banner_title');
const banner_desc = document.getElementById('banner_description');
const tags = document.getElementById('tags');

const popup_container = document.querySelector('.popup-container')



function show_popup(movie) {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
  }
  
function add_click_effect_to_movie(movies) {
    movies.forEach(movie => {
      movie.addEventListener('click', () => show_popup(movie));
    });
  }
  

function getMoviesByGenre(genreIds) {
    const url = `${API_URL}&with_genres=${genreIds}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
        showMovies(data.results);
      })
  }
  

let selectedGenre = []
setGenre();
function setGenre() {
    tags.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.setAttribute('data-background-image', genre.backgroundImage);
        t.addEventListener('mouseover', () => {
            t.style.setProperty('--background-image', `url(${t.getAttribute('data-background-image')})`);
        });
        t.addEventListener('mouseout', () => {
            t.style.setProperty('--background-image', 'none');
        });
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
              selectedGenre.push(genre.id);
            } else {
              if (selectedGenre.includes(genre.id)) {
                selectedGenre.forEach((id, idx) => {
                  if (id == genre.id) {
                    selectedGenre.splice(idx, 1);
                  }
                })
              } else {
                selectedGenre.push(genre.id);
              }
            }
            console.log(selectedGenre)
            getMoviesByGenre(selectedGenre.join(','));
          })
        
        tags.append(t);
    })
}


getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';
  
    data.forEach(movie => {
      const {title, poster_path, id} = movie || {};
      const movieCart = document.createElement('div');
      movieCart.classList.add('movie');
      movieCart.innerHTML = `
        <a href="#" data-movie-id="${id}">
          <img src="${IMG_URL+poster_path}" alt="${title}">
        </a>
        <div class="movie-info">
          <h3>${title}</h3>
          <img id="myListbuttonMovie" src= "imagenes/mylist.png"
        </div>
      `;
      main.appendChild(movieCart);

    });
  
  
    const movies = document.querySelectorAll('.movie a');
    movies.forEach(movie => {
      const movieId = movie.getAttribute('data-movie-id');
      movie.addEventListener('click', () => show_popup(movieId));
    });

    const myListbuttonMovie = document.getElementById('myListbuttonMovie');
    myListbuttonMovie.addEventListener("click", () => openMyList ());
  }
  


///////////SHOW POPUP//////////////
async function show_popup(movieId) {
    popup_container.classList.add('show-popup')
    popup_container.innerHTML = '';

    const movieUrl = `${BASE_URL}/movie/${movieId}?${API_KEY}&append_to_response=videos`;
    const res = await fetch(movieUrl);
    const data = await res.json();

    const {title, poster_path, original_language, overview} = data || {};

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <span class="x-icon">&#10006;</span>
        <div class="popup-content">
            <div class="img-content"><img src="${IMG_URL + poster_path}" alt="${title}"></div>
            <div class="popup-info">
                <h3>${title}</h3>
                <p><span>Language:</span> ${original_language}</p>
                <p><span>Overview:<br><br></span> ${overview}</p>
            </div>
        </div>
    `;
    popup_container.appendChild(popup);

    const xIcon = document.querySelector('.x-icon');
    xIcon.addEventListener('click', () => {
        popup_container.classList.remove('show-popup')
    });
}
/////////////

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchMovie = search.value;

    if(searchMovie) {
        getMovies(searchURL+'&query='+searchMovie)
    }else{
        getMovies(API_URL);
    }
})


// used to truncate the string
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n -1) + "..." : str;
}
// banner
fetch(requests.fetchNetflixOriginals)
.then((res) => res.json())
.then((data) => {
    console.log(data.results);
    //every refresh the movie will be change
    const setMovie = data.results[Math.floor(Math.random() * data.results.length -1)];
    console.log(setMovie);
    banner.style.backgroundImage = "url(" + IMG_URL + setMovie.backdrop_path + ")";
    banner_desc.innerText = truncate(setMovie.overview, 150);
    banner_title.innerText = setMovie.name;
})



