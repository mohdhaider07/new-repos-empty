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
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let houses;
		if (qNew) {
			houses = await House.find().sort({ createdAt: -1 }).limit(10);
		} else if (qCategory) {
			houses = await House.find({
				category: {
					$in: [qCategory],
				},
			});
		} else {
			houses = await House.find();
		}
		res.status(200).json(houses);
	} catch (err) {
		res.status(500).json(err);
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

router.delete("/:id", async (req, res) => {
	try {
		await House.findByIdAndDelete(req.params.id);
		res.status(200).send({ message: "deleted" });
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
