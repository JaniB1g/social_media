const express = require('express');
const router = express.Router();
const {Uploads} = require("../models");


router.get("/",async(req,res) =>{
    const listOfUploads = await Uploads.findAll();
    res.json(listOfUploads);
})

router.get('/byId/:id', async(req,res)=>{
    const id = req.params.id;
    const uploads = await Uploads.findByPk(id);
    res.json(uploads);
})

router.post("/", async(req, res)=>{
    const uploads = req.body;
    await Uploads.create(uploads);
    res.json(uploads);
})

module.exports = router;