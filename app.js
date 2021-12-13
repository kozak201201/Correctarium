const express = require('express');

const appRouter = require('./app.router');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', appRouter);

app.listen(PORT, () => {
    console.log(`server has been started on ${PORT} port`);
});