"use strict";
const UNSPLASH_API_KEY = '7dGOLvyx8wYnY2g27L6I2VLlbRNBcTjn37RZoLhMsEc';
const GET_RANDOM_PHOTO_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`;
document.addEventListener('DOMContentLoaded', loadStuffFromUnSplash);
function loadStuffFromUnSplash() {
    fetch(GET_RANDOM_PHOTO_URL)
        .then((response) => response.json())
        .then((response) => handleJsonData(response))
        .catch((error) => handleUnsplashError(error));
}
function handleJsonData(data_json) {
    const AuthorName = document.getElementById("AuthorName");
    AuthorName.textContent = data_json.user.name || "Unknown Author";
    const ImageDescription = document.getElementById("ImageDescription");
    ImageDescription.textContent = data_json.description;
    const ImageOfTheDayYo = document.getElementById("ImageOfTheDayYo");
    ImageOfTheDayYo.src = data_json.urls.small;
    ImageOfTheDayYo.alt = data_json.alt_description || "Image of the day yo";
}
function handleUnsplashError(error) {
    const medicalPhrog_url = "https://images.unsplash.com/photo-1496070242169-b672c576566b?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const error_message = "Error when fetching random image:" + error;
    console.error(error_message);
    const ImageOfTheDayYo = document.getElementById("ImageOfTheDayYo");
    ImageOfTheDayYo.src = medicalPhrog_url;
    const ImageDescription = document.getElementById("ImageDescription");
    ImageDescription.textContent = error_message;
}
function incrementLikes() {
    var _a;
    const likeShower = document.getElementById("TotalLikes");
    let likes = (_a = likeShower.textContent) !== null && _a !== void 0 ? _a : "0";
    let currentLikes = parseInt(likes.replace(/\D/g, ''), 10);
    currentLikes++;
    likeShower.textContent = currentLikes + " " + getLikesString(currentLikes);
    function getLikesString(n) {
        return n === 1 ? "like" : "likes";
    }
}
