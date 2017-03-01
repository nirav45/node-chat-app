const path = require('path');
const publicPath = path.join(__dirname, '../public');
console.log(__dirname + '/../public');
console.log(publicPath);

const express = require('express');
var app = express();
const port = process.env.PORT || 4545
app.use(express.static(publicPath));

app.listen(4545, () => {
   console.log(`Server is up on port ${port}`);
});