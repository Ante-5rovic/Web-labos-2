const express = require("express");
const router = express.Router();
const svgCaptcha = require('svg-captcha');
const {getKorisnik,nesiguranGetKorisnik,addKorisnik,checkPassword,isActivKorisnik} = require("../api");

router.get("^/$|/index(.html)?", async (req, res) => {
  res.render("index", {});
});

router.post('/login', async(req, res) => {
  
  const { ime, prezime, tip } = req.body;
  let islogedin;
  if(tip){
    //Siguran nacin
    islogedin=await getKorisnik(ime,prezime)

  }else{
    // Nesiguran nacin
    islogedin=await nesiguranGetKorisnik(ime,prezime)

  }
  let message="";
  if(islogedin){
    message = `Korisnik s imenom ${ime} je uspješno logiran!`;
  }else{
    message = `Korisničko ime ili lozinka su pogrešni!`;
  }
  res.json({ message });

});


router.post('/register', async(req, res) => {
  
  const { ime, lozinka, tip,captcha } = req.body;
  let message="This shoulden happen :/";



  if(tip){
    //Sigurna slucaj, provjerio ostatak parametara
    let isCompromised=await checkPassword(lozinka)
    console.log(isCompromised)
    if(isCompromised == 0){
      console.log("dobra sifra");
      // nije kompromitirana
    }else if(isCompromised > 0){
      message = `Lozinka je kompromitirana ${isCompromised} puta`;
      res.json({ message });
      return false;
    }else{
      //error ajde dalje
      console.log("error se dogodio");
    }   
  }else{
    // neam nikakve provjere
  }
  try{
    let isActiv = await isActivKorisnik(ime)
    if(isActiv){
      message="Korisničko ime zauzeto"
      res.json({ message });
      return false;
    }
  }catch(err){
    console.log(err)
  }
  try{
    await addKorisnik(ime,lozinka)
    message="Korisnik dodan u bazu podataka"
    res.json({ message });
    return true;
  }catch(err){
    console.log(err)
  }

  res.json({ message });

});

router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create();
  res.json({
    captchaText: captcha.text, // Tekst CAPTCHA za privremeno pohranjivanje na klijentu
    captchaSVG: captcha.data    // CAPTCHA SVG slika
  });
});




module.exports = router;