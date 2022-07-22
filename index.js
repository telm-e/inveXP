const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./src/middlewares/errorMiddleware');


const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('INVEXP')
});

app.use(require('./src/routes'));
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});