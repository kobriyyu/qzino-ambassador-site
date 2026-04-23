"use client";

import React, { useMemo, useState } from "react";
import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  ClipboardCheck,
  Crown,
  Disc3,
  MonitorPlay,
  Sparkles,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  Wifi,
} from "lucide-react";

function money(v: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);
}

function num(v: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(v);
}

function rangeMoney(min: number, max: number) {
  if (Math.round(min) === Math.round(max)) return money(max);
  return `${money(min)}-${money(max)}`;
}

function creatorTier(ftd: number) {
  if (ftd >= 100) return { name: "Tier 3 / Elite", rate: 0.35, next: "Top tier unlocked" };
  if (ftd >= 50) return { name: "Tier 2 / Enforcer", rate: 0.3, next: `${num(100 - ftd)} FTD to Tier 3` };
  if (ftd >= 20) return { name: "Tier 1 / Operative", rate: 0.25, next: `${num(50 - ftd)} FTD to Tier 2` };
  return { name: "Tier 0 / Scout", rate: 0.35, next: `${num(Math.max(20 - ftd, 0))} FTD to Tier 1` };
}

function streamerTier(deposits: number) {
  if (deposits >= 1200) return { name: "KPI Passed", fixedEligible: true, next: "Fixed terms reviewed individually" };
  return { name: "Test Streams", fixedEligible: false, next: `${money(1200 - deposits)} deposits to KPI` };
}

function hunterTier(ftd: number) {
  if (ftd >= 100) return { name: "Tier 3 / Elite", rate: 0.35, bonus: 4, next: "Top tier unlocked" };
  if (ftd >= 50) return { name: "Tier 2 / Enforcer", rate: 0.3, bonus: 3, next: `${num(100 - ftd)} FTD to Tier 3` };
  if (ftd >= 20) return { name: "Tier 1 / Operative", rate: 0.25, bonus: 0, next: `${num(50 - ftd)} FTD to Tier 2` };
  return { name: "Tier 0 / Scout", rate: 0.35, bonus: 0, next: `${num(Math.max(20 - ftd, 0))} FTD to Tier 1` };
}

