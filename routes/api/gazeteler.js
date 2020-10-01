const express = require('express');
const GazetelerController = require('../../controllers/gazeteler');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

router.post('/create', checkAuth, GazetelerController.gazetelerCreate);
router.get('/', GazetelerController.gazetelerGet);
router.delete('/delete/:id', checkAuth, GazetelerController.gazetelerDelete);
router.put('/update/:id', checkAuth, GazetelerController.gazetelerUpdate);


module.exports= router;
