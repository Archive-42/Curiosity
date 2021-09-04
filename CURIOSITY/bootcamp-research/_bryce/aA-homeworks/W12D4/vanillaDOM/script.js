document.addEventListener("DOMContentLoaded", () => {
  // toggling restaurants

  const toggleLi = (e) => {
    const li = e.target;
    if (li.className === "visited") {
      li.className = "";
    } else {
      li.className = "visited";
    }
  };

  document.querySelectorAll("#restaurants li").forEach((li) => {
    li.addEventListener("click", toggleLi);
  });



  // adding SF places as list items

  // --- your code here!

  const sfPlacesUl = document.getElementById("sf-places");
  const favoriteForm = document.querySelector(".list-container form");

  favoriteForm.addEventListener("submit", event => {
    event.preventDefault();
    const favoritePlaceEl = document.getElementsByClassName("favorite-input")[0];
    const favoritePlace = favoritePlaceEl.value;
    favoritePlaceEl.value = "";

    const newPlace = document.createElement("li");
    newPlace.textContent = favoritePlace;
    sfPlacesUl.appendChild(newPlace);
  });

  // adding new photos

  // --- your code here!

  const photoShowButton = document.getElementsByClassName("photo-show-button")[0];
  const photoSubmitContainer = document.getElementsByClassName("photo-form-container")[0];
  photoShowButton.addEventListener("click", event => {
    event.preventDefault();
    if (photoSubmitContainer.className === "photo-form-container hidden") {
      photoSubmitContainer.className = "photo-form-container";
    } else {
      photoSubmitContainer.className = "photo-form-container hidden";
    }
  });

  const photoSubmitForm = document.querySelector(".photo-form-container form");
  const dogPhotosUl = document.getElementsByClassName("dog-photos")[0];
  photoSubmitForm.addEventListener("submit", event => {
    event.preventDefault();

    const photoUrlEl = document.getElementsByClassName("photo-url-input")[0];
    const photoUrl = photoUrlEl.value;
    photoUrlEl.value = "";

    const newPhoto = document.createElement("img");
    newPhoto.src = photoUrl;
    const newPhotoLi = document.createElement("li");
    newPhotoLi.appendChild(newPhoto);
    dogPhotosUl.appendChild(newPhotoLi);
  });



});
