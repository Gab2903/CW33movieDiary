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
const searchResults = document.querySelector(".search-results");

document.addEventListener("click", (event) => {
  if (!searchContainer.contains(event.target)) {
    searchInput.value = "";
    searchResults.style.display = "none";
  }
});

searchInput.addEventListener("input", function (event) {
  if (searchInput.value) {
    fetchSearchedMovies(options, searchInput.value);
    searchResults.style.display = "block";
  } else {
    searchResults.style.display = "none";
  }
});

//show from localstorage
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
      renderMovie(movie);
    }
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

const favoriteContainer = document.querySelector(".favorite-container");

const renderMovie = async (movie) => {
  const src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "";

  const template = `
      <div class="flex h-64 bg-darkgrey rounded-lg p-12">
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
      </div>`;

  favoriteContainer.innerHTML += template;
};

const showFavorites = () => {
  favoriteContainer.innerHTML = "";
  const ids = JSON.parse(localStorage.getItem("favorites"));
  ids.forEach((id) => {
    fetchMovieById(options, id);
  });
};

showFavorites();
