import React, { useState } from "react";
import { useMutation } from "react-query";
import { publicRequest } from "../requestMethods";

const NewCategory = () => {
	const [inputs, setInputs] = useState({});

	// react query functions
	const create = async (e) => {
		const { data } = await publicRequest.post("/category/", inputs);
		return data;
	};

	const { isLoading, isError, mutate } = useMutation(create);

	const handleSubmit = (e) => {
		e.preventDefault();
		mutate({ id: Date.now(), inputs });
	};

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

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
