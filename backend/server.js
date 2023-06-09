const express = require('express');
const app = express();
const router = express.Router(); //express router
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`${PORT} is up and ready`)
})