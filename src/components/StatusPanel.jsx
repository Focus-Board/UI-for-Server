import { useEffect, useState } from "react";
import { getHealth } from "../API/client";

export default function StatusPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getHealth().then(setData);
  }, []);

  if (!data) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h2>System Status</h2>
      <p>Server: {data.status}</p>
      <p>CalDAV: {data.caldav ? "Running" : "Down"}</p>
      <p>Environment: {data.env}</p>
    </div>
  );
}