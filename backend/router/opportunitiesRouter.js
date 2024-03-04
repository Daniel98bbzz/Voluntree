const express = require('express');

const router = express.Router();
const opportunitiesController = require('../controllers/opportunitiesController');

router.get('/', opportunitiesController.getAllOpportunities);

// router.get('/:opportunityName', opportunitiesController.getOpportunityByName);

// router.post('/', opportunitiesController.createOpportunity);

// router.put('/:opportunityName', opportunitiesController.updateOpportunity);

// router.delete('/:opportunityName', opportunitiesController.deleteOpportunity);

module.exports = router;
