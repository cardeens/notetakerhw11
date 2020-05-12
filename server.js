// DEPENDENCIES
// =============================================================
var express = require("express");

// EXPRESS CONFIGURATION
// =============================================================
// Tells node that we are creating an "express" server
var app = express();
var PORT = process.env.PORT || 3000;

// looks for static files
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// =============================================================
// Data routes
const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

// HTML routes
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

// LISTENER
// =============================================================
// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});