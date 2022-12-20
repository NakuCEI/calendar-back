const { Router } = require('express');
const { check } = require('express-validator');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/calendarController');
const { isDate } = require('../helpers/isDate');
const { validateInputs } = require('../middlewares/validateInputs');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.use(validateJWT);

// RECOGER LOS EVENTOS
router.get('/', getEvents);


// CREAR UN EVENTO
router.post('/', [
    check('title', 'Debes escribir el título.').not().isEmpty(), 
    check('start', 'Debes indicar la fecha de inicio.').custom(isDate), 
    check('end', 'Debes indicar la fecha de finalización.').custom(isDate), 
    validateInputs 
], createEvent);


// ACTUALIZAR UN EVENTO
router.put('/:id', [
    check('title', 'Debes escribir el título.').not().isEmpty(), 
    check('start', 'Debes indicar la fecha de inicio.').custom(isDate), 
    check('end', 'Debes indicar la fecha de finalización.').custom(isDate), 
    validateInputs 
], updateEvent);


// ELIMINAR UN EVENTO
router.delete('/:id', deleteEvent);


module.exports = router;
