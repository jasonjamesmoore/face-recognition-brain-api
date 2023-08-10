// const express = require('express');
import express from "express";
// const bcrypt = require('bcrypt-nodejs');
import bcrypt from "bcrypt-nodejs";
// const cors = require('cors');
import cors from "cors";
// const knex = require('knex');
import knex from "knex";

// const register = require('./controllers/register');
import handleRegister from "./controllers/register.js";
// const signin = require('./controllers/signin');
import signin from ".controllers/signin";
// const profile = require('./controllers/profile');
import profile from "./controllers/profile";
// const image = require('./controllers/image');
import image from "./controllers/image";

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      host : process.env.DATABASE_HOST,
      port : process.env.PORT,
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

app.listen(process.env.PORT || 5432, () => {
    console.log(`app runnin on ${process.env.PORT}`);
});

/* 
/ ---->  res = this is working
/signin ---> POST request = success/fail
/register ---> POST = user
/profile/:userId ---> GET = user
/image ---> PUT = updated user or count object


 */