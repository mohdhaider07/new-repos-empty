const router = require("express").Router();
const House = require("../modals/House");

router.post("/", async (req, res) => {
	// console.log(req.body);
	const newHouse = new House(req.body);
	try {
		const savedHouse = await newHouse.save();
		res.status(200).send(savedHouse);
		// console.log(savedHouse);
	} catch (e) {
		console.log(e);
	}
});
router.get("/", async (req, res) => {
	// console.log(req.body);

	try {
		const houses = await House.find();
		res.status(200).send(houses);
		// console.log(houses);
	} catch (e) {
		console.log(e);
	}
});
router.get("/:id", async (req, res) => {
	// console.log(req.body);

	try {
		const house = await House.findById(req.params.id);
		res.status(200).send(house);
		// console.log(houses);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
