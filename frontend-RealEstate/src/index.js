import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import HouseContextProvider from "./components/HouseContext";
import { BrowserRouter as Router } from "react-router-dom";
// react query
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
	<Router>
		<HouseContextProvider>
			<React.StrictMode>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</React.StrictMode>
		</HouseContextProvider>
	</Router>
);
