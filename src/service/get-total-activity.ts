import fetchData from "./fetch-data";
import getActivityMeta from "./get-activity-meta";

type Total = {
  [T: string]: {
    total: number;
    color: string;
    contributors: Array<{
      name: string;
      value: string;
    }>;
  };
};

export default async function getTotalActivity() {
  const data = await fetchData();
  const colors = await getActivityMeta();
  console.log(data);
  const total: Total = {};

  data.rows.forEach((row) => {
    row.totalActivity.forEach((activity) => {
      const { name, value } = activity;
      const data = total[name];
      const color = colors[name];
      if (data) {
        total[name] = {
          total: data.total + +value,
          contributors: [...data.contributors, { name: row.name, value }],
          color,
        };
      } else {
        total[name] = {
          total: +value,
          contributors: [{ name: row.name, value }],
          color,
        };
      }
    });
  });
  console.log(total);
  return total;
}
