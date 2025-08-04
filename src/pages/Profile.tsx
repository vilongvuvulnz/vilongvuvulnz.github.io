import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronDown,
	CircleCheck,
	GraduationCap,
	Info,
	UserSearch,
	File,
	RefreshCcw,
	type LucideIcon,
	Search,
	Globe,
	TerminalSquare,
	ExternalLink,
	Github,
	BrainCircuit,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { tooltipVariants } from "../components/NavBar";
import { useData } from "../contexts/DataContext";

export default function Profile() {
	return (
		<div className="mt-auto grid grid-cols-4 gap-4">
			<ProfileCard />
			<DetailsCard />
			<Project />
		</div>
	);
}

function TypingAnimation({ sentence }: { sentence: string }) {
	const [index, setIndex] = useState(0);
	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		// Determine the speed of typing/deleting
		const typingSpeed = 100;
		const deletingSpeed = 100;
		const pauseDuration = 1500;

		const handleTyping = () => {
			if (!isDeleting) {
				// If we are typing
				if (text.length < sentence.length) {
					setText(sentence.substring(0, text.length + 1));
				} else {
					// Finished typing, wait then start deleting
					setTimeout(() => setIsDeleting(true), pauseDuration);
				}
			} else {
				// If we are deleting
				if (text.length > 0) {
					setText(sentence.substring(0, text.length - 1));
				} else {
					// Finished deleting, move to next sentence
					setIsDeleting(false);
					setIndex((prevIndex) => (prevIndex + 1) % sentence.length);
				}
			}
		};

		const timeout = setTimeout(
			handleTyping,
			isDeleting ? deletingSpeed : typingSpeed,
		);

		// Cleanup timeout on component unmount or state change
		return () => clearTimeout(timeout);
	}, [text, isDeleting, index]);

	return (
		<div className="flex flex-wrap items-center font-mono font-bold min-h-[1.5rem] max-w-full">
			<AnimatePresence>
				{text.split("").map((char, i) => (
					<motion.span
						key={`${char}-${i}`}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.05 }}
						className="min-w-[0.5rem]"
					>
						{char}
					</motion.span>
				))}
			</AnimatePresence>

			{/* Blinking Cursor */}
			<motion.span
				className="w-0.5 h-5 bg-current rounded-full ml-1"
				animate={{ opacity: [0, 1, 0] }}
				transition={{
					duration: 1,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
		</div>
	);
}

function ProfileCard() {
	return (
		<motion.div
			initial={{ rotateX: -90 }}
			animate={{ rotateX: 0 }}
			exit={{ rotateX: 90 }}
			transition={{ duration: 0.5 }}
			className="p-4 col-span-4 lg:col-span-1 bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] "
		>
			<div className="relative mb-4">
				<img
					alt="Profile Banner"
					className="h-36 w-full object-cover border-2 rounded"
					src="background.avif"
					loading="eager"
					decoding="async"
					data-nimg="1"
				/>

				<div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 border-8 border-white dark:border-zinc-900 rounded-full">
					<img
						loading="eager"
						decoding="async"
						data-nimg="1"
						src="profile_picture.avif"
						alt="Profile Picture"
						width={200}
						height={200}
						className="max-w-35 max-h-35 rounded-full border-3 dark:border-white object-cover"
					/>
				</div>
			</div>

			<div className="pt-18 flex flex-col items-center justify-center">
				<h2 className="text-xl font-bold ">Ketut Shridhara</h2>
				<h3 className="text-md font-semibold mb-2">(Kiuyha)</h3>
				<TypingAnimation sentence="Developer | Data Scientist" />
			</div>
		</motion.div>
	);
}

