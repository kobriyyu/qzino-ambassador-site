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
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  if (Math.round(low) === Math.round(high)) return money(high);
  return `${money(low)}-${money(high)}`;
}

function estimateNgrFromDeposits(deposits: number) {
  return deposits * 0.04;
}

function startPeriodReward(ftd: number, ngr: number) {
  const boostedFtdBonus = Math.min(ftd, 15) * 7;
  const baseFtdBonusAfterBoost = Math.max(ftd - 15, 0) * 3;
  const signingBonus = ftd > 0 ? 50 : 0;
  const welcomeBonus = Math.min(boostedFtdBonus + baseFtdBonusAfterBoost + signingBonus, 500);
  return {
    welcomeBonus,
    total: ngr * 0.3 + welcomeBonus,
  };
}

function activeCycleReward(ftd: number, ngr: number, rate: number, ftdBonus: number) {
  return ngr * rate + ftd * ftdBonus;
}

function creatorTier(ftd: number) {
  if (ftd >= 35) return { name: "Top", rate: 0.35, next: "Top public tier unlocked", ftdBonus: 5 };
  if (ftd >= 15) return { name: "Mid", rate: 0.33, next: `${num(35 - ftd)} FTD to Top`, ftdBonus: 4 };
  return { name: "Start", rate: 0.3, next: `${num(Math.max(15 - ftd, 0))} FTD to Mid`, ftdBonus: 3 };
}

function streamerReviewStatus(deposits: number) {
  if (deposits >= 1200) return { name: "KPI Passed", fixedEligible: true, next: "Fixed terms can be reviewed individually" };
  return { name: "Start Period", fixedEligible: false, next: `${money(1200 - deposits)} deposits to streamer KPI benchmark` };
}

