import React, { useState } from "react";
import { useMutation } from "react-query";
import { publicRequest } from "../requestMethods";
// firebase function to upload Image
import { handleFile } from "../functions/firebase";
// fire base function to delete image
import { handleDelete } from "../functions/firebase";
const NewCategory = () => {
	const [inputs, setInputs] = useState({});
	const [img, setImg] = useState("");

	// react query functions
	const create = async (e) => {
		const { data } = await publicRequest.post("/category/", {
			...inputs,
			img,
		});
		return data;
	};

	const { isLoading, isError, mutate } = useMutation(create);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputs);
		mutate({ id: Date.now(), inputs });
	};

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	console.log(img);
	return (
		<div className="min-h-screen">
			<form
				onSubmit={handleSubmit}
				className="flex border space-y-2 p-4 mb-4 flex-col mx-auto max-w-[468px]"
			>
				<input
					onChange={handleChange}
					className="focus:outline-none border input_box"
					type="text"
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
					{isLoading ? "Creating..." : "Create"}
				</button>
			</form>
		</div>
	);
};

export default NewCategory;
