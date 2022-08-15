import React from "react";

// import link
import { Link } from "react-router-dom";
// import logo
import Logo from "../assets/img/logo.png";

const Header = () => {
	return (
		<header className="py-6 mb-12 border-b">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/">
					<img style={{ maxWidth: "100px" }} src={Logo} alt="" />
				</Link>
				<div className="flex items-center gap-6">
					<Link className="hover:text-red-600 transition" to="/">
						Log in
					</Link>
					<Link
						className="bg-red-500 hover:bg-red-800 text-white px-4 py-3 rounded-lg transition"
						to="/"
					>
						Sign up
					</Link>
					<Link
						className="bg-red-500 hover:bg-red-800 text-white px-4 py-3 rounded-lg transition"
						to="/newhouse"
					>
						Create Property
					</Link>
					<Link
						className="bg-red-500 hover:bg-red-800 text-white px-4 py-3 rounded-lg transition"
						to="/newcategory"
					>
						Create Category
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
