const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const houseRoute = require("./routes/house");
const categoryRoute = require("./routes/category");
const cors = require("cors");

const app = express();

app.use(express.json());
dotenv.config();
//CORS
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	})
);

//DB
mongoose
	.connect(process.env.DB_KEY)
	.then(() => {
		console.log("DB connected");
	})
	.catch((error) => {
		console.log("DB error", error);
	});

// routes
app.use("/api/house", houseRoute);
app.use("/api/category", categoryRoute);

app.listen(process.env.PORT || 5000, () => {
	console.log(
		`server running on ${process.env.PORT ? process.env.PORT : "5000"} `
	);
});
