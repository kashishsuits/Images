const boxes = document.querySelectorAll(".box");
const panel = document.querySelector(".panel");
const closeBtn = document.querySelector(".close-btn");
const mainImageContainer = document.querySelector(".main-image-container");
const mainImage = document.createElement("img");
const tableBody = document.querySelector(".table-body");
const variantGallery = document.querySelector(".image-gallery");

function openPanel(event) {
  const box = event.target.parentNode;
  const imgSrc = box.querySelector("img").src;
  const specs = box.dataset.specs;
  const variants = box.dataset.variants;

  // Set the image source and add it to the main image container
  mainImage.src = imgSrc;
  mainImageContainer.innerHTML = "";
  mainImageContainer.appendChild(mainImage);

  // Set the object-fit property of the main image to contain
  mainImage.style.objectFit = "contain";
  mainImage.style.height = "30vh"; // Set the new height


  panel.style.left = "0%";
  populateTable(specs);
  populateVariantGallery(variants);
}

function closePanel() {
  panel.style.left = "-100%";
}

function parseSpecs(specs) {
  const specsArray = JSON.parse(specs);
  const specsObject = {};
  specsArray.forEach((value, index) => {
    const key = index === 0 ? "ItemName" : index === 1 ? "Fabric" : index === 2 ? "Top" : index === 3 ? "Bottom" : index === 4 ? "Dupatta" : "MRP";
    specsObject[key] = value;
  });
  return specsObject;
}

function populateTable(specs) {
  const specsObject = parseSpecs(specs);
  tableBody.innerHTML = "";
  Object.keys(specsObject).forEach((key) => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${key.replace(
    /(^[A-Z])|(\s[A-Z])/g,
    (match) => match.toUpperCase().replace(/\s/g, "")
  )}</td>
  <td>${specsObject[key]}</td>
`;
    tableBody.appendChild(row);
  });
}

function populateVariantGallery(variants) {
  const variantsArray = JSON.parse(variants);
  variantGallery.innerHTML = "";
  variantsArray.forEach((variant) => {
    const img = document.createElement("img");
    img.src = variant;
    img.alt = "Variant Image";
    variantGallery.appendChild(img);
  });
}

boxes.forEach((box) => {
  box.addEventListener("click", openPanel);
});

closeBtn.addEventListener("click", closePanel);

// Add a scroll event listener to the window
window.addEventListener("scroll", () => {
  // If the panel is open, close it when the user scrolls
  if (panel.style.left === "0%") {
    closePanel();
  }
});

// Add a resize event listener to the window
window.addEventListener("resize", () => {
  // If the window is resized, close the panel
  closePanel();
});
