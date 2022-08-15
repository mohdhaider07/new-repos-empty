import React from "react";
import { useQuery } from "react-query";
import { publicRequest } from "../requestMethods";

import Category from "./Category";

const fetchCategories = async () => {
	const { data } = await publicRequest.get("/category");
	return data;
};

const Categories = () => {
	const { data, error, isError, isLoading } = useQuery(
		"categories",
		fetchCategories
	);
	return (
		<div className=" px-[30px]  max-w-[1170px] mx-auto flex justify-center flex-wrap ">
			{data && data.map((item) => <Category key={item._id} item={item} />)}
		</div>
	);
};

export default Categories;
