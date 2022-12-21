const Event = require('../models/EventModel');

const getEvents = async (req, res) => {
    console.log('req: ', req);

    const events = await Event.find().populate('user', 'name email');
    console.log('events: ', events);
        
    // DEVOLVER RESPUESTA
    return res.status(200).json({
        ok: true, 
        msg: 'Recoger eventos.', 
        events 
    });
};

const createEvent = async (req, res) => {
    console.log('req.uid: ', req.uid);

    const event = new Event(req.body);

    try {

        event.user = req.uid;
        const savedEvent = await event.save();

        // DEVOLVER RESPUESTA
        return res.status(201).json({
            ok: true, 
            msg: 'Crear evento.', 
            event: savedEvent
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Contacta con el administrador.'
        });
    };
};

const updateEvent = async (req, res) => {
    console.log('req: ', req);

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
        
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false, 
                msg: 'No hay evento con ese id.'
            });
        };

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false, 
                msg: 'No tienes privilegios de edición.'
            });
        };

        const newEvent = {
            ...req.body, 
            user: uid 
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        // DEVOLVER RESPUESTA
        return res.status(200).json({
            ok: true, 
            msg: 'Evento actualizado.', 
            updatedEvent 
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Contacta con el administrador.'
        });
    }
};

const deleteEvent = async (req, res) => {
    console.log('req: ', req);
        
    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
        
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false, 
                msg: 'No hay evento con ese id.'
            });
        };

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false, 
                msg: 'No tienes privilegios de edición.'
            });
        };

        const deletedEvent = await Event.findByIdAndRemove(eventId, { new: true });

        // DEVOLVER RESPUESTA
        return res.status(200).json({
            ok: true, 
            msg: 'Evento eliminado.', 
            deletedEvent 
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Contacta con el administrador.'
        });
    }
};

module.exports = {
    getEvents, 
    createEvent, 
    updateEvent, 
    deleteEvent 
};
