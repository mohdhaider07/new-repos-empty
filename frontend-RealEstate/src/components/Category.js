import React, { useState } from "react";
import { HouseContext } from "./HouseContext";

const Category = ({
	item,
	setSelectedCat,
	slectedCat,
	setCatId,
	setBannerImg,
}) => {
	// console.log(localStorage.getItem("catId"));
	return (
		<div
			className={
				slectedCat === item._id
					? "px-6 py-2  cursor-pointer border"
					: "px-6 py-2  cursor-pointer border border-red-500"
			}
			onClick={() => {
				setCatId(item._id);
				setBannerImg(item.img);
				setSelectedCat(item._id);
			}}
		>
			{item.title}
		</div>
	);
};

export default Category;
