import React from "react";
import { BiCategory, BiBuildingHouse } from "react-icons/bi";
const SideBar = ({ setSelectedTab }) => {
	return (
		<aside className="w-full" aria-label="Sidebar">
			<div className="overflow-y-auto py-4 px-3  ">
				<ul className="space-y-2">
					<li onClick={() => setSelectedTab("Categories")}>
						<span className="flex items-center p-2 text-base font-normal cursor-pointer hover:text-red-600 text-gray-900 rounded-lg  hover:bg-gray-100 ">
							<BiCategory className=" flex-shrink-0 text-red-600 text-xl" />

							<span className="flex-1 ml-3  whitespace-nowrap">
								Categories
							</span>
						</span>
					</li>

					<li onClick={() => setSelectedTab("Houses")}>
						<span className="flex items-center p-2 text-base font-normal cursor-pointer hover:text-red-600 text-gray-900 rounded-lg  hover:bg-gray-100 ">
							<BiBuildingHouse className=" flex-shrink-0 text-red-600 text-xl" />
							<span className="flex-1 ml-3 whitespace-nowrap">
								Properties
							</span>
						</span>
					</li>
				</ul>
			</div>
		</aside>
	);
};

export default SideBar;
