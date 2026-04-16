import StatusPanel from "../components/StatusPanel";
import CalendarPanel from "../components/CalendarPanel";
import Esp32Panel from "../components/Esp32Panel";
import ActivityFeed from "../components/ActivityFeed";

export default function Dashboard() {
  return (
    <div className="container">
      <h1>Whiteboard Server Dashboard</h1>

      <StatusPanel />
      <CalendarPanel />
      <Esp32Panel />
      <ActivityFeed />
    </div>
  );
}