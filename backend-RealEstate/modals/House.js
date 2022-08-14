const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const HouseSchema = mongoose.Schema(
	{
		type: { type: "String" },
		name: { type: "String", required: true },
		description: { type: "String" },
		image: { type: "String" },
		imageLg: { type: "String" },
		country: { type: "String" },
		address: { type: "String" },
		bedrooms: { type: "String" },
		bathrooms: { type: "String" },
		surface: { type: "String" },
		year: { type: "String" },
		price: { type: "String" },
		specification: { type: "String" },
		amenities: { type: "String" },
		floorplans: { type: Array },
		layoutplans: { type: Array },
		locationPlans: { type: Array },
		legalDocument: { type: "String" },
		costSheet: { type: "String" },
		paymentPlan: { type: "String" },
		gallery: { type: Array },
		possesion: { type: Array },
		// agent:{type:"String"},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("House", HouseSchema);
