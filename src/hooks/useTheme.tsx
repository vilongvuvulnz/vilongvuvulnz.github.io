import { useState, useEffect } from "react";

export default function useTheme() {
	const [darkMode, setDarkMode] = useState<boolean>(
		localStorage.getItem("theme") === "dark",
	);

	// Set the initial theme
	useEffect(() => {
		const theme = darkMode ? "dark" : "light";
		document.documentElement.classList.toggle("dark", darkMode);
		localStorage.setItem("theme", theme);
	}, [darkMode]);

	// Listen for system theme changes
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleThemeChange = (e: MediaQueryListEvent) => {
			setDarkMode(e.matches);
		};

		mediaQuery.addEventListener("change", handleThemeChange);
		return () =>
			mediaQuery.removeEventListener("change", handleThemeChange);
	}, []);

	return { darkMode, setDarkMode };
}
