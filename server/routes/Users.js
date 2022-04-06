const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddlewares');

router.post("/", async (req,res) =>{
    const {username,password} = req.body;
    bcrypt.hash(password,10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        });
        res.json("Sikeres regisztráció!")
    });
});

router.post("/login", async (req, res) => {
  const  {username,password} = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "Nincs ilyen nevű felhasználó!!" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Hibás felhasználónév vagy jelszó!" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});
module.exports = router;