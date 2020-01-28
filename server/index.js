require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      checkForSession = require('./middlewares/checkForSession'),
      swagController = require('./controllers/swagController'),
      authController = require('./controllers/authController'),
      cartController = require('./controllers/cartController'),
      searchController = require('./controllers/searchController'),
      {SERVER_PORT, SESSION_SECRET} = process.env,
      app = express();

app.use(express.json());

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET
}));

app.use(checkForSession);

app.use(express.static(`${__dirname}/../build`));



// Endpoints
app.get('/api/swag', swagController.read);

app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart/:id', cartController.add);
app.delete('/api/cart/:id', cartController.delete);

app.get('/api/search', searchController.search);



const port = SERVER_PORT
app.listen(port, () => console.log(`Server running on ${port}`))