// Made by: Aazain Khan
// Date: March 10, 2023
"use strict";
// strict is used to prevent the use of undeclared variables and other errors which may occur in the future
// stict also helps to make the code more secure
// strict does so by throwing an error if the code is not written properly
// strict can be used in two ways
  

window.addEventListener("load", createLightbox);

function createLightbox() {
  // Lightbox Container
  let lightBox = document.getElementById("lightbox");

  // Parts of the lightbox
  let lbCounter = document.createElement("div");
  let lbPrev = document.createElement("div");
  let lbNext = document.createElement("div");
  let lbImages = document.createElement("div");

  // Design the lightbox slide counter
  lightBox.appendChild(lbCounter);
  lbCounter.id = "lbCounter";
  let currentImg = 1;
  lbCounter.textContent = currentImg + " / " + imgCount;

  // Design the lightbox previous slide button
  lightBox.appendChild(lbPrev);
  lbPrev.id = "lbPrev";
  lbPrev.innerHTML = "&#9664;";
  lbPrev.onclick = showPrev;

  // Design the lightbox next slide button
  lightBox.appendChild(lbNext);
  lbNext.id = "lbNext";
  lbNext.innerHTML = "&#9654;";
  lbNext.onclick = showNext;

  // Design the lightbox images container
  lightBox.appendChild(lbImages);
  lbImages.id = "lbImages";
  // Add images from the imgFiles array to the container
  for (let i = 0; i < imgCount; i++) {
    let image = document.createElement("img");
    image.src = imgFiles[i];
    image.alt = imgCaptions[i];
    lbImages.appendChild(image);
  }

  // Function to move forward through the image list
  function showNext() {
    lbImages.appendChild(lbImages.firstElementChild);
    (currentImg < imgCount) ? currentImg++ : currentImg = 1;
    lbCounter.textContent = currentImg + " / " + imgCount;
  }

  // Function to move backward through the image list
  function showPrev() {
    lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
    (currentImg > 1) ? currentImg-- : currentImg = imgCount;
    lbCounter.textContent = currentImg + " / " + imgCount;
  }
}

window.addEventListener("load", function () {
  let images = document.querySelectorAll("img");
  for (let i = 0; i < images.length; i++) {
    images[i].onclick = function () {
      let imgSrc = this.src;
      let imgAlt = this.alt;

      // create popup window
      let popup = window.open("", "popup", "width=800,height=600");

      // add style to popup window
      popup.document.head.innerHTML += `
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400&display=swap" rel="stylesheet">
      `;
      popup.document.body.style.textAlign = "center";
      popup.document.body.style.backgroundColor = "black";

      // add image to popup window
      let popupImg = document.createElement("img");
      popupImg.src = imgSrc;
      popupImg.alt = imgAlt;
      popupImg.style.width = "80%"; // make the image larger

      // wrap image in a div with id "imgCont"
      let imgCont = document.createElement("div");
      imgCont.id = "imgCont";
      imgCont.appendChild(popupImg);
      popup.document.body.appendChild(imgCont);

      // add style to image container
      imgCont.style.display = "block";
      imgCont.style.margin = "auto";

      // add close button to popup window
      let closeButton = document.createElement("button");
      closeButton.textContent = "Close Window";
      closeButton.onclick = function () {
        popup.close();
      };
      popup.document.body.appendChild(closeButton);

      // add add-to-favorites button to popup window
      let favButton = document.createElement("button");
      favButton.textContent = "Add to Favorites";
      popup.document.body.appendChild(favButton);

      // add click handler for add-to-favorites button
      favButton.onclick = function () {
        let favImages = document.getElementById("favImages");
        let numFavImages = favImages.querySelectorAll("img").length;
        if (numFavImages === 5) {
          popup.alert("Please remove 1 image or more to add to the favourites");
        } else {
          let favImages = document.getElementById("favImages");
          let favimageCont = document.createElement("div");
          favimageCont.id = "favimageCont" + (numFavImages + 1); // set a unique ID
          let favImg = document.createElement("img");
          favImg.src = imgSrc;
          favImg.alt = imgAlt;
          favimageCont.appendChild(favImg);
          favImages.appendChild(favimageCont);

          // add hover listeners to the new image
          favimageCont.addEventListener("click", addOverlay);
          favimageCont.addEventListener("mouseout", removeOverlay);
          // add text message
          let msg = document.createElement("p");
          msg.textContent = "Added to favourites";
          msg.style.textAlign = "center";
          msg.style.position = "relative";
          msg.style.marginTop = "10px";
          msg.style.fontFamily = "Raleway, sans-serif";
          msg.style.fontSize = "2em";
          msg.style.textTransform = "uppercase";
          msg.style.color = "yellow";
          popup.document.body.appendChild(msg);
        };
      };


      // add style to buttons
      favButton.style.marginTop = "10px";
      favButton.style.marginLeft = "0.5em";
      favButton.style.fontFamily = "Raleway, sans-serif";
      favButton.style.fontSize = "1em";
      favButton.style.textTransform = "uppercase";
      closeButton.style.textTransform = "uppercase";
      closeButton.style.fontFamily = "Raleway, sans-serif";
      closeButton.style.fontSize = "1em";
      closeButton.style.marginTop = "10px";



    }
  }
});

window.addEventListener("load", addImageListeners);

function addImageListeners() {
  let images = document.querySelectorAll("img");
  for (let i = 0; i < images.length; i++) {
    let image = images[i];
    image.addEventListener("mouseover", showcaption);
    image.addEventListener("mouseout", hidecaption);
  }
}

function showcaption() {
  let caption = document.createElement("div");
  caption.textContent = this.alt;
  caption.style.position = "absolute";
  caption.style.top = this.offsetTop + this.height + "px";
  caption.style.left = this.offsetLeft + "px";
  caption.style.backgroundColor = "black";
  caption.style.color = "white";
  caption.style.padding = "5px";
  caption.style.fontFamily = "Raleway, sans-serif";
  caption.style.fontSize = "16px";
  caption.style.textAlign = "center";
  caption.style.borderRadius = "5px";
  caption.style.zIndex = "1";
  this.parentNode.appendChild(caption);
  this.caption = caption;
}

function hidecaption() {
  this.parentNode.removeChild(this.caption);
}

function addOverlay() {
  this.style.position = "relative";
  let overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.bottom = "0";
  overlay.style.background = "rgba(0, 0, 0, 0.5)";
  overlay.style.color = "white";
  overlay.style.width = "100%";
  overlay.style.transition = "0.5s ease";
  overlay.style.opacity = "0";
  overlay.style.fontSize = "20px";
  overlay.style.padding = "20px";
  overlay.style.textAlign = "center";

  let button = document.createElement("button");
  button.textContent = "REMOVE";
  button.style.fontFamily = "Raleway, sans-serif";
  button.style.fontSize = "1em";
  button.style.textTransform = "uppercase";
  button.style.marginBottom = "10px";

  button.addEventListener("click", () => {
    let favImages = document.getElementById("favImages");
    favImages.removeChild(this);
  });

  overlay.appendChild(button);
  this.appendChild(overlay);
  this.overlay = overlay;
  setTimeout(() => {
    this.overlay.style.opacity = "1";
  }, 0);
}

function removeOverlay() {
  setTimeout(() => {
    this.overlay.style.opacity = "0";
  }, 3000);
}
