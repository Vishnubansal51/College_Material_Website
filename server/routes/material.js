const express = require('express');

const materialController = require('../controllers/materialController')


const checkAuthMiddleware= require('../middleware/check_Auth')
const router = express.Router();


router.post('/upload',checkAuthMiddleware.checkAuth,materialController.uploadFile ,materialController.createMaterial);
// router.get('/:branch',materialController.getMaterialByBranch)
router.get('/',materialController.getMaterialByCriteria)
router.put('/:id', checkAuthMiddleware.checkAuth, materialController.updateMaterial); // Route for updating material
router.delete('/:id', checkAuthMiddleware.checkAuth, materialController.deleteMaterial); // Route for deleting material
router.get('/options', materialController.getMaterialOptions);



module.exports = router;
