var express = require('express');
var moment = require('moment');
var sequelize = require('sequelize');
var models = require('.././models');
var Op = sequelize.Op;
var router = express.Router();

router.post("/register", function(req, res, next) {
  models.user.findOne({
    where: {
      username: req.body.username
    }
  }).then(resp => {
    if(resp) {
      res.status(300).json({
        msg: "Username already present"
      })
    } else {
      models.user.create({
        full_name: req.body.name,
        username: req.body.username,
        email_id: req.body.email_id,
        password: req.body.password,
        createdAt: new Date()
      })
      res.sendStatus(200);
    }
  }).catch(error => {
      console.log(error);
      es.sendStatus(500);
  })
});

router.post("/login", function(req, res, next) {
  models.user.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    },
    attributes: [
      'username'
    ]
  }).then(resp => {
    if(resp) {
      res.status(200).json({
        data: resp
      })
    } else{
      res.status(404).json({
        data: "User not found"
      })
    }
  }).catch(error => {
      console.log(error);
      res.sendStatus(500);
  })
});

router.post("/post", function(req, res, next) {
  models.user.findOne({
    where: {
      username: req.body.username
    },
    attributes: [ 'id' ]
  }).then(resp => {
    if(resp) {
      models.post.create({
        user_id: resp.dataValues.id,
        username: req.body.username,
        text: req.body.text,
        createdAt: new Date()
      })
      res.sendStatus(200);
    }
  }).catch(error => {
      console.log(error);
      res.sendStatus(500);
  })
});

router.post("/postbyuser", function(req, res, next) {
  data = []
  models.user.findOne({
    where: {
      username: req.body.username
    },
    attributes: [ 'id' ]
  }).then(resp => {
    if(resp) {
      models.post.findAll({
        where: {
          user_id: resp.dataValues.id
        },
        attributes: [ 'id', 'text' ]
      }).then(resp1 => {
        //console.log(resp1);
        res.status(200).json({
          data: resp1
        })
      })
    }
  }).catch(error => {
    console.log(error);
    res.sendStatus(500);
  })
});

router.post("/allposts", function(req, res, next) {
  models.post.findAll({
    attributes: [ 'id', 'username', 'text' ]
  }).then(resp => {
    res.status(200).json({
      data: resp
    })
  })
});

router.post("/comment", function(req, res, next) {
  models.comment.create({
    post_id: req.body.post_id,
    username: req.body.username,
    text: req.body.text,
    createdAt: new Date()
  }).then(resp => { res.sendStatus(200) }
  ).catch(error => {
      console.log(error);
      res.sendStatus(500)
  })
});

router.post("/allcomments", function(req, res, next) {
  models.comment.findAll({
    attributes: [ 'post_id', 'username', 'text' ]
  }).then(resp => {
    res.status(200).json({
      data: resp
    })
  })
});

module.exports = router;
