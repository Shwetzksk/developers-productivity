export interface ChartData {
  labels: Array<string>;
  datasets: Array<{
    label: string;
    data: string[];
    backgroundColor: string[] | string;
  }>;
}
