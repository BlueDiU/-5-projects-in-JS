const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

// General
const containerM = document.getElementById('row-p');
const search = document.getElementById('search');
const form = document.getElementById('form');
const reload = document.querySelector('.reload');

// Initialize the news movies from API
getMovies(APIURL);

function voteAverageClass(vote) {
  if (vote <= 5) {
    return 'red';
  } else if (vote <= 6.5) {
    return 'yellow';
  } else {
    return 'green';
  }
}

function getEmote(sentiment) {
  if (sentiment <= 5) {
    return 'sentiment_very_dissatisfied';
  } else if (sentiment <= 6.5) {
    return 'sentiment_satisfied';
  } else {
    return 'sentiment_very_satisfied';
  }
}

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
  } catch (e) {
    return console.error(e);
  }
}

function showMovies(MOVIES) {
  containerM.innerHTML = '';
  MOVIES.forEach((movie) => {
    const {
      title,
      poster_path,
      vote_average,
      release_date,
      original_language,
    } = movie;
    const columns = document.createElement('div');
    columns.className = 'col xl4';

    columns.innerHTML = `
     <div class="container">
         <div class="card large blue-grey darken-4">
            <div class="card-image">
                <img class="activator" src="${
                  IMGPATH + poster_path
                }">
             </div>

             <div class="card-content">
                <span class="card-title activator grey-text text-lighten-4">${title}</span>

                <span class="card-title ${voteAverageClass(vote_average)}-text">
                <i class="material-icons left">${getEmote(
                  vote_average
                )}</i>${vote_average}
                </span>
                  <hr>
                <p class="grey-text text-lighten-4"><span class="grey-text text-darken-5">release date: </span>${release_date}</p>
                 <p class="grey-text text-lighten-4"><span class="grey-text text-darken-5">Language: </span>${original_language}</p>
            </div>
           
        </div>
      </div>
    `;

    containerM.appendChild(columns);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const termSearch = search.value;

  if (termSearch) {
    getMovies(SEARCHAPI + termSearch);

    search.value = '';
  }
});

reload.addEventListener('click', () => {
  location.reload();
});