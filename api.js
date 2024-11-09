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
    await pool.query(
      'INSERT INTO korisnici (ime, prezime) VALUES ($1, $2);',
      [ime, prezime]
    );
    console.log("Korisnik added to DB");
  } catch (err) {
    console.error("Error occurred while adding korisnik to DB: " + err);
  }
}

async function addKorisnikNesiguran(ime, prezime) {
    try {
      await pool.query(
        `INSERT INTO korisnici (ime, prezime) VALUES ('${ime}', '${prezime}');`
      );
      console.log("Korisnik added to DB");
    } catch (err) {
      console.error("Error occurred while adding korisnik to DB: " + err);
    }
  }

addKorisnik("Ante","Petrovic")