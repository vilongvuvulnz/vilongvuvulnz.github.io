import Papa from "papaparse";
import type {
	certificateRow,
	projectRow,
	supportedLangRow,
	translations,
} from "../types/global";

const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
function fetchData(sheetName: string): Promise<Record<string, unknown>[]> {
	const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
	return new Promise((resolve, reject) => {
		Papa.parse(sheetUrl, {
			download: true,
			header: true,
			complete: (results) => {
				resolve(results.data as Record<string, unknown>[]);
			},
			error: (error) => {
				console.error(`Error fetching sheet "${sheetName}":`, error);
				reject(error);
			},
		});
	});
}

function isSupportedLangRow(item: unknown): item is supportedLangRow {
	const i = item as supportedLangRow;
	const isValid =
		typeof i === "object" &&
		i !== null &&
		typeof i.code === "string" &&
		typeof i.name === "string" &&
		typeof i.sheetName === "string";

	if (!isValid) {
		console.error("Invalid supported lang row:", item);
	}
	return isValid;
}

interface projectFromSource extends Omit<projectRow, "images"> {
	tech_stack: string;
	images: string;
}

function isProjectRow(item: unknown): item is projectFromSource {
	const i = item as projectFromSource;
	const isValid =
		typeof i === "object" &&
		i !== null &&
		typeof i.name === "string" &&
		typeof i.tech_stack === "string" &&
		typeof i.thumbnail === "string" &&
		typeof i.link === "string" &&
		typeof i.github_link === "string" &&
		typeof i.images === "string" &&
		typeof i.type === "string";

	if (!isValid) {
		console.error("Invalid project row:", item);
	}
	return isValid;
}

function isCertificateRow(item: unknown): item is certificateRow {
	const i = item as certificateRow;
	const isValid =
		typeof i === "object" &&
		i !== null &&
		typeof i.name === "string" &&
		typeof i.image === "string";

	if (!isValid) {
		console.error("Invalid certificate row:", item);
	}

	return isValid;
}

interface translationFromSource {
	group: string;
	key: string;
	value: string;
}

function isTranslationRow(item: unknown): item is translationFromSource {
	const i = item as translationFromSource;
	const isValid =
		typeof i === "object" &&
		i !== null &&
		typeof i.group === "string" &&
		typeof i.key === "string" &&
		typeof i.value === "string";

	if (!isValid) {
		console.error("Invalid translation row:", item);
	}

	return isValid;
}

export async function fetchTranslations(
	sheetName: string,
): Promise<translations> {
	const data = await fetchData(sheetName);
	return data.reduce((acc: Record<string, Record<string, string>>, item) => {
		if (isTranslationRow(item)) {
			const { group, key, value } = item;

			if (!acc[group]) {
				acc[group] = {};
			}
			acc[group][key] = value;
		}
		return acc;
	}, {});
}

export async function fetchSupportedLangs(): Promise<supportedLangRow[]> {
	const data = await fetchData("supportedLangs");
	return data.filter((item) => isSupportedLangRow(item));
}

export async function fetchProject(): Promise<projectRow[]> {
	const data = await fetchData("Projects");
	const validRows = data.filter((item) => isProjectRow(item));

	return validRows.map((item) => {
		const imageUrls = item.images
			? item.images.split(",").map((url) => url.trim())
			: [];
		const techStack = item.tech_stack
			? item.tech_stack.split(",").map((tech) => tech.trim())
			: [];

		return {
			...item,
			images: imageUrls,
			tech_stack: techStack,
		} as projectRow;
	});
}

export async function fetchCertificates(): Promise<certificateRow[]> {
	const data = await fetchData("Certificates");
	return data.filter((item) => isCertificateRow(item));
}
