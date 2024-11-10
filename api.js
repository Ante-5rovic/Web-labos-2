const { Pool } = require("pg");
const dotenv = require("dotenv");
const axios = require('axios');
const crypto = require('crypto');

dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST_EXT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true,
});

async function addKorisnik(ime, prezime) {
  try {
    await pool.query("INSERT INTO korisnici (ime, prezime) VALUES ($1, $2);", [
      ime,
      prezime,
    ]);
    console.log("Korisnik added to DB");
  } catch (err) {
    console.error("Error occurred while adding korisnik to DB: " + err);
  }
}

async function getKorisnik(ime, prezime) {
  try {
    const result = await pool.query(
      'SELECT 1 FROM korisnici WHERE ime = $1 AND prezime = $2;',
      [ime, prezime]
    );
    return result.rows.length > 0;
  } catch (err) {
    console.error("Error occurred while checking korisnik in DB: " + err);
    return false;
  }
}

async function isActivKorisnik(ime) {
  try {
    const result = await pool.query(
      'SELECT 1 FROM korisnici WHERE ime = $1;',
      [ime]
    );
    return result.rows.length > 0;
  } catch (err) {
    console.error("Error occurred while checking korisnik in DB: " + err);
    return false;
  }
}

async function nesiguranGetKorisnik(ime, prezime) {
  try {
    const result = await pool.query(
      `SELECT 1 FROM korisnici WHERE ime = '${ime}' AND prezime = '${prezime}';`
    );
    return result.rows.length > 0;
  } catch (err) {
    console.error("Error occurred while checking korisnik in DB: " + err);
    return false;
  }
}

async function checkPassword(password) {
  // Heširaj šifru koristeći SHA-1
  const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5);

  try {
      const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
      const compromisedHashes = response.data.split('\n');

      for (const line of compromisedHashes) {
          const [compromisedSuffix, count] = line.split(':');
          if (compromisedSuffix === suffix) {
              return count;
          }
      }
      return 0;
  } catch (error) {
      console.error("Greška pri provjeri šifre:", error);
      return "Greška pri provjeri šifre.";
  }
}



module.exports = { getKorisnik,nesiguranGetKorisnik,addKorisnik,checkPassword,isActivKorisnik };
