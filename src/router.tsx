import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewOrderPage from "./pages/NewOrderPage";
import Layout from "./components/Layout";
import EditOrder from "./pages/EditOrder";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="neworder" element={<NewOrderPage />} />
					<Route path="edit/order/:id" element={<EditOrder />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
