import { fetchSearchedMovies } from "./modules/search.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMzODNkMzA3NmM5YWEyNzkxOTBhYzIzNjMxMGNkOSIsIm5iZiI6MTcyMzQ2MDczNy44NTg5MTgsInN1YiI6IjY2YjllYjk0YWJjY2Y3NmMyYWFhZGJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8FQfUG4hD-LNfFV2MhxVLE3KpZ1me6zwXtbzAQkceE",
  },
};

// search
const searchContainer = document.querySelector(".search-container");
const searchInput = document.querySelector(".search-input");
const searchPanel = document.querySelector(".search-panel");

document.addEventListener("click", (event) => {
  if (!searchContainer.contains(event.target)) {
    searchInput.value = "";
    searchPanel.style.display = "none";
  }
});

searchInput.addEventListener("input", function (event) {
  if (searchInput.value) {
    fetchSearchedMovies(options, searchInput.value);
    searchPanel.style.display = "block";
  } else {
    searchPanel.style.display = "none";
  }
});

// get ids of favorite movies from local storage
const fetchMovieById = async (options, id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );

    if (!response.ok) {
      console.error("Error fetching products", error);
    } else {
      const movie = await response.json();
      renderMovie(id, movie);
    }
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

const favorites = document.querySelector(".favorites");

const renderMovie = async (id, movie) => {
  const src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "";

  const template = `
      <div class="favorite-movie flex h-64 bg-darkgrey rounded-lg p-12" data-id="${id}">
          <!-- image of movie -->
          <figure class="h-full w-auto flex-shrink-0">
            <img
              class="object-cover h-full"
              src=${src}
              alt=""
            />
          </figure>
          <!-- information about film -->
          <div class="flex flex-col gap-2 px-12 overflow-hidden">
            <!-- title -->
            <h2 class="text-2xl text-white">${movie.title}</h2>
            <!-- description -->
            <p class="text-base text-white">
              ${movie.overview}
            </p>
          </div>
          <!-- delete icon -->
          <div class="delete-icon w-8 h-8 flex-shrink-0 bg-delete hover:bg-deleteHover bg-cover">
          </div>
      </div>`;

  favorites.innerHTML += template;
};

const renderFavorites = () => {
  favorites.innerHTML = "";
  const ids = JSON.parse(localStorage.getItem("id")) || [];

  ids.forEach((id) => {
    fetchMovieById(options, id);
  });
};

renderFavorites();

favorites.addEventListener("click", (event) => {
  const clickedElement = event.target;

  if (clickedElement.matches(".delete-icon")) {
    const favoriteMovie = clickedElement.closest(".favorite-movie");
    favorites.removeChild(favoriteMovie);

    const idToRemove = favoriteMovie.dataset.id;
    const idsInLocalStorage = JSON.parse(localStorage.getItem("id")) || [];

    if (idsInLocalStorage.includes(idToRemove)) {
      const idsToSave = idsInLocalStorage.filter((id) => id != idToRemove);
      localStorage.setItem("id", JSON.stringify(idsToSave));
    }
  }
});
