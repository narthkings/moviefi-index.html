
/***
 * 
 * Sign up with Udacity www.udacity.com  or https://auth.udacity.com/sign-up
 * 
 * Take these free course (from  catalog) on fundamental javascript and ajax request
 *      INTRO TO JAVASCRIPT
 *      JAVASCRIPT AND THE DOM
 *      INTRO TO AJAX
 * 
 */




// USE CONST TO DEFINE A VARIABLE THAT WOUNDN'T CHANGE (BEST PRACTICE) like the url, btn, search etc
// USE VARIABLE NAMES THAT ENTAILS THE PURPOSE IT SERVES

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
function request(data) {
    console.log(data);
    let title =  data.Search[0].Title;
    Mt.innerHTML =title;
    let year =  data.Search[0].Year;
    My.innerHTML =year;
    let  img =  data.Search[0].Poster;
    avatar.src=img;

}