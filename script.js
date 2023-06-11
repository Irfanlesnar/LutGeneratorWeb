// script.js

document.addEventListener("DOMContentLoaded", function () {
  let brightnessVal = 50;
  let contrastVal = 50;
  let saturationVal = 50;
  let temperatureVal = 0;
  let hueVal = 50;
  let negativeVal = 50;
  let shadowsVal = 50;
  let redVal = 0;
  let greenVal = 0;
  let blueVal = 0;

  const tools = document.querySelectorAll(".toolsScroll");
  const sliders = document.querySelectorAll(".form-range");
  const image = document.querySelector(".imageImg");
  const defaultLut = document.querySelector(".lutImage");
  const uploadButton = document.querySelector(".uploadBtn");
  const sparARbutton = document.querySelector(".buttonSparkAsset");
  const googlePlay = document.querySelector(".googlePlay");
  

  let selectedTool = null;

  for (let i = 0; i < sliders.length; i++) {
    updateSliderValue(i);
  }

  sliders.forEach((slider, index) => {
    slider.addEventListener("input", function () {
      const value = this.value;
      applyFilter(index, value);
    });
  });

  function updateSliderValue(index) {
    const slider = sliders[index];
    if (index === 3 || index === 5 || index === 6 || index === 7) {
      console.log("temperature slider so make it 0");
      slider.value = 0; // Set temperature slider to 0
    } else {
      console.log("make it 50");

      slider.value = 50; // Set other sliders to 50
    }
  }

  function applyFilter(index, value) {
    let filterValue;

    console.log(index + "" + value);

    switch (index) {
      case 0: // Brightness
        brightnessVal = value;
        injectFilter(
          brightnessVal,
          contrastVal,
          saturationVal,
          temperatureVal,
          hueVal,
          negativeVal,
          shadowsVal,
          redVal,
          greenVal,
          blueVal
        );

        break;
      case 1: // Contrast
        contrastVal = value;
        injectFilter(
          brightnessVal,
          contrastVal,
          saturationVal,
          temperatureVal,
          hueVal,
          negativeVal,
          shadowsVal,
          redVal,
          greenVal,
          blueVal
        );

        break;

      case 2: // Saturation
        saturationVal = value;
        injectFilter(
          brightnessVal,
          contrastVal,
          saturationVal,
          temperatureVal,
          hueVal,
          negativeVal,
          shadowsVal,
          redVal,
          greenVal,
          blueVal
        );

        break;

      case 3: // Temperature
        temperatureVal = value;

        injectFilter(
          brightnessVal,
          contrastVal,
          saturationVal,
          temperatureVal,
          hueVal,
          negativeVal,
          shadowsVal,
          redVal,
          greenVal,
          blueVal
        );

        break;

      case 4: // hue
        hueVal = value;
        injectFilter(
          brightnessVal,
          contrastVal,
          saturationVal,
          temperatureVal,
          hueVal,
          negativeVal,
          shadowsVal,
          redVal,
          greenVal,
          blueVal
        );

        break;

      case 5: // red
        redVal = value;
        injectFilter(
          brightnessVal,
          contrastVal,
          saturationVal,
          temperatureVal,
          hueVal,
          negativeVal,
          shadowsVal,
          redVal,
          greenVal,
          blueVal
        );
        break;

      case 6: // green
        greenVal = value;
        injectFilter(
          brightnessVal,
          contrastVal,
          saturationVal,
          temperatureVal,
          hueVal,
          negativeVal,
          shadowsVal,
          redVal,
          greenVal,
          blueVal
        );
        break;

      case 7: // blue
        blueVal = value;
        injectFilter(
          brightnessVal,
          contrastVal,
          saturationVal,
          temperatureVal,
          hueVal,
          negativeVal,
          shadowsVal,
          redVal,
          greenVal,
          blueVal
        );
        break;

      // Apply filters for other tools
    }
  }
  const instaLogo = document.querySelector(".instaLogo");
  const body = document.querySelector(".makeBlur");
  const makeBlur = document.querySelector('.makeBlur');

  instaLogo.addEventListener("mouseenter", () => {
    body.classList.add("blur-effect");
    makeBlur.style.zIndex = '1';
  });

  instaLogo.addEventListener("mouseleave", () => {
    body.classList.remove("blur-effect");
    makeBlur.style.zIndex = '-1';
  });

  //googlePlay

  sparARbutton.addEventListener("click", () => {
    window.open("https://play.google.com/store/apps/details?id=spark.ar.assets&hl=en&gl=US", "_blank");
  });
  
  googlePlay.addEventListener("click", () => {
    window.open("https://play.google.com/store/apps/details?id=spark.ar.assets&hl=en&gl=US", "_blank");
  });
  


  instaLogo.addEventListener("click", () => {
    window.open("https://www.instagram.com/irfan_lesnar_/", "_blank");
  });

  uploadButton.addEventListener("click", () => {
    // Create an input element of type "file"
    const input = document.createElement("input");
    input.type = "file";

    // Add an event listener for the "change" event
    input.addEventListener("change", (event) => {
      const file = event.target.files[0]; // Get the selected file

      // Create a FileReader object
      const reader = new FileReader();

      // Set up a callback function for when the file is loaded
      reader.onload = (event) => {
        // Set the image source to the loaded image
        image.src = event.target.result;
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    });

    // Trigger the file selection dialog
    input.click();
  });



  function injectFilter(
    brightness,
    contrast,
    saturation,
    temperature,
    hue,
    negative,
    shadows,
    red,
    green,
    blue
  ) {
    let hueValue = 0;
    if (hue != 0) {
      hueValue = hue - 50;
    } else {
      hueValue = hue + 50;
    }

    const filterValue = `
      brightness(${brightness / 50}) 
      contrast(${contrast / 50}) 
      saturate(${saturation / 50})
      sepia(${temperature}%)
      hue-rotate(${hue - 50}deg)
    `;
    image.style.filter = filterValue;
    defaultLut.style.filter = filterValue;
  }

  const resetButton = document.querySelector(".resetBtn");
  resetButton.addEventListener("click", () => {
    location.reload(); // Reload the page
  });

  const downloadButton = document.getElementById("downloadButton");
  downloadButton.addEventListener("click", () => {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the canvas size to match the image size
    canvas.width = defaultLut.width;
    canvas.height = defaultLut.height;

    // Apply filters to the canvas
    context.filter = defaultLut.style.filter;
    context.drawImage(defaultLut, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL("image/jpeg");

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "irfanlesnar_LUT.jpg";

    // Programmatically trigger the download
    downloadLink.click();
  });
});
