import {
	createContext,
	useState,
	useEffect,
	type ReactNode,
	useContext,
} from "react";
import { fetchData, fetchTranslations } from "../lib/sheets";

interface Content {
	projects: Record<string, any>[];
	certificates: Record<string, any>[];
	translations: Record<string, Record<string, string>>;
	supportedLangs: Record<string, any>[];
	currentLang: string;
}

const DataContext = createContext<
	| (Content & {
			isLoading: boolean;
			loadContentForLang: (langCode: string) => Promise<void>;
	  })
	| null
>(null);

export function DataProvider({ children }: { children: ReactNode }) {
	const [content, setContent] = useState<Content>({
		projects: [],
		certificates: [],
		translations: {},
		supportedLangs: [],
		currentLang: "",
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const [projects, certificates, supportedLangs] =
					await Promise.all([
						fetchData("projects"),
						fetchData("certificates"),
						fetchData("supportedLangs"),
					]);

				setContent((prev) => ({
					...prev,
					supportedLangs,
					projects,
					certificates,
				}));
			} catch (error) {
				console.error("Failed to load app data", error);
			}
		};
		loadData();
	}, []);

	const loadContentForLang = async (langCode: string) => {
		setIsLoading(true);
		try {
			const langInfo = content.supportedLangs.find(
				(l) => l.code === langCode,
			);
			if (!langInfo) throw new Error("Unsupported language");

			// Fetch all data in parallel
			const translations = await fetchTranslations(langInfo.sheetName);
			setContent((prev) => ({
				...prev,
				translations,
				currentLang: langCode,
			}));
		} catch (error) {
			console.error("Failed to load app data", error);
		} finally {
			setIsLoading(false);
		}
	};

	const value = {
		...content,
		isLoading,
		loadContentForLang,
	};

	return (
		<DataContext.Provider value={value}>{children}</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}
