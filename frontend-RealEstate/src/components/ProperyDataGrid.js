import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { publicRequest } from "../requestMethods";
// rect icons
import { MdDelete } from "react-icons/md";
// Get all properties
const getCayegories = async () => {
	const { data } = await publicRequest.get("/house/");
	return data;
};

const deleteProperty = async (_id) => {
	const { data } = await publicRequest.delete(`/house/${_id}`);
	return data;
};
const ProperyDataGrid = () => {
	const { data, isLoading, error, isError } = useQuery(
		"properties",
		getCayegories
	);

	const { mutate } = useMutation(deleteProperty);

	const handleDelete = (_id) => {
		console.log(_id);
		mutate(_id);
	};

	const columns = [
		{ field: "_id", headerName: "ID", width: 280 },
		{
			field: "title",
			headerName: "Title",
			width: 200,
			renderCell: (params) => {
				return (
					<div style={{}} className="flex  items-center">
						<img
							className="h-8 w-8 mr-2 rounded-full"
							src={params.row.image}
							alt="img"
						/>
						{params.row.name}
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

	return (
		<>
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
};

export default ProperyDataGrid;
