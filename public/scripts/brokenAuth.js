let protection2 = true;
const button2 = document.getElementById("brokenAuth-form-protect-button");
const username2 = document.getElementById("brokenAuth-form-username");
const password2 = document.getElementById("brokenAuth-form-password");

function protectionClick2() {
  protection2 = !protection2;
  console.log(protection2);
  button2.classList.add("fade-out");
  setTimeout(() => {
    if (protection2) {
      button2.style.color = "#0DDEB8";
      button2.innerHTML = "Zaštićeno";
    } else {
      button2.style.color = "#fc6666";
      button2.innerHTML = "Nije zaštićeno";
    }
    button2.classList.remove("fade-out");
  }, 300);
}

async function submitForm2() {
  if (protection2) {
    //Provjera raznih fronte end značajki logina
    let passwordContent = password2.value;
    if (passwordContent.length < 8) {
      alert("Lozinka mora sadržavati barem 8 znakova");
      return false;
    }
    const uppercase = /[A-Z]/;
    if (!uppercase.test(passwordContent)) {
      alert("Lozinka mora sadržavati barem jedno veliko slovo");
      return false;
    }
    const digits = /[0-9]/;
    if (!digits.test(passwordContent)) {
      alert("Lozinka mora sadržavati barem jednu znamenku");
      return false;
    }
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacters.test(passwordContent)) {
      alert("Lozinka mora sadržavati barem jedan poseban znak");
      return false;
    }
  }

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ime: username2.value,
      prezime: password2.value,
      tip: protection,
    }),
  })
    .then((response) => response.json())
    .then((data) => alert(data.message))
    .catch((error) => console.error("Error:", error));
}
