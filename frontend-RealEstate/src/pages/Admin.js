import React, { useState } from "react";
import { Link } from "react-router-dom";
//mui

// components
import SideBar from "../components/SideBar";
import ProductDataGrid from "../components/ProductDataGrid";
import CategoryDataGrid from "../components/CategoryDataGrid";
const Admin = () => {
	const [selectedTab, setSelectedTab] = useState("Categories");
	return (
		<div className="min-h-screen ">
			<div className="   flex justify-end space-x-2 lg:mr-[60px] md:mr-[50px] sm:mr-[35px] mr-[10px]">
				<Link
					className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded-lg transition"
					to="/newhouse"
				>
					Create Property
				</Link>
				<Link
					className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded-lg transition"
					to="/newcategory"
				>
					Create Category
				</Link>
			</div>
			<div className="flex">
				<div className="w-[20%]">
					<SideBar setSelectedTab={setSelectedTab} />
				</div>
				{selectedTab === "Categories" && (
					<div className="w-[80%]">
						<CategoryDataGrid />
					</div>
				)}
				{selectedTab === "Products" && (
					<div className="w-[80%]">
						<ProductDataGrid />
					</div>
				)}
			</div>
		</div>
	);
};

export default Admin;