function CollapsedContent({
	title,
	children,
	Icon,
	initialOpen = false,
}: {
	title: string;
	children: React.ReactNode;
	Icon: LucideIcon;
	initialOpen?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(initialOpen);
	return (
		<div>
			<button
				type="button"
				aria-label="Toggle collapsed content"
				onClick={() => setIsOpen((prev) => !prev)}
				className="cursor-pointer rounded-full flex items-center justify-between gap-2 w-full"
			>
				<div className="flex items-center gap-4 md:gap-2">
					<Icon size={20} />
					<span className="font-semibold uppercase">{title}</span>
				</div>
				<ChevronDown
					size={20}
					className={`${
						isOpen ? "rotate-180" : ""
					} transition-transform duration-300 ease-in-out`}
				/>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.2 }}
						className="mt-4 ml-2"
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function DetailsCard() {
	const {
		translations: { details: translations },
	} = useData();
	const educationLenght = translations["education-length"]
		? Number(translations["education-length"])
		: null;
	return (
		<motion.div
			initial={{ rotateX: -90 }}
			animate={{ rotateX: 0 }}
			exit={{ rotateX: 90 }}
			transition={{ duration: 0.5 }}
			className="px-4 py-8 col-span-4 lg:col-span-3 flex flex-col gap-8 bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] "
		>
			<CollapsedContent
				title={translations["about-me"] || "About Me"}
				Icon={Info}
				initialOpen
			>
				<p className="semibold text-justify">
					{translations["about-me-description"] ||
						`A developer specializing in Web and Data Science. I build
					intelligent web applications and turn data into meaningful
					insights. Based in Indonesia.`}
				</p>
			</CollapsedContent>

			<CollapsedContent
				title={translations["personal-info"] || "Personal Information"}
				Icon={UserSearch}
			>
				<div className="space-y-2">
					<p className="semibold text-justify">
						<strong>
							{translations["personal-info-address"] ||
								"Address:"}
						</strong>
						{translations["personal-info-address-value"] ||
							"Surabaya, Jawa Timur, Indonesia"}
					</p>
					<p className="semibold text-justify">
						<strong>
							{translations["personal-info-email"] || "Email:"}
						</strong>
						{translations["personal-info-email-value"] ||
							"ketutshridhara@gmail.com"}
					</p>
					<p className="semibold text-justify">
						<strong>
							{translations["personal-info-birth-date"] ||
								"Birth Date:"}
						</strong>
						{translations["personal-info-birth-date-value"] ||
							"12 Maret 2007"}
					</p>
				</div>
			</CollapsedContent>

			<CollapsedContent
				title={translations["education"] || "Education"}
				Icon={GraduationCap}
			>
				<div className="flex flex-col md:flex-row w-full justify-center gap-12">
					{educationLenght &&
						Array.from({
							length: educationLenght,
						}).map((_, index) => {
							const first = index === 0;
							const last = index === educationLenght - 1;
							return (
								<motion.div
									key={index}
									className="relative"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.2,
									}}
								>
									{/* VERTICAL line for mobile view */}
									<motion.div
										initial={{ height: 0 }}
										animate={{ height: "100%" }}
										transition={{
											duration: 0.5,
											delay: index * 0.2 + 0.5,
										}}
										className={`md:hidden absolute left-5 w-0.5 bg-gray-300
											${first ? "top-1/2 h-1/2" : last ? "-top-1/2 h-1/2" : "top-0 h-full"}
											`}
									/>

									{/* HORIZONTAL line for desktop view */}
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: "100%" }}
										transition={{
											duration: 0.5,
											delay: index * 0.2 + 0.5,
										}}
										className={`hidden md:block absolute top-5 h-0.5 bg-gray-300
									${first ? "left-1/2 w-1/2" : last ? "-left-1/2 w-1/2" : "left-0 w-full"}`}
									/>

									{/* The Icon and Content Container */}
									<div className="relative flex flex-row md:flex-col items-center z-10">
										{/* Icon with background to "cut" the line */}
										<div className="bg-white dark:bg-zinc-900 p-1 rounded-full border-2 border-zinc-200 dark:border-zinc-800 md:mx-auto">
											<CircleCheck
												className="text-blue-600 dark:text-blue-500"
												size={30}
												strokeWidth={2}
											/>
										</div>

										{/* Text content */}
										<div className="pl-5 md:pl-0 md:text-center md:mt-4">
											<p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
												{translations[
													`education-${index}-year`
												] || "Year"}
											</p>
											<div className="mt-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm min-w-[220px]">
												<h3 className="font-bold">
													{translations[
														`education-${index}-title`
													] || "Title"}
												</h3>
												<p className="text-xs text-gray-500 dark:text-gray-400 uppercase mt-1">
													{translations[
														`education-${index}-institution`
													] || "Institution"}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							);
						})}
				</div>
			</CollapsedContent>
		</motion.div>
	);
}

