const express = require('express');
const VerilerController = require('../../controllers/veriler');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

router.post('/create', checkAuth, VerilerController.verilerCreate);
router.get('/', VerilerController.verilerGet);
router.get('/ozel', VerilerController.verilerGetByCategory);
router.delete('/:id', checkAuth, VerilerController.verilerDelete);
router.put('/update/:id',checkAuth, VerilerController.verilerUpdate);





module.exports= router;
