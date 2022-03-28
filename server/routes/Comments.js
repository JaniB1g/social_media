const express = require('express');
const router = express.Router();
const {Comments} = require("../models");

router.get('/:uploadId', async(req,res)=>{
    const uploadId = req.params.uploadId;
    const comments = await Comments.findAll({where: {UploadId:uploadId}});
    res.json(comments);
})

router.post('/',async(req,res)=>{
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
})

module.exports = router;