import fetchData from "./fetch-data";

export default async function getTeam() {
  const data = await fetchData();
  const teams = data.rows.map((user) => user.name.split("@")[0]);
  return teams;
}
