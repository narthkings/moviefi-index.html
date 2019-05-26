
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

const resultContainer = document.querySelector('#resultContainer')


let url=" https://www.omdbapi.com/?apikey=3082b2a7&s=";
let btn = document.querySelector("#btn");
let search = document.querySelector("#search");
let Mt = document.querySelector("#mt");
let My = document.querySelector("#my");
let avatar = document.querySelector("#avatar");


btn.addEventListener("click",()=>{
    fetch(url+search.value)
        .then(HandleError)
        .then(parsingJson)
        .then(request)
        .catch(err=> console.log(err));
});
function HandleError(error) {
    if (!error.ok){
        throw Error("Bad gateway");
    }else {
        console.log(error.status);
    }
    return error;
}
function parsingJson(response) {
    console.log(response);
    return response.json()
}
// function request(data) {
//     console.log(data);
//     let title =  data.Search[0].Title;
//     Mt.innerHTML =title;
//     let year =  data.Search[0].Year;
//     My.innerHTML =year;
//     let  img =  data.Search[0].Poster;
//     avatar.src=img;

// }


// requesting data
function request(data) {
    // holding the movies and the htmlContent to be displayed within variables
    const movies = data.Search
    let htmlContent = '';
    /**
     * 
        'movies' is an array and arrays have a 'map' method which is used to manipulate arrays 
        and then assign the results to another variable (in this case 'htmlContent')
        
        the 'join' on line 84 is also an array method that convert arrays to strings by joining them
        based on the parameter provided. (in this case an empty string '') 

    **/

    htmlContent = movies.map(movie => `
        <div class="result">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title}">
        </div>
    `).join('')

    /** 
        checking for previous search results, removing them and replacing them with new search results
        so the page isn't clustered with previous search results;
    */

    if(resultContainer.hasChildNodes()) {
        resultContainer.innerHTML = ''
        resultContainer.insertAdjacentHTML('afterbegin', htmlContent);
    } else {
        console.log(resultContainer.hasChildNodes())
        resultContainer.insertAdjacentHTML('afterbegin', htmlContent);

    }
}