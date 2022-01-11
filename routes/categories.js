const router = require("express").Router();
const Category = require("../models/Category");

//CREATE CATEGORY
router.post("/", async(req,res)=> {
    const cat = new Category(req.body);
    try {
        const savedCat = await cat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET CATEGORY
router.get("/", async(req,res)=> {
    
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;