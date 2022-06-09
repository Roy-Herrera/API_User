const express = require('express');
const routerApi = require('./routes');

const { logErrores, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API con express, para los usuarios :)')
})

routerApi(app)

app.use(logErrores);
app.use(errorHandler);
app.use(boomErrorHandler);


app.listen(port, () => {
  console.log('Mi port' + port);
})

