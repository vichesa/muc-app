"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProjectCard = ({ groupByStatus, employees, status }) => {
  const router = useRouter();

  const handleStatus = async (task) => {
    const newStatus = parseInt(task.status) + 1;
    await axios.patch(`api/task/${task.id}`, { status: newStatus });
    router.refresh();
  };
  const handleStatusReject = async (task) => {
    const newStatus = parseInt(task.status) - 2;
    await axios.patch(`api/task/${task.id}`, { status: newStatus });
    router.refresh();
  };

  return (
    <div className="prog-card h-[80vh] border-2 border-white rounded-md ">
      {groupByStatus.map((task) => {
        let buttons = null;
        if (status === "1") {
          buttons = (
            <button className="btn-card" onClick={() => handleStatus(task)}>
              Start
            </button>
          );
        } else if (status === "2") {
          buttons = (
            <button className="btn-card" onClick={() => handleStatus(task)}>
              Done
            </button>
          );
        } else if (status === "3") {
          buttons = (
            <div>
              <button
                className="btn-card mr-2"
                style={{ backgroundColor: "red" }}
                onClick={() => handleStatusReject(task)}
              >
                Reject
              </button>
              <button className="btn-card" onClick={() => handleStatus(task)}>
                Accept
              </button>
            </div>
          );
        } else if (status === "4") {
          buttons = <button className="btn-card">Done</button>;
        }
        return (
          <div className="flex justify-center" key={task.id}>
            <div
              className={`task-card ${
                task.employeeId === 1
                  ? "bg-[#4169E1]"
                  : task.employeeId === 2
                  ? "bg-[#E9897E]"
                  : "bg-black"
              } border w-full p-2 rounded-xl`}
            >
              <h3>{task.taskNname}</h3>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>
                Assign to:{" "}
                {employees.find((emp) => emp.id === task.employeeId)?.name}
              </p>

              <div className="flex justify-end">{buttons}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCard;
