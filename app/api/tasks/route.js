import prisma from "../../lib/prisma";

export async function GET() {
  const employees = await prisma.employee.findMany();
  const tasks = await prisma.task.findMany({
    include: {
      employee: true, // Include employee data
    },
  });

  return new Response(JSON.stringify({ employees, tasks }), {
    headers: { "Content-Type": "application/json" },
  });
}
