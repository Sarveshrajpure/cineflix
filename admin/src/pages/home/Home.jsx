import React, { useState, useMemo, useEffect } from "react";
import { getUserStats } from "../../apis/userApis";
import Chart from "../../components/chart/Chart";
import "./home.css";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      try {
        let response = await getUserStats();

        const statsList = response.sort(function (a, b) {
          return a._id - b._id;
        });
        console.log(statsList);
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Users": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <Chart
        data={userStats}
        title="User Analytics - New users (Monthly)"
        grid
        dataKey="New Users"
      />
      <div className="homeWidgets"></div>
    </div>
  );
}
