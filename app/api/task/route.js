import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const POST = async (req) => {
  try {
    const body = await req.json();

    if (!body.taskName || !body.dueDate || !body.employeeId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const employeeId = Number(body.employeeId);
    if (isNaN(employeeId)) {
      return NextResponse.json(
        { message: "Invalid employeeId" },
        { status: 400 }
      );
    }

    const employeeExists = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employeeExists) {
      return NextResponse.json(
        { message: "employee does not exist" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        taskNname: body.taskName,
        dueDate: new Date(body.dueDate), // Convert to Date object
        employeeId: employeeId,
        status: body.status,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
