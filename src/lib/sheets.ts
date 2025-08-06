import Papa from "papaparse";

const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
export function fetchData(sheetName: string): Promise<Record<string, any>[]> {
	const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
	return new Promise((resolve, reject) => {
		Papa.parse(sheetUrl, {
			download: true, 
			header: true,
			dynamicTyping: true, // Converts numbers and booleans
			complete: (results) => {
				resolve(results.data as Record<string, any>[]);
			},
			error: (error) => {
				console.error(`Error fetching sheet "${sheetName}":`, error);
				reject(error);
			},
		});
	});
}

export async function fetchTranslations(sheetName: string) {
	const data = await fetchData(sheetName);
	return data.reduce((acc: Record<string, Record<string, string>>, item) => {
		const { group, key, value } = item;
		if (!acc[group]) {
			acc[group] = {};
		}
		acc[group][key] = value;
		return acc;
	}, {});
}
