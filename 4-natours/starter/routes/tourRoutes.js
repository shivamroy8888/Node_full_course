const express = require('express');
// can be used destructuring also {directname of the function}
const tourController = require('./../controllers/tourController');
const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAlltours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deletTour);
module.exports = router;
