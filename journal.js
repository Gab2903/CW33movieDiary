const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMzODNkMzA3NmM5YWEyNzkxOTBhYzIzNjMxMGNkOSIsIm5iZiI6MTcyMzQ2MDczNy44NTg5MTgsInN1YiI6IjY2YjllYjk0YWJjY2Y3NmMyYWFhZGJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8FQfUG4hD-LNfFV2MhxVLE3KpZ1me6zwXtbzAQkceE",
  },
};

// fetch Movie by Id
const fetchMovieById = async (options, id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`, error);
    }

    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error("Error fetching", error);
  }
};

const favorites = document.querySelector(".favorites");

const renderMovie = async (movie) => {
  if (!movie.poster_path) return;

  const template = `
      <div class="favorite-movie relative flex h-64 bg-darkblue rounded-lg p-6" data-id="${movie.id}">
          <!-- image of movie -->
          <figure class="hidden sm:block h-full w-auto flex-shrink-0">
            <img
              class="object-cover h-full"
              src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
              alt=""
            />
          </figure>
          <!-- information about film -->
          <div class="flex flex-col gap-2 sm:px-12 overflow-hidden">
            <!-- title -->
            <h2 class="text-2xl text-white">${movie.title}</h2>
            <!-- description -->
            <p class="text-base text-white">
              ${movie.overview}
            </p>
          </div>
          <!-- delete icon -->
          <div class="delete-icon absolute top-3 right-3 w-8 h-8 flex-shrink-0 bg-delete hover:bg-deleteHover bg-cover">
          </div>
      </div>`;

  favorites.innerHTML += template;
};

const renderFavoriteMovies = () => {
  favorites.innerHTML = "";
  const ids = JSON.parse(localStorage.getItem("id")) || [];

  ids.forEach((id) => {
    fetchMovieById(options, id).then((movie) => {
      renderMovie(movie);
    });
  });
};

renderFavoriteMovies();

// delete ids of favorite movies from local storage
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