function Project() {
	const {
		projects,
		translations: { project: translations },
	} = useData();
	const [search, setSearch] = useState("");
	const [type, setType] = useState("");
	const [techStack, setTechStack] = useState("");

	const filteredProjects = useMemo(
		() =>
			[...projects]
				.filter((project) => {
					const sameType = type === "" || project.type === type;
					const sameTechStack =
						techStack === "" ||
						project.tech_stack.includes(techStack);
					const inSearch =
						search === "" ||
						project.name
							.toLowerCase()
							.includes(search.toLowerCase());
					return sameType && sameTechStack && inSearch;
				})
				// reverse the order so the most recent project is on top
				.reverse(),
		[projects, search, type, techStack],
	);

	const types = useMemo(() => {
		return [...new Set(projects.map((project) => project.type))].sort();
	}, [projects]);

	const techStacks = useMemo(() => {
		return [
			...new Set(
				projects.flatMap((project) =>
					project.tech_stack
						.split(",")
						.map((stack: string) => stack.trim()),
				),
			),
		].sort();
	}, [projects]);

	return (
		<div className="col-span-4 flex flex-col gap-4">
			{/* Headline of the section */}
			<motion.div
				initial={{ rotateX: -90 }}
				animate={{ rotateX: 0 }}
				exit={{ rotateX: 90 }}
				transition={{ duration: 0.5 }}
				className="px-4 py-2 flex gap-2 items-center bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
			>
				<File size={25} />
				<h1 className="font-semibold text-md">
					{translations["projects-list"] || "Projects List"}
				</h1>
			</motion.div>

			<div className="flex flex-col md:flex-row gap-4 md:bg-white md:dark:bg-zinc-900 md:border-2 dark:border-zinc-600 md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
				{/* Search bar */}

				<motion.div
					initial={{ rotateX: -90 }}
					animate={{ rotateX: 0 }}
					exit={{ rotateX: 90 }}
					transition={{ duration: 0.5 }}
					whileTap={{ scale: 0.9 }}
					className="px-4 py-2 flex-1 flex gap-2 items-center bg-white dark:bg-zinc-900 border-2 md:border-0 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-none"
				>
					<Search size={25} />
					<input
						type="search"
						placeholder={
							translations["search-by-name"] || "Search by name"
						}
						className="w-full bg-transparent outline-none font-semibold"
						value={search}
						onChange={(e) => {
							e.preventDefault();
							setSearch(e.target.value);
						}}
					/>
				</motion.div>

				{/* Filters */}
				<motion.div
					initial={{ rotateX: -90 }}
					animate={{ rotateX: 0 }}
					exit={{ rotateX: 90 }}
					transition={{ duration: 0.5 }}
					className="flex gap-2 items-center bg-white dark:bg-zinc-900 border-2 md:border-0 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-none"
				>
					<motion.select
						whileTap={{ scale: 0.9 }}
						value={type}
						onChange={(e) => {
							e.preventDefault();
							setType(e.target.value);
						}}
						className="cursor-pointer px-2 py-2 font-semibold uppercase md:border-l-4 flex-1 h-full dark:border-zinc-600"
					>
						<option value="">
							{(translations["type"] || "type")
								.replace("_", " ")
								.toUpperCase()}
						</option>
						{types.map((type, index) => (
							<option key={index} value={type}>
								{type.replace("_", " ").toUpperCase()}
							</option>
						))}
					</motion.select>

					<motion.select
						whileTap={{ scale: 0.9 }}
						value={techStack}
						onChange={(e) => {
							e.preventDefault();
							setTechStack(e.target.value);
						}}
						className="cursor-pointer px-2 py-2 font-semibold uppercase border-l-4 dark:border-zinc-600 flex-1 h-full"
					>
						<option value="">
							{(translations["tech-stack"] || "tech stack")
								.replace("_", " ")
								.toUpperCase()}
						</option>
						{techStacks.map((stack, index) => (
							<option key={index} value={stack}>
								{stack.replace("_", " ").toUpperCase()}
							</option>
						))}
					</motion.select>

					{/* Reset filters */}
					<motion.button
						onClick={(e) => {
							e.preventDefault();
							setSearch("");
							setType("");
							setTechStack("");
						}}
						whileTap={{ scale: 0.9 }}
						className="cursor-pointer border-l-4 px-4 py-2 flex-1 dark:border-zinc-600"
					>
						<RefreshCcw size={25} />
					</motion.button>
				</motion.div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<AnimatePresence>
					{filteredProjects.map((project, index) => {
						return (
							<ProjectCard
								key={index}
								project={project}
								search={search}
							/>
						);
					})}
				</AnimatePresence>
			</div>
		</div>
	);
}