function vipCpaBracket(avgDeposit: number) {
  if (avgDeposit >= 2500) return { name: "VIP $2,500+", cpa: 200, note: "Highest public VIP CPA bracket", next: "Top public VIP CPA bracket unlocked" };
  if (avgDeposit >= 1000) return { name: "VIP $1,000+", cpa: 100, note: "Mid public VIP CPA bracket", next: `${money(2500 - avgDeposit)} avg deposit to top CPA bracket` };
  if (avgDeposit >= 500) return { name: "VIP $500-$999", cpa: 50, note: "Base public VIP CPA bracket", next: `${money(1000 - avgDeposit)} avg deposit to next CPA bracket` };
  return { name: "Below VIP CPA threshold", cpa: 0, note: "Public VIP CPA starts from $500+ FTD or wager-based validation", next: `${money(500 - avgDeposit)} avg deposit to first VIP CPA bracket` };
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
  const [mode, setMode] = useState<"affiliate" | "streamer" | "vip">("affiliate");
  const [openForm, setOpenForm] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [qzerId, setQzerId] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [profileType, setProfileType] = useState("Content & Traffic");
  const [primaryPlatform, setPrimaryPlatform] = useState("");
  const [primaryGeo, setPrimaryGeo] = useState("");
  const [trafficSource, setTrafficSource] = useState("");
  const [experience, setExperience] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [monthlyFtd, setMonthlyFtd] = useState([45]);
  const [avgDeposit, setAvgDeposit] = useState([110]);

  const [streamFtd, setStreamFtd] = useState([18]);
  const [streamDeposits, setStreamDeposits] = useState([2200]);

  const [vipPlayers, setVipPlayers] = useState([4]);
  const [vipFtd, setVipFtd] = useState([20]);
  const [avgVipDeposit, setAvgVipDeposit] = useState([900]);

  const affiliate = useMemo(() => {
    const ftd = monthlyFtd[0];
    const tier = creatorTier(ftd);
    const deposits = ftd * avgDeposit[0];
    const ngr = estimateNgrFromDeposits(deposits);
    const startPeriod = startPeriodReward(ftd, ngr);
    const longTotal = activeCycleReward(ftd, ngr, tier.rate, tier.ftdBonus);
    const bestFit = ftd >= 20 ? "Strong fit for review" : ftd >= 8 ? "Good test candidate" : "Needs stronger traffic";
    const hasUpsideRange = Math.round(startPeriod.total) !== Math.round(longTotal);
    return { ftd, deposits, ngr, testTotal: startPeriod.total, longTotal, bestFit, tier, hasUpsideRange, welcomeBonus: startPeriod.welcomeBonus };
  }, [monthlyFtd, avgDeposit]);

  const streamer = useMemo(() => {
    const ftd = streamFtd[0];
    const deposits = streamDeposits[0];
    const performanceTier = creatorTier(ftd);
    const review = streamerReviewStatus(deposits);
    const ngr = estimateNgrFromDeposits(deposits);
    const startPeriod = startPeriodReward(ftd, ngr);
    const activeTotal = activeCycleReward(ftd, ngr, performanceTier.rate, performanceTier.ftdBonus);
    const kpiReached = deposits >= 1200;
    const verdict = kpiReached ? "Deposit KPI reached - fixed can be reviewed individually" : "Base reward model only until deposit KPI is proven";
    return { ftd, deposits, ngr, testTotal: startPeriod.total, longTotal: activeTotal, verdict, kpiReached, tier: performanceTier, review, welcomeBonus: startPeriod.welcomeBonus };
  }, [streamFtd, streamDeposits]);

  const vip = useMemo(() => {
    const tier = creatorTier(vipFtd[0]);
    const cpaBracket = vipCpaBracket(avgVipDeposit[0]);
    const totalDeposits = vipPlayers[0] * avgVipDeposit[0];
    const totalNgr = estimateNgrFromDeposits(totalDeposits);
    const startPeriod = startPeriodReward(vipFtd[0], totalNgr);
    const baseReward = activeCycleReward(vipFtd[0], totalNgr, tier.rate, tier.ftdBonus);
    const cpaIncome = vipPlayers[0] * cpaBracket.cpa;
    const total = baseReward + cpaIncome;
    const fit = avgVipDeposit[0] >= 1000 ? "Higher-value player profile" : avgVipDeposit[0] >= 500 ? "Base VIP CPA bracket reached" : "Below public VIP CPA threshold";
    return {
      totalDeposits,
      totalNgr,
      baseReward,
      cpaIncome,
      total,
      fit,
      tier,
      cpaBracket,
      vipFtd: vipFtd[0],
      testTotal: startPeriod.total,
      welcomeBonus: startPeriod.welcomeBonus,
    };
  }, [vipPlayers, vipFtd, avgVipDeposit]);

  function outcomeCopy(startValue: number, activeValue: number, startLabel: string, activeLabel: string) {
    if (Math.round(startValue) === Math.round(activeValue)) {
      return `Current preview is the same in ${startLabel.toLowerCase()} and ${activeLabel.toLowerCase()}.`;
    }

    if (startValue > activeValue) {
      return `${startLabel} is currently higher because Welcome Bonus is active. ${activeLabel} settles lower after the boosted entry incentives end.`;
    }

    return `${activeLabel} is currently higher because the ongoing tier reward outgrows the one-time Start Period boost. ${startLabel} remains the entry-stage upside.`;
  }

  async function handleApplicationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitMessage("");

    if (!email || !fullName || !qzerId || !telegramUsername || !profileType || !primaryPlatform || !primaryGeo || !trafficSource) {
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
          profileType,
          primaryPlatform,
          primaryGeo,
          trafficSource,
          experience,
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
      setProfileType("Content & Traffic");
      setPrimaryPlatform("");
      setPrimaryGeo("");
      setTrafficSource("");
      setExperience("");
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
          <SectionTitle eyebrow="Core Profiles" title="Three profiles, one standardized lifecycle" text="Each ambassador is assigned one dominant profile. The profile defines KPI, bonus logic, and review criteria. Cross-channel activity still rolls into one tracking setup." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <FeatureCard icon={<Wifi className="h-5 w-5" />} title="Content & Traffic" text="Audience, posting, and distribution are only valuable when they convert into validated $20+ FTD and long-term NGR." />
            <FeatureCard icon={<MonitorPlay className="h-5 w-5" />} title="Streamer" text="Live conversion is the core signal. Fixed payments and test deposits only make sense when stream deposits and NGR justify them." />
            <FeatureCard icon={<Target className="h-5 w-5" />} title="Player Hunter" text="No big audience required. What matters is player quality, VIP FTD, wager behavior, and clean fraud markers." />
          </div>
        </section>

        <section id="calculator" className="py-20">
          <SectionTitle eyebrow="Earnings Simulator" title="Preview the model before you apply" text="The calculator is designed around program terms from the relaunch strategy: progressive NGR, Start Period logic, VIP CPA, FTD bonus, and review-based rewards." />

          <div className="mt-10 rounded-[32px] border border-white/10 bg-zinc-950/90 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.28)] md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B0ED00] text-black shadow-[0_10px_25px_rgba(176,237,0,0.2)]">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">Program Earnings Calculator</div>
                    <p className="mt-1 text-sm text-zinc-400">Pick the dominant profile that actually generates your revenue. The result is estimated from tracked performance, not vanity metrics.</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-nowrap gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black p-1 lg:w-auto lg:overflow-visible">
                {[
                  ["affiliate", "Content & Traffic"],
                  ["streamer", "Streamer"],
                  ["vip", "Player Hunter"],
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
                      Public outputs follow strategy 3.2 as closely as possible: progressive NGR, FTD bonus, Welcome Bonus, VIP CPA brackets, and review-based streamer fixed terms.
                    </p>
                  </div>

                  {mode === "affiliate" && (
                    <>
                      <TierCard
                        name={affiliate.tier.name}
                        detail={`${Math.round(affiliate.tier.rate * 100)}% NGR + $${affiliate.tier.ftdBonus} FTD bonus at the current level.`}
                        next={affiliate.tier.next}
                      />
                      <RangeRow label="Monthly FTD" value={num(monthlyFtd[0])} min={5} max={250} step={5} state={monthlyFtd} setState={setMonthlyFtd} />
                      <RangeRow label="Average Deposit" value={money(avgDeposit[0])} min={20} max={500} step={10} state={avgDeposit} setState={setAvgDeposit} />
                    </>
                  )}

                  {mode === "streamer" && (
                    <>
                      <TierCard
                        name={streamer.review.name}
                        detail={`${Math.round(streamer.tier.rate * 100)}% NGR + $${streamer.tier.ftdBonus} per valid $20+ FTD. Fixed stays outside the public calculator until review.`}
                        next={streamer.review.next}
                      />
                      <RangeRow label="Monthly FTD from Streams" value={num(streamFtd[0])} min={3} max={150} step={3} state={streamFtd} setState={setStreamFtd} />
                      <RangeRow label="Monthly Deposits Generated" value={money(streamDeposits[0])} min={300} max={25000} step={100} state={streamDeposits} setState={setStreamDeposits} />
                    </>
                  )}

                  {mode === "vip" && (
                    <>
                      <TierCard
                        name={vip.cpaBracket.name}
                        detail={`${Math.round(vip.tier.rate * 100)}% NGR + $${vip.tier.ftdBonus} per valid $20+ FTD, plus ${money(vip.cpaBracket.cpa)} CPA when the VIP threshold is reached.`}
                        next={vip.cpaBracket.next}
                      />
                      <RangeRow label="Monthly Valid $20+ FTD" value={num(vipFtd[0])} min={3} max={150} step={1} state={vipFtd} setState={setVipFtd} />
                      <RangeRow label="VIP Players Acquired" value={num(vipPlayers[0])} min={1} max={20} step={1} state={vipPlayers} setState={setVipPlayers} />
                      <RangeRow label="Average VIP Deposit" value={money(avgVipDeposit[0])} min={500} max={5000} step={50} state={avgVipDeposit} setState={setAvgVipDeposit} />
                    </>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    <AssumptionPill label="NGR" value="4%" />
                    {mode === "affiliate" && (
                      <>
                        <AssumptionPill label="Current tier" value={`${affiliate.tier.name} / ${Math.round(affiliate.tier.rate * 100)}%`} />
                        <AssumptionPill label="Welcome" value={`$${Math.round(Math.min(affiliate.welcomeBonus, 500))} current estimate`} />
                      </>
                    )}
                    {mode === "streamer" && (
                      <>
                        <AssumptionPill label="Current tier" value={`${streamer.tier.name} / ${Math.round(streamer.tier.rate * 100)}%`} />
                        <AssumptionPill label="Welcome" value={`$${Math.round(Math.min(streamer.welcomeBonus, 500))} start-period estimate`} />
                        <AssumptionPill label="Fixed" value={streamer.review.fixedEligible ? "Review after KPI" : "Held for review"} />
                      </>
                    )}
                    {mode === "vip" && (
                      <>
                        <AssumptionPill label="Current tier" value={`${vip.tier.name} / ${Math.round(vip.tier.rate * 100)}%`} />
                        <AssumptionPill label="CPA" value={money(vip.cpaBracket.cpa)} />
                        <AssumptionPill label="Welcome" value={`$${Math.round(Math.min(vip.welcomeBonus, 500))} start-period estimate`} />
                      </>
                    )}
                  </div>

                  <div className="grid gap-2 pt-1">
                    {mode === "affiliate" && (
                      <>
                        <RuleRow label="Public thresholds" value="15+ / 35+ valid FTD" />
                        <RuleRow label="Model" value="30% / 33% / 35% NGR" />
                      </>
                    )}
                    {mode === "streamer" && (
                      <>
                        <RuleRow label="Base model" value="30% / 33% / 35% + $3-$5 FTD" />
                        <RuleRow label="Fixed" value="Individual after deposit review" />
                      </>
                    )}
                    {mode === "vip" && (
                      <>
                        <RuleRow label="VIP CPA" value="$50 / $100 / $200" />
                        <RuleRow label="Base model" value="30% / 33% / 35% + $3-$5 FTD" />
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
                    {mode === "streamer" && rangeMoney(streamer.longTotal, streamer.testTotal)}
                    {mode === "vip" && rangeMoney(vip.total, vip.testTotal)}
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-black/70">
                    {mode === "affiliate" && `${affiliate.tier.name} tier applies ${Math.round(affiliate.tier.rate * 100)}% NGR + $${affiliate.tier.ftdBonus} per valid $20+ FTD. ${outcomeCopy(affiliate.testTotal, affiliate.longTotal, "Start Period", "Active Cycle")}`}
                    {mode === "streamer" && `${streamer.tier.name} performance tier applies ${Math.round(streamer.tier.rate * 100)}% NGR + $${streamer.tier.ftdBonus} per valid $20+ FTD. ${outcomeCopy(streamer.testTotal, streamer.longTotal, "Start Period", "Active Cycle")} Fixed and test-deposit economics stay outside this preview and are reviewed individually.`}
                    {mode === "vip" && `${vip.cpaBracket.name}: ${vip.cpaBracket.note}. Base reward uses ${Math.round(vip.tier.rate * 100)}% NGR + $${vip.tier.ftdBonus} per valid $20+ FTD, then adds the public VIP CPA bracket. ${outcomeCopy(vip.testTotal, vip.total, "Start Period", "Active Cycle")}`}
                  </p>
                </div>

                {mode === "affiliate" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat variant="results" label="FTD" value={num(affiliate.ftd)} />
                    <Stat variant="results" label="Deposits" value={money(affiliate.deposits)} />
                    <Stat variant="results" label="Core NGR" value={money(affiliate.ngr)} />
                    <Stat variant="results" label="Welcome Bonus" value={money(Math.min(affiliate.welcomeBonus, 500))} />
                  </div>
                )}

                {mode === "streamer" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat variant="results" label="FTD" value={num(streamer.ftd)} />
                    <Stat variant="results" label="Deposits" value={money(streamer.deposits)} />
                    <Stat variant="results" label="Core NGR" value={money(streamer.ngr)} />
                    <Stat variant="results" label="Welcome Bonus" value={money(Math.min(streamer.welcomeBonus, 500))} />
                  </div>
                )}

                {mode === "vip" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat variant="results" label="Valid FTD" value={num(vip.vipFtd)} />
                    <Stat variant="results" label="VIP Deposits" value={money(vip.totalDeposits)} />
                    <Stat variant="results" label="VIP NGR" value={money(vip.totalNgr)} />
                    <Stat variant="results" label="CPA Income" value={money(vip.cpaIncome)} />
                    <Stat variant="results" label="Welcome Bonus" value={money(Math.min(vip.welcomeBonus, 500))} />
                  </div>
                )}

                <div className="rounded-[28px] border border-white/10 bg-zinc-950/90 p-6 text-white md:p-7">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-lg">
                      <div className="text-lg font-semibold text-white">Apply for qualification and setup</div>
                      <p className="mt-2 text-sm leading-7 text-zinc-400">
                        The form is part of the review funnel. We use it to assign a profile, validate traffic fit, and prepare tracking setup before activation.
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
          <SectionTitle eyebrow="Operations Layer" title="Community is support, not the source of truth" text="The active program runs on profile assignment, tracking setup, Start Period metrics, and review cycles. Discord stays as the communication and support layer around that system." />
          <div className="mt-10 overflow-hidden rounded-[34px] border border-white/[0.08] bg-[radial-gradient(circle_at_80%_0%,rgba(176,237,0,0.12),transparent_34%),linear-gradient(180deg,rgba(24,24,27,0.92),rgba(8,8,8,0.94))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] md:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: <Disc3 className="h-4 w-4" />,
                    step: "01",
                    title: "Qualification",
                    text: "Managers validate fit, traffic source, gambling relevance, and fraud risk before setup.",
                  },
                  {
                    icon: <ClipboardCheck className="h-4 w-4" />,
                    step: "02",
                    title: "Tracking setup",
                    text: "Affilka account, personal link, promo code, and profile status are created before launch.",
                  },
                  {
                    icon: <BarChart3 className="h-4 w-4" />,
                    step: "03",
                    title: "Start Period",
                    text: "First 30 days or first review validate FTD, NGR, deposits, and traffic quality.",
                  },
                  {
                    icon: <Trophy className="h-4 w-4" />,
                    step: "04",
                    title: "Monthly governance",
                    text: "Review, reconciliation, payout, boost, warning, or removal happen in one regular cycle.",
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
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B0ED00]">Support Layer</div>
                    <div className="mt-3 text-3xl font-semibold tracking-tight text-white">Discord supports the lifecycle. It does not replace review or tracking.</div>
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
                    ["Public area", "Overview, FAQ, landing link, ticket CTA"],
                    ["Private area", "Announcements, support, boosts, materials"],
                    ["Tracking", "Affilka remains the source of truth"],
                    ["Manager comms", "Telegram handles personal access and terms"],
                    ["Reviews", "Monthly cycle drives payout and status"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</div>
                      <div className="text-sm font-medium text-zinc-200">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-[#B0ED00]/15 bg-[#B0ED00]/5 p-4 text-sm leading-6 text-zinc-300">
                  The goal is simple: communication stays light, while performance, payouts, and profile logic stay inside the actual operating systems.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="program" className="py-12">
          <SectionTitle eyebrow="Program Structure" title="A standardized lifecycle after approval" text="Every approved candidate moves through the same operating path: qualification, setup, Start Period, first review, and then the active monthly cycle." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Card className="rounded-[30px] p-6 md:p-7">
              <div className="flex items-center gap-3 text-2xl font-semibold"><Sparkles className="h-5 w-5 text-[#B0ED00]" /> Start Period</div>
              <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-7 text-zinc-400">
                The first milestone is not Discord access. It is validated tracked performance: FTD, NGR, deposits, wager quality, and clean fraud signals.
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Stat variant="program" label="Duration" value="Up to 30 days" />
                <Stat variant="program" label="Reward" value="Welcome Bonus" />
                <Stat variant="program" label="Goal" value="Validate Quality" />
              </div>
            </Card>

            <Card className="rounded-[30px] p-6 md:p-7">
              <div className="flex items-center gap-3 text-2xl font-semibold"><ClipboardCheck className="h-5 w-5 text-[#B0ED00]" /> Performance Review</div>
              <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-7 text-zinc-400">
                After Start Period the team decides: Active, Extend, Custom Deal, Warning, or Remove. Review is based on tracked data, not submitted tasks.
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Stat variant="program" label="Review Based On" value="FTD + NGR + Quality" />
                <Stat variant="program" label="Output" value="Status Decision" />
                <Stat variant="program" label="Outcome" value="Monthly Cycle" />
              </div>
            </Card>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            <FeatureCard icon={<BadgeDollarSign className="h-5 w-5" />} title="Performance-first rewards" text="Progressive NGR, Welcome Bonus, FTD bonus, VIP CPA, and profile bonuses all depend on validated tracked results." />
            <FeatureCard icon={<ShieldCheck className="h-5 w-5" />} title="Manual approval before launch" text="No candidate should enter the active program without profile assignment, approved traffic source, and a live tracking setup." />
            <FeatureCard icon={<Activity className="h-5 w-5" />} title="Monthly governance" text="Every active ambassador goes through KPI check, reconciliation, payout, and status review in one consistent operating loop." />
          </div>
        </section>

        <section className="py-18">
          <SectionTitle eyebrow="Flow" title="How serious people move through the program" text="The journey is simple on the surface and selective underneath. That makes the program easier to enter, but harder to abuse." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["01", "Apply", "Share your channels, traffic, audience, or sourcing angle."],
              ["02", "Join Community", "Move into the community hub and get the right onboarding path."],
              ["03", "Prove Results", "Generate tracked FTD, deposits, and player outcomes through your setup."],
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
              ["Who is this built for?", "Content & Traffic operators, Streamers, and Player Hunters who can generate tracked gambling or betting performance."],
              ["Do I join the active program immediately?", "No. Approval, profile assignment, traffic-source validation, and tracking setup happen before you move into the active cycle."],
              ["What is Start Period for?", "It validates traffic quality, FTD, NGR, deposits, and fraud signals before the first full review."],
              ["Is Discord the main operating system?", "No. Discord is the community and support layer. Affilka and the internal review cycle are the core operating systems."],
              ["How strict is fraud policy?", "Very strict. Fake stats, self-referrals, bought deposits, bots, or bonus abuse lead to immediate removal and payout block."],
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
                <div className="text-lg font-semibold">Ambassador application</div>
                <p className="text-sm text-zinc-400">Review-ready information for profile assignment and setup</p>
              </div>
              <button type="button" onClick={() => setOpenForm(false)} className="text-zinc-400 transition hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="mt-4 space-y-4">
              <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <select value={profileType} onChange={(e) => setProfileType(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#B0ED00]">
                <option>Content & Traffic</option>
                <option>Streamer</option>
                <option>Player Hunter</option>
              </select>
              <input required value={primaryPlatform} onChange={(e) => setPrimaryPlatform(e.target.value)} placeholder="Primary platform / channel" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <input required value={primaryGeo} onChange={(e) => setPrimaryGeo(e.target.value)} placeholder="Main GEO" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <input required value={trafficSource} onChange={(e) => setTrafficSource(e.target.value)} placeholder="Traffic source / audience proof" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <input required value={qzerId} onChange={(e) => setQzerId(e.target.value)} placeholder="Qzer ID" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <input required value={telegramUsername} onChange={(e) => setTelegramUsername(e.target.value)} placeholder="Telegram (@username)" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <input value={discordUsername} onChange={(e) => setDiscordUsername(e.target.value)} placeholder="Discord username (optional)" className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />
              <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Previous gambling / betting / affiliate experience (optional)" className="min-h-[110px] w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-[#B0ED00]" />

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
