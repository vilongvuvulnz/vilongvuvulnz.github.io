import { motion, type Variants } from "framer-motion";
import { FileBadge, GitBranch, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
	const { currentLang } = useData();
	const basePath = useLocation().pathname.split("/")?.[2] || "";

	const [isDesktop, setIsDekstop] = useState(window.innerWidth >= 768);

	useEffect(() => {
		const handleResize = () => setIsDekstop(window.innerWidth >= 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<motion.nav className="z-100 fixed w-full md:w-auto px-6 py-3 bottom-0 md:bottom-10 md:rounded-xl left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
			{isDesktop ? (
				<DekstopNavBar currentLang={currentLang} basePath={basePath} />
			) : (
				<MobileNavBar currentLang={currentLang} basePath={basePath} />
			)}
		</motion.nav>
	);
}

const MENUS = [
	{
		name: "Certifications",
		path: "certifications",
		Icon: FileBadge,
	},
	{
		name: "Profile",
		path: "",
		Icon: User,
	},
	{
		name: "Contributions",
		path: "contributions",
		Icon: GitBranch,
	},
];

const parentVariants: Variants = {
	hidden: {
		scale: 1,
		y: 0,
		transition: { duration: 0.2 },
	},
	visible: {
		scale: 1.2,
		y: -10,
		transition: { duration: 0.2 },
	},
};

const tooltipVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -10,
		transition: { duration: 0.2 },
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.2 },
	},
};

function DekstopNavBar({
	currentLang,
	basePath,
}: {
	currentLang: string;
	basePath: string;
}) {
	return (
		<ul className="flex gap-8 items-center justify-center">
			{MENUS.map(({ name, path, Icon }) => (
				<motion.li
					key={name}
					initial="hidden"
					whileHover="visible"
					variants={parentVariants}
					className="relative"
				>
					<motion.div
						variants={tooltipVariants}
						className="px-1.5 py-1 absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 rounded-md border-2 border-zinc-900 dark:border-zinc-300
                            after:content-[''] after:absolute after:-bottom-1/2 after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-zinc-900 dark:after:border-t-zinc-300"
					>
						<span className="text-sm font-bold">{name}</span>
					</motion.div>

					<Link
						aria-label={name}
						to={`/${currentLang}${path ? `/${path}` : ""}`}
						className={`md:px-2 md:py-2.5 rounded flex flex-col items-center transition-all duration-300
                                ${
									basePath === path
										? "bg-black dark:bg-white text-white dark:text-black"
										: "border-black dark:border-white hover:bg-zinc-800 dark:hover:bg-zinc-300 hover:text-white dark:hover:text-black"
								}
                                `}
					>
						<Icon size={35} />
					</Link>
				</motion.li>
			))}
		</ul>
	);
}

function MobileNavBar({
	currentLang,
	basePath,
}: {
	currentLang: string;
	basePath: string;
}) {
	const menusRef = useRef<Record<string, HTMLAnchorElement | null>>({});
	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

	// This effect runs whenever the menu changes
	useEffect(() => {
		const handleResize = () => {
			const activeMenuNode = menusRef.current[basePath];

			if (activeMenuNode) {
				setUnderlineStyle({
					left: activeMenuNode.offsetLeft + 5,
					width: activeMenuNode.offsetWidth - 10,
				});
			}
		};

		handleResize();

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Cleanup function to remove the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [basePath, menusRef]);
	return (
		<ul className="relative flex items-center justify-between mb-2">
			{MENUS.map(({ name, path, Icon }) => (
				<motion.li key={name}>
					<Link
						ref={(el) => {
							menusRef.current[path] = el;
						}}
						aria-label={name}
						to={`/${currentLang}${path ? `/${path}` : ""}`}
						className="flex flex-col items-center"
					>
						<Icon size={25} />
						<span className="text-sm font-bold">{name}</span>
					</Link>
				</motion.li>
			))}

			{/* Tab Indicator for small screens */}
			<div
				className="absolute -bottom-1.5 h-[0.3rem] bg-black dark:bg-white transition-all duration-300 rounded-xl"
				style={underlineStyle}
			/>
		</ul>
	);
}