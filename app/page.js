import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskTable from "./components/TaskTable";

export default function Home() {
  return (
    <div>
      <TaskTable />
    </div>
  );
}
