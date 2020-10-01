const Veriler = require('../models/Datas');
const validateVeriler = require('../validation/Veriler');

exports.verilerCreate = (req, res, next)=> {
    const {errors, isValid} = validateVeriler(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const newVeri = new Veriler({
        user:req.userData.userId,
        category:req.body.category,
        mission:req.body.mission,
        name:req.body.name,
        surName:req.body.surName,
        start: new Date(req.body.start),
        end:new Date(req.body.end)
    })       
    newVeri.save()
    .then(profile => res.status(201).json({profile: profile,
              message:"veriler oluşturuldu"}))
    .catch (err => res.status(400).json(err))
}

exports.verilerGet = (req, res, next)=> {
    const date = new Date(req.query.date);
    Veriler.aggregate([
        {$match: {start:{$lt: date}, end:{$gte: date}}},
        {$group: {_id:"$category", elemans:{ $push:"$$ROOT" }}},
        {$sort: {_id:1}}
    ])
    .then(veri => {
        return res.status(201).json(veri)})
    .catch(err => res.status(401).json(err))
}

exports.verilerGetByCategory = (req, res, next) => {
    const category = req.query.category;
    const mission =  req.query.mission;

    Veriler.find({$and:[{category:category},{mission:mission}]})
    .then(veri => {
        return res.status(201).json(veri)})
    .catch(err => res.status(401).json(err))
}

exports.verilerDelete = (req, res, next) => {
    Veriler.findOneAndDelete({_id: req.params.id})
    .then(veri => {
        return res.status(201).json(veri)})
    .catch(err => res.status(401).json(err))
}

exports.verilerUpdate = (req, res, next) => {
    const {errors, isValid} = validateVeriler(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const newData = {
        user:req.userData.userId,
        category:req.body.category,
        mission:req.body.mission,
        name:req.body.name,
        surName:req.body.surName,
        start: new Date(req.body.start),
        end:new Date(req.body.end)
    }
    Veriler.findOneAndUpdate({_id: req.params.id}, newData)
    .then(veri => {
        return res.status(201).json(veri)})
    .catch(err => res.status(401).json(err))
}








