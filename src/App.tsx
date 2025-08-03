import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { useData } from "./contexts/DataContext";
import { useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Background from "./components/Background";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ErrorPage from "./pages/ErrorPage";

// for route management
export default function App() {
	return (
		<Routes>
			<Route path="/" element={<InitialRedirector />} />
			<Route path="/:lang" element={<LanguageLayout />}>
				<Route
					path="*"
					element={
						<ErrorPage
							error={new Error("Page not found")}
							errorCode="404"
						/>
					}
				/>
			</Route>
		</Routes>
	);
}

// redirect to the first supported language
function InitialRedirector() {
	const { supportedLangs } = useData();

	// since it still being fetched, show loading screen
	if (supportedLangs.length === 0) return <LoadingScreen />;

	const userLang = navigator.language.split("-")[0];
	const langToRedirect =
		supportedLangs.find((l) => l.code === userLang)?.code ||
		supportedLangs[0].code;

	return <Navigate to={`/${langToRedirect}`} replace />;
}

// handle language change
function LanguageLayout() {
	const { lang } = useParams();
	const { supportedLangs, loadContentForLang, isLoading } = useData();

	useEffect(() => {
		if (lang && supportedLangs.some((l) => l.code === lang)) {
			loadContentForLang(lang);
		}
	}, [lang, supportedLangs]);

	if (isLoading) return <LoadingScreen />;

	// if (!supportedLangs.some((l) => l.code === lang)) return <Navigate to="/" replace />;

	return (
		<div className="min-h-screen text-black dark:text-white bg-gray-200 dark:bg-zinc-900">
			<Background />
			<Header />
			<main>
				<Outlet />
			</main>
			<NavBar />
		</div>
	);
}
