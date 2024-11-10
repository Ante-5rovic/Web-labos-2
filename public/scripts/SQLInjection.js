let protection = true;
const button = document.getElementById("form-protect-button");
const username = document.getElementById("SQLInjection-form-username");
const password = document.getElementById("SQLInjection-form-password");

function protectionClick() {
  protection = !protection;
  console.log(protection);
  button.classList.add("fade-out");
  setTimeout(() => {
    if (protection) {
      button.style.color = "#0DDEB8";
      button.innerHTML = "Zaštićeno";
    } else {
      button.style.color = "#fc6666";
      button.innerHTML = "Nije zaštićeno";
    }
    button.classList.remove("fade-out");
  }, 300);
}

async function submitForm() {
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ime: username.value, prezime: password.value ,tip: protection}),
  })
    .then((response) => response.json())
    .then((data) => alert(data.message))
    .catch((error) => console.error("Error:", error));
}
