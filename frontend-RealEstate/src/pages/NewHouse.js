import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// firebase
import {
	getStorage,
	deleteObject,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
const NewHouse = () => {
	const [inputs, setInputs] = useState({});
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

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(image);
		console.log(imageLg);
		setIsLoading(true);
		try {
			const { data } = await axios.post("http://localhost:5000/api/house/", {
				...inputs,
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

			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
			console.log(e);
		}
	};

	const handleDelete = async (url, setfile, isMulImg, file) => {
		try {
			const storage = getStorage(app);
			const storageRef = ref(storage, url);
			await deleteObject(storageRef);
			if (isMulImg) {
				const filteredImg = file.filter((img) => img !== url);
				// console.log(filteredImg)
				setfile(filteredImg);
			} else {
				setfile("");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleFile = (file, setFile, bool, files) => {
		const fileName = new Date().getTime() + file.name;
		console.log(file);

		const storage = getStorage(app);
		const storageRef = ref(storage, fileName);

		const metadata = {
			contentType: "image/*",
		};
		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						alert("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case "storage/unauthorized":
						// User doesn't have permission to access the object
						break;
					case "storage/canceled":
						// User canceled the upload
						break;

					// ...

					case "storage/unknown":
						alert("Unknown error occurred, inspect error.serverResponse");
						// Unknown error occurred, inspect error.serverResponse
						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);

					// console.log(downloadURL);
					if (bool) {
						console.log("i am here 96");
						setFile([...files, downloadURL]);
					} else {
						console.log("i am here99");
						setFile(downloadURL);
					}
					// const product={...inputs,img:downloadURL,categories:cat,size,color}
					// console.log({...inputs,img:downloadURL,categories:cat,size,color})

					console.log("Image Uploaded");
					// addProduct(product,dispatch);
				});
			}
		);
		return false;
	};
	useState(() => {
		console.log(image);
	}, [image]);
	return (
		<div className="min-h-screen">
			<div className="  ">
				<form
					onSubmit={handleSubmit}
					className="flex border space-y-2 p-4 mb-4 flex-col mx-auto max-w-[468px]"
				>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="type"
						placeholder="Type"
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="name"
						placeholder="Name"
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
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
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="country"
						placeholder="Country"
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="address"
						placeholder="Address"
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="bedrooms"
						placeholder="Bed Rooms"
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="bathrooms"
						placeholder="Bath Rooms"
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="surface"
						placeholder="Surface Area "
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="year"
						placeholder="Year"
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="price"
						placeholder="Price"
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
						type="text"
						name="specification"
						placeholder="Specification"
					/>
					<input
						onChange={handleChange}
						className="focus:outline-none border input_box"
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
						{isLoading ? "Loading..." : "Create"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewHouse;
