import fetchData from "./fetch-data";
import getActivityMeta from "./get-activity-meta";

export default async function getDaywiseActivity() {
  const data = await fetchData();

  const activity = {};
  data.rows.forEach((row) => {
    row.totalActivity.forEach((activity) => {
      const { name, value } = activity;
      const data = activity[name];
    });
  });
}
