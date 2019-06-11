/***
 *
 * Sign up with Udacity www.udacity.com  or https://auth.udacity.com/sign-up
 *
 * Take these free course (from  catalog) on fundamental javascript and ajax request
 *      INTRO TO JAVASCRIPT
 *      JAVASCRIPT AND THE DOM
 *      INTRO TO AJAX
 *      ES6 COURSE
 *
 */

/**
 * USE CONST TO DEFINE A VARIABLE THAT WOUNDN'T CHANGE (BEST PRACTICE) like the url, btn, search etc
 * USE VARIABLE NAMES THAT ENTAILS THE PURPOSE IT SERVES as it's below
 *
 * USE COMMENTS TO INDICATE THE INTENT OF YOUR CODE FOR READIBLITY
 */

const resultContainer = document.querySelector("#resultContainer");

let url = " https://www.omdbapi.com/?apikey=3082b2a7&s=";
let btn = document.querySelector("#btn");
let search = document.querySelector("#search");
let Mt = document.querySelector("#mt");
let My = document.querySelector("#my");
let avatar = document.querySelector("#avatar");
let htmlContent = "";

btn.addEventListener("click", () => {
  fetch(url + search.value)
    .then(HandleError)
    .then(parsingJson)
    .then(request)
    .catch(err => console.log(err));
});

/****
 * TODO
 * 
 * I have displayed error when there is no book results see line 61 - 75.
 * Now display erorr message "Sorry, we couldn't fetch results now, please check internet connection and/or try again";
 * 
 * TIPS: 
 * look into the HandleError function, check where the reponse status is not ok, display error messsage to the page.
 * Reach out to me if you are stucked :)
 * 
 * 
 */
function HandleError(error) {
  console.log(error);
  if (!error.ok) {
    throw Error("Bad gateway");
  } else {
    console.log(error.status);
  }
  return error;
}
function parsingJson(response) {
  return response.json();
}

// REQUESTING DATA
function request(data) {
  const movies = data.Search;

  // checking for search results
  if (movies) {
    console.log(movies);
    htmlContent = movies.map(
      movie => `
        <div class="result">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title}">
        </div>
      `
    );
  } else {
    htmlContent = `<div class="no-movie-error">Sorry... There is no movies on <em><strong>${search.value}</strong></em> :( Please Try again later</div>`
  }

  /** 
        checking for previous search results, removing them and replacing them with new search results
        so the page isn't clustered with previous search results;
    */

  if (resultContainer.hasChildNodes()) {
    resultContainer.innerHTML = "";
    resultContainer.insertAdjacentHTML("afterbegin", htmlContent);
  } else {
    resultContainer.insertAdjacentHTML("afterbegin", htmlContent);
  }
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the page
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/*
    TODO

    Style the result card, heading and paragraphs
    add a back to top button that brings the user back to the top when clcked
**/
