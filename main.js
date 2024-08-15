import { fetchSearchedMovies } from "./modules/search.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMzODNkMzA3NmM5YWEyNzkxOTBhYzIzNjMxMGNkOSIsIm5iZiI6MTcyMzQ2MDczNy44NTg5MTgsInN1YiI6IjY2YjllYjk0YWJjY2Y3NmMyYWFhZGJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8FQfUG4hD-LNfFV2MhxVLE3KpZ1me6zwXtbzAQkceE",
  },
};

const movieEl = document.getElementById("movies");

const renderMovies = (movies) => {
  movies.forEach((element) => {
    const html = `
       <div class="card relative flex flex-col bg-[#242d42] text-white rounded-lg overflow-hidden md:shadow-lg shadow-2xl hover:bg-[#374151]">
       <button id=${element.id} class="absolute top-0 right-2 z-10">
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16">
	<path fill="currentColor" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
</svg>
</button>
        <img class="w-full hover:grayscale" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="${element.title}">
        <div class="py-2 px-3">
          <p class="text-xs">${element.release_date}</p>
          <h2 class="text-base my-2">${element.title}</h2>
          <p class="text-xs">${element.overview}</p>
        </div>
      </div>
      `;

    movieEl.innerHTML += html;
  });
};

const getMovies = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );
    // console.log(res);
    if (!res.ok) throw Error("Fetching failed");

    const data = await res.json();

    console.log(data);
    renderMovies(data.results);
  } catch (error) {
    // Etwas mit dem Fehler tun
    console.error(error.message);
  }
};

getMovies();

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

movieEl.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  const targetID = target.id;

  const storedItems = JSON.parse(localStorage.getItem("id")) || [];
  const filteredItems = storedItems.filter((id) => id !== targetID);
  if (storedItems.length === filteredItems.length) {
    storedItems.push(target.id);
    localStorage.setItem("id", JSON.stringify(storedItems));
  } else {
    localStorage.setItem("id", JSON.stringify(filteredItems));
  }
  target.classList.toggle("text-red-500");
});
