import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import { publicRequest } from "../requestMethods";
import { HouseContext } from "./HouseContext";
import Category from "./Category";

const fetchCategories = async () => {
	const { data } = await publicRequest.get("/category");
	return data;
};

const Categories = () => {
	const [slectedCat, setSelectedCat] = useState("All");
	const { setCatId, bannerImg, setBannerImg } = useContext(HouseContext);
	const { data, error, isError, isLoading } = useQuery(
		"categories",
		fetchCategories
	);

	return (
		<div className=" px-[30px]  max-w-[1170px] mx-auto flex justify-center flex-wrap ">
			<div
				className={
					slectedCat === "All"
						? "px-6 py-2  cursor-pointer bg-slate-500 text-white "
						: "px-6 py-2  cursor-pointer bg-red-500  text-white "
				}
				onClick={() => {
					setBannerImg("");
					setCatId("");
					setSelectedCat("All");
				}}
			>
				All
			</div>
			{data &&
				data.map((item) => (
					<Category
						slectedCat={slectedCat}
						setSelectedCat={setSelectedCat}
						setCatId={setCatId}
						setBannerImg={setBannerImg}
						key={item._id}
						item={item}
					/>
				))}
		</div>
	);
};

export default Categories;
