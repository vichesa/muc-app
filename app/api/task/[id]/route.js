import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const PATCH = async (request, { params }) => {
  const body = await request.json();
  const task = await prisma.task.update({
    where: {
      id: Number(params.id),
    },
    data: {
      status: body.status,
    },
  });
  return NextResponse.json(task, { status: 200 });
};
