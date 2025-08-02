import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { DataProvider } from "./contexts/DataContext.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<DataProvider>
				<App />
			</DataProvider>
		</BrowserRouter>
	</StrictMode>,
);
