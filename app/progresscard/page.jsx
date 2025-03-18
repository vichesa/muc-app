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

const statusCard = [
  {
    id: 1,
    name: "Todo",
  },
  {
    id: 2,
    name: "Doing",
  },
  {
    id: 3,
    name: "Testing",
  },
  {
    id: 4,
    name: "Production",
  },
];

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
    <div className="flex justify-around gap-4 text-center text-white">
      {statusCard?.map((status) => (
        <div key={status.id} className="w-full">
          <h2 className="text-2xl">{status.name}</h2>
          {/* <div className="prog-card h-[80vh] border-2 border-white rounded-md "> */}
          <ProjectCard
            groupByStatus={groupByStatus[status.id]}
            employees={employees}
            status={status.id}
          />
        </div>
        // </div>
      ))}
      {/* {Object.keys(groupByStatus).map((status) => {
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
      })} */}
    </div>
  );
};

export default ProgressCard;
