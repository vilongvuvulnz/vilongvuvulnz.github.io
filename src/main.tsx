import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { DataProvider } from "./contexts/DataContext.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<DataProvider>
					<App />
				</DataProvider>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>,
);
