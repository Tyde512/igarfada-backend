const db = require("../database");

module.exports = {
    async getReservations(req, res) {
        const doc = await db.Reservation.findOne({ owner_id: req.query.id }, { _id: 0 });

        if (doc) {
            res.json(doc);
        }
    },
    createReservation(req, res) {
        const value = req.body;
        
        if (value.adults && value.kids && value.owner_id) {

            const reservationDb = new db.Reservation({
                adults: value.adults,
                kids: value.kids,
                date: Date.now(),
                owner_id: value.owner_id
            });

            reservationDb.save();
        } else {
            return res.status(422).json({ message: "Está faltando detalhes para efetuar a reserva." })
        }
    }
};