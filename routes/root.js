const express = require("express");
const router = express.Router();
const {getKorisnik,nesiguranGetKorisnik} = require("../api");

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


module.exports = router;