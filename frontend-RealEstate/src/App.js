import React from "react";

import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import EditCategory from "./pages/EditCategory";

// import pages
import Home from "./pages/Home";
import NewCategory from "./pages/NewCategory";
import NewHouse from "./pages/NewHouse";
import PropertyDetails from "./pages/PropertyDetails";

const App = () => {
	return (
		<div className="max-w-[1440px] mx-auto bg-white">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/property/:id" element={<PropertyDetails />} />
				<Route path="/newhouse" element={<NewHouse />} />
				<Route path="/newcategory" element={<NewCategory />} />
				<Route path="/category/:id" element={<EditCategory />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
