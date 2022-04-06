const express = require('express');
const router = express.Router();
const {Uploads,Likes} = require("../models");
const {validateToken} = require('../middlewares/AuthMiddlewares');


router.get("/",async(req,res) =>{
    const listOfUploads = await Uploads.findAll({include: [Likes]});
    res.json(listOfUploads);
});

router.get('/byId/:id', async(req,res)=>{
    const id = req.params.id;
    const uploads = await Uploads.findByPk(id);
    res.json(uploads);
});

router.post("/", async(req, res)=>{
    const uploads = req.body;
    await Uploads.create(uploads);
    res.json(uploads);
});

router.delete("/:uploadId", validateToken ,async(req,res)=>{
    const uploadId = req.params.uploadId;
  await Uploads.destroy({
    where: {
      id: uploadId,
    },
  });

  res.json("A törlés sikeresen megtörtént!!");

});

module.exports = router;