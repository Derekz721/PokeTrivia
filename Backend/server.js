const express = require('express');
const path = require('path');

const app = express();

// Serve React build in production
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(3000, () => {
  console.log("PokeTrivia server running on port 3000");
});