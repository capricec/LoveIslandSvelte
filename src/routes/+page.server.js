import SinglesData from "$data/SinglesData.json";
import CouplesData from "$data/CouplesData.json";

export async function load() {
	const data = ["a", "b", "c"];

	return { data, SinglesData, CouplesData };
}
