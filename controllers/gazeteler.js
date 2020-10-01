const Gazeteler = require('../models/NewsPage');
const validateGazeteInput = require('../validation/Gazete');

exports.gazetelerCreate = (req, res, next) => {
    
    const {errors, isValid} = validateGazeteInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    
    const newVeri = new Gazeteler({
        user:req.userData.userId,
        title:req.body.title,
        description:req.body.description,
        owner:req.body.owner,
        name:req.body.name,
        date: new Date(req.body.date).toISOString().split('T')[0],
    });
    newVeri.save()
        .then(profile => {
            res.status(201).json({profile: profile, message:"Gazete Manşetleri oluşturuldu"})   
        })
        .catch (err => {res.status(400).json(err)})
}

exports.gazetelerGet = (req, res, next) => {
    const date = new Date(req.query.date).toISOString().split('T')[0];
    Gazeteler.find({date: date})
    .then(veri => {
        return res.status(201).json(veri)})
    .catch(err => res.status(401).json(err))
}

exports.gazetelerDelete = (req, res, next) => {
    Gazeteler.findOneAndDelete({_id: req.params.id})
    .then(veri => {
        return res.status(201).json(veri)})
    .catch(err => res.status(401).json(err))
}

exports.gazetelerUpdate = (req, res, next) => {

    const {errors, isValid} = validateGazeteInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const newData = {
        user:req.userData.userId,
        title:req.body.title,
        description:req.body.description,
        owner:req.body.owner,
        date:new Date(req.body.date).toISOString().split('T')[0]
    }
    Gazeteler.findOneAndUpdate({_id: req.params.id}, newData)
    .then(veri => {
        return res.status(201).json(veri)})
    .catch(err => res.status(401).json(err))
    
}