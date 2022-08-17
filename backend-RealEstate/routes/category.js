const router = require("express").Router();
const Category = require("../modals/Category");
const House = require("../modals/House");

router.post("/", async (req, res) => {
	// console.log(req.body);
	const newCategory = new Category(req.body);
	try {
		const savedCategory = await newCategory.save();
		res.status(200).send(savedCategory);
		// console.log(savedHouse);
	} catch (e) {
		console.log(e);
	}
});

router.get("/", async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).send(categories);
		// console.log(houses);
	} catch (e) {
		console.log(e);
	}
});
router.get("/:id", async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);

		// console.log(category);
		res.status(200).send(category);
	} catch (e) {
		console.log(e);
	}
});
router.put("/:id", async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			req.body
		);

		// console.log(category);
		res.status(200).send(category);
	} catch (e) {
		console.log(e);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await Category.findByIdAndDelete(req.params.id);
		res.status(200).send({ message: "deleted" });
	} catch (e) {
		console.log(e);
	}
});

router.get("/noncat-house/:id", async (req, res) => {
	// console.log(req.params.id);
	try {
		const category = await Category.findById(req.params.id);
		const housesId = category.house;
		const houses = await House.find({ _id: { $nin: housesId } });
		console.log(houses);
		res.status(200).json(houses);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
router.get("/cat-house/:id", async (req, res) => {
	// console.log(req.params.id);
	try {
		const category = await Category.findById(req.params.id);
		const housesId = category.house;
		const houses = await House.find({ _id: { $in: housesId } });
		console.log(houses);
		res.status(200).json(houses);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post("/add", async (req, res) => {
	console.log("i am here =>", req.body);

	const { categoryId, houseId } = req.body;
	try {
		const house = await House.findByIdAndUpdate(houseId, {
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
		res.status(200).json(category);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
router.post("/remove", async (req, res) => {
	console.log("i am here =>", req.body);

	const { categoryId, houseId } = req.body;
	try {
		const house = await House.findByIdAndUpdate(houseId, {
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
		res.status(200).json(category);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
