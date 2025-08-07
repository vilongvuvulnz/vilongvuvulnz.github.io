import { AnimatePresence, motion } from "framer-motion";
import { File, RefreshCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface ListCardsProps<TData extends Record<string, unknown>> {
	title: string;
	dataSet: TData[];
	searchConfig?: {
		placeholder: string;
		fieldSearch: string;
	};
	filterConfig: {
		canReset?: boolean;
		selectField: {
			name: string;
			ariaLabel?: string;
			defaultValue?: string;
			options: {
				label: string;
				value: string;
			}[];
			setValue: React.Dispatch<React.SetStateAction<string>>;
			value: string;
		}[];
	};
	cardConfig: {
		titleField?: string;
		imageField: string;
		placeholderImage: string;
		buttons: {
			leftButton?: (
				data: TData,
				setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
			) => React.ReactNode;
			rightButton?: (
				data: TData,
				setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
			) => React.ReactNode;
		};
	};
	modal?: (
		data: TData,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
	) => React.ReactNode;
}

export default function ListCards<TData extends Record<string, unknown>>({
	title,
	dataSet,
	searchConfig,
	filterConfig,
	cardConfig,
	modal,
}: ListCardsProps<TData>) {
	const titleCardKey = cardConfig.titleField || searchConfig?.fieldSearch;
	const [search, setSearch] = useState("");
	const filteredData = useMemo(
		() =>
			dataSet
				.filter((data) => {
					const inFilter = filterConfig.selectField.every(
						(select) => {
							const value = data[select.name];
							const checkIfArray = Array.isArray(value);
							return (
								select.value === "" ||
								(checkIfArray
									? (value as string[]).includes(select.value)
									: value === select.value)
							);
						},
					);

					const inSearch =
						search === "" ||
						(data[searchConfig?.fieldSearch || "name"] as string)
							.toLowerCase()
							.includes(search.toLowerCase());
					return inFilter && inSearch;
				})
				// reverse the order so the most recent project is on top
				.reverse(),
		[
			dataSet,
			search,
			...filterConfig.selectField.map((select) => select.value),
		],
	);

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
				<h1 className="font-semibold text-md">{title}</h1>
			</motion.div>

			<div className="flex flex-col md:flex-row gap-4 md:bg-white md:dark:bg-zinc-900 md:border-2 dark:border-zinc-600 md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
				{/* Search bar */}
				{searchConfig && (
					<motion.div
						initial={{ rotateX: -90 }}
						animate={{ rotateX: 0 }}
						exit={{ rotateX: 90 }}
						transition={{ duration: 0.5 }}
						whileTap={{ scale: 0.9 }}
						aria-label="Search bar"
						className="px-4 py-2 flex-1 flex gap-2 items-center bg-white dark:bg-zinc-900 border-2 md:border-0 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-none"
					>
						<Search size={25} />
						<input
							type="search"
							placeholder={searchConfig.placeholder}
							className="w-full bg-transparent outline-none font-semibold"
							value={search}
							onChange={(e) => {
								e.preventDefault();
								setSearch(e.target.value);
							}}
						/>
					</motion.div>
				)}

				{/* Filters */}
				<motion.div
					initial={{ rotateX: -90 }}
					animate={{ rotateX: 0 }}
					exit={{ rotateX: 90 }}
					transition={{ duration: 0.5 }}
					className="flex gap-2 items-center bg-white dark:bg-zinc-900 border-2 md:border-0 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-none"
				>
					{filterConfig.selectField.map((field, index) => (
						<motion.select
							key={field.name + index}
							whileTap={{ scale: 0.9 }}
							value={field.value}
							onChange={(e) => {
								e.preventDefault();
								field.setValue(e.target.value);
							}}
							aria-label={field.ariaLabel}
							className="cursor-pointer px-2 py-2 font-semibold uppercase md:border-l-4 flex-1 h-full dark:border-zinc-600 outline-none"
						>
							<option value="">
								{(field.defaultValue || field.name)
									.replace("_", " ")
									.toUpperCase()}
							</option>

							{field.options.map((option, index) => (
								<option key={index} value={option.value}>
									{option.label
										.replace("_", " ")
										.toUpperCase()}
								</option>
							))}
						</motion.select>
					))}

					{/* Reset filters */}
					{filterConfig.canReset && (
						<motion.button
							onClick={(e) => {
								e.preventDefault();
								filterConfig.selectField.forEach((field) => {
									field.setValue("");
								});
								setSearch("");
							}}
							whileTap={{ scale: 0.9 }}
							aria-label="reset filters"
							className="cursor-pointer border-l-4 px-4 py-2 dark:border-zinc-600"
						>
							<RefreshCcw size={25} />
						</motion.button>
					)}
				</motion.div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<AnimatePresence mode="wait">
					{filteredData.map((data, index) => (
						<Card
							key={
								titleCardKey
									? (data?.[titleCardKey] as string)
									: index
							}
							data={data}
							index={index}
							modal={modal}
							search={search}
							cardConfig={cardConfig}
                            titleCardKey={titleCardKey}
						/>
					))}
				</AnimatePresence>
			</div>
		</div>
	);
}

