import { motion } from "framer-motion";
import { useData } from "../contexts/DataContext";
import { Mail } from "lucide-react";
import Button from "./Button";

export default function Footer() {
	const {
		translations: { details, translations: footer },
	} = useData();

	return (
		<footer className="flex flex-col gap-6 items-center justify-center py-10 border-t-2 border-zinc-900 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow-xl pb-25 md:pb-40">
			<div className="flex items-center gap-2">
				<Button
					href={
						footer?.["github-link"] || "https://github.com/kiuyha"
					}
					aria-label="see my github profile"
				>
					<img
						src="/github.svg"
						alt="github"
						width={25}
						height={25}
						className="dark:invert"
					/>
				</Button>

				<Button
					href={
						footer?.["linkedin-link"] ||
						"https://www.linkedin.com/in/ketut-shridhara-46bb792a5"
					}
					aria-label="see my linkedin profile"
				>
					<img
						src="/linkedin.svg"
						alt="linkedin"
						width={25}
						height={25}
						className="dark:invert"
					/>
				</Button>

				<Button
					href={`mailto:${details?.["personal-info-email-value"] || "ketutshridhara@gmail.com"}`}
					aria-label="send me an email"
				>
					<Mail size={25} />
				</Button>
			</div>

			<div className="flex flex-col items-center">
				<span className="font-semibold">
					&copy; {new Date().getFullYear()} { import.meta.env.VITE_FULL_NAME || 'Ketut Shridhara'}
				</span>
				<span className="text-sm">
					{footer?.["copyright"] || "All rights reserved"}
				</span>
			</div>
		</footer>
	);
}
