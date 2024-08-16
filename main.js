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
  const storedItems = JSON.parse(localStorage.getItem("id")) || [];
  movies.forEach((element) => {
    const html = `
       <div class="card group relative flex flex-col bg-[#242d42] text-white rounded-lg overflow-hidden md:shadow-lg shadow-2xl hover:bg-[#374151]">
       <button id=${
         element.id
       } class="absolute top-0 right-1 z-10 text-neutral-400/55 ${
      storedItems.includes(element.id.toString()) ? "text-red-500/80" : ""
    }">
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 16 16">
	<path fill="currentColor" d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
</svg>
</button>
        <img class="w-full group-hover:grayscale" src="https://image.tmdb.org/t/p/w500${
          element.poster_path
        }" alt="${element.title}">
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

// bookmark
movieEl.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  const targetID = target.id;
  //Add movie by id to localStorage
  const storedItems = JSON.parse(localStorage.getItem("id")) || [];
  const filteredItems = storedItems.filter((id) => id !== targetID);
  if (storedItems.length === filteredItems.length) {
    storedItems.push(target.id);
    localStorage.setItem("id", JSON.stringify(storedItems));
  } else {
    localStorage.setItem("id", JSON.stringify(filteredItems));
  }
  target.classList.toggle("text-red-500/80"); //toggle is like click/undo function
});

// if (localStorage.setItem("id", JSON.stringify(storedItems))); {addmovieEl
// } else {
// }

//localStorage.setItem("id", JSON.stringify(storedItems) => {addElement${element.id}
