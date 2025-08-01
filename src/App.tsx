import Background from "./components/Background";
import useTheme from "./hooks/useTheme";

function App() {
	const { darkMode, setDarkMode } = useTheme();
	return (
		<>
			<Background darkMode={darkMode} />
		</>
	);
}

export default App;
