const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMzODNkMzA3NmM5YWEyNzkxOTBhYzIzNjMxMGNkOSIsIm5iZiI6MTcyMzQ2MDczNy44NTg5MTgsInN1YiI6IjY2YjllYjk0YWJjY2Y3NmMyYWFhZGJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8FQfUG4hD-LNfFV2MhxVLE3KpZ1me6zwXtbzAQkceE",
  },
};

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
<path fill="currentColor" d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1" />
</svg> */
}

const movieEl = document.getElementById("movies");

const renderMovies = (movies) => {
  movies.forEach((element) => {
    const html = `
       <div class="flex flex-col bg-[#242d42] text-white rounded-lg overflow-hidden shadow-lg hover:bg-[#374151]">
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
    console.error(error);
  }
};

getMovies();
