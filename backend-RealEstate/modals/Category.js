const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const CategorySchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		img: { type: "String" },
		house: [{ type: ObjectId, ref: "House" }],
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
