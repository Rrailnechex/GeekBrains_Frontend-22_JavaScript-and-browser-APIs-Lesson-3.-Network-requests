const UNSPLASH_API_KEY_string = '7dGOLvyx8wYnY2g27L6I2VLlbRNBcTjn37RZoLhMsEc';
const RANDOM_PHOTO_URL_string = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY_string}`;


// execute on start
document.addEventListener('DOMContentLoaded', loadStuffFromUnSplash());


function loadStuffFromUnSplash() {
    // get json from unsplash
    fetch(RANDOM_PHOTO_URL_string)    
        .then(response => response.json()) // i am getting "Rate limit exeded" error and i cant convert it to json.... but reciving name from this json stil working
        //.then(response => console.log(JSON.stringify(response)))
        .then(response_json => handleJsonData(response_json))
        .catch(error => handleUnsplashError(error));
}
    
function handleJsonData(data_json) {
    // set author name
    const AuthorName_div = document.getElementById("AuthorName");
    AuthorName_div.textContent = data_json.user.name || "Unknown Author";

    // set description
    const ImageDescription_p = document.getElementById("ImageDescription");
    ImageDescription_p.textContent = data_json.description;

    // set image
    const ImageOfTheDayYo_img = document.getElementById("ImageOfTheDayYo");
    ImageOfTheDayYo_img.src = data_json.urls.small;
    ImageOfTheDayYo_img.alt = data_json.alt_description || "Image of the day yo";
}


function handleUnsplashError(error) {
    const medicalPhrog_url = "https://images.unsplash.com/photo-1496070242169-b672c576566b?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const error_message_string = "Error when fetching random image:" + error;
    console.error(error_message_string);

    const ImageOfTheDayYo_img = document.getElementById("ImageOfTheDayYo");
    ImageOfTheDayYo_img.src = medicalPhrog_url;

    const ImageDescription_p = document.getElementById("ImageDescription");
    ImageDescription_p.textContent = error_message_string;

    handleJsonData(data_json);
}


function incrementLikes() {
    const likeShower = document.getElementById("TotalLikes");
    let currentLikes = parseInt(likeShower.textContent.replace(/\D/g, ''),  10); // remove all non numeric stuff
    currentLikes++;
    likeShower.textContent = currentLikes + " " + getLikesString(currentLikes);

    function getLikesString(number) {
        return number ===  1 ? "like" : "likes";
    }
}

