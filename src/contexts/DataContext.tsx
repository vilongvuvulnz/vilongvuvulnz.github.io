import {
	createContext,
	useState,
	useEffect,
	type ReactNode,
	useContext,
} from "react";
import { fetchData, fetchTranslations } from "../lib/sheets";

export const DataContext = createContext<{
	content: Record<string, any>;
	supportedLangs: Record<string, string>[];
	isLoading: boolean;
	loadContentForLang: (langCode: string) => Promise<void>;
} | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
	const [content, setContent] = useState<Record<string, any>>({
		projects: [],
		certificates: [],
		translations: {},
	});
	const [supportedLangs, setSupportedLangs] = useState<
		Record<string, string>[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
            try{
                const [projects, certificates, supportedLangs] = await Promise.all([
                    fetchData("projects"),
                    fetchData("certificates"),
                    fetchData("supportedLangs"),
                ]);
                
                setSupportedLangs(supportedLangs);
                setContent((prev) => ({
                    ...prev,
                    projects,
                    certificates,
                }));
            } catch (error) {
                console.error("Failed to load app data", error);
            } finally {
                setIsLoading(false);
            }
		};
        loadData();
	}, []);

	const loadContentForLang = async (langCode: string) => {
		setIsLoading(true);
		try {
			const langInfo = supportedLangs.find((l) => l.code === langCode);
			if (!langInfo) throw new Error("Unsupported language");

			// Fetch all data in parallel
			const translations = await fetchTranslations(langInfo.sheetName);
			setContent((prev) => ({
				...prev,
				translations,
			}));
		} catch (error) {
			console.error("Failed to load app data", error);
		} finally {
			setIsLoading(false);
		}
	};

	const value = {
		content,
		supportedLangs,
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
