import { useMemo, useState } from "react";
import ListCards from "../components/ListCards";
import { useData } from "../contexts/DataContext";
import Button from "../components/Button";
import {
	Building2,
	ClipboardCheck,
	Compass,
	Flag,
	Globe,
	Info,
	Trophy,
	Users,
} from "lucide-react";
import DetailsModal from "../components/DetailsModal";
import ImagesSlider from "../components/ImagesSlider";

export default function Achievements() {
	const {
		translations: { achievement: translations },
		achievements,
	} = useData();
	const [type, setType] = useState("");
	const [category, setCategory] = useState("");
	const [scope, setScope] = useState("");
	const [skill, setSkill] = useState("");
	const types = useMemo(() => {
		return [
			...new Set(achievements.map((achievement) => achievement.type)),
		].sort();
	}, [achievements]);
	const categories = useMemo(() => {
		return [
			...new Set(achievements.map((achievement) => achievement.category)),
		].sort();
	}, [achievements]);
	const scopes = useMemo(() => {
		return [
			...new Set(achievements.map((achievement) => achievement.scope)),
		].sort();
	}, [achievements]);
	const skills = useMemo(() => {
		return [
			...new Set(
				achievements.flatMap((achievement) => achievement.skills),
			),
		].sort();
	}, [achievements]);

	return (
		<ListCards
			title={translations?.["achievements-list"] || "Achievements List"}
			dataSet={achievements}
			searchConfig={{
				placeholder:
					translations?.["search-placeholder"] || "Search by name",
				fieldSearch: "name",
			}}
			filterConfig={{
				canReset: true,
				selectField: [
					{
						name: translations?.["type"] || "type",
						ariaLabel: "choose type of achievement",
						options: types.map((type) => ({
							label: type,
							value: type,
						})),
						setValue: setType,
						value: type,
					},
					{
						name: translations?.["category"] || "category",
						ariaLabel: "choose category of achievement",
						options: categories.map((category) => ({
							label: category,
							value: category,
						})),
						setValue: setCategory,
						value: category,
					},
					{
						name: translations?.["scope"] || "scope",
						ariaLabel: "choose scope of achievement",
						options: scopes.map((scope) => ({
							label: scope,
							value: scope,
						})),
						setValue: setScope,
						value: scope,
					},
					{
						name: translations?.["skill"] || "skill",
						ariaLabel: "choose type of achievement",
						options: skills.map((skill) => ({
							label: skill,
							value: skill,
						})),
						setValue: setSkill,
						value: skill,
					},
				],
			}}
			cardConfig={{
				titleField: "name",
				imageField: "thumbnail",
				placeholderImage: "/placeholder_achievement.avif",
				buttons: {
					leftButton: (data) =>
						(() => {
							const IconType = (() => {
								switch (data.type) {
									case "orientation":
										return Compass;
									case "competition":
										return Trophy;
									case "training":
										return ClipboardCheck;
									case "seminar":
										return Users;
									default:
										return Info;
								}
							})();
							const IconScope = (() => {
								switch (data.scope) {
									case "institutional":
										return Building2;
									case "national":
										return Flag;
									case "international":
										return Globe;
									default:
										return Info;
								}
							})();

							return (
								<>
									<Button
										ariaLabel="type of achievement"
										tooltip={data.type}
									>
										<IconType size={25} />
									</Button>
									<Button
										ariaLabel="category of achievement"
										tooltip={data.category}
									>
										<Info size={25} />
									</Button>
									<Button
										ariaLabel="scope of achievement"
										tooltip={data.scope}
									>
										<IconScope size={25} />
									</Button>
								</>
							);
						})(),
					rightButton: (_, setOpenModal) => (
						<Button
							ariaLabel="view details of achievement"
							onClick={() => setOpenModal(true)}
						>
							<Info size={15} />
						</Button>
					),
				},
			}}
			modal={(achievement, setOpenModal) => (
				<DetailsModal
					data={achievement}
					close={() => setOpenModal(false)}
					translations={translations}
					titleField="name"
					descriptionField="description"
					tagsField="skills"
					mediaPanel={
						<ImagesSlider
							images={[
								achievement.thumbnail,
								...achievement.images,
							]}
							placeholderImage="/placeholder_achievement.avif"
						/>
					}
				/>
			)}
		/>
	);
}
