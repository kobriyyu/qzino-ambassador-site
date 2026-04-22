import { NextResponse } from "next/server";

type ApplicationPayload = {
  email?: string;
  fullName?: string;
  qzerId?: string;
  telegramUsername?: string;
  discordUsername?: string;
  submittedAt?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ApplicationPayload;
  const requiredFields = [
    body.email,
    body.fullName,
    body.qzerId,
    body.telegramUsername,
    body.discordUsername,
  ];

  if (requiredFields.some((value) => !value || !value.trim())) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  console.info("Ambassador application received", {
    email: body.email,
    fullName: body.fullName,
    qzerId: body.qzerId,
    telegramUsername: body.telegramUsername,
    discordUsername: body.discordUsername,
    submittedAt: body.submittedAt ?? new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message:
      "Application received. It is currently delivered to the server logs until a CRM or email integration is connected.",
  });
}
