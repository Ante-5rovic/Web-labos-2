let protection2 = true;
const button2 = document.getElementById("brokenAuth-form-protect-button");
const username2 = document.getElementById("brokenAuth-form-username");
const password2 = document.getElementById("brokenAuth-form-password");
const captchaInput = document.getElementById("captchaInput");
const captchaSVG = document.getElementById("captchaContainer");
let captchaText = "";

function protectionClick2() {
  protection2 = !protection2;
  console.log(protection2);
  button2.classList.add("fade-out");
  setTimeout(() => {
    if (protection2) {
      button2.style.color = "#0DDEB8";
      button2.innerHTML = "Zaštićeno";
      captchaInput.style.display = "block";
      captchaSVG.style.display = "block";
    } else {
      button2.style.color = "#fc6666";
      button2.innerHTML = "Nije zaštićeno";
      captchaInput.style.display = "none";
      captchaSVG.style.display = "none";
    }
    button2.classList.remove("fade-out");
  }, 300);
}

async function loadCaptcha() {
  try {
    const captchaResponse = await fetch("/captcha");
    const data = await captchaResponse.json();

    const captchaContainer = document.getElementById("captchaContainer");
    captchaContainer.innerHTML = data.captchaSVG;

    captchaText = data.captchaText;
  } catch (error) {
    console.error("Greška prilikom dohvaćanja CAPTCHA:", error);
  }
}

async function submitForm2() {
  // Provjera lozinke
  if (protection2) {
    let passwordContent = password2.value;

    if (passwordContent.length < 8) {
      alert("Lozinka mora sadržavati barem 8 znakova");
      return false;
    }
    if (!/[A-Z]/.test(passwordContent)) {
      alert("Lozinka mora sadržavati barem jedno veliko slovo");
      return false;
    }
    if (!/[0-9]/.test(passwordContent)) {
      alert("Lozinka mora sadržavati barem jednu znamenku");
      return false;
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(passwordContent)) {
      alert("Lozinka mora sadržavati barem jedan poseban znak");
      return false;
    }
    if (captchaText != captchaInput.value) {
      alert("Neispravan CAPTCHA odgovor.");
      loadCaptcha();
      return false;
    }
  }

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ime: username2.value,
        lozinka: password2.value,
        tip: protection2,
        captcha: captchaInput,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    } else {
      alert("Greška: " + data.message);
    }
  } catch (error) {
    console.error("Greška:", error);
    alert("Dogodila se greška. Pokušajte ponovno kasnije.");
  }
}
