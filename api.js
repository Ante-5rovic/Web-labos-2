const { Pool } = require("pg");
const dotenv = require("dotenv");

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


//addKorisnik("test", "test");

module.exports = { getKorisnik,nesiguranGetKorisnik,addKorisnik };
