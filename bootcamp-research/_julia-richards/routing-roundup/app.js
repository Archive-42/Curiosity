const express = require("express");
const routes = require("./routes");
const app = express();

app.use("/margot", routes);
app.use("/margeaux", routes);

app.set("view engine", "pug");

app.get("/", (req, res) => {
	res.send("Hello from Express!");
});

app.get("/*xyz", (req, res) => {
	res.send("That's all I wrote.");
});

app.get("^/capital-letters/:text", (req, res) => {
	const string = req.params.text;
	res.send(string.toUpperCase());
});

//   /\/*/i

app.get(/\/*/i, (req, res) => {
	const method = req.method;
	const path = req.path;
	const randomNumber = Math.floor(Math.random() * 100);

	res.render("layout", { method, path, randomNumber });
});

const port = 8081;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
