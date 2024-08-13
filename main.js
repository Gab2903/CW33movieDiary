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
       <div class="flex flex-col items-center bg-[#242d42] text-white rounded-lg overflow-hidden shadow-lg">
        <img class="w-full" src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="${element.title}">
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
    console.error(error);
  }
};

getMovies();
