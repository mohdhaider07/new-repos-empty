import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// firebase function to upload Image
import { handleFile } from "../functions/firebase";
// fire base function to delete image
import { handleDelete } from "../functions/firebase";

const EditCategory = () => {
	const [nonCatHouses, setNonCatHouses] = useState([]);
	const [category, setCategory] = useState([]);
	const [catHouses, setCatHouses] = useState([]);
	const [title, setTitle] = useState("");
	const [img, setImg] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		id && getCategory();
		id && getNonCatHouse();
		id && getCatHouse();
	}, []);
	//GETING CATEGORY DETAILS
	const getCategory = async () => {
		try {
			const { data } = await publicRequest.get(`/category/${id}`);
			setCategory(data);
			setTitle(data.title);
			setImg(data.img);
		} catch (e) {
			console.log(e);
		}
	};
	// FETCH PROPERTIES WHICH PRESENT IN THIS CATEGORY
	const getCatHouse = async () => {
		try {
			const { data } = await publicRequest.get(`/category/cat-house/${id}`);
			// console.log(data);
			setCatHouses(data);
		} catch (e) {
			console.log(e);
		}
	};
	// FETCH PROPERTIES WHICH NOT PRESENT IN THIS CATEGORY
	const getNonCatHouse = async () => {
		try {
			const { data } = await publicRequest.get(
				`/category/noncat-house/${id}`
			);
			// console.log(data);
			setNonCatHouses(data);
		} catch (e) {
			console.log(e);
		}
	};

	// UPDATING THE CATEGORY
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(title);
		console.log(id);
		setIsLoading(true);
		try {
			const { data } = await publicRequest.put(`/category/${id}`, {
				title,
				img,
			});
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
			console.log(e);
		}
	};

	// ADDING PROPERTIES IN THE CATEGORY
	const handleAdd = async (houseId) => {
		if (!id) return;

		try {
			const { data } = await publicRequest.post("/category/add", {
				houseId,
				categoryId: id,
			});
			getCategory();
			console.log("added");
		} catch (err) {
			console.log(err);
		}
	};

	const handleRemove = async (houseId) => {
		if (!id) return;

		try {
			const { data } = await publicRequest.post("/category/remove", {
				houseId,
				categoryId: id,
			});
			getCategory();
			console.log("removed");
		} catch (err) {
			console.log(err);
		}
	};
	const columns = [
		{
			field: "title",
			headerName: "Title",
			width: 160,
			renderCell: (params) => {
				return (
					<Link to={`/editproperty/${params.row._id}`}>
						<div className="productListItem">{params.row.name}</div>
					</Link>
				);
			},
		},
		{
			field: "type",
			headerName: "Type",
			width: 100,
			renderCell: (params) => {
				return (
					<div className="flex items-center">
						{params.row.image && (
							<img
								className="h-8 w-8 mr-2 rounded-full"
								src={params.row.image}
								alt="img"
							/>
						)}
						{params.row.type}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 80,
			renderCell: (params) => {
				return (
					<>
						{category &&
						category.house &&
						!category.house.includes(params.row._id) ? (
							<button
								onClick={() => handleAdd(params.row._id)}
								className="p-2 bg-green-400 text-white  rounded-lg transition-all duration-500 cursor-pointer"
							>
								Add
							</button>
						) : (
							<button
								onClick={() => handleRemove(params.row._id)}
								className="p-2 bg-red-600 text-white  rounded-lg transition-all duration-500 cursor-pointer"
							>
								Remove
							</button>
						)}
					</>
				);
			},
		},
	];

	return (
		<div className="min-h-screen flex space-x-4 bg-gray-50 justify-center  ">
			<form
				className="flex border h-fit mt-8  bg-white space-y-2 p-4 mb-4 flex-col max-w-[468px]"
				onSubmit={handleSubmit}
			>
				<input
					onChange={(e) => setTitle(e.target.value)}
					className="focus:outline-none border input_box"
					type="text"
					value={title}
					name="title"
					placeholder="Category title"
				/>
				<input
					onChange={(e) => {
						handleFile(e.target.files[0], setImg, false);
					}}
					className="focus:outline-none border input_box"
					type="file"
					name="image"
					placeholder="Category Image"
				/>
				{img && (
					<div className="relative flex  w-fit">
						<img className="h-20  object-cover" src={img} alt="img" />
						<span
							onClick={() => handleDelete(img, setImg, false)}
							className="absolute cursor-pointer text-red-600 flex -top-2 right-0 rounded-full p-1 pr-0 font-bold bg-white bg-opacity-60 "
						>
							X
						</span>
					</div>
				)}
				<button
					disabled={isLoading}
					className="bg-red-500 mt-3 hover:bg-red-800 text-white px-4 py-3 rounded-lg transition"
				>
					{isLoading ? "Updateing..." : "Update"}
				</button>
			</form>
			<div className=" flex flex-col space-y-3 mt-8  ">
				<div
					className="bg-white p-4"
					style={{ height: "400px", width: "450px" }}
				>
					<DataGrid
						rows={nonCatHouses}
						columns={columns}
						getRowId={(row) => row._id}
						rowsPerPageOptions={[5, 10, 15, 100]}
					/>
				</div>
				<div
					className="bg-white p-4"
					style={{ height: "400px", width: "450px" }}
				>
					<DataGrid
						rows={catHouses}
						columns={columns}
						getRowId={(row) => row._id}
						rowsPerPageOptions={[5, 10, 15, 100]}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditCategory;