function ProjectCard({
	project,
	search,
}: {
	project: Record<string, any>;
	search: string;
}) {
	const highlightName = () => {
		if (!search) return project?.name;
		const regex = new RegExp(search, "gi");
		return project?.name
			.toLowerCase()
			.replace(
				regex,
				(match: string) =>
					`<mark class="bg-yellow-500">${match}</mark>`,
			);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
		>
			<div className="group relative flex-1">
				<img
					src={project?.preview || "placeholder_project.avif"}
					alt="project"
					width={400}
					height={400}
					loading="lazy"
					decoding="async"
					data-nimg="1"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

				<div className="absolute inset-0 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
					<h1 className="font-bold text-xl text-center uppercase">
						{project?.name}
					</h1>
				</div>
			</div>

			<div className="px-4 py-3 ">
				<h1
					className="font-bold text-xl text-center uppercase"
					dangerouslySetInnerHTML={{ __html: highlightName() }}
				/>
			</div>

			<div className="flex justify-between px-4 py-2 border-t-4 dark:border-zinc-600">
				{(() => {
					const Icon = (() => {
						switch (project?.type) {
							case "website":
								return Globe;
							case "cli_tool":
								return TerminalSquare;
							case "ml_model":
								return BrainCircuit;
							default:
								return Info;
						}
					})();

					return (
						<motion.button
							initial="hidden"
							whileHover="visible"
							variants={{
								hidden: {
									scale: 1,
									transition: { duration: 0.2 },
								},
								visible: {
									scale: 0.9,
									transition: { duration: 0.2 },
								},
							}}
							className="cursor-pointer px-3 py-2 flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
						>
							<motion.div
								variants={tooltipVariants}
								className="px-1.5 py-1 absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 rounded-md border-2 border-zinc-900 dark:border-zinc-300
												after:content-[''] after:absolute after:-bottom-1/2 after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-zinc-900 dark:after:border-t-zinc-300"
							>
								<span className="text-sm font-bold text-nowrap">
									{project.type
										.replace("_", " ")
										.toUpperCase()}
								</span>
							</motion.div>

							<Icon size={25} />
						</motion.button>
					);
				})()}

				<div className="flex items-center gap-2">
					<motion.button
						whileHover={{ scale: 0.9 }}
						className=" cursor-pointer px-3 py-2 flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
					>
						<Info size={15} />
					</motion.button>

					{project?.github_link && (
						<motion.a
							href={project.github_link}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 0.9 }}
							className="px-3 py-2 flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
						>
							<Github size={15} />
						</motion.a>
					)}

					{project?.link && (
						<motion.a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 0.9 }}
							className="px-3 py-2 flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
						>
							<ExternalLink size={15} />
						</motion.a>
					)}
				</div>
			</div>
		</motion.div>
	);
}
