const db = require("../database");

module.exports = {
    async getRestaurantList(req, res) {
        let doc = await db.Restaurant.find({}, { cnpj: 0, });

        res.json(doc);
    },
    async createRestaurant(req, res) {
        const value = req.body;

        const existsRestaurantName = await db.Restaurant.exists({ company_name: value.company_name });
        const existsRestaurantCnpj = await db.Restaurant.exists({ cnpj: value.cnpj });

        if(existsRestaurantName || existsRestaurantCnpj) return res.json({ message: "Este restaurante já existe" })

        if(!value.company_name && !value.cnpj && !value.address) {
            return res.json({ message: "Há dados faltando." })
        }

        let Restaurant = new db.Restaurant({
            company_name: value.company_name,
            cnpj: value.cnpj,
            whatsapp: value.whatsapp || "",
            instagram: value.instagram || "",
            address: value.address,
            owner_id: value.owner_id,
            image: value.image,
            verify: false
        })

        Restaurant.save()

        res.json({ message: "Sucesso" })
    }
};