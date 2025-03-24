import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const resume = await prisma.resume.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  return new NextResponse(resume.file, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${resume.filename}"`,
    },
  });
}
