const express = require('express');


const PORT = 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('INVEXP')
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});