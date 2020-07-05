const db = require("../database");
const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = {
    async signUp(req, res) {
        const user = req.body;

        if(!user.name && !user.email) {
            res.stauts(422).json({ message: "Você precisa completar todos os campos para se registrar." })
        }

        const userExists = await db.User.exists({ email: user.email });
        if (userExists) return res.status(422).json({ message: "Este usuário já está cadastrado" });

        const userDb = new db.User({
            name: user.name,
            email: user.email,
            password: user.password,
            points: 0,
            image: fs.readFileSync("public/avatar.png", { encoding: 'base64' }),
            frequented_restaurants: 0
        });

        const reservation = await db.Reservation.find({});
        const reservations = reservation.filter((doc) => {
            return doc.owner_id === userDb._id;
        });

        userDb.save();

        res.set("x-token", jwt.sign({ id: userDb._id, name: userDb.name, email: userDb.email, points: userDb.points, reservations }, "shh" ));
        res.json({ message: "Success" });
    },
    async logIn(req, res) {
        const user = req.body;

        const userExists = await db.User.exists({ email: user.email, password: user.password });
        const userDb = await db.User.findOne({ email: user.email, password: user.password });

        if (!userExists) return res.status(422).json({ message: "Usuário inválido" });
        
        const reservations = await db.Reservation.findOne({ owner_id: userDb._id }, { _id: 0});

        
        res.set("x-token", jwt.sign({ id: userDb._id,  name: userDb.name, email: userDb.email, points: userDb.points, reservations }, "shh"))
        res.json({ message: "Success" });
    }
};