interface CardProps<T extends Record<string, unknown>> {
	data: ListCardsProps<T>["dataSet"][number];
	index: number;
	modal?: ListCardsProps<T>["modal"];
	search: string;
	cardConfig: ListCardsProps<T>["cardConfig"];
	titleCardKey: string|undefined;
}

function Card<T extends Record<string, unknown>>({
	data,
	index,
	modal,
	search,
	cardConfig,
	titleCardKey,
}: CardProps<T>) {
	const [openModal, setOpenModal] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	const highlightName = (title: string) => {
		if (!search) return title;
		const regex = new RegExp(search, "gi");
		return title
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
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3, delay: index * 0.1 }}
			className="flex flex-col bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
		>
			<div
				className="group relative flex-1"
				onClick={() => setOpenModal(true)}
			>
				{/* skeleton image */}
				{imageLoading && (
					<div className="absolute inset-0 animate-pulse bg-zinc-600 dark:bg-zinc-800" />
				)}

				{/* image */}
				<img
					src={
						(data?.[cardConfig.imageField] as string) ||
						cardConfig.placeholderImage
					}
					alt="project"
					width={400}
					height={250}
					loading="lazy"
					decoding="async"
					className={`w-full h-full object-cover transition-opacity duration-300
						${imageLoading ? "opacity-0" : "opacity-100"}`}
					onError={(e) => {
						setImageLoading(false);
						e.currentTarget.src = cardConfig.placeholderImage;
					}}
					onLoad={() => setImageLoading(false)}
				/>

				{/* Overlay on hover */}
				{titleCardKey && (data?.[titleCardKey] as string) && (
					<>
						<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
						<div className="absolute inset-0 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
							<h1 className="font-bold text-xl text-center uppercase">
								{data?.[titleCardKey] as string}
							</h1>
						</div>
					</>
				)}
			</div>

			{titleCardKey && (data?.[titleCardKey] as string) && (
				<div className="px-4 py-3 ">
					<h1
						className="font-bold text-xl text-center uppercase"
						dangerouslySetInnerHTML={{
							__html: highlightName(
								data?.[titleCardKey] as string,
							),
						}}
					/>
				</div>
			)}

			<div className="flex justify-between px-4 py-2 border-t-4 dark:border-zinc-600">
				{cardConfig.buttons.leftButton &&
					cardConfig.buttons.leftButton(data, setOpenModal)}

				<div className="flex items-center gap-2">
					{cardConfig.buttons.rightButton &&
						cardConfig.buttons.rightButton(data, setOpenModal)}
				</div>
			</div>

			<AnimatePresence>
				{openModal && modal && modal(data, setOpenModal)}
			</AnimatePresence>
		</motion.div>
	);
}
