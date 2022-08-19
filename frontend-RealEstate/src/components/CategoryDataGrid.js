import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { publicRequest } from "../requestMethods";
// rect icons
import { MdDelete } from "react-icons/md";
//react query function
const getCayegories = async () => {
	const { data } = await publicRequest.get("/category/");
	return data;
};

const deleteCategory = async (_id) => {
	const { data } = await publicRequest.delete(`/category/${_id}`);
	return data;
};

function CategoryDataGrid() {
	const { data, isLoading, error, isError } = useQuery(
		"categories",
		getCayegories
	);

	const { mutate } = useMutation(deleteCategory);

	const columns = [
		{ field: "_id", headerName: "ID", width: 280 },
		{
			field: "title",
			headerName: "Title",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="flex items-center">
						{params.row.img && (
							<img
								className="h-8 w-8 mr-2 rounded-full"
								src={params.row.img}
								alt="img"
							/>
						)}
						{params.row.title}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/category/" + params.row._id}>
							<button className="p-2 hover:bg-gray-200 hover:text-red-400 rounded-full transition-all duration-500 cursor-pointer">
								Edit
							</button>
						</Link>

						<span
							onClick={() => handleDelete(params.row._id)}
							className="p-1 hover:bg-red-200 rounded-full transition-all duration-500 cursor-pointer"
						>
							<MdDelete className="text-xl   text-red-600 " />
						</span>
					</>
				);
			},
		},
	];

	const handleDelete = async (_id) => {
		console.log(_id);
		mutate(_id);
	};

	if (isError) {
		console.log(error);
	}

	return (
		<>
			{" "}
			<div style={{ height: "400px" }}>
				{data && (
					<DataGrid
						rows={data}
						columns={columns}
						getRowId={(row) => row._id}
						rowsPerPageOptions={[5, 10, 15, 100]}
					/>
				)}
			</div>
		</>
	);
}

export default CategoryDataGrid;
