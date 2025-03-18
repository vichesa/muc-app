import "./projectcard.css";

const trackData = [
  {
    id: 1,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Todo",
    employeeId: 1,
  },
  {
    id: 2,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Doing",
    employeeId: 1,
  },
  {
    id: 3,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Testing",
    employeeId: 1,
  },
  {
    id: 4,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Production",
    employeeId: 1,
  },
  {
    id: 5,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Todo",
    employeeId: 1,
  },
  {
    id: 5,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Todo",
    employeeId: 2,
  },
  {
    id: 5,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Todo",
    employeeId: 1,
  },
  {
    id: 5,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Todo",
    employeeId: 2,
  },
  {
    id: 5,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Doing",
    employeeId: 2,
  },
  {
    id: 5,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Todo",
    employeeId: 2,
  },
  {
    id: 5,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Testing",
    employeeId: 2,
  },
  {
    id: 5,
    taskNname: "Task 1",
    dueDate: "2022-01-01",
    status: "Todo",
    employeeId: 1,
  },
];

const groupByStatus = trackData.reduce((acc, task) => {
  if (!acc[task.status]) {
    acc[task.status] = [];
  }
  acc[task.status].push(task);
  return acc;
}, {});

const ProjectCard = () => {
  return (
    <div className="flex gap-4 text-white">
      {Object.keys(groupByStatus).map((status) => (
        <div className="w-full">
          <h1 className="text-center text-2xl font-bold mb-4">{status}</h1>
          <div
            key={status}
            className="prog-card h-[80vh] border-2 border-white rounded-md "
          >
            {groupByStatus[status].map((task) => {
              let buttons = null;
              if (status === "Todo") {
                buttons = <button className="btn-card">Start</button>;
              } else if (status === "Doing") {
                buttons = <button className="btn-card">Done</button>;
              } else if (status === "Testing") {
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
              } else if (status === "Production") {
                buttons = <button className="btn-card">Done</button>;
              }
              return (
                <div className="flex justify-center">
                  <div
                    key={task.id}
                    className={`task-card ${
                      task.employeeId === 1
                        ? "bg-[#4169E1]"
                        : task.employeeId === 2
                        ? "bg-[#E9897E]"
                        : "bg-black"
                    } border w-full p-2 rounded-xl`}
                  >
                    <h3>{task.taskNname}</h3>
                    <p>Due Date: {task.dueDate}</p>
                    <p>Assign to: {task.employeeId}</p>
                    <div className="flex justify-end">{buttons}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
