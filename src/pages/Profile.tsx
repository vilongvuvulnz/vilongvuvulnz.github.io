import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronDown,
	CircleCheck,
	GraduationCap,
	Info,
	UserSearch,
	type LucideIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Profile() {
	return (
		<div className="mt-auto grid grid-cols-4 gap-4">
			<ProfileCard />
			<DetailsCard />
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
			className="p-4 col-span-4 lg:col-span-1 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
		>
			<div className="relative mb-4">
				<img
					alt="Profile Banner"
					className="h-36 w-full object-cover border-2 border-black rounded"
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
						className="w-35 h-35 rounded-full border-3 border-black dark:border-white object-cover"
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
					<Icon size={25} />
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

const EDUCATIONS = [
	{
		institution: "Universitas Negeri Surabaya",
		title: "S1 Sains Data",
		year: "2024 - Ongoing",
	},
	{
		institution: "SMA Negeri 10 Luwu Timur",
		title: "High School Student",
		year: "2019 - 2024",
	},
	{
		institution: "SMP Negeri 1 Tomoni Timur",
		title: "Middle School Student",
		year: "2017 - 2019",
	},
];

function DetailsCard() {
	return (
		<motion.div
			initial={{ rotateX: -90 }}
			animate={{ rotateX: 0 }}
			exit={{ rotateX: 90 }}
			transition={{ duration: 0.5 }}
			className="px-4 py-8 col-span-4 lg:col-span-3 flex flex-col gap-8 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
		>
			<CollapsedContent title="About Me" Icon={Info} initialOpen>
				<p className="semibold text-justify">
					A developer specializing in Web and Data Science. I build
					intelligent web applications and turn data into meaningful
					insights. Based in Indonesia.
				</p>
			</CollapsedContent>

			<CollapsedContent title="Personal Information" Icon={UserSearch}>
				<div className="space-y-2">
					<p className="semibold text-justify">
						<strong>Address:</strong> Surabaya, Jawa Timur,
						Indonesia
					</p>
					<p className="semibold text-justify">
						<strong>Email:</strong> ketutshridhara@gmail.com
					</p>
					<p className="semibold text-justify">
						<strong>Birth Date:</strong> 12 Maret 2007
					</p>
				</div>
			</CollapsedContent>

			<CollapsedContent title="Education" Icon={GraduationCap}>
				<div className="flex flex-col md:flex-row w-full justify-center">
					{EDUCATIONS.map((item, index) => {
						const first = index === 0;
						const last = index === EDUCATIONS.length - 1;
						return (
							<motion.div
								key={index}
								className="flex-grow relative pb-12 md:pb-0"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.2,
								}}
							>
								{/* VERTICAL line for mobile view */}
								{!last &&
									<motion.div
										initial={{ height: 0 }}
										animate={{ height: "100%" }}
										transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
										className={`md:hidden absolute top-1/2 left-5 -ml--px h-full w-0.5 bg-gray-300`}
									/>
								}

								{/* HORIZONTAL line for desktop view */}
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: "100%" }}
									transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
									className={`hidden md:block absolute top-5 h-0.5 bg-gray-300
									${first ? "left-1/2 w-1/2" : last ? "-left-1/2 w-1/2" : "left-0 w-full"}`}
								/>

								{/* The Icon and Content Container */}
								<div className="relative flex flex-row md:flex-col items-center">
									{/* Icon with background to "cut" the line */}
									<div className="bg-white dark:bg-zinc-900 p-1 rounded-full border-2 border-zinc-200 dark:border-zinc-800 md:mx-auto">
										<CircleCheck
											className="text-blue-600 dark:text-blue-500"
											size={30}
											strokeWidth={2}
										/>
									</div>

									{/* Text content */}
									<div className="pl-10 md:pl-0 md:text-center md:mt-4 ">
										<p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
											{item.year}
										</p>
										<div className="mt-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm min-w-[220px]">
											<h3 className="font-bold">
												{item.institution}
											</h3>
											<p className="text-xs text-gray-500 dark:text-gray-400 uppercase mt-1">
												{item.title}
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
