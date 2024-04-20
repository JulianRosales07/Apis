const apiKey = "I2Q6aDvaZX2HjZT82biLNCPg1mCJ49efksHL8ePZ";
const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?";
const container = document.querySelector(".container");
const button = document.getElementById("fetch-image");
const hdButton = document.getElementById("fetch-hd");

button.addEventListener("click", () => {
  getImage("normal");
});

hdButton.addEventListener("click", () => {
  getImage("hd");
});

function getImage(value) {
  const imageContainer = document.querySelector(".image-container");
  if (imageContainer) {
    imageContainer.remove();
  }

  const newImageContainer = document.createElement("div");
  newImageContainer.classList.add("image-container");
  container.append(newImageContainer);

  const dateInput = document.querySelector(".details-input input");
  const date = dateInput.value;

  // Verificar el formato de la fecha utilizando una expresión regular
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    window.alert("Please enter the date in correct format (YYYY-MM-DD).");
    return;
  }

  const url = `${baseUrl}earth_date=${date}&api_key=${apiKey}`;
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onload = function () {
    if (request.status === 200) {
      const data = JSON.parse(request.responseText);
      const photos = data.photos;
      if (photos.length > 0) {
        let imageUrl;
        if (value === "hd") {
          imageUrl = photos[0].img_src; // Cambiado de data.hdurl a photos[0].img_src
        } else {
          imageUrl = photos[0].img_src; // Cambiado de data.url a photos[0].img_src
        }
        const image = document.createElement("img");
        image.src = imageUrl;
        newImageContainer.append(image);
      } else {
        window.alert("No photos found for the given date.");
      }
    } else {
      window.alert("Failed to fetch image. Please try again later.");
    }
  };
}
