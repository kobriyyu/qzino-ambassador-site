import { NextResponse } from "next/server";

type ApplicationPayload = {
  email?: string;
  fullName?: string;
  qzerId?: string;
  telegramUsername?: string;
  discordUsername?: string;
  profileType?: string;
  primaryPlatform?: string;
  primaryGeo?: string;
  trafficSource?: string;
  experience?: string;
  submittedAt?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function line(label: string, value?: string) {
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(value?.trim() || "—")}`;
}

async function sendTelegramNotification(payload: Required<ApplicationPayload>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram bot environment variables are missing.");
  }

  const message = [
    "<b>New Ambassador Application</b>",
    "",
    line("Full name", payload.fullName),
    line("Email", payload.email),
    line("Qzer ID", payload.qzerId),
    line("Telegram", payload.telegramUsername),
    line("Discord", payload.discordUsername),
    line("Profile", payload.profileType),
    line("Primary platform", payload.primaryPlatform),
    line("Main GEO", payload.primaryGeo),
    line("Traffic source", payload.trafficSource),
    line("Experience", payload.experience),
    line("Submitted at", payload.submittedAt),
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API request failed: ${response.status} ${errorText}`);
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as ApplicationPayload;
  const requiredFields = [
    body.email,
    body.fullName,
    body.qzerId,
    body.telegramUsername,
    body.profileType,
    body.primaryPlatform,
    body.primaryGeo,
    body.trafficSource,
  ];

  if (requiredFields.some((value) => !value || !value.trim())) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const application = {
    email: body.email!.trim(),
    fullName: body.fullName!.trim(),
    qzerId: body.qzerId!.trim(),
    telegramUsername: body.telegramUsername!.trim(),
    discordUsername: body.discordUsername?.trim() || "",
    profileType: body.profileType!.trim(),
    primaryPlatform: body.primaryPlatform!.trim(),
    primaryGeo: body.primaryGeo!.trim(),
    trafficSource: body.trafficSource!.trim(),
    experience: body.experience?.trim() || "",
    submittedAt: body.submittedAt ?? new Date().toISOString(),
  } satisfies Required<ApplicationPayload>;

  try {
    await sendTelegramNotification(application);
  } catch (error) {
    console.error("Failed to deliver ambassador application to Telegram", {
      error,
      application,
    });

    return NextResponse.json(
      { error: "Application was received, but Telegram delivery failed. Please try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Application submitted successfully.",
  });
}
