const express = require("express");
const app = express();
const PORT = 1001;
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

const staticPath = path.join(__dirname, "public");;
const templatesPath = path.join(__dirname, "templates", "views"); // Updated path
const partialsPath = path.join(__dirname, "templates", "partials"); // Updated path

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatesPath);

// Get the list of partial filenames
const partials = fs.readdirSync(partialsPath);

// Register each partial
partials.forEach(partial => {
    const partialName = path.parse(partial).name;
    const partialContent = fs.readFileSync(path.join(partialsPath, partial), "utf8");
    hbs.registerPartial(partialName, partialContent);
});

// Routing
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/weather", (req, res) => {
    res.render("weather");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
