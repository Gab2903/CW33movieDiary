const searchPanelList = document.querySelector(".search-panel__list");
const searchPanel = document.querySelector(".search-panel");

const fetchSearchedMovies = async (options, query) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      options
    );
    if (!response.ok) throw Error("Error fetching products");
    const movies = await response.json();
    if (movies.results) {
      renderSearchedMovies(movies.results);
    }
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

const renderSearchedMovies = function (movies) {
  if (movies.length == 0) {
    searchPanelList.innerHTML = `
        <li>
          <span class="text-white text-sm"> No results ... </span>
        </li>
      `;
    return;
  }

  searchPanelList.innerHTML = "";

  movies.forEach((movie) => {
    if (!movie.poster_path) {
      return false;
    }

    const src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

    const template = `
      <li class="flex gap-10">
<a href="index.html?id=${movie.id}">
        <figure class="flex-none w-4/12 h-auto">
          <img
            class="w-auto h-auto"
            src="${src}"
            alt="image of movie"
          />
        </figure>
          <div class="flex flex-col gap-3">
              <h2 class="text-white text-base">${movie.title}</h2>
              <span class="text-white text-sm">${movie.release_date}</span>
          </div>
          </a>
      </li>`;

    searchPanelList.innerHTML += template;
  });
};

export { fetchSearchedMovies };
