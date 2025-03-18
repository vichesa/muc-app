// "use client";
import "./progresscard.css";
import prisma from "../lib/prisma"; //
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
// import { useRouter } from "next/navigation";
// import ProjectCard from "../components/ProjectCard";

const getEmployee = async () => {
  const res = await prisma.employee.findMany();
  return res;
};

const getTask = async () => {
  const res = await prisma.task.findMany({
    include: {
      employee: true, // Include employee data
    },
  });
  return res;
};

const ProgressCard = async () => {
  const [employees, tasks] = await Promise.all([getEmployee(), getTask()]);
  // const router = useRouter();

  const groupByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {});

  return (
    <div className="flex gap-4 text-white">
      {Object.keys(groupByStatus).map((status) => {
        let statusLabel = "";
        if (status === "1") {
          statusLabel = "Todo";
        } else if (status === "2") {
          statusLabel = "Doing";
        } else if (status === "3") {
          statusLabel = "Testing";
        } else if (status === "4") {
          statusLabel = "Production";
        }
        return (
          <div className="w-full" key={status}>
            <h1 className="text-center text-2xl font-bold mb-4">
              {statusLabel}
            </h1>
            <ProjectCard
              groupByStatus={groupByStatus[status]}
              employees={employees}
              status={status}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProgressCard;
