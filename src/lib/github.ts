import z from "zod";
import { ContributionSchema, defaultContribution, type Contribution } from "./schemas";

async function fetchGithubContribution(): Promise<unknown> {
	const username = import.meta.env.VITE_GITHUB_LINK.split("/")[3];
	const baseURL = "https://github-stats.kiuyha.my.id/api/portofolio-data";
	const queryParams = new URLSearchParams({
		username: username,
		langs_count: import.meta.env.VITE_CONTRIBUTION_LANGS_COUNT || "10",
		include_all_commits:
			import.meta.env.VITE_CONTRIBUTION_INCLUDE_ALL_COMMITS || "false",
	});

	const response = await fetch(`${baseURL}?${queryParams.toString()}`);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
}

export async function fetchContribution(): Promise<Contribution> {
	const data = await fetchGithubContribution();
	const validResult = ContributionSchema.safeParse(data);
	if (!validResult.success) {
		console.error(
			"Invalid contribution data received from source:",
			z.prettifyError(validResult.error),
		);
		return defaultContribution;
	}

	return validResult.data;
}
