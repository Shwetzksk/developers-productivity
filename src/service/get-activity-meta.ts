import fetchData from "./fetch-data";

type Color = {
  [T: string]: string;
};

export default async function getTotalActivity() {
  const data = await fetchData();
  const colors = data.activityMeta.reduce<Color>((acc, cur) => {
    acc[cur.label] = cur.fillColor;
    return acc;
  }, {});
  console.log(colors);

  return colors;
}
