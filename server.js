const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : dpg-cj67olp7120s7393lp80-a,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PW,
    database : process.env.DATABASE_DB
  }
});



const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> { res.send("by george, i think i've got it!") });
app.post('/signin' , signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.port || 5432, () => {
    console.log(`app runnin`);
});

/* 
/ ---->  res = this is working
/signin ---> POST request = success/fail
/register ---> POST = user
/profile/:userId ---> GET = user
/image ---> PUT = updated user or count object


 */