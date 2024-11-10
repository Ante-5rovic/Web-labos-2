const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
    console.log("Error path hit, rendering template...");
      //500 Error
      res.status(404);
      if (req.accepts("html")) {
        //res.sendFile(path.join(__dirname, 'views','500.html'))
        res.render("404");
      } else if (req.accepts("json")) {
        res.json({ message: "404 Greška!" });
      } else {
        res.type("txt").send("404 Greška!");
      }
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));