function vipTier(avgDeposit: number, players: number) {
  if (avgDeposit >= 1000) return { name: "VIP $1,000+", cpa: 50, lifetimeShare: 0.15, note: "CPA reviewed individually", next: "Individual bonus review" };
  if (avgDeposit >= 500) return { name: "VIP $500-$999", cpa: 50, lifetimeShare: 0.15, note: "Fixed CPA tier", next: `${num(Math.max(3 - players, 0))} VIPs can support Tier 3 review` };
  return { name: "Regular FTD", cpa: 20, lifetimeShare: 0.15, note: "$15-$25 CPA depending on GEO", next: `${money(500 - avgDeposit)} avg deposit to VIP tier` };
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-4xl">
      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B0ED00]">{eyebrow}</div>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">{text}</p> : null}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  variant = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  variant?: "default" | "hero" | "compact" | "results" | "program";
}) {
  const isHero = variant === "hero";
  const isCompact = variant === "compact";
  const isResults = variant === "results";
  const isProgram = variant === "program";
  const keepValueOnOneLine = isHero && !value.includes(" + ");

  return (
    <div
      className={`min-w-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${
        isHero
          ? "flex h-full min-h-[7.5rem] flex-col p-4 md:min-h-[8.25rem] md:p-5"
          : isCompact
            ? "flex h-full min-h-[8.25rem] flex-col p-4 md:min-h-[9rem] md:p-5"
            : isResults
              ? "flex h-full min-h-[7.5rem] flex-col p-4 md:min-h-[8.5rem] md:p-5"
              : isProgram
                ? "flex h-full min-h-[7.75rem] flex-col p-4 md:min-h-[9rem] md:p-5"
          : "flex h-full min-h-[9.5rem] flex-col p-4 md:min-h-[11.5rem]"
      }`}
    >
      <div
        className={`min-w-0 uppercase text-zinc-500 ${
          isHero
            ? "min-h-[1.5rem] text-[9px] leading-snug tracking-[0.16em] md:min-h-[1.75rem] md:text-[10px]"
            : isCompact
              ? "min-h-[1.6rem] text-[9px] leading-snug tracking-[0.18em] md:min-h-[1.9rem] md:text-[10px]"
              : isResults
                ? "min-h-[1.4rem] text-[9px] leading-snug tracking-[0.16em] md:min-h-[1.6rem] md:text-[10px]"
                : isProgram
                  ? "min-h-[1.5rem] text-[9px] leading-snug tracking-[0.16em] md:min-h-[1.75rem] md:text-[10px]"
            : "min-h-[2.75rem] text-[10px] tracking-[0.18em] md:min-h-[3.25rem]"
        }`}
      >
        {label}
      </div>
      <div
        className={`min-w-0 text-white ${
          isHero
            ? `mt-2 max-w-full text-[0.95rem] leading-[1.05] font-semibold tracking-tight sm:text-[1.05rem] lg:text-[1.15rem] xl:text-[1.25rem] ${
                keepValueOnOneLine ? "whitespace-nowrap" : "whitespace-normal break-words"
              }`
            : isCompact
              ? "mt-2 max-w-full text-[1.35rem] leading-[1.02] font-semibold tracking-tight whitespace-normal break-words md:text-[1.85rem]"
              : isResults
                ? "mt-2 max-w-full text-[1.5rem] leading-none font-semibold tracking-tight whitespace-normal break-words md:text-[2rem]"
                : isProgram
                  ? "mt-2 max-w-full text-[1.05rem] leading-[1.05] font-semibold tracking-tight whitespace-normal break-words md:text-[1.4rem]"
            : "mt-2 text-2xl leading-tight font-semibold md:text-[2.625rem]"
        }`}
      >
        {value}
      </div>
      {sub ? (
        <div
          className={`mt-auto min-w-0 text-zinc-500 ${
            isHero ? "pt-3 text-xs leading-snug md:text-sm" : "pt-3 text-xs md:text-sm"
          } ${
            isCompact ? "leading-snug md:text-[0.95rem]" : ""
          } ${
            isResults ? "leading-snug" : ""
          } ${
            isProgram ? "leading-snug md:text-[0.95rem]" : ""
          }`}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(24,24,27,0.94),rgba(10,10,10,0.92))] text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)] ${className}`}
    >
      {children}
    </div>
  );
}

function FeatureCard({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="h-full p-6 md:p-7">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#B0ED00]/10 bg-[#B0ED00]/8 text-[#B0ED00]">
        {icon}
      </div>
      <div className="text-xl font-semibold tracking-tight">{title}</div>
      <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
    </Card>
  );
}

function MiniPill({ children }: { children: React.ReactNode }) {
  return <div className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[11px] tracking-[0.02em] text-zinc-300">{children}</div>;
}

function RangeRow({
  label,
  value,
  min,
  max,
  step,
  state,
  setState,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  state: number[];
  setState: (value: number[]) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm text-zinc-300">{label}</span>
        <span className="text-sm font-semibold text-[#B0ED00]">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={state[0]}
        onChange={(e) => setState([Number(e.target.value)])}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-[#B0ED00]"
      />
    </div>
  );
}

function AssumptionPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-zinc-400">
      <span className="text-zinc-500">{label}: </span>
      <span className="font-medium text-zinc-200">{value}</span>
    </div>
  );
}

function TierCard({
  name,
  detail,
  next,
}: {
  name: string;
  detail: string;
  next: string;
}) {
  return (
    <div className="rounded-2xl border border-[#B0ED00]/20 bg-[#B0ED00]/8 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B0ED00]">Estimated Tier</div>
      <div className="mt-2 text-xl font-semibold tracking-tight text-white">{name}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-400">{detail}</div>
      <div className="mt-3 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs text-zinc-400">{next}</div>
    </div>
  );
}

function RuleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      <span className="text-right text-sm font-semibold text-zinc-200">{value}</span>
    </div>
  );
}

export default function QzinoAmbassadorProgramSite() {
  const [mode, setMode] = useState<"affiliate" | "streamer" | "hunter" | "vip">("affiliate");
  const [openForm, setOpenForm] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [qzerId, setQzerId] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [monthlyFtd, setMonthlyFtd] = useState([45]);
  const [avgDeposit, setAvgDeposit] = useState([110]);

  const [streamFtd, setStreamFtd] = useState([18]);
  const [streamDeposits, setStreamDeposits] = useState([2200]);

  const [hunterFtd, setHunterFtd] = useState([60]);
  const [networkNgr, setNetworkNgr] = useState([5000]);

  const [vipPlayers, setVipPlayers] = useState([4]);
  const [avgVipDeposit, setAvgVipDeposit] = useState([900]);

  const affiliate = useMemo(() => {
    const ftd = monthlyFtd[0];
    const tier = creatorTier(ftd);
    const deposits = ftd * avgDeposit[0];
    const ngr = deposits * 0.04;
    const testTotal = ngr * 0.35;
    const longTotal = ngr * tier.rate;
    const bestFit = ftd >= 20 ? "Strong fit for review" : ftd >= 8 ? "Good test candidate" : "Needs stronger traffic";
    const hasUpsideRange = Math.round(testTotal) !== Math.round(longTotal);
    return { ftd, deposits, ngr, testTotal, longTotal, bestFit, tier, hasUpsideRange };
  }, [monthlyFtd, avgDeposit]);

  const streamer = useMemo(() => {
    const ftd = streamFtd[0];
    const deposits = streamDeposits[0];
    const tier = streamerTier(deposits);
    const ngr = deposits * 0.04;
    const testRevIncome = ngr * 0.2;
    const kpiReached = deposits >= 1200;
    const longTotal = testRevIncome;
    const verdict = kpiReached ? "KPI reached - fixed can be justified" : "Below streamer KPI - revshare only";
    return { ftd, deposits, ngr, testRevIncome, longTotal, verdict, kpiReached, tier };
  }, [streamFtd, streamDeposits]);

  const hunter = useMemo(() => {
    const totalFtd = hunterFtd[0];
    const tier = hunterTier(totalFtd);
    const totalNgr = networkNgr[0];
    const revShareIncome = totalNgr * tier.rate;
    const subAmbIncome = totalNgr * 0.05;
    const extraFtdBonus = tier.bonus ? Math.max(totalFtd - 50, 0) * tier.bonus : 0;
    const total = revShareIncome + subAmbIncome + extraFtdBonus;
    const fit = totalFtd >= 50 ? "FTD bonus eligible" : "Building toward Tier 2 bonus";
    return { totalFtd, totalNgr, revShareIncome, subAmbIncome, extraFtdBonus, total, fit, tier };
  }, [hunterFtd, networkNgr]);

  const vip = useMemo(() => {
    const tier = vipTier(avgVipDeposit[0], vipPlayers[0]);
    const totalDeposits = vipPlayers[0] * avgVipDeposit[0];
    const totalNgr = totalDeposits * 0.04;
    const lifetime = totalNgr * tier.lifetimeShare;
    const cpaIncome = vipPlayers[0] * tier.cpa;
    const total = lifetime + cpaIncome;
    const fit = avgVipDeposit[0] >= 1000 ? "High-value VIP profile" : "Standard VIP sourcing";
    return { totalDeposits, totalNgr, lifetime, cpaIncome, total, fit, tier };
  }, [vipPlayers, avgVipDeposit]);

  async function handleApplicationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitMessage("");

    if (!email || !fullName || !qzerId || !telegramUsername || !discordUsername) {
      setSubmitMessage("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/ambassador-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          qzerId,
          telegramUsername,
          discordUsername,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit application.");
      setSubmitMessage("Application submitted successfully.");
      setEmail("");
      setFullName("");
      setQzerId("");
      setTelegramUsername("");
      setDiscordUsername("");
      setTimeout(() => {
        setOpenForm(false);
        setSubmitMessage("");
      }, 1000);
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-[#B0ED00]/7 blur-3xl" />
        <div className="absolute right-0 top-[120px] h-[420px] w-[420px] rounded-full bg-[#B0ED00]/9 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(176,237,0,0.03),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-8 lg:px-10">
        <header className="sticky top-4 z-20 rounded-[24px] border border-white/10 bg-zinc-950/75 px-5 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Qzino" className="h-7 w-auto md:h-8" />
            </div>
            <div className="hidden items-center gap-6 md:flex">
              <a href="#roles" className="text-sm text-zinc-400 transition hover:text-white">Roles</a>
              <a href="#calculator" className="text-sm text-zinc-400 transition hover:text-white">Calculator</a>
              <a href="#community" className="text-sm text-zinc-400 transition hover:text-white">Community</a>
              <a href="#program" className="text-sm text-zinc-400 transition hover:text-white">Program</a>
              <a href="#faq" className="text-sm text-zinc-400 transition hover:text-white">FAQ</a>
            </div>
            <a href="https://discord.gg/R3EpXeQf" target="_blank" rel="noreferrer" className="rounded-xl bg-[#B0ED00] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c6ff22]">
              Join the community
            </a>
          </div>
        </header>

        <section className="grid items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
          <div>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-7xl">Qzino Ambassador Program</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
              Built for influencers, streamers, affiliates, and sourcers who want more than one-off deals. You are not just joining a program - you are entering a system designed to monetize your audience long-term.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MiniPill>Up to 35% revenue share</MiniPill>
              <MiniPill>$50 CPA for VIP players</MiniPill>
              <MiniPill>+5% from your network</MiniPill>
              <MiniPill>No KYC</MiniPill>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#calculator"
                className="inline-flex min-h-[3.5rem] items-center justify-center gap-3 rounded-2xl bg-[#B0ED00] px-7 py-3 text-base font-semibold tracking-tight text-black shadow-[0_10px_30px_rgba(176,237,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#c6ff22] hover:shadow-[0_16px_40px_rgba(176,237,0,0.24)]"
              >
                Explore Earnings <span className="text-xl leading-none">→</span>
              </a>
              <a
                href="#program"
                className="inline-flex min-h-[3.5rem] items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03] px-7 py-3 text-base font-medium tracking-tight text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
              >
                View System
              </a>
            </div>
            <div className="mt-8 grid max-w-5xl grid-cols-2 items-stretch gap-3 xl:grid-cols-4">
              <Stat variant="hero" label="Top Offer" value="Up to 35%" sub="test period" />
              <Stat variant="hero" label="VIP Model" value="CPA + Lifetime" sub="high-value players" />
              <Stat variant="hero" label="Network Layer" value="+5%" sub="sub-ambassadors" />
              <Stat variant="hero" label="Core Platform" value="Community" sub="for ambassadors" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[36px] border border-[#B0ED00]/15 bg-gradient-to-br from-zinc-950 via-zinc-950 to-[#162300] p-7 shadow-[0_0_100px_rgba(176,237,0,0.08)] md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#B0ED00]/15 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#B0ED00]/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">Why people join</div>
                  <div className="mt-2 text-2xl font-semibold text-white">Monetize attention at scale</div>
                </div>
                <div className="rounded-full border border-[#B0ED00]/20 bg-[#B0ED00]/10 px-3 py-1 text-xs font-medium text-[#B0ED00]">
                  Community-driven
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-sm font-medium text-zinc-400">Best Entry Conditions</div>
                  <div className="mt-3 text-3xl font-semibold tracking-tight text-[#B0ED00] md:text-4xl">Up to 35% NGR</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-sm font-medium text-zinc-400">Scale After Review</div>
                  <div className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Personal Terms</div>
                </div>
              </div>

              <div className="mt-5 grid items-stretch gap-3 sm:grid-cols-3">
                <Stat variant="hero" label="Creators" value="$500-$2k" sub="avg active range" />
                <Stat variant="hero" label="Top Performers" value="$2k-$10k" sub="inside the system" />
                <Stat variant="hero" label="Leaderboard" value="Live" sub="inside community" />
              </div>
            </div>
          </div>
        </section>

        <section id="roles" className="py-12">
          <SectionTitle eyebrow="Core Roles" title="Built for the people we actually want in the program" text="The structure is designed to be obvious from the first screen: creators monetize audience, hunters build networks, and VIP sourcers focus on high-value players." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <FeatureCard icon={<Wifi className="h-5 w-5" />} title="Affiliate / Influencer" text="Monetize your traffic. Turn clicks, content, and audience trust into long-term revenue instead of one-off campaign payments." />
            <FeatureCard icon={<MonitorPlay className="h-5 w-5" />} title="Streamer" text="Use live attention the right way. Bring viewers into the system, test fast, and build recurring upside around your stream traffic." />
            <FeatureCard icon={<Target className="h-5 w-5" />} title="Hunter" text="Build your own earning network. Bring in other creators or partners and earn from everything they generate inside the system." />
            <FeatureCard icon={<Crown className="h-5 w-5" />} title="VIP Sourcing" text="If you can bring serious players, you get paid upfront and long term. High-value players mean high-value economics." />
          </div>
        </section>

        <section id="calculator" className="py-20">
          <SectionTitle eyebrow="Earnings Simulator" title="How much can you actually make?" text="Adjust the numbers below and see whether this is worth your time. This block is built to help creators, streamers, and sourcers evaluate real earning potential before they apply." />

          <div className="mt-10 rounded-[32px] border border-white/10 bg-zinc-950/90 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.28)] md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B0ED00] text-black shadow-[0_10px_25px_rgba(176,237,0,0.2)]">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">Program Earnings Calculator</div>
                    <p className="mt-1 text-sm text-zinc-400">Choose the path that matches how you actually monetize: audience, streams, partner sourcing, or VIP players.</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-nowrap gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black p-1 lg:w-auto lg:overflow-visible">
                {[
                  ["affiliate", "Creator / Affiliate"],
                  ["streamer", "Streamer"],
                  ["hunter", "Hunter"],
                  ["vip", "VIP Hunter"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMode(key as typeof mode)}
                    className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm transition ${mode === key ? "bg-[#B0ED00] text-black" : "text-zinc-300 hover:bg-white/10"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <Card className="bg-black/30">
                <div className="space-y-4 p-4 md:p-5">
                  <div className="rounded-2xl border border-[#B0ED00]/15 bg-[#B0ED00]/5 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B0ED00]">Document-based model</div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      Rewards are calculated from the program document: tiered NGR, FTD bonus, VIP CPA, Sub-Amb layer, and review-based fixed terms.
                    </p>
                  </div>

                  {mode === "affiliate" && (
                    <>
                      <TierCard
                        name={affiliate.tier.name}
                        detail={`${Math.round(affiliate.tier.rate * 100)}% NGR applied from current FTD tier.`}
                        next={affiliate.tier.next}
                      />
                      <RangeRow label="Monthly FTD" value={num(monthlyFtd[0])} min={5} max={250} step={5} state={monthlyFtd} setState={setMonthlyFtd} />
                      <RangeRow label="Average Deposit" value={money(avgDeposit[0])} min={20} max={500} step={10} state={avgDeposit} setState={setAvgDeposit} />
                    </>
                  )}

                  {mode === "streamer" && (
                    <>
                      <TierCard
                        name={streamer.tier.name}
                        detail={streamer.tier.fixedEligible ? "20% NGR now. Fixed terms are reviewed individually after KPI." : "20% NGR test model. Fixed is not available before KPI."}
                        next={streamer.tier.next}
                      />
                      <RangeRow label="Monthly FTD from Streams" value={num(streamFtd[0])} min={3} max={150} step={3} state={streamFtd} setState={setStreamFtd} />
                      <RangeRow label="Monthly Deposits Generated" value={money(streamDeposits[0])} min={300} max={25000} step={100} state={streamDeposits} setState={setStreamDeposits} />
                    </>
                  )}

                  {mode === "hunter" && (
                    <>
                      <TierCard
                        name={hunter.tier.name}
                        detail={`${Math.round(hunter.tier.rate * 100)}% RevShare + 5% Sub-Amb NGR. FTD bonus starts from Tier 2.`}
                        next={hunter.tier.next}
                      />
                      <RangeRow label="Monthly FTD" value={num(hunterFtd[0])} min={5} max={250} step={5} state={hunterFtd} setState={setHunterFtd} />
                      <RangeRow label="Monthly NGR" value={money(networkNgr[0])} min={500} max={50000} step={500} state={networkNgr} setState={setNetworkNgr} />
                    </>
                  )}

                  {mode === "vip" && (
                    <>
                      <TierCard
                        name={vip.tier.name}
                        detail={`${money(vip.tier.cpa)} CPA + ${Math.round(vip.tier.lifetimeShare * 100)}% lifetime NGR share.`}
                        next={vip.tier.next}
                      />
                      <RangeRow label="VIP Players Acquired" value={num(vipPlayers[0])} min={1} max={20} step={1} state={vipPlayers} setState={setVipPlayers} />
                      <RangeRow label="Average VIP Deposit" value={money(avgVipDeposit[0])} min={500} max={5000} step={50} state={avgVipDeposit} setState={setAvgVipDeposit} />
                    </>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    <AssumptionPill label="NGR" value="4%" />
                    {mode === "affiliate" && (
                      <>
                        <AssumptionPill label="Current tier" value={`${affiliate.tier.name} / ${Math.round(affiliate.tier.rate * 100)}%`} />
                        <AssumptionPill label="Top offer" value="35%" />
                      </>
                    )}
                    {mode === "streamer" && (
                      <>
                        <AssumptionPill label="Stream RevShare" value="20% NGR" />
                        <AssumptionPill label="Fixed" value={streamer.tier.fixedEligible ? "Review after KPI" : "Not eligible yet"} />
                      </>
                    )}
                    {mode === "hunter" && (
                      <>
                        <AssumptionPill label="RevShare" value={`${Math.round(hunter.tier.rate * 100)}%`} />
                        <AssumptionPill label="Sub-Amb" value="5% NGR" />
                        <AssumptionPill label="FTD bonus" value={hunter.tier.bonus ? `$${hunter.tier.bonus}/FTD estimate` : "Tier 2+"} />
                      </>
                    )}
                    {mode === "vip" && (
                      <>
                        <AssumptionPill label="CPA" value={money(vip.tier.cpa)} />
                        <AssumptionPill label="Lifetime" value={`${Math.round(vip.tier.lifetimeShare * 100)}%`} />
                      </>
                    )}
                  </div>

                  <div className="grid gap-2 pt-1">
                    {mode === "affiliate" && (
                      <>
                        <RuleRow label="Tier KPI" value="20 / 50 / 100 FTD" />
                        <RuleRow label="Model A" value="25% / 30% / 35% NGR" />
                      </>
                    )}
                    {mode === "streamer" && (
                      <>
                        <RuleRow label="Test KPI" value="$1,200 deposits" />
                        <RuleRow label="Fixed" value="Individual after review" />
                      </>
                    )}
                    {mode === "hunter" && (
                      <>
                        <RuleRow label="Bonus" value="$2-$4 per extra FTD" />
                        <RuleRow label="Sub-Amb" value="+5% NGR" />
                      </>
                    )}
                    {mode === "vip" && (
                      <>
                        <RuleRow label="VIP CPA" value="$50 for $500-$999" />
                        <RuleRow label="$1,000+" value="Individual review" />
                      </>
                    )}
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <div className="rounded-[28px] bg-[#B0ED00] p-5 text-black shadow-[0_0_80px_rgba(176,237,0,0.14)] md:p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Estimated Outcome</div>
                  <div className="mt-3 text-4xl font-bold md:text-5xl">
                    {mode === "affiliate" && rangeMoney(affiliate.longTotal, affiliate.testTotal)}
                    {mode === "streamer" && money(streamer.longTotal)}
                    {mode === "hunter" && money(hunter.total)}
                    {mode === "vip" && money(vip.total)}
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-black/70">
                    {mode === "affiliate" && `${affiliate.tier.name} tier applies ${Math.round(affiliate.tier.rate * 100)}% NGR.${affiliate.hasUpsideRange ? ` Test-period top offer can reach ${money(affiliate.testTotal)} at 35% NGR.` : " This already matches the 35% top offer."}`}
                    {mode === "streamer" && `${streamer.tier.name}: calculator shows 20% NGR. Fixed terms are individual after review, so no fixed amount is invented here.`}
                    {mode === "hunter" && `${hunter.tier.name}: ${Math.round(hunter.tier.rate * 100)}% NGR plus 5% Sub-Amb layer and FTD bonus when eligible.`}
                    {mode === "vip" && `${vip.tier.name}: ${vip.tier.note}. Lifetime RevShare remains ${Math.round(vip.tier.lifetimeShare * 100)}% NGR.`}
                  </p>
                </div>

                {mode === "affiliate" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat variant="results" label="FTD" value={num(affiliate.ftd)} />
                    <Stat variant="results" label="Deposits" value={money(affiliate.deposits)} />
                    <Stat variant="results" label="Core NGR" value={money(affiliate.ngr)} />
                    <Stat variant="results" label="Tier Rate" value={`${Math.round(affiliate.tier.rate * 100)}%`} />
                  </div>
                )}

                {mode === "streamer" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat variant="results" label="FTD" value={num(streamer.ftd)} />
                    <Stat variant="results" label="Deposits" value={money(streamer.deposits)} />
                    <Stat variant="results" label="RevShare" value={money(streamer.testRevIncome)} />
                    <Stat variant="results" label="Tier" value={streamer.tier.name} />
                  </div>
                )}

                {mode === "hunter" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat variant="results" label="Total FTD" value={num(hunter.totalFtd)} />
                    <Stat variant="results" label="RevShare" value={money(hunter.revShareIncome)} />
                    <Stat variant="results" label="Sub-Amb Layer" value={money(hunter.subAmbIncome)} />
                    <Stat variant="results" label="FTD Bonus" value={money(hunter.extraFtdBonus)} />
                  </div>
                )}

                {mode === "vip" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat variant="results" label="VIP Deposits" value={money(vip.totalDeposits)} />
                    <Stat variant="results" label="VIP NGR" value={money(vip.totalNgr)} />
                    <Stat variant="results" label="CPA Income" value={money(vip.cpaIncome)} />
                    <Stat variant="results" label="Tier CPA" value={money(vip.tier.cpa)} />
                  </div>
                )}

                <div className="rounded-[28px] border border-white/10 bg-zinc-950/90 p-6 text-white md:p-7">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-lg">
                      <div className="text-lg font-semibold text-white">Join the Ambassador Community</div>
                      <p className="mt-2 text-sm leading-7 text-zinc-400">
                        To enter the program, you need to complete a short application. It takes less than 1 minute and helps us filter serious participants.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenForm(true)}
                      className="rounded-xl bg-[#B0ED00] px-6 py-4 text-base font-semibold text-black transition hover:bg-[#c6ff22]"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="community" className="py-12">
          <SectionTitle eyebrow="Community Experience" title="The operating layer behind the program" text="Discord is where ambassadors get sorted, briefed, tracked, reviewed, and moved into higher-value opportunities. The community is designed as a workflow, not just a chat." />
          <div className="mt-10 overflow-hidden rounded-[34px] border border-white/[0.08] bg-[radial-gradient(circle_at_80%_0%,rgba(176,237,0,0.12),transparent_34%),linear-gradient(180deg,rgba(24,24,27,0.92),rgba(8,8,8,0.94))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] md:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: <Disc3 className="h-4 w-4" />,
                    step: "01",
                    title: "Role routing",
                    text: "Affiliate, Streamer, Hunter, and VIP candidates enter the right channel from day one.",
                  },
                  {
                    icon: <ClipboardCheck className="h-4 w-4" />,
                    step: "02",
                    title: "Briefs & tasks",
                    text: "Clear onboarding, promo assets, tracking links, and next actions in one place.",
                  },
                  {
                    icon: <BarChart3 className="h-4 w-4" />,
                    step: "03",
                    title: "Performance review",
                    text: "FTD, deposits, NGR, GEO, and quality signals drive the move into stronger terms.",
                  },
                  {
                    icon: <Trophy className="h-4 w-4" />,
                    step: "04",
                    title: "Status & rewards",
                    text: "Tiers, badges, leaderboards, and bonus access keep top contributors visible.",
                  },
                ].map((item) => (
                  <div key={item.step} className="rounded-3xl border border-white/[0.08] bg-black/25 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#B0ED00]/15 bg-[#B0ED00]/10 text-[#B0ED00]">
                        {item.icon}
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">{item.step}</div>
                    </div>
                    <div className="mt-5 text-lg font-semibold tracking-tight text-white">{item.title}</div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[30px] border border-white/[0.08] bg-black/35 p-5 md:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B0ED00]">Discord Hub</div>
                    <div className="mt-3 text-3xl font-semibold tracking-tight text-white">One place for onboarding, tracking, and reviews.</div>
                  </div>
                  <a
                    href="https://discord.gg/R3EpXeQf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-2xl border border-[#B0ED00]/25 bg-[#B0ED00]/10 px-4 py-2.5 text-sm font-semibold text-[#B0ED00] transition hover:bg-[#B0ED00] hover:text-black"
                  >
                    Join Discord
                  </a>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    ["Access", "Approved contributors only"],
                    ["Channels", "Separated by role and tier"],
                    ["Tracking", "Links, promos, FTD, deposits, NGR"],
                    ["Reviews", "Performance-based term upgrades"],
                    ["Rewards", "Leaderboard, badge, test-deposit access"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</div>
                      <div className="text-sm font-medium text-zinc-200">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-[#B0ED00]/15 bg-[#B0ED00]/5 p-4 text-sm leading-6 text-zinc-300">
                  The goal is simple: every serious ambassador should know where they stand, what to do next, and what unlocks the next tier.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="program" className="py-12">
          <SectionTitle eyebrow="Program Structure" title="Simple enough to enter, strong enough to keep top performers" text="The structure is designed to maximize trial, filter weak candidates fast, and move the right people into long-term terms based on performance." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Card className="rounded-[30px] p-6 md:p-7">
              <div className="flex items-center gap-3 text-2xl font-semibold"><Sparkles className="h-5 w-5 text-[#B0ED00]" /> Test Period</div>
              <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-7 text-zinc-400">
                Start with the best conditions. No overloaded onboarding. No long warm-up. You enter, test, and see quickly whether the system fits you.
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Stat variant="program" label="Offer" value="Up to 35% NGR" />
                <Stat variant="program" label="Duration" value="15-30 days" />
                <Stat variant="program" label="Goal" value="Prove Fit" />
              </div>
            </Card>

            <Card className="rounded-[30px] p-6 md:p-7">
              <div className="flex items-center gap-3 text-2xl font-semibold"><ClipboardCheck className="h-5 w-5 text-[#B0ED00]" /> Performance Review</div>
              <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-7 text-zinc-400">
                We do not guess. We look at numbers. If you perform, you unlock better conditions, stronger support, and more room to scale.
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Stat variant="program" label="Review Based On" value="FTD + GEO" />
                <Stat variant="program" label="Output" value="Personal Terms" />
                <Stat variant="program" label="Outcome" value="Scale" />
              </div>
            </Card>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            <FeatureCard icon={<BadgeDollarSign className="h-5 w-5" />} title="Bonus Stack" text="Sub-ambassador revenue, farming upside, FTD overperformance bonuses, and leaderboard-based motivation keep the economics attractive after entry." />
            <FeatureCard icon={<ShieldCheck className="h-5 w-5" />} title="Strict Anti-Fraud" text="The system is built to reject fake stats, weak traffic, and abusive behavior early. Serious participants stay, weak traffic gets filtered out." />
            <FeatureCard icon={<Activity className="h-5 w-5" />} title="Real Retention Logic" text="The goal is not just to get people in. The goal is to give strong participants reasons to stay, perform, and grow inside the system." />
          </div>
        </section>

        <section className="py-18">
          <SectionTitle eyebrow="Flow" title="How serious people move through the program" text="The journey is simple on the surface and selective underneath. That makes the program easier to enter, but harder to abuse." />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              ["01", "Apply", "Share your channels, traffic, audience, or sourcing angle."],
              ["02", "Join Community", "Move into the community hub and get the right onboarding path."],
              ["03", "Prove Results", "Drive FTD, players, or partner-level outcomes in the system."],
              ["04", "Scale", "Unlock stronger terms and deeper opportunities based on performance."],
            ].map(([step, title, text]) => (
              <Card key={step} className="p-6">
                <div className="text-sm font-semibold text-[#B0ED00]">{step}</div>
                <div className="mt-3 text-2xl font-semibold text-white">{title}</div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="py-10">
          <SectionTitle eyebrow="FAQ" title="The main objections answered directly" text="The site should remove hesitation fast without turning into an overloaded document." />
          <div className="mt-10 rounded-[30px] border border-white/10 bg-zinc-950 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:p-6">
            {[
              ["Who is this built for?", "Influencers, streamers, affiliates, hunters, and VIP sourcers who already have traffic, audience, or the right network to monetize."],
              ["Why should creators care?", "Because this is built around predictable revenue, not just random one-off campaign fees. Strong creators can grow inside the system instead of restarting every month."],
              ["What happens after the test period?", "The team reviews actual performance and offers stronger long-term conditions based on your real numbers."],
              ["How strict is fraud policy?", "Very strict. Fake stats, abusive behavior, and low-quality schemes should be treated as immediate disqualification and payout block."],
            ].map(([title, text]) => (
              <details key={title} className="border-b border-white/10 py-5 last:border-0">
                <summary className="cursor-pointer list-none text-left text-white transition hover:text-[#B0ED00]">{title}</summary>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="rounded-[36px] border border-[#B0ED00]/15 bg-gradient-to-br from-zinc-950 via-zinc-950 to-[#182600] p-8 shadow-[0_0_100px_rgba(176,237,0,0.08)] md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B0ED00]">Final step</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">Get access to the system.</h3>
                <p className="mt-4 text-base leading-8 text-zinc-400">
                  This is not for everyone. If you have audience, traffic, or strong connections, you can fit in fast. If not, this probably will not work for you.
                </p>
              </div>
              <div className="flex w-full max-w-[22rem] flex-col gap-3">
                <a
                  href="https://discord.gg/R3EpXeQf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[3.75rem] w-full items-center justify-center gap-3 rounded-2xl bg-[#B0ED00] px-6 py-3.5 text-lg font-semibold tracking-tight text-black shadow-[0_12px_30px_rgba(176,237,0,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#c6ff22]"
                >
                  Join the community <span className="text-xl leading-none">→</span>
                </a>
                <button
                  type="button"
                  className="inline-flex min-h-[3.75rem] w-full items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-3.5 text-lg font-medium tracking-tight text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  Contact Program Team
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-black p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">Application form</div>
                <p className="text-sm text-zinc-400">All fields are required</p>
              </div>
              <button type="button" onClick={() => setOpenForm(false)} className="text-zinc-400 transition hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="mt-4 space-y-4">
              <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <input required value={qzerId} onChange={(e) => setQzerId(e.target.value)} placeholder="QzerID" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <p className="text-xs text-zinc-500">Find Qzer ID in dashboard. Register first if needed.</p>
              <input required value={telegramUsername} onChange={(e) => setTelegramUsername(e.target.value)} placeholder="Telegram (@username)" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <input required value={discordUsername} onChange={(e) => setDiscordUsername(e.target.value)} placeholder="Discord username" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />

              {submitMessage ? <p className="text-sm text-zinc-300">{submitMessage}</p> : null}

              <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[#B0ED00] px-5 py-3 font-semibold text-black transition hover:bg-[#c6ff22] disabled:opacity-60">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
