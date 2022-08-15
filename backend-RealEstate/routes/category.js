const router = require("express").Router();
const Category = require("../modals/Category");

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

module.exports = router;
