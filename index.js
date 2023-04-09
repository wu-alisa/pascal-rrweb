const express = require("express");
const app = express();

// Serve static files from the root directory
app.use(express.static(__dirname));

// Start the server
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
