import { NextResponse } from "next/server";

type ApplicationPayload = {
  email: string;
  fullName: string;
  qzerId: string;
  telegramUsername: string;
  discordUsername: string;
  profileType: string;
  primaryPlatform: string;
  primaryGeo: string;
  trafficSource: string;
  experience: string;
  submittedAt: string;
};

type ValidationResult =
  | { ok: true; application: ApplicationPayload }
  | { ok: false; error: string; status: number };

type StringFieldResult =
  | { value: string; error?: never }
  | { error: string; value?: never };

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_AGE_MS = 3_000;
const MAX_FORM_AGE_MS = 4 * 60 * 60 * 1000;
const ALLOWED_PROFILE_TYPES = new Set(["Creators", "Player Hunter"]);
const encoder = new TextEncoder();

const rateLimitStore = ((globalThis as typeof globalThis & {
  __qzinoApplicationRateLimit?: Map<string, number[]>;
}).__qzinoApplicationRateLimit ??= new Map<string, number[]>());

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(maxLength - 3, 0))}...`;
}

function line(label: string, value: string, maxLength = 500) {
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(truncate(value.trim() || "-", maxLength))}`;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  const recent = (rateLimitStore.get(key) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(key, recent);
    return false;
  }

  recent.push(now);
  rateLimitStore.set(key, recent);
  return true;
}

function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function readString(
  source: Record<string, unknown>,
  key: string,
  label: string,
  maxLength: number,
  required = true
): StringFieldResult {
  const raw = source[key];

  if (raw === undefined || raw === null) {
    return required ? { error: `${label} is required.` } : { value: "" };
  }

  if (typeof raw !== "string") {
    return { error: `${label} must be text.` };
  }

  const value = raw.trim();

  if (required && !value) {
    return { error: `${label} is required.` };
  }

  if (value.length > maxLength) {
    return { error: `${label} is too long.` };
  }

  return { value };
}

function validateFormTiming(source: Record<string, unknown>) {
  const rawStartedAt = source.formStartedAt;
  const startedAt =
    typeof rawStartedAt === "number"
      ? rawStartedAt
      : typeof rawStartedAt === "string"
        ? Number(rawStartedAt)
        : NaN;

  if (!Number.isFinite(startedAt)) {
    return "Please refresh the page and try again.";
  }

  const age = Date.now() - startedAt;

  if (age < MIN_FORM_AGE_MS) {
    return "Please review the form before submitting.";
  }

  if (age > MAX_FORM_AGE_MS || age < -5_000) {
    return "Please refresh the page and try again.";
  }

  return null;
}

function validateApplicationPayload(body: unknown): ValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Invalid application payload.", status: 400 };
  }

  const source = body as Record<string, unknown>;
  const honeypot = readString(source, "companyWebsite", "Company website", 200, false);

  if ("error" in honeypot) {
    return { ok: false, error: "Invalid application payload.", status: 400 };
  }

  if (honeypot.value) {
    return { ok: false, error: "Application could not be submitted.", status: 400 };
  }

  const timingError = validateFormTiming(source);

  if (timingError) {
    return { ok: false, error: timingError, status: 400 };
  }

  const email = readString(source, "email", "Email", 254);
  const fullName = readString(source, "fullName", "Full name", 100);
  const qzerId = readString(source, "qzerId", "Qzer ID", 80);
  const telegramUsername = readString(source, "telegramUsername", "Telegram username", 40);
  const discordUsername = readString(source, "discordUsername", "Discord username", 80, false);
  const profileType = readString(source, "profileType", "Profile type", 40);
  const primaryPlatform = readString(source, "primaryPlatform", "Primary platform", 120);
  const primaryGeo = readString(source, "primaryGeo", "Main GEO", 80);
  const trafficSource = readString(source, "trafficSource", "Traffic source", 300);
  const experience = readString(source, "experience", "Experience", 1500, false);
  const fields = [
    email,
    fullName,
    qzerId,
    telegramUsername,
    discordUsername,
    profileType,
    primaryPlatform,
    primaryGeo,
    trafficSource,
    experience,
  ];
  const invalidField = fields.find((field): field is { error: string } => "error" in field);

  if (invalidField) {
    return { ok: false, error: invalidField.error, status: 400 };
  }

  const emailValue = email.value!;
  const fullNameValue = fullName.value!;
  const qzerIdValue = qzerId.value!;
  const telegramUsernameValue = telegramUsername.value!;
  const discordUsernameValue = discordUsername.value!;
  const profileTypeValue = profileType.value!;
  const primaryPlatformValue = primaryPlatform.value!;
  const primaryGeoValue = primaryGeo.value!;
  const trafficSourceValue = trafficSource.value!;
  const experienceValue = experience.value!;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    return { ok: false, error: "Please enter a valid email address.", status: 400 };
  }

  if (!/^@?[A-Za-z0-9_]{5,32}$/.test(telegramUsernameValue)) {
    return { ok: false, error: "Please enter a valid Telegram username.", status: 400 };
  }

  if (!ALLOWED_PROFILE_TYPES.has(profileTypeValue)) {
    return { ok: false, error: "Please choose a valid profile type.", status: 400 };
  }

  return {
    ok: true,
    application: {
      email: emailValue,
      fullName: fullNameValue,
      qzerId: qzerIdValue,
      telegramUsername: telegramUsernameValue,
      discordUsername: discordUsernameValue,
      profileType: profileTypeValue,
      primaryPlatform: primaryPlatformValue,
      primaryGeo: primaryGeoValue,
      trafficSource: trafficSourceValue,
      experience: experienceValue,
      submittedAt: new Date().toISOString(),
    },
  };
}

function getSafeError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }

  return { name: "UnknownError", message: "Unknown error" };
}

async function sendTelegramNotification(payload: ApplicationPayload) {
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
    line("Experience", payload.experience, 900),
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
  const contentType = request.headers.get("content-type") || "";
  const contentLength = Number(request.headers.get("content-length") || 0);
  const clientIp = getClientIp(request);

  if (!hasValidOrigin(request)) {
    return NextResponse.json(
      { error: "Application submissions must come from this site." },
      { status: 403 }
    );
  }

  if (!consumeRateLimit(`application:${clientIp}`)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json." },
      { status: 415 }
    );
  }

  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Application payload is too large." },
      { status: 413 }
    );
  }

  let rawBody = "";

  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  if (encoder.encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Application payload is too large." },
      { status: 413 }
    );
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const validation = validateApplicationPayload(body);

  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.error },
      { status: validation.status }
    );
  }

  const normalizedEmail = validation.application.email.toLowerCase();
  const normalizedTelegram = validation.application.telegramUsername.toLowerCase();

  if (
    !consumeRateLimit(`email:${normalizedEmail}`) ||
    !consumeRateLimit(`telegram:${normalizedTelegram}`)
  ) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  try {
    await sendTelegramNotification(validation.application);
  } catch (error) {
    console.error("Failed to deliver ambassador application to Telegram", {
      error: getSafeError(error),
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
