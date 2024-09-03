interface Row {
  activeDays: {
    days: number;
    isBurnOut: boolean;
    insight: Array<string>;
  };
  name: string;
  dayWiseActivity: Array<{
    date: Date;
    items: {
      children: Array<{ count: string; label: string; fillColor: string }>;
    };
  }>;
  totalActivity: Array<{ name: string; value: string }>;
}
interface AuthorWorklog {
  activityMeta: Array<{ label: string; fillColor: string }>;
  rows: Array<Row>;
}
interface ApiData {
  data: {
    AuthorWorklog: AuthorWorklog;
  };
}

export default async function fetchData(): Promise<AuthorWorklog> {
  const res = await fetch("data.json");
  const data = (await res.json()) as ApiData;
  console.log(data);
  return data.data.AuthorWorklog;
}
