const express = require('express');
const router = express.Router();

//Security
const bcrypt = require('bcryptjs');

// JWT
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res) => {
  const {username, password} = req.body;

  bcrypt.hash(password, 10).then((hash) => {

    const user = new User({
      username,
      password: hash
    });

    const promise = user.save();

    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });


  });


});

router.post('/auth', (req, res) => {
  const {username, password} = req.body;
  User.findOne({
    username
  }, (err, user) => {
    if(err)
      throw err;

    if(!user){
      res.json({
        status: false,
        message: "Wrong! Check again!"
      });
    }else{
      bcrypt.compare(password, user.password).then((result) => {
        if(!result){
          res.json({
            status: false,
            message: "Wrong! Check again!"
          });
        }else{
          const payload = {
            username
          };

          const token = jwt.sign(payload, req.app.get('secret_key'), {
            expiresIn: 720 //12 saat
          });

          res.json({
            status: true,
            token
          });
        }
      })
    }
  });


});

module.exports = router;
