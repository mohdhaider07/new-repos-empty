import React, { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { Link, useParams } from "react-router-dom";
//mui
import { DataGrid } from "@mui/x-data-grid";
// file upload and delerte function firebase
import { handleFile, handleDelete } from "../functions/firebase";

const NewHouse = () => {
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [description, setDescription] = useState("");
	const [country, setCountry] = useState("");
	const [address, setAddress] = useState("");
	const [bedrooms, setBedrooms] = useState("");
	const [bathrooms, setBathrooms] = useState("");
	const [surface, setSurface] = useState("");
	const [year, setYear] = useState("");
	const [price, setPrice] = useState("");
	const [specification, setSpecification] = useState("");
	const [amenities, setAmenities] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState();
	const [imageLg, setImageLg] = useState();
	const [legalDocument, setLegalDocument] = useState();
	const [costSheet, setCostSheet] = useState();
	const [paymentPlan, setPaymentPlan] = useState();
	const [floorPlans, setFloorPlans] = useState([]);
	const [layoutPlans, setLayoutPlans] = useState([]);
	const [locationPlans, setLocationPlans] = useState([]);
	const [gallery, setGallery] = useState([]);
	const [possesion, setPossesion] = useState([]);
	const [nonCatHouse, setnonCatHouse] = useState([]);
	const [catHouse, setCatHouse] = useState([]);
	const [property, setProperty] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		id && fetchPropery();
		id && getNonCatHouse();
		id && getCatHouse();
	}, [id]);

	const fetchPropery = async () => {
		try {
			const { data } = await publicRequest.get(`/house/${id}`);
			// console.log(data);
			setProperty(data);
			setName(data.name);
			setType(data.type);
			setDescription(data.description);
			setCountry(data.country);
			setAddress(data.address);
			setBedrooms(data.bedrooms);
			setBathrooms(data.bathrooms);
			setSurface(data.surface);
			setYear(data.year);
			setPrice(data.price);
			setSpecification(data.specification);
			setAmenities(data.amenities);
			setImage(data.image);
			setImageLg(data.imageLg);
			setFloorPlans(data.floorplans);
			setLayoutPlans(data.layoutplans);
			setLocationPlans(data.locationPlans);
			setGallery(data.gallery);
			setPossesion(data.possesion);
			setLegalDocument(data.legalDocument);
			setCostSheet(data.costSheet);
			setPaymentPlan(data.paymentPlan);
		} catch (e) {
			console.log(e);
		}
	};

	const getNonCatHouse = async () => {
		try {
			const { data } = await publicRequest.get(`/house/noncat-house/${id}`);

			setnonCatHouse(data);
		} catch (e) {
			console.log(e);
		}
	};
	const getCatHouse = async () => {
		try {
			const { data } = await publicRequest.get(`/house/cat-house/${id}`);

			setCatHouse(data);
		} catch (e) {
			console.log(e);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		try {
			const { data } = await publicRequest.put(`/house/${id}`, {
				name,
				type,
				description,
				country,
				address,
				bedrooms,
				bathrooms,
				surface,
				year,
				price,
				specification,
				amenities,
				image,
				imageLg,
				floorplans: floorPlans,
				layoutplans: layoutPlans,
				locationPlans,
				gallery,
				possesion,
				legalDocument,
				costSheet,
				paymentPlan,
			});

			console.log("updated");
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
			console.log(e);
		}
	};

	const handleAdd = async (categoryId) => {
		if (!id) return;

		try {
			const { data } = await publicRequest.post("/house/add", {
				categoryId,
				houseId: id,
			});
			fetchPropery();
			console.log("added");
		} catch (err) {
			console.log(err);
		}
	};

	const handleRemove = async (categoryId) => {
		if (!id) return;

		try {
			const { data } = await publicRequest.post("/house/remove", {
				categoryId,
				houseId: id,
			});
			fetchPropery();
			console.log("removed");
		} catch (err) {
			console.log(err);
		}
	};

	const columns = [
		{
			field: "title",
			headerName: "Title",
			width: 250,
			renderCell: (params) => {
				return (
					<Link to={`/category/${params.row._id}`}>
						<div className="flex  items-center">
							{params.row.img && (
								<img
									className="h-8 w-8 mr-2 rounded-full"
									src={params.row.img}
									alt="img"
								/>
							)}
							{params.row.title}
						</div>
					</Link>
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
						{property &&
						property.category &&
						!property.category.includes(params.row._id) ? (
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
		<div className="min-h-screen bg-gray-200">
			<div className=" flex justify-center   gap-5">
				<form
					onSubmit={handleSubmit}
					className="flex border mt-8 bg-white space-y-2 p-6 mb-4 flex-col max-w-[468px]"
				>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setType(e.target.value)}
						value={type}
						type="text"
						name="type"
						placeholder="Type"
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setName(e.target.value)}
						value={name}
						type="text"
						name="name"
						placeholder="Name"
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setDescription(e.target.value)}
						value={description}
						type="text"
						name="description"
						placeholder="Description"
					/>
					<label className="text-red-700">Small Image </label>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) =>
							handleFile(e.target.files[0], setImage, false)
						}
						type="file"
						name="image"
						placeholder="Small Image"
					/>
					{image && (
						<div className="relative flex  w-fit">
							<img className="h-20 object-cover" src={image} alt="img" />
							<span
								onClick={() => handleDelete(image, setImage)}
								className="absolute cursor-pointer  flex -top-2 right-0 rounded-full p-1 pr-0 font-bold bg-white bg-opacity-60 "
							>
								X
							</span>
						</div>
					)}
					<label className="text-red-700">Large Image</label>
					<input
						className="focus:outline-none border input_box"
						type="file"
						onChange={(e) =>
							handleFile(e.target.files[0], setImageLg, false)
						}
						name="imageLg"
						placeholder="Image LG"
					/>
					{imageLg && (
						<div className="relative flex  w-fit">
							<img
								className="h-20  object-cover"
								src={imageLg}
								alt="img"
							/>
							<span
								onClick={() => handleDelete(imageLg, setImageLg)}
								className="absolute cursor-pointer  flex -top-2 right-0 rounded-full p-1 pr-0 font-bold bg-white bg-opacity-60 "
							>
								X
							</span>
						</div>
					)}
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setCountry(e.target.value)}
						value={country}
						type="text"
						name="country"
						placeholder="Country"
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setAddress(e.target.value)}
						value={address}
						type="text"
						name="address"
						placeholder="Address"
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setBedrooms(e.target.value)}
						value={bedrooms}
						type="text"
						name="bedrooms"
						placeholder="Bed Rooms"
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setBathrooms(e.target.value)}
						value={bathrooms}
						type="text"
						name="bathrooms"
						placeholder="Bath Rooms"
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setSurface(e.target.value)}
						value={surface}
						type="text"
						name="surface"
						placeholder="Surface Area "
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setYear(e.target.value)}
						value={year}
						type="text"
						name="year"
						placeholder="Year"
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setPrice(e.target.value)}
						value={price}
						type="text"
						name="price"
						placeholder="Price"
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setSpecification(e.target.value)}
						value={specification}
						type="text"
						name="specification"
						placeholder="Specification"
					/>
					<input
						className="focus:outline-none border input_box"
						onChange={(e) => setAmenities(e.target.value)}
						value={amenities}
						type="text"
						name="amenities"
						placeholder="Amenities"
					/>
					<label className="text-red-700">Floor Plans</label>
					<input
						onChange={(e) =>
							handleFile(
								e.target.files[0],
								setFloorPlans,
								true,
								floorPlans
							)
						}
						className="focus:outline-none border input_box"
						type="file"
						name="floorplans"
						placeholder="floorplans"
					/>
					{floorPlans.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{floorPlans.map((img) => (
								<div key={img} className="relative flex  w-fit">
									<img
										className="h-20  object-cover"
										src={img}
										alt="img"
									/>
									<span
										onClick={() =>
											handleDelete(
												img,
												setFloorPlans,
												true,
												floorPlans
											)
										}
										className="absolute cursor-pointer  flex -top-2 right-0 rounded-full p-1 pr-0 font-bold bg-white bg-opacity-60 "
									>
										X
									</span>
								</div>
							))}
						</div>
					)}
					<label className="text-red-700">Layout Plans</label>
					<input
						onChange={(e) =>
							handleFile(
								e.target.files[0],
								setLayoutPlans,
								true,
								layoutPlans
							)
						}
						className="focus:outline-none border input_box"
						type="file"
						name="layoutplans"
						placeholder="Layout Plans"
					/>
					{layoutPlans.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{layoutPlans.map((img) => (
								<div key={img} className="relative flex  w-fit">
									<img
										className="h-20  object-cover"
										src={img}
										alt="img"
									/>
									<span
										onClick={() =>
											handleDelete(
												img,
												setLayoutPlans,
												true,
												layoutPlans
											)
										}
										className="absolute cursor-pointer  flex -top-2 right-0 rounded-full p-1 pr-0 text-red-800 font-bold bg-white bg-opacity-60 "
									>
										X
									</span>
								</div>
							))}
						</div>
					)}
					<label className="text-red-700">Location Plans</label>
					<input
						onChange={(e) =>
							handleFile(
								e.target.files[0],
								setLocationPlans,
								true,
								locationPlans
							)
						}
						className="focus:outline-none border input_box"
						type="file"
						name="layoutplans"
						placeholder="Layout Plans"
					/>
					{locationPlans.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{locationPlans.map((img) => (
								<div key={img} className="relative flex  w-fit">
									<img
										className="h-20  object-cover"
										src={img}
										alt="img"
									/>
									<span
										onClick={() =>
											handleDelete(
												img,
												setLocationPlans,
												true,
												locationPlans
											)
										}
										className="absolute cursor-pointer  flex -top-2 right-0 rounded-full p-1 pr-0 text-red-800 font-bold bg-white bg-opacity-60 "
									>
										X
									</span>
								</div>
							))}
						</div>
					)}

					{/* pdf */}
					<label className="text-red-700">
						Legal Document
						<span className="text-black">(pdf)</span>
					</label>
					<input
						className="focus:outline-none border input_box"
						type="file"
						onChange={(e) =>
							handleFile(e.target.files[0], setLegalDocument, false)
						}
						name="legalDocument"
						placeholder="Image LG"
					/>
					{legalDocument && (
						<div className=" flex flex-col   w-fit">
							{/* <img
								className="h-20  object-cover"
								src=" https://firebasestorage.googleapis.com/v0/b/real-state-24b54.appspot.com/o/1660417630517Haider's%20Resume.pdf?alt=media&token=2d022518-3014-4ffb-8dd8-9a5e0480da8d"
								alt="img"
							/> */}
							<iframe
								src={`http://docs.google.com/gview?embedded=true&url=${legalDocument}`}
								width="300px"
								height="200px"
							/>
							<span
								onClick={() =>
									handleDelete(legalDocument, setLegalDocument)
								}
								className=" cursor-pointer  flex p-2 mt-2 text-center w-fit text-white rounded-md bg-red-600 hover:bg-red-800   "
							>
								Delete
							</span>
						</div>
					)}
					{/* pdf */}
					<label className="text-red-700">
						Cost Sheet
						<span className="text-black">(pdf)</span>
					</label>
					<input
						className="focus:outline-none border input_box"
						type="file"
						onChange={(e) =>
							handleFile(e.target.files[0], setCostSheet, false)
						}
						name="legalDocument"
						placeholder="Image LG"
					/>
					{costSheet && (
						<div className="relative flex  flex-col w-fit">
							<iframe
								src={`http://docs.google.com/gview?embedded=true&url=${costSheet}`}
								width="300px"
								height="200px"
							/>
							<span
								onClick={() => handleDelete(costSheet, setCostSheet)}
								className=" cursor-pointer  flex p-2 mt-2 text-center w-fit text-white rounded-md bg-red-600 hover:bg-red-800   "
							>
								Delete
							</span>
						</div>
					)}
					<label className="text-red-700">
						Payment Plan
						<span className="text-black">(pdf)</span>
					</label>
					<input
						className="focus:outline-none border input_box"
						type="file"
						onChange={(e) =>
							handleFile(e.target.files[0], setPaymentPlan, false)
						}
						name="legalDocument"
						placeholder="Image LG"
					/>
					{paymentPlan && (
						<div className="relative flex flex-col  w-fit">
							<iframe
								src={`http://docs.google.com/gview?embedded=true&url=${paymentPlan}`}
								width="300px"
								height="200px"
							/>
							<span
								onClick={() =>
									handleDelete(paymentPlan, setPaymentPlan)
								}
								className=" cursor-pointer  flex p-2 mt-2 text-center w-fit text-white rounded-md bg-red-600 hover:bg-red-800   "
							>
								Delete
							</span>
						</div>
					)}

					<label className="text-red-700">Gallery</label>
					<input
						onChange={(e) =>
							handleFile(e.target.files[0], setGallery, true, gallery)
						}
						className="focus:outline-none border input_box"
						type="file"
						name="layoutplans"
						placeholder="Layout Plans"
					/>
					{gallery.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{gallery.map((img) => (
								<div key={img} className="relative flex  w-fit">
									<img
										className="h-20  object-cover"
										src={img}
										alt="img"
									/>
									<span
										onClick={() =>
											handleDelete(img, setGallery, true, gallery)
										}
										className="absolute cursor-pointer  flex -top-2 right-0 rounded-full p-1 pr-0 text-red-500 font-bold bg-white bg-opacity-60 "
									>
										X
									</span>
								</div>
							))}
						</div>
					)}
					<label className="text-red-700">Possesion</label>
					<input
						onChange={(e) =>
							handleFile(
								e.target.files[0],
								setPossesion,
								true,
								possesion
							)
						}
						className="focus:outline-none border input_box"
						type="file"
						name="layoutplans"
						placeholder="Layout Plans"
					/>
					{possesion.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{possesion.map((img) => (
								<div key={img} className="relative flex  w-fit">
									<img
										className="h-20  object-cover"
										src={img}
										alt="img"
									/>
									<span
										onClick={() =>
											handleDelete(
												img,
												setPossesion,
												true,
												possesion
											)
										}
										className="absolute cursor-pointer  flex -top-2 right-0 rounded-full p-1 pr-0 text-red-500 font-bold bg-white bg-opacity-60 "
									>
										X
									</span>
								</div>
							))}
						</div>
					)}
					<button
						disabled={isLoading}
						className="bg-red-500 mt-3 hover:bg-red-800 text-white px-4 py-3 rounded-lg transition"
					>
						{isLoading ? "Updating..." : "Update"}
					</button>
				</form>
				<div className="space-y-4 mt-8">
					<div
						className="bg-white p-4"
						style={{ height: "400px", width: "450px" }}
					>
						<DataGrid
							rows={nonCatHouse}
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
							rows={catHouse}
							columns={columns}
							getRowId={(row) => row._id}
							rowsPerPageOptions={[5, 10, 15, 100]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewHouse;
