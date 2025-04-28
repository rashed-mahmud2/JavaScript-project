import { getMovieReviewData } from "./data.js";

let sortDesc = false;

function init() {
  const movieReviewData = getMovieReviewData();

  registerHandler(movieReviewData);
  paintStatistics(movieReviewData);
  paintMovieData(movieReviewData);
}

function paintStatistics(movieReviewData) {
  const flatReviewData = movieReviewData.flat();

  const totalMoveies = movieReviewData.length;

  const totalReviews = flatReviewData.length;
  const totalRating = flatReviewData.reduce((acc, item) => {
    return acc + item.rating;
  }, 0);

  const averageRating = (totalRating / flatReviewData.length).toFixed(2);

  const totalMoveiesEl = document.getElementById("totalMoviesId");
  addState(totalMoveiesEl, totalMoveies);

  const averageRatingEl = document.getElementById("ratingAverageId");
  addState(averageRatingEl, averageRating);

  const totalReviewsEl = document.getElementById("totalReviewsId");
  addState(totalReviewsEl, totalReviews);
}

function addState(element, value) {
  const spanEl = document.createElement("span");
  spanEl.innerText = value;
  element.appendChild(spanEl);
}

function paintMovieData(movieReviewData) {
  const flatReviewData = movieReviewData.flat();
  const sorted = flatReviewData.toSorted((a, b) => b.on - a.on);
  const movieListEl = document.querySelector("#movieListId ul");

  addMovieReviewData(movieListEl, sorted);
}

function registerHandler(movieReviewData) {
  const sortBtn = document.getElementById("sortBtnId");
  const grpBtn = document.getElementById("grpBtnId");

  grpBtn.addEventListener("click", () => groupReviewByTitle(movieReviewData));
  sortBtn.addEventListener("click", () => sortByReview(movieReviewData));
}

function sortByReview(movieReviewData) {
  sortDesc = !sortDesc;
  const flatReviewData = movieReviewData.flat();

  let sortReviewData = sortDesc
    ? flatReviewData.toSorted((a, b) => b.rating - a.rating)
    : flatReviewData.toSorted((a, b) => a.rating - b.rating);

  const movieListEl = document.querySelector("#movieListId ul");

  removeAllChildNode(movieListEl);
  addMovieReviewData(movieListEl, sortReviewData);
}

function groupReviewByTitle(movieReviewData) {
  const flatReviewData = movieReviewData.flat();
  const groupReviews = Object.groupBy(flatReviewData, ({ title }) => title);

  const titleKeys = Reflect.ownKeys(groupReviews);

  const movieListEl = document.querySelector("#movieListId ul");

  removeAllChildNode(movieListEl);

  titleKeys.forEach((title) => {
    const liEl = document.createElement("li");
    liEl.classList.add("card", "my-5", "text-left");

    const hEl = document.createElement("h3");
    hEl.classList.add("text-3xl");
    hEl.innerText = title;
    liEl.appendChild(hEl);

    const reviews = groupReviews[title];
    console.log(title, reviews);

    reviews.forEach((review) => {
      const pEl = document.createElement("p");
      pEl.classList.add("m-3");
      const message = `<strong>${review.by}</strong> has given <strong>${review.rating} rating</strong> with a comment, <i>${review.content}</i>`;

      pEl.innerHTML = message;
      liEl.appendChild(pEl);
    });

    movieListEl.appendChild(liEl);
  });
}

function addMovieReviewData(movieListEl, movieReview) {
  movieReview.map((movie) => {
    const liEl = document.createElement("li");
    liEl.classList.add("card", "my-5", "p-5", "pr-10", "text-left");

    const titleEl = document.createElement("p");
    titleEl.classList.add(
      "text-2xl",
      "flex",
      "items-center",
      "justify-between",
      "mb-5"
    );
    titleEl.innerHTML = `${movie.title} <span class="text-xl mt-0">Rating - ${movie.rating}</span>`;
    liEl.appendChild(titleEl);
    movieListEl.appendChild(liEl);

    const reviewEl = document.createElement("p");
    reviewEl.classList.add("m-3", "text-lg");
    reviewEl.innerHTML = movie.content;
    liEl.appendChild(reviewEl);
    movieListEl.appendChild(liEl);

    const byEl = document.createElement("p");
    byEl.classList.add("m-3", "text-lg");
    byEl.innerHTML = `<span class="text-xl">By ${
      movie.by
    }</span> on ${new Intl.DateTimeFormat("en-In").format(movie.on)}`;
    liEl.appendChild(byEl);
    movieListEl.appendChild(liEl);
  });
}

function removeAllChildNode(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

init();
