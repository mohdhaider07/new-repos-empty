const router = require("express").Router();
const House = require("../modals/House");
const Category = require("../modals/Category");
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

router.put("/:id", async (req, res) => {
	try {
		const house = await House.findByIdAndUpdate(req.params.id, req.body);

		// console.log(category);
		res.status(200).send(house);
	} catch (e) {
		console.log(e);
	}
});

router.get("/noncat-house/:id", async (req, res) => {
	// console.log(req.params.id);
	try {
		const house = await House.findById(req.params.id);
		const categoryId = house.category;
		const category = await Category.find({ _id: { $nin: categoryId } });
		// console.log(houses);
		res.status(200).json(category);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
router.get("/cat-house/:id", async (req, res) => {
	// console.log(req.params.id);
	try {
		const house = await House.findById(req.params.id);
		const categoryId = house.category;
		const category = await Category.find({ _id: { $in: categoryId } });
		// console.log(houses);
		res.status(200).json(category);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post("/add", async (req, res) => {
	// console.log("i am here =>", req.body);

	const { categoryId, houseId } = req.body;

	let house;
	try {
		house = await House.findByIdAndUpdate(houseId, {
			$addToSet: { category: categoryId },
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}

	try {
		const category = await Category.findByIdAndUpdate(
			categoryId,
			{ $addToSet: { house: houseId } },
			{ new: true }
		);
		res.status(200).json(house);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
router.post("/remove", async (req, res) => {
	// console.log("i am here =>", req.body);
	let house;
	const { categoryId, houseId } = req.body;
	try {
		house = await House.findByIdAndUpdate(houseId, {
			$pull: { category: categoryId },
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}

	try {
		const category = await Category.findByIdAndUpdate(
			categoryId,
			{ $pull: { house: houseId } },
			{ new: true }
		);
		res.status(200).json(house);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
