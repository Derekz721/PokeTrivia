const express = require('express');
const path = require('path');

const app = express();
const clientDist = path.join(__dirname, '..', 'client', 'dist');

// Serve React build in production
app.use(express.static(clientDist));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(3000, () => {
  console.log("PokeTrivia server running on port 3000");
});
