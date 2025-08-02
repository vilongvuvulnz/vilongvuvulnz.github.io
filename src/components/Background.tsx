import { useTheme } from "../contexts/ThemeContext";

export default function Background() {
	const { darkMode } = useTheme();
	return (
		<div
			aria-label="Background"
			className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
		>
			{/* Grid Pattern */}
			<div className="absolute inset-0 opacity-20 dark:opacity-10">
				<div
					className="absolute top-0 left-0 right-0 bottom-0"
					style={{
						backgroundImage: `repeating-linear-gradient(0deg, ${
							darkMode ? "#ffffff" : "#000000"
						}, ${
							darkMode ? "#ffffff" : "#000000"
						} 1px, transparent 1px, transparent 80px),
                repeating-linear-gradient(90deg, 
                ${darkMode ? "#ffffff" : "#000000"}, ${
					darkMode ? "#ffffff" : "#000000"
				} 1px, transparent 1px, transparent 80px)`,
						backgroundSize: "80px 80px",
					}}
				></div>
			</div>

			{/* Diagonal Stripes */}
			<div
				className="absolute inset-0 opacity-10 dark:opacity-5"
				style={{
					backgroundImage: `repeating-linear-gradient(45deg, ${
						darkMode ? "#ffffff" : "#000000"
					} 0, ${
						darkMode ? "#ffffff" : "#000000"
					} 1px, transparent 0, transparent 20px)`,
					backgroundSize: "30px 30px",
				}}
			></div>
		</div>
	);
}
