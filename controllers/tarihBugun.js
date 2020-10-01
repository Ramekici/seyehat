const TarihteBugun = require('../models/DatePage');
const validateTarih = require('../validation/Tarih');


exports.tarihverileriCreated = (req, res, next)=> {

    const {errors, isValid} = validateTarih(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const yeni = new TarihteBugun({
        user:req.userData.userId,
        title:req.body.title,
        info:req.body.info,
        date:new Date(req.body.date)
    })
        
    yeni.save()
    .then(profile => res.status(201).json({
          profile: profile,
          message:"veriler oluşturuldu"}))
    .catch (err => {
    res.status(400).json(err);})
}

exports.tarihverileriGettor = (req, res, next) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;

    TarihteBugun.aggregate([
        {$project: {
            title: 1,
            info: 1,
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
            year: {$year: "$date"}
        }},
        {$match: {month: month, day: day}}
    ])
    .then(veri => {
        return res.status(201).json(veri)})
    .catch(err => res.status(401).json(err))
}

exports.tarihverileriBelirli = (req, res, next) => {
    const date = new Date(req.query.date);
    const day = date.getDate();
    const month = date.getMonth()+1;

    TarihteBugun.aggregate([
        {$project: {
            title: 1,
            info: 1,
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
            year: {$year: "$date"}
        }},
        {$match: {month: month, day: day}}
    ])
    .then(veri => {
        return res.status(201).json(veri)})
    .catch(err => res.status(401).json(err))
}
 
exports.tarihverileriBelirliDelete = (req, res, next) => {

    TarihteBugun.findOneAndDelete({_id: req.params.id})
    .then(profile => {
        res.status(201).json({message:"veriler silindi"})
    })
    .catch (err => {
        res.status(400).json(err);}
    )
}

exports.tarihverileriBelirliUpdate = (req, res, next) => {

    const {errors, isValid} = validateTarih(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    };

    const yeni = {
        user:req.userData.userId,
        title:req.body.title,
        info:req.body.info,
        date:new Date(req.body.date)
    }
    TarihteBugun.findByIdAndUpdate({_id: req.params.id}, yeni)
    .then(profile => {
        res.status(201).json({message:"veriler güncellendi"})
    })
    .catch (err => {
        res.status(400).json(err);}
    )
}