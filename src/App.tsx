import { useEffect, useState } from "react";
import "./App.css";
import PieChart, { ChartData } from "@/components/pie-chart";
import getTotalActivity from "@/service/get-total-activity";
import styled from "styled-components";
import { usersColor } from "@/config/activity";
import StackedBar from "@/components/stacked-bar-chart";

function App() {
  const [totalActivity, setTotalActivity] = useState<
    { heading: string; total: number; data: ChartData }[]
  >([]);
  const [dayWiseActivity, setDayWiseActivity] = useState([]);

  async function fetchTotalActivity() {
    const res = await getTotalActivity();
    const data = Object.entries(res).map((activity) => {
      const [heading, stats] = activity;
      return {
        heading,
        total: stats.total,
        data: {
          labels: stats.contributors.map((val) => val.name.split("@")[0]),
          datasets: [
            {
              label: "activity",
              data: stats.contributors.map((val) => val.value),
              backgroundColor: usersColor,
            },
          ],
        },
      };
    });
    setTotalActivity(data);
  }
  useEffect(() => {
    fetchTotalActivity();
  }, []);
  return (
    <Container>
      <div className="header">
        <h1>Team Activity</h1>
        <div className="team-legends">
          {totalActivity[0]?.data?.labels?.map((name, i) => (
            <div className="team-legend">
              <div
                style={{ backgroundColor: usersColor[i] }}
                className="legend"
              ></div>
              <p className="label">{name.split("@")[0]}</p>
            </div>
          ))}
        </div>
      </div>
      <Stats>
        {totalActivity.map((activity, i) => (
          <Card key={i}>
            <header>
              <h2>{activity.heading}</h2>
              <p>{activity.total}</p>
            </header>
            <div className="chart">
              {" "}
              {activity.total ? (
                <PieChart data={activity.data} />
              ) : (
                <p>No Data</p>
              )}
            </div>
          </Card>
        ))}
      </Stats>
      <StackedBar />
    </Container>
  );
}

export default App;

const Container = styled.section`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .team-legends {
      display: flex;
      align-items: center;
      gap: 15px;
      .team-legend {
        display: flex;
        align-items: center;
        gap: 5px;
        .legend {
          width: 10px;
          height: 3px;
        }
      }
    }
  }
`;
const Stats = styled.section`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  gap: 10px;
`;
const Card = styled.div`
  border: 1px solid #ececec;
  padding: 10px;
  border-radius: 5px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 1rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
  .chart {
    width: 95px;
    margin-left: auto;
  }
`;
