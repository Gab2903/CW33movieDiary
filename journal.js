import { fetchSearchedMovies } from "./search.js";

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