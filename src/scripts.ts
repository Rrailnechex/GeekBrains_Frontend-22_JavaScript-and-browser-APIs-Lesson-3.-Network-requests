interface UnsplashJsonData {
	user: {
		name:s;
	};
	description:s;
	urls: {
		small:s;
	};
	alt_description?:s;
}

// shorthandinging
type s = string;
type b = boolean;
type n = number;

const UNSPLASH_API_KEY:s = '7dGOLvyx8wYnY2g27L6I2VLlbRNBcTjn37RZoLhMsEc';
const GET_RANDOM_PHOTO_URL:s = 
`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`;





// Execute on start
document.addEventListener('DOMContentLoaded', loadStuffFromUnSplash);

function loadStuffFromUnSplash(): void {
	// Get JSON from Unsplash
	fetch(GET_RANDOM_PHOTO_URL)
		.then((response: Response) => response.json())
		.then((response: UnsplashJsonData) => handleJsonData(response))
		.catch((error: Error) => handleUnsplashError(error));
}

function handleJsonData(data_json: UnsplashJsonData): void {
	// Set author name
	const AuthorName = document.getElementById("AuthorName") as HTMLDivElement;
	AuthorName.textContent = data_json.user.name || "Unknown Author";

	// Set description
	const ImageDescription = document.getElementById("ImageDescription") as HTMLParagraphElement;
	ImageDescription.textContent = data_json.description;

	// Set image
	const ImageOfTheDayYo = document.getElementById("ImageOfTheDayYo") as HTMLImageElement;
	ImageOfTheDayYo.src = data_json.urls.small;
	ImageOfTheDayYo.alt = data_json.alt_description || "Image of the day yo";
}

function handleUnsplashError(error: Error): void {
	const medicalPhrog_url:s = "https://images.unsplash.com/photo-1496070242169-b672c576566b?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
	const error_message = "Error when fetching random image:" + error;
	console.error(error_message);

	const ImageOfTheDayYo = document.getElementById("ImageOfTheDayYo") as HTMLImageElement;
	ImageOfTheDayYo.src = medicalPhrog_url;

	const ImageDescription = document.getElementById("ImageDescription") as HTMLParagraphElement;
	ImageDescription.textContent = error_message;
}

function incrementLikes(): void {
	const likeShower = document.getElementById("TotalLikes") as HTMLDivElement;
	
	let likes:s = likeShower.textContent ?? "0"; // handle nulls
	let currentLikes:n = parseInt(likes.replace(/\D/g, ''),   10); // remove all non-numeric stuff
	currentLikes++;
	likeShower.textContent = currentLikes + " " + getLikesString(currentLikes);

	function getLikesString(n:n):s {
		return n ===  1 ? "like" : "likes";
	}
}
