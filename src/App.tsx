import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { useData } from "./contexts/DataContext";
import { useEffect } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import useTheme from "./hooks/useTheme";

// for route management
export default function App() {
	const { darkMode, setDarkMode } = useTheme();

	return (
		<Routes>
			<Route path="/" element={<InitialRedirector />} />
			<Route
				path="/:lang"
				element={
					<LanguageLayout
						darkMode={darkMode}
						setDarkMode={setDarkMode}
					/>
				}
			></Route>
		</Routes>
	);
}

/**
 * The Loading can't be put in one function
 * since it will make flash between fetch initial data and translations
 */

// redirect to the first supported language
function InitialRedirector() {
	const { supportedLangs, isLoading } = useData();

	if (isLoading) return <LoadingScreen />;

	const userLang = navigator.language.split("-")[0];
	const langToRedirect =
		supportedLangs.find((l) => l.code === userLang)?.code ||
		supportedLangs[0].code;

	return <Navigate to={`/${langToRedirect}`} replace />;
}

// handle language change
function LanguageLayout({
	darkMode,
	setDarkMode,
}: {
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { lang } = useParams();
	const { supportedLangs, loadContentForLang, isLoading } = useData();

	useEffect(() => {
		if (lang && supportedLangs.find((l) => l.code === lang)) {
			loadContentForLang(lang);
		}
	}, [lang]);

	if (isLoading) return <LoadingScreen />;

	return (
		<div className="min-h-screen text-black dark:text-white bg-gray-200 dark:bg-zinc-900">
			<Background darkMode={darkMode} />
			<Header darkMode={darkMode} setDarkMode={setDarkMode} />
			<main>
				<Outlet />
			</main>

		</div>
	);
}
