import React, { useEffect, useState } from "react";
import axios from "axios";

// import houseData
import { housesData } from "../data";
//  useParams
import { useParams } from "react-router-dom";
// import icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";
// import link
import { Link } from "react-router-dom";
import Tabs from "../components/Tabs";
import "../assets/App.css";

const PropertyDetails = () => {
	const [property, setProperty] = useState();
	const { id } = useParams();

	useEffect(() => {
		const getProperty = async () => {
			try {
				const { data } = await axios.get(
					`http://localhost:5000/api/house/${id}`
				);
				console.log(data);
				setProperty(data);
			} catch (e) {
				console.log(e);
			}
		};
		getProperty();
	}, [id]);

	// const property = housesData.find((house) => {
	// 	return house.id === parseInt(id);
	// });

	return (
		<>
			{property && (
				<div className="container mx-auto min-h-[800px] mb-14">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
						<div>
							<h2 className="text-2xl font-semibold">{property.name}</h2>
							<h3 className="text-lg mb-4">{property.address}</h3>
						</div>
						<div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
							<div className="bg-green-500 rounded-full text-white px-3 inline-block">
								{property.type}
							</div>
							<div className="bg-red-500 rounded-full text-white px-3 inline-block">
								{property.country}
							</div>
						</div>
						<div className="text-3xl font-semibold text-red-500">
							$ {property.price}
						</div>
					</div>
					<div className="flex flex-col items-start gap-8 lg:flex-row">
						<div className="max-w-[768px]">
							<div className="mb-8">
								<img src={property.imageLg} alt="" />
							</div>
							<div className="flex gap-x-6 text-gray-500 mb-6">
								<div className="flex gap-x-2 items-center">
									{/* <BiBed className='text-2xl' /> */}
									<div className="text-lg font-medium">
										{" "}
										Type: {property.bedrooms}
									</div>
								</div>
								<div className="flex gap-x-2 items-center">
									{/* <BiBath className='text-2xl' /> */}
									<div className="text-lg font-medium">
										Possesion: {property.bathrooms}
									</div>
								</div>
								<div className="flex gap-x-2 items-center">
									{/* <BiArea className='text-2xl' /> */}
									<div className="text-lg font-medium">
										Carpet Area: {property.surface}
									</div>
								</div>
							</div>
							{/* <p>{property.description}</p> */}

							<div className="flex flex-col items-start gap-8 lg:flex-row">
								<Tabs>
									<div label="About Project">
										<div>
											<h1 className="font-bold text-lg">
												Description
											</h1>
											<p>{property.description}</p>
										</div>
									</div>
									<div label="Specification">
										<h1 className="font-bold text-lg">
											Specification
										</h1>

										<p>{property.specification}</p>
										<p className="font-bold text-s">
											Concealed Plumbing
										</p>
										<p className="font-bold text-s">
											POP Plaster to Internal Walls
										</p>
										<p className="font-bold text-s">
											Electrical Wing Points
										</p>
										<p className="font-bold text-s">
											Vitrified Tiles Flooring
										</p>
										<p className="font-bold text-s">
											RCC Frame Structure
										</p>
									</div>
									<div label="Amenities">
										<h1 className="font-bold text-lg">Amenities</h1>
										{/* <br></br> */}
										{property.amenities}
									</div>
									<div label="Floor PLans">
										{property.floorplans && (
											<div className="grid grid-cols-3 border border-gray ">
												{property.floorplans.map((img) => (
													<div
														key={img}
														className="w-100 h-100 p-1"
													>
														<img src={img} alt="img" />
													</div>
												))}
											</div>
										)}
									</div>
									<div label="Layout PLans">
										{property.layoutplans && (
											<div className="grid grid-cols-3 border border-gray ">
												{property.layoutplans.map((img) => (
													<div
														key={img}
														className="w-100 h-100 p-1"
													>
														<img src={img} alt="img" />
													</div>
												))}
											</div>
										)}
									</div>
									<div label="Location Plans">
										{property.locationPlans && (
											<div className="grid grid-cols-3 border border-gray ">
												{property.locationPlans.map((img) => (
													<div
														key={img}
														className="w-100 h-100 p-1"
													>
														<img src={img} alt="img" />
													</div>
												))}
											</div>
										)}
									</div>
									<div label="Legal Documents">
										{property && (
											<Link
												className=""
												target="_blank"
												to={property.legalDocument}
											>
												<a>Legal Documents pdf </a>
											</Link>
										)}
									</div>
									<div label="Cost Sheet  ">
										{property && (
											<Link
												className=""
												target="_blank"
												to={property.costSheet}
											>
												<a>Cost Sheet pdf </a>
											</Link>
										)}
									</div>
									<div label="Payment Plan  ">
										{property && (
											<Link
												className=""
												target="_blank"
												to={property.paymentPlan}
											>
												<a>Payment Plan pdf </a>
											</Link>
										)}
									</div>
									<div label="Gallery">
										{property.gallery && (
											<div className="grid grid-cols-3 border border-gray ">
												{property.gallery.map((img) => (
													<div
														key={img}
														className="w-100 h-100 p-1"
													>
														<img src={img} alt="img" />
													</div>
												))}
											</div>
										)}
									</div>
									<div label="Possesion">
										{property.possesion && (
											<div className="grid grid-cols-3 border border-gray ">
												{property.possesion.map((img) => (
													<div
														key={img}
														className="w-100 h-100 p-1"
													>
														<img src={img} alt="img" />
													</div>
												))}
											</div>
										)}
									</div>
								</Tabs>
							</div>
						</div>

						<div className="flex-1 w-full mb-8 bg-white border border-gray-300 rounded-lg px-6 py-8">
							<div className="flex items-center gap-x-4 mb-8">
								<div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
									<img
										src="/static/media/agent1.ea208df5d703472c30ac.png"
										alt="agent image"
										// property.agent.image
									/>
								</div>
								<div>
									<div className="font-bold text-lg">
										{/* {property.agent.name}  */} Agent Name
									</div>
									<Link to="" className="text-red-700 text-sm">
										View listings
									</Link>
								</div>
							</div>
							<form className="flex flex-col gap-y-4">
								<input
									className="border border-gray-300 focus:border-red-700 rounded w-full px-4 h-14 text-sm outline-none"
									type="text"
									placeholder="Name*"
								/>
								<input
									className="border border-gray-300 focus:border-red-700 rounded w-full px-4 h-14 text-sm outline-none"
									type="text"
									placeholder="Email*"
								/>
								<input
									className="border border-gray-300 focus:border-red-700 rounded w-full px-4 h-14 text-sm outline-none"
									type="text"
									placeholder="Phone*"
								/>
								<textarea
									className="border border-gray-300 focus:border-red-700 rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none"
									type="text"
									placeholder="Message*"
									defaultValue="Hello, I am interested in [Modern apartment]"
								/>
								<div className="flex gap-x-2">
									<button
										className="bg-red-700 hover:bg-red-800 text-white rounded p-4 text-sm w-full transition"
										type="submit"
									>
										Send message
									</button>
									<button className="border border-red-700 text-red-700 hover:border-purple-600 hover:text-purple-600 rounded p-4 text-sm w-full transition">
										Call
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyDetails;
