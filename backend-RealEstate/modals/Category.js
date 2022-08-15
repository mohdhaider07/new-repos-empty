const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const CategorySchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		house: [{ type: ObjectId, ref: "House" }],
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
