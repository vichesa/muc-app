import Table from "react-bootstrap/Table";
import prisma from "../lib/prisma"; //
import AddTask from "../components/AddTask";

const getEmployee = async () => {
  const res = await prisma.employee.findMany();
  return res;
};

const getTask = async () => {
  const res = await prisma.task.findMany();
  return res;
};

const TaskTable = async () => {
  const [employees, tasks] = await Promise.all([getEmployee(), getTask()]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <AddTask employees={employees} />
      <Table striped responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Karyawan</th>
            <th>Task Name</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{e.name}</td>
              <td>
                {tasks
                  .filter((task) => task.employeeId === e.id)
                  .map((t, index) => (
                    <div key={index}>{t.taskNname}</div>
                  ))}
              </td>
              <td>
                {tasks
                  .filter((task) => task.employeeId === e.id)
                  .map((t, index) => (
                    <div key={index}>{formatDate(t.dueDate)}</div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TaskTable;
