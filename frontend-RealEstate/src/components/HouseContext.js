import React, { createContext, useState, useEffect } from "react";

import axios from "axios";
// import data
import { housesData } from "../data";

// create context
export const HouseContext = createContext();

// provider
const HouseContextProvider = ({ children }) => {
	// const [houses, setHouses] = useState(housesData);
	const [houses, setHouses] = useState([]);
	const [houseData, setHouseData] = useState([]);
	const [country, setCountry] = useState("Location (any)");
	const [countries, setCountries] = useState([]);
	const [property, setProperty] = useState("Property type (any)");
	const [properties, setProperties] = useState([]);
	const [price, setPrice] = useState("Price range (any)");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchHouses = async () => {
			try {
				const { data } = await axios.get(
					"http://localhost:5000/api/house/"
				);
				// console.log(data);
				setHouses(data);
				setHouseData(data);
			} catch (e) {
				console.log(e);
			}
		};
		fetchHouses();
	}, []);

	useEffect(() => {
		// return all countries
		function getuniqueCountries() {
			console.log(houses);
			const allCountries = houses.map((house) => {
				return house.country;
			});
			console.log("hello world!");
			console.log(allCountries);
			// remove duplicates
			const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

			// set countries state
			setCountries(uniqueCountries);
		}

		setTimeout(getuniqueCountries, 0);
	}, [houseData]);

	useEffect(() => {
		// return only countries
		const allProperties = houses.map((house) => {
			return house.type;
		});

		// remove duplicates
		const uniqueProperties = [
			"Property type (any)",
			...new Set(allProperties),
		];

		// set countries state
		setProperties(uniqueProperties);
	}, [houseData]);

	const handleClick = () => {
		setLoading(true);
		// check the string if includes '(any)'
		const isDefault = (str) => {
			return str.split(" ").includes("(any)");
		};

		// get first string (price) and parse it to number
		const minPrice = parseInt(price.split(" ")[0]);
		// get last string (price) and parse it to number
		const maxPrice = parseInt(price.split(" ")[2]);

		const newHouses = houses.filter((house) => {
			const housePrice = parseInt(house.price);
			// all values are selected
			if (
				house.country === country &&
				house.type === property &&
				housePrice >= minPrice &&
				housePrice <= maxPrice
			) {
				return house;
			}
			// all values are default
			if (isDefault(country) && isDefault(property) && isDefault(price)) {
				return house;
			}
			// country is not default
			if (!isDefault(country) && isDefault(property) && isDefault(price)) {
				return house.country === country;
			}
			// property is not default
			if (!isDefault(property) && isDefault(country) && isDefault(price)) {
				return house.type === property;
			}
			// price is not default
			if (!isDefault(price) && isDefault(country) && isDefault(property)) {
				if (housePrice >= minPrice && housePrice <= maxPrice) {
					return house;
				}
			}
			// country and property is not default
			if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
				return house.country === country && house.type === property;
			}
			// country and price is not default
			if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
				if (housePrice >= minPrice && housePrice <= maxPrice) {
					return house.country === country;
				}
			}
			// property and price is not default
			if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
				if (housePrice >= minPrice && housePrice <= maxPrice) {
					return house.type === property;
				}
			}
		});

		setTimeout(() => {
			return (
				newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
				setLoading(false)
			);
		}, 1000);
	};

	return (
		<HouseContext.Provider
			value={{
				country,
				setCountry,
				countries,
				property,
				setProperty,
				properties,
				price,
				setPrice,
				handleClick,
				houses,
				loading,
			}}
		>
			{children}
		</HouseContext.Provider>
	);
};

export default HouseContextProvider;
