const searchResultsList = document.querySelector(".search-results-list");
const searchResults = document.querySelector(".search-results");

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
  searchResultsList.innerHTML = "";

  movies.forEach((movie) => {
    const src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "";

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

    searchResultsList.innerHTML += template;
  });
};

export { fetchSearchedMovies };
