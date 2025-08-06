import { motion } from "framer-motion";
import { useData } from "../contexts/DataContext";
import { Mail } from "lucide-react";

export default function Footer() {
	const {
		translations: { details, translations: footer },
	} = useData();

	return (
		<footer className="flex flex-col gap-6 items-center justify-center py-10 border-t-2 border-zinc-900 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow-xl pb-25 md:pb-40">
			<div className="flex items-center gap-2">
				<motion.a
					href={
						footer?.["github-link"] || "https://github.com/kiuyha"
					}
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 0.9 }}
					className="px-3 py-2 flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
				>
					<img
						src="/github.svg"
						alt="github"
						width={25}
						height={25}
						className="dark:invert"
					/>
				</motion.a>

				<motion.a
					href={
						footer?.["linkedin-link"] ||
						"https://www.linkedin.com/in/ketut-shridhara-46bb792a5"
					}
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 0.9 }}
					className="px-3 py-2 flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
				>
					<img
						src="/linkedin.svg"
						alt="linkedin"
						width={25}
						height={25}
						className="dark:invert"
					/>
				</motion.a>

				<motion.a
					href={`mailto:${details?.["personal-info-email-value"] || "ketutshridhara"}`}
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 0.9 }}
					className="px-3 py-2 flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
				>
					<Mail size={25} />
				</motion.a>
			</div>

			<div className="flex flex-col items-center">
				<span className="font-semibold">
					&copy; {new Date().getFullYear()} Ketut Shridhara
				</span>
				<span className="text-sm">
					{footer?.["copyright"] || "All rights reserved"}
				</span>
			</div>
		</footer>
	);
}
