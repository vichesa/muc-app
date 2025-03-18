import "./projectcard.css";
import prisma from "../lib/prisma"; //

const getEmployee = async () => {
  const res = await prisma.employee.findMany();
  return res;
};

const getTask = async () => {
  const res = await prisma.task.findMany();
  return res;
};

const ProjectCard = async () => {
  const [employees, tasks] = await Promise.all([getEmployee(), getTask()]);

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
            <div className="prog-card h-[80vh] border-2 border-white rounded-md ">
              {groupByStatus[status].map((task) => {
                let buttons = null;
                if (status === "1") {
                  buttons = <button className="btn-card">Start</button>;
                } else if (status === "2") {
                  buttons = <button className="btn-card">Done</button>;
                } else if (status === "3") {
                  buttons = (
                    <div>
                      <button
                        className="btn-card mr-2"
                        style={{ backgroundColor: "red" }}
                      >
                        Reject
                      </button>
                      <button className="btn-card">Accept</button>
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
                      <p>
                        Due Date: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                      <p>Assign to: {task.employeeId}</p>
                      <div className="flex justify-end">{buttons}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCard;
