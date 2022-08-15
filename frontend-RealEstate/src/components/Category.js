import React, { useState } from "react";

const Category = ({ item }) => {
	const [slectedCat, setSelectedCat] = useState("");
	console.log(slectedCat);
	return (
		<div
			className={
				slectedCat === item._id
					? "px-6 py-2  cursor-pointer border"
					: "px-6 py-2  cursor-pointer border border-red-500"
			}
			onClick={() => setSelectedCat(item._id)}
		>
			{item.title}
		</div>
	);
};

export default Category;
