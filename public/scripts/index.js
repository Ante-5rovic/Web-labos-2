let dropdown = document.querySelector(".dropdown");
let visualised = "0";
const prikaz1 = document.getElementsByClassName("content-task1")[0];
const prikaz2 = document.getElementsByClassName("content-task2")[0];

function changeDisplay(id) {
  visualised = id;
  prikaz1.classList.add("fade-out");
  prikaz2.classList.add("fade-out"); 
  prikaz1.classList.remove("add-display");
  prikaz2.classList.remove("add-display");
  setTimeout(() => {
    if (visualised=="1") {
        prikaz1.classList.remove("fade-out");
        prikaz1.classList.add("add-display");
    } else if(visualised=="2"){
        loadCaptcha()
        prikaz2.classList.remove("fade-out");
        prikaz2.classList.add("add-display");
    }else{

    }
  }, 300);
}

dropdown.addEventListener("mouseenter", (e) => {
  if (dropdown.classList.contains("closed")) {
    dropdown.classList.remove("closed");
  }
});
dropdown.addEventListener("mouseleave", (e) => {
  if (!dropdown.classList.contains("closed")) {
    dropdown.classList.add("closed");
  }
});
