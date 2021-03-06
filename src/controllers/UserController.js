const db = require("../database");
const jwt_decode = require("jwt-decode");

module.exports = {
    async getReservations(req, res) {
        const reservation = jwt_decode(req.headers["x-token"]);

        const doc = await db.Reservation.findOne({ owner_id: reservation.id }, { _id: 0 });

        if (doc) {
            res.json(doc);
        }
    },
    async getUser(req, res) {
        const user = jwt_decode(req.headers["x-token"]);
        const doc = await db.User.findOne({ _id: user.id }, { password: 0, __v: 0, image: 0 });

        if(doc) {
            return res.send(doc)
        } else {
            return res.json({ message: "Invalid form" })
        }
    },
    async createReservation(req, res) {
        const value = req.body;

        if (!value.adults && !value.kids && !value.token && !value.date && !value.places)
            return res.status(422).json({ message: "Está faltando detalhes para efetuar a reserva." });

        const reservationDb = new db.Reservation({
            adults: value.adults,
            kids: value.kids,
            date: value.date,
            places: parseInt(value.places),
            token: jwt_decode(req.headers["x-token"]).id
        });

        const doc = await db.User.findOne({ _id: jwt_decode(req.headers["x-token"]).id })

        doc.frequented_restaurants+1
        doc.save()

        reservationDb.save();
        res.status(200).json({ message: `Sucesso, sua reserva foi agendada para o dia ${value.date}` })
    }
};