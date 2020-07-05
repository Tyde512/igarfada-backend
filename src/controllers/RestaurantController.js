const db = require("../database");

module.exports = {
    async getRestaurantList() {
        let doc = await db.Restaurant.find({}, { cnpj: 0, });

        res.json(doc);
    },
    createRestaurant(req, res) {
        const value = req.body;

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
    }
};