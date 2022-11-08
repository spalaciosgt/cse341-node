// *** Data Validation *** //
const { check } = require('express-validator');
 
// *** Data Validation *** //
exports.insertUpdateMeter = [
    check('id_meter', 'Id Meter is requied').not().isEmpty(),
    check('point_name', 'Point Name is required').not().isEmpty(),
    check('type_meter', 'Type Meter is required').not().isEmpty(),
    check('type_meter', 'Type Meter must be 1 character long').isLength({ min: 1, max: 1 }),
    check('type_meter', 'Type Meter is only G or C for Generation or Consuming').isIn(['G', 'C']),
    check('serial_number', 'Serial Number is required').not().isEmpty(),
    check('serial_number', 'Serial Number must be at least 5 character long').isLength({ min: 5 }),
    check('maker', 'Maker is required').not().isEmpty(),
    check('model', 'Model is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty()
]

// *** Data Validation *** //
exports.insertUpdateMeasure = [
    check('id_meter', 'Id Meter is requied').not().isEmpty(),        
    check('measure_date', 'Measure date is requied').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('measure_frequency', 'Measure frequency is required').not().isEmpty(),
    check('measure_data', 'Measure data must be an array').isArray()
]