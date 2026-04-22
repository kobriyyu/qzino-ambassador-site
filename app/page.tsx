"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ChevronRight,
  Calculator,
  Users,
  Crown,
  Shield,
  Gift,
  BarChart3,
  Sparkles,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Disc3,
  Radio,
  Target,
  PlayCircle,
  Trophy,
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

function pct(v: number) {
  return `${v.toFixed(1).replace(/\.0$/, "")}%`;
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
    <div className="max-w-3xl">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B0ED00]">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-8 text-zinc-400 md:text-lg">{text}</p> : null}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {sub ? <div className="mt-1 text-xs text-zinc-500">{sub}</div> : null}
    </div>
  );
}

function RangeRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm text-zinc-300">{label}</span>
        <span className="text-sm font-semibold text-[#B0ED00]">{value}</span>
      </div>
      {children}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <Card className="h-full rounded-[28px] border border-white/10 bg-zinc-950/90 text-white shadow-none">
      <CardHeader className="pb-3">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B0ED00]/10 text-[#B0ED00]">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-zinc-400">{text}</p>
      </CardContent>
    </Card>
  );
}

function MiniPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
      {children}
    </div>
  );
}

export default function QzinoAmbassadorProgramSite() {
  const [mode, setMode] = useState<"affiliate" | "streamer" | "hunter" | "vip">("affiliate");
  const [email, setEmail] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [qzerId, setQzerId] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const [reach, setReach] = useState([250000]);
  const [ctr, setCtr] = useState([2.2]);
  const [regRate, setRegRate] = useState([14]);
  const [ftdRate, setFtdRate] = useState([18]);
  const [avgDeposit, setAvgDeposit] = useState([110]);
  const [ngrRate, setNgrRate] = useState([4]);
  const [testRevshare, setTestRevshare] = useState([35]);
  const [longRevshare, setLongRevshare] = useState([25]);
  const [contentFixed, setContentFixed] = useState([0]);
  const [subAmbNgr, setSubAmbNgr] = useState([1500]);

  const [avgViewers, setAvgViewers] = useState([450]);
  const [streamsCount, setStreamsCount] = useState([3]);
  const [streamClickRate, setStreamClickRate] = useState([6]);
  const [streamRegRate, setStreamRegRate] = useState([18]);
  const [streamFtdRate, setStreamFtdRate] = useState([22]);
  const [streamAvgDeposit, setStreamAvgDeposit] = useState([120]);
  const [streamRequestedFixed, setStreamRequestedFixed] = useState([400]);

  const [recruitedPartners, setRecruitedPartners] = useState([6]);
  const [avgFtdPerPartner, setAvgFtdPerPartner] = useState([25]);
  const [avgDepositPerPartner, setAvgDepositPerPartner] = useState([90]);
  const [hunterShare, setHunterShare] = useState([10]);
  const [bonusPerExtraFtd, setBonusPerExtraFtd] = useState([3]);

  const [vipPlayers, setVipPlayers] = useState([4]);
  const [avgVipDeposit, setAvgVipDeposit] = useState([900]);
  const [vipLifetimeShare, setVipLifetimeShare] = useState([15]);
  const [vipCpa, setVipCpa] = useState([50]);

  const affiliate = useMemo(() => {
    const clicks = reach[0] * (ctr[0] / 100);
    const registrations = clicks * (regRate[0] / 100);
    const ftd = registrations * (ftdRate[0] / 100);
    const deposits = ftd * avgDeposit[0];
    const ngr = deposits * (ngrRate[0] / 100);
    const testRevIncome = ngr * (testRevshare[0] / 100);
    const longRevIncome = ngr * (longRevshare[0] / 100);
    const subAmbIncome = subAmbNgr[0] * 0.05;
    const testTotal = testRevIncome + subAmbIncome + contentFixed[0];
    const longTotal = longRevIncome + subAmbIncome + contentFixed[0];
    const bestFit = ftd >= 20 ? "Strong fit for review" : ftd >= 8 ? "Good test candidate" : "Needs stronger traffic";
    return { clicks, registrations, ftd, deposits, ngr, testTotal, longTotal, bestFit };
  }, [reach, ctr, regRate, ftdRate, avgDeposit, ngrRate, testRevshare, longRevshare, contentFixed, subAmbNgr]);

  const streamer = useMemo(() => {
    const totalViewers = avgViewers[0] * streamsCount[0];
    const clicks = totalViewers * (streamClickRate[0] / 100);
    const regs = clicks * (streamRegRate[0] / 100);
    const ftd = regs * (streamFtdRate[0] / 100);
    const deposits = ftd * streamAvgDeposit[0];
    const ngr = deposits * 0.04;
    const testRevIncome = ngr * 0.2;
    const kpiReached = deposits >= 1200;
    const longTotal = kpiReached ? testRevIncome + streamRequestedFixed[0] : testRevIncome;
    const verdict = kpiReached ? "KPI reached - fixed can be justified" : "Below streamer KPI - revshare only";
    return { totalViewers, regs, ftd, deposits, testRevIncome, longTotal, verdict, kpiReached };
  }, [avgViewers, streamsCount, streamClickRate, streamRegRate, streamFtdRate, streamAvgDeposit, streamRequestedFixed]);

  const hunter = useMemo(() => {
    const totalFtd = recruitedPartners[0] * avgFtdPerPartner[0];
    const totalDeposits = totalFtd * avgDepositPerPartner[0];
    const totalNgr = totalDeposits * 0.04;
    const networkIncome = totalNgr * (hunterShare[0] / 100);
    const extraFtdBonus = Math.max(totalFtd - 100, 0) * bonusPerExtraFtd[0];
    const total = networkIncome + extraFtdBonus;
    const fit = recruitedPartners[0] >= 5 ? "Good network model" : "Early-stage network";
    return { totalFtd, totalDeposits, totalNgr, networkIncome, extraFtdBonus, total, fit };
  }, [recruitedPartners, avgFtdPerPartner, avgDepositPerPartner, hunterShare, bonusPerExtraFtd]);

  const vip = useMemo(() => {
    const totalDeposits = vipPlayers[0] * avgVipDeposit[0];
    const totalNgr = totalDeposits * 0.04;
    const lifetime = totalNgr * (vipLifetimeShare[0] / 100);
    const cpaIncome = vipPlayers[0] * vipCpa[0];
    const total = lifetime + cpaIncome;
    const fit = avgVipDeposit[0] >= 1000 ? "High-value VIP profile" : "Standard VIP sourcing";
    return { totalDeposits, totalNgr, lifetime, cpaIncome, total, fit };
  }, [vipPlayers, avgVipDeposit, vipLifetimeShare, vipCpa]);

  async function handleApplicationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitMessage("");

    if (!email || !fullName || !qzerId || !telegramUsername || !discordUsername) {
      setSubmitMessage("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/ambassador-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullName,
          qzerId,
          telegramUsername,
          discordUsername,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to submit application.");
      }

      setSubmitMessage("Application submitted successfully.");
      setEmail("");
      setFullName("");
      setQzerId("");
      setTelegramUsername("");
      setDiscordUsername("");
      setOpenForm(false);
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#B0ED00]/8 blur-3xl" />
        <div className="absolute right-0 top-[120px] h-[420px] w-[420px] rounded-full bg-[#B0ED00]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-8 lg:px-10">
        <header className="sticky top-4 z-20 rounded-[24px] border border-white/10 bg-zinc-950/80 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Qzino" className="h-8 w-auto" />
            </div>
            <div className="hidden items-center gap-6 md:flex">
              <a href="#roles" className="text-sm text-zinc-400 transition hover:text-white">Roles</a>
              <a href="#calculator" className="text-sm text-zinc-400 transition hover:text-white">Calculator</a>
              <a href="#discord" className="text-sm text-zinc-400 transition hover:text-white">Discord</a>
              <a href="#program" className="text-sm text-zinc-400 transition hover:text-white">Program</a>
              <a href="#faq" className="text-sm text-zinc-400 transition hover:text-white">FAQ</a>
            </div>
            <a href="#calculator">
              <Button className="rounded-xl bg-[#B0ED00] px-5 text-black hover:bg-[#c6ff22]">Join the community</Button>
            </a>
          </div>
        </header>

        <section className="grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Badge className="rounded-full border border-[#B0ED00]/20 bg-[#B0ED00]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#B0ED00] hover:bg-[#B0ED00]/10">
              Qzino Ambassador Program
            </Badge>
            <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Qzino Ambassador Program - Turn your audience into <span className="text-[#B0ED00]">predictable revenue</span>.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
              This is the official Qzino Ambassador Program.
              Built for influencers, streamers, affiliates, and sourcers who want more than one-off deals. You are not just joining a program - you are entering a system designed to monetize your audience long-term.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MiniPill>Up to 35% revenue share</MiniPill>
              <MiniPill>$50 CPA for VIP players</MiniPill>
              <MiniPill>+5% from your network</MiniPill>
              <MiniPill>No KYC</MiniPill>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#calculator">
                <Button className="rounded-xl bg-[#B0ED00] px-6 py-6 text-base font-semibold text-black hover:bg-[#c6ff22]">
                  Explore Earnings
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#program">
                <Button variant="outline" className="rounded-xl border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10">
                  View System
                </Button>
              </a>
            </div>
            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="Top Offer" value="Up to 35%" sub="test period" />
              <Stat label="VIP Model" value="CPA + Lifetime" sub="high-value players" />
              <Stat label="Network Layer" value="+5%" sub="sub-ambassadors" />
              <Stat label="Core Platform" value="Community" sub="for ambassadors" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[36px] border border-[#B0ED00]/15 bg-gradient-to-br from-zinc-950 via-zinc-950 to-[#162300] p-7 shadow-[0_0_100px_rgba(176,237,0,0.08)] md:p-8"
          >
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
                  <div className="mt-3 text-4xl font-bold text-[#B0ED00]">Up to 35% NGR</div>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    Start with strong terms so you can test the system fast and see real upside before committing long term.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-sm font-medium text-zinc-400">Scale After Review</div>
                  <div className="mt-3 text-4xl font-bold text-white">Personal Terms</div>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    Perform well and move into better conditions based on numbers, not vague promises.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Stat label="Creators" value="$500-$2k" sub="avg active range" />
                <Stat label="Top Performers" value="$2k-$10k" sub="inside the system" />
                <Stat label="Leaderboard" value="Live" sub="inside community" />
              </div>
            </div>
          </motion.div>
        </section>

        <section id="roles" className="py-10">
          <SectionTitle
            eyebrow="Core Roles"
            title="Built for the people we actually want in the program"
            text="The structure is designed to be obvious from the first screen: creators monetize audience, hunters build networks, and VIP sourcers focus on high-value players."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <FeatureCard
              icon={Radio}
              title="Affiliate / Influencer"
              text="Monetize your traffic. Turn clicks, content, and audience trust into long-term revenue instead of one-off campaign payments."
            />
            <FeatureCard
              icon={PlayCircle}
              title="Streamer"
              text="Use live attention the right way. Bring viewers into the system, test fast, and build recurring upside around your stream traffic."
            />
            <FeatureCard
              icon={Target}
              title="Hunter"
              text="Build your own earning network. Bring in other creators or partners and earn from everything they generate inside the system."
            />
            <FeatureCard
              icon={Crown}
              title="VIP Sourcing"
              text="If you can bring serious players, you get paid upfront and long term. High-value players mean high-value economics."
            />
          </div>
        </section>

        <section id="calculator" className="py-20">
          <SectionTitle
            eyebrow="Earnings Simulator"
            title="How much can you actually make?"
            text="Adjust the numbers below and see whether this is worth your time. This block is built to help creators, streamers, and sourcers evaluate real earning potential before they apply."
          />

          <div className="mt-10 rounded-[32px] border border-white/10 bg-zinc-950/90 p-4 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B0ED00] text-black">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">Program Earnings Calculator</div>
                    <p className="mt-1 text-sm text-zinc-400">Choose the path that matches how you actually monetize: audience, streams, partner sourcing, or VIP players.</p>
                  </div>
                </div>
              </div>
              <Tabs value={mode} onValueChange={(v) => setMode(v as "affiliate" | "streamer" | "hunter" | "vip") }>
                <TabsList className="h-auto rounded-2xl border border-white/10 bg-black p-1 flex flex-wrap">
                  <TabsTrigger value="affiliate" className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 data-[state=active]:bg-[#B0ED00] data-[state=active]:text-black">
                    Creator / Affiliate
                  </TabsTrigger>
                  <TabsTrigger value="streamer" className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 data-[state=active]:bg-[#B0ED00] data-[state=active]:text-black">
                    Streamer
                  </TabsTrigger>
                  <TabsTrigger value="hunter" className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 data-[state=active]:bg-[#B0ED00] data-[state=active]:text-black">
                    Hunter
                  </TabsTrigger>
                  <TabsTrigger value="vip" className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 data-[state=active]:bg-[#B0ED00] data-[state=active]:text-black">
                    VIP Hunter
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <Card className="rounded-[28px] border border-white/10 bg-black/30 text-white shadow-none">
                <CardContent className="space-y-4 p-4 md:p-5">
                  {mode === "affiliate" && (
                    <>
                      <RangeRow label="Monthly Reach / Traffic" value={num(reach[0])}>
                        <Slider value={reach} onValueChange={setReach} min={10000} max={1500000} step={10000} />
                      </RangeRow>
                      <RangeRow label="CTR to Offer" value={pct(ctr[0])}>
                        <Slider value={ctr} onValueChange={setCtr} min={0.5} max={10} step={0.1} />
                      </RangeRow>
                      <RangeRow label="Registration Rate" value={pct(regRate[0])}>
                        <Slider value={regRate} onValueChange={setRegRate} min={2} max={40} step={1} />
                      </RangeRow>
                      <RangeRow label="FTD Rate" value={pct(ftdRate[0])}>
                        <Slider value={ftdRate} onValueChange={setFtdRate} min={3} max={50} step={1} />
                      </RangeRow>
                      <RangeRow label="Average Deposit" value={money(avgDeposit[0])}>
                        <Slider value={avgDeposit} onValueChange={setAvgDeposit} min={20} max={500} step={10} />
                      </RangeRow>
                      <RangeRow label="Estimated NGR Rate" value={pct(ngrRate[0])}>
                        <Slider value={ngrRate} onValueChange={setNgrRate} min={1} max={10} step={0.5} />
                      </RangeRow>
                      <RangeRow label="Test Period RevShare" value={pct(testRevshare[0])}>
                        <Slider value={testRevshare} onValueChange={setTestRevshare} min={20} max={35} step={1} />
                      </RangeRow>
                      <RangeRow label="Post-Review RevShare" value={pct(longRevshare[0])}>
                        <Slider value={longRevshare} onValueChange={setLongRevshare} min={20} max={35} step={1} />
                      </RangeRow>
                      <RangeRow label="Monthly Fixed / Content Support" value={money(contentFixed[0])}>
                        <Slider value={contentFixed} onValueChange={setContentFixed} min={0} max={3000} step={50} />
                      </RangeRow>
                      <RangeRow label="Sub-Ambassador Monthly NGR" value={money(subAmbNgr[0])}>
                        <Slider value={subAmbNgr} onValueChange={setSubAmbNgr} min={0} max={10000} step={100} />
                      </RangeRow>
                    </>
                  )}

                  {mode === "streamer" && (
                    <>
                      <RangeRow label="Average Viewers per Stream" value={num(avgViewers[0])}>
                        <Slider value={avgViewers} onValueChange={setAvgViewers} min={50} max={5000} step={50} />
                      </RangeRow>
                      <RangeRow label="Number of Streams" value={num(streamsCount[0])}>
                        <Slider value={streamsCount} onValueChange={setStreamsCount} min={1} max={10} step={1} />
                      </RangeRow>
                      <RangeRow label="Click Rate from Stream" value={pct(streamClickRate[0])}>
                        <Slider value={streamClickRate} onValueChange={setStreamClickRate} min={1} max={20} step={0.5} />
                      </RangeRow>
                      <RangeRow label="Registration Rate" value={pct(streamRegRate[0])}>
                        <Slider value={streamRegRate} onValueChange={setStreamRegRate} min={5} max={40} step={1} />
                      </RangeRow>
                      <RangeRow label="FTD Rate" value={pct(streamFtdRate[0])}>
                        <Slider value={streamFtdRate} onValueChange={setStreamFtdRate} min={5} max={40} step={1} />
                      </RangeRow>
                      <RangeRow label="Average Deposit" value={money(streamAvgDeposit[0])}>
                        <Slider value={streamAvgDeposit} onValueChange={setStreamAvgDeposit} min={20} max={500} step={10} />
                      </RangeRow>
                      <RangeRow label="Requested Fixed After Review" value={money(streamRequestedFixed[0])}>
                        <Slider value={streamRequestedFixed} onValueChange={setStreamRequestedFixed} min={0} max={2000} step={50} />
                      </RangeRow>
                    </>
                  )}

                  {mode === "hunter" && (
                    <>
                      <RangeRow label="Recruited Partners" value={num(recruitedPartners[0])}>
                        <Slider value={recruitedPartners} onValueChange={setRecruitedPartners} min={1} max={30} step={1} />
                      </RangeRow>
                      <RangeRow label="Average FTD per Partner" value={num(avgFtdPerPartner[0])}>
                        <Slider value={avgFtdPerPartner} onValueChange={setAvgFtdPerPartner} min={3} max={100} step={1} />
                      </RangeRow>
                      <RangeRow label="Average Deposit per FTD" value={money(avgDepositPerPartner[0])}>
                        <Slider value={avgDepositPerPartner} onValueChange={setAvgDepositPerPartner} min={20} max={300} step={5} />
                      </RangeRow>
                      <RangeRow label="Your Network Share" value={pct(hunterShare[0])}>
                        <Slider value={hunterShare} onValueChange={setHunterShare} min={5} max={20} step={1} />
                      </RangeRow>
                      <RangeRow label="Bonus per Extra FTD" value={money(bonusPerExtraFtd[0])}>
                        <Slider value={bonusPerExtraFtd} onValueChange={setBonusPerExtraFtd} min={2} max={5} step={1} />
                      </RangeRow>
                    </>
                  )}

                  {mode === "vip" && (
                    <>
                      <RangeRow label="VIP Players Acquired" value={num(vipPlayers[0])}>
                        <Slider value={vipPlayers} onValueChange={setVipPlayers} min={1} max={20} step={1} />
                      </RangeRow>
                      <RangeRow label="Average VIP Deposit" value={money(avgVipDeposit[0])}>
                        <Slider value={avgVipDeposit} onValueChange={setAvgVipDeposit} min={500} max={5000} step={50} />
                      </RangeRow>
                      <RangeRow label="Lifetime RevShare" value={pct(vipLifetimeShare[0])}>
                        <Slider value={vipLifetimeShare} onValueChange={setVipLifetimeShare} min={10} max={25} step={1} />
                      </RangeRow>
                      <RangeRow label="CPA per VIP" value={money(vipCpa[0])}>
                        <Slider value={vipCpa} onValueChange={setVipCpa} min={50} max={250} step={10} />
                      </RangeRow>
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="rounded-[28px] border-none bg-[#B0ED00] text-black shadow-[0_0_80px_rgba(176,237,0,0.14)]">
                  <CardContent className="p-6 md:p-8">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">Estimated Outcome</div>
                    <div className="mt-4 text-5xl font-bold md:text-6xl">
                      {mode === "affiliate" && money(affiliate.longTotal)}
                      {mode === "streamer" && money(streamer.longTotal)}
                      {mode === "hunter" && money(hunter.total)}
                      {mode === "vip" && money(vip.total)}
                    </div>
                    <p className="mt-4 max-w-md text-sm leading-7 text-black/70">
                      {mode === "affiliate" && `Test period: ${money(affiliate.testTotal)} • Post-review: ${money(affiliate.longTotal)} • ${affiliate.bestFit}`}
                      {mode === "streamer" && `Test streams: ${money(streamer.testRevIncome)} • Post-review scenario: ${money(streamer.longTotal)} • ${streamer.verdict}`}
                      {mode === "hunter" && `${hunter.fit} • Network-based upside with extra FTD bonus on top.`}
                      {mode === "vip" && `${vip.fit} • CPA + lifetime revshare combined.`}
                    </p>
                  </CardContent>
                </Card>

                {mode === "affiliate" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat label="Estimated Clicks" value={num(affiliate.clicks)} />
                    <Stat label="Registrations" value={num(affiliate.registrations)} />
                    <Stat label="FTD" value={num(affiliate.ftd)} />
                    <Stat label="Core NGR" value={money(affiliate.ngr)} />
                    <Stat label="Test Period" value={money(affiliate.testTotal)} />
                    <Stat label="Post-Review" value={money(affiliate.longTotal)} />
                  </div>
                )}

                {mode === "streamer" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat label="Total Viewers" value={num(streamer.totalViewers)} />
                    <Stat label="Registrations" value={num(streamer.regs)} />
                    <Stat label="FTD" value={num(streamer.ftd)} />
                    <Stat label="Deposits" value={money(streamer.deposits)} />
                    <Stat label="Test Streams" value={money(streamer.testRevIncome)} />
                    <Stat label="KPI Status" value={streamer.kpiReached ? "Reached" : "Below KPI"} />
                  </div>
                )}

                {mode === "hunter" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat label="Total FTD" value={num(hunter.totalFtd)} />
                    <Stat label="Deposits Generated" value={money(hunter.totalDeposits)} />
                    <Stat label="Estimated NGR" value={money(hunter.totalNgr)} />
                    <Stat label="Network Income" value={money(hunter.networkIncome)} />
                    <Stat label="FTD Bonus" value={money(hunter.extraFtdBonus)} />
                    <Stat label="Share Used" value={pct(hunterShare[0])} />
                  </div>
                )}

                {mode === "vip" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stat label="VIP Deposits" value={money(vip.totalDeposits)} />
                    <Stat label="VIP NGR" value={money(vip.totalNgr)} />
                    <Stat label="CPA Income" value={money(vip.cpaIncome)} />
                    <Stat label="Lifetime Income" value={money(vip.lifetime)} />
                  </div>
                )}

                <div className="rounded-[28px] border border-white/10 bg-zinc-950/90 text-white shadow-none p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="max-w-lg">
                    <div className="text-lg font-semibold text-white">Join the Ambassador Community</div>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">
                      To enter the program, you need to complete a short application. It takes less than 1 minute and helps us filter serious participants.
                    </p>
                  </div>

                  <Dialog open={openForm} onOpenChange={setOpenForm}>
                    <DialogTrigger asChild>
                      <Button className="rounded-xl bg-[#B0ED00] px-6 py-6 text-base font-semibold text-black hover:bg-[#c6ff22]">
                        Apply Now
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-lg rounded-2xl border border-white/10 bg-black text-white">
                      <form onSubmit={handleApplicationSubmit}>
                        <div className="text-lg font-semibold">Application form</div>
                        <p className="text-sm text-zinc-400">All fields are required</p>

                        <div className="mt-4 grid gap-4">
                          <Input required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                          <Input required value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Full Name" />
                          <Input required value={qzerId} onChange={(e)=>setQzerId(e.target.value)} placeholder="QzerID" />
                          <p className="text-xs text-zinc-500">⚠️ Find Qzer ID in dashboard. Register first if needed.</p>
                          <Input required value={telegramUsername} onChange={(e)=>setTelegramUsername(e.target.value)} placeholder="Telegram (@username)" />
                          <Input required value={discordUsername} onChange={(e)=>setDiscordUsername(e.target.value)} placeholder="Discord username" />
                        </div>

                        {submitMessage ? (
                          <p className="mt-4 text-sm text-zinc-300">{submitMessage}</p>
                        ) : null}

                        <Button type="submit" disabled={isSubmitting} className="mt-5 w-full rounded-xl bg-[#B0ED00] text-black hover:bg-[#c6ff22] disabled:opacity-60">
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="discord" className="py-10">
          <SectionTitle
            eyebrow="Community Experience"
            title="Everything that matters happens inside the community"
            text="The site gets people interested. The community is the real operating system of the program - where onboarding, communication, tasks, tracking, and progression happen every day."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid gap-5 md:grid-cols-2">
              <FeatureCard
                icon={Disc3}
                title="Role-based channels"
                text="Different participant types get access to the channels, materials, and conversations that match how they earn."
              />
              <FeatureCard
                icon={BarChart3}
                title="Tracking and visibility"
                text="Performance, roles, and progression are tied to the community-driven system instead of scattered communication."
              />
              <FeatureCard
                icon={Trophy}
                title="Live leaderboard"
                text="Competition and status are visible inside the hub, helping the best participants stay engaged and push harder."
              />
              <FeatureCard
                icon={Users}
                title="Direct access to team"
                text="Stronger candidates don't wait in generic support flows. They move directly into review, guidance, and faster scaling."
              />
            </div>

            <Card className="rounded-[30px] border border-white/10 bg-zinc-950 text-white shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Inside the community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-400">
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-7">
                  This is not just a chat. It is the main environment where people enter the program, get sorted by role, receive instructions, and grow into stronger monetization paths.
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Stat label="Onboarding" value="Inside community" />
                  <Stat label="Task Flow" value="Role-based" />
                  <Stat label="Leaderboard" value="Live" />
                  <Stat label="Access" value="For contributors" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="program" className="py-10">
          <SectionTitle
            eyebrow="Program Structure"
            title="Simple enough to enter, strong enough to keep top performers"
            text="The structure is designed to maximize trial, filter weak candidates fast, and move the right people into long-term terms based on performance."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Card className="rounded-[30px] border border-white/10 bg-zinc-950 text-white shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl"><Sparkles className="h-5 w-5 text-[#B0ED00]" /> Test Period</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-400">
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-7">
                  Start with the best conditions. No overloaded onboarding. No long warm-up. You enter, test, and see quickly whether the system fits you.
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Stat label="Offer" value="Up to 35% NGR" />
                  <Stat label="Duration" value="15-30 days" />
                  <Stat label="Goal" value="Prove Fit" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[30px] border border-white/10 bg-zinc-950 text-white shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl"><BarChart3 className="h-5 w-5 text-[#B0ED00]" /> Performance Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-400">
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-7">
                  We do not guess. We look at numbers. If you perform, you unlock better conditions, stronger support, and more room to scale.
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Stat label="Review Based On" value="FTD + GEO" />
                  <Stat label="Output" value="Personal Terms" />
                  <Stat label="Outcome" value="Scale" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            
            <Card className="rounded-[28px] border border-[#B0ED00]/20 bg-[#B0ED00]/5 text-white shadow-none xl:col-span-3">
              <CardContent className="p-6 md:p-7">
                <div className="text-sm font-semibold text-[#B0ED00]">Simple progression</div>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">
                  There is a progression system in the program, but you do not need to learn a complicated structure.
                  In practice it works very simply: you join, test the program, show results, and unlock better conditions.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">Step 1</div>
                    <div className="mt-2 text-base font-semibold text-white">Enter</div>
                    <div className="mt-2 text-sm leading-6 text-zinc-400">Start with test conditions and get into the system.</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">Step 2</div>
                    <div className="mt-2 text-base font-semibold text-white">Perform</div>
                    <div className="mt-2 text-sm leading-6 text-zinc-400">Your results show the quality of your traffic and activity.</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">Step 3</div>
                    <div className="mt-2 text-base font-semibold text-white">Scale</div>
                    <div className="mt-2 text-sm leading-6 text-zinc-400">Better performance unlocks better terms, bonuses, and deeper access.</div>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-6 text-zinc-500">
                  In other words: the system exists, but from your side it is just simple performance-based growth.
                </p>
              </CardContent>
            </Card>
            <FeatureCard
              icon={Wallet}
              title="Bonus Stack"
              text="Sub-ambassador revenue, farming upside, FTD overperformance bonuses, and leaderboard-based motivation keep the economics attractive after entry."
            />
            <FeatureCard
              icon={Shield}
              title="Strict Anti-Fraud"
              text="The system is built to reject fake stats, weak traffic, and abusive behavior early. Serious participants stay, weak traffic gets filtered out."
            />
            <FeatureCard
              icon={CheckCircle2}
              title="Real Retention Logic"
              text="The goal is not just to get people in. The goal is to give strong participants reasons to stay, perform, and grow inside the system."
            />
          </div>
        </section>

        <section className="py-20">
          <SectionTitle
            eyebrow="Flow"
            title="How serious people move through the program"
            text="The journey is simple on the surface and selective underneath. That makes the program easier to enter, but harder to abuse."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              ["01", "Apply", "Share your channels, traffic, audience, or sourcing angle."],
              ["02", "Join Community", "Move into the community hub and get the right onboarding path."],
              ["03", "Prove Results", "Drive FTD, players, or partner-level outcomes in the system."],
              ["04", "Scale", "Unlock stronger terms and deeper opportunities based on performance."],
            ].map(([step, title, text]) => (
              <Card key={step} className="rounded-[28px] border border-white/10 bg-zinc-950 text-white shadow-none">
                <CardContent className="p-6">
                  <div className="text-sm font-semibold text-[#B0ED00]">{step}</div>
                  <div className="mt-3 text-2xl font-semibold text-white">{title}</div>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="py-10">
          <SectionTitle
            eyebrow="FAQ"
            title="The main objections answered directly"
            text="The site should remove hesitation fast without turning into an overloaded document."
          />
          <div className="mt-10 rounded-[30px] border border-white/10 bg-zinc-950 p-4 md:p-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:no-underline">Who is this built for?</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-zinc-400">
                  Influencers, streamers, affiliates, hunters, and VIP sourcers who already have traffic, audience, or the right network to monetize.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:no-underline">Why should creators care?</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-zinc-400">
                  Because this is built around predictable revenue, not just random one-off campaign fees. Strong creators can grow inside the system instead of restarting every month.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:no-underline">What happens after the test period?</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-zinc-400">
                  The team reviews actual performance and offers stronger long-term conditions based on your real numbers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:no-underline">How strict is fraud policy?</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-zinc-400">
                  Very strict. Fake stats, abusive behavior, and low-quality schemes should be treated as immediate disqualification and payout block.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="py-20">
          <div className="rounded-[36px] border border-[#B0ED00]/15 bg-gradient-to-br from-zinc-950 via-zinc-950 to-[#182600] p-8 shadow-[0_0_100px_rgba(176,237,0,0.08)] md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B0ED00]">Final step</div>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">Get access to the system.</h3>
                <p className="mt-4 text-base leading-8 text-zinc-400">
                  This is not for everyone. If you have audience, traffic, or strong connections, you can fit in fast. If not, this probably will not work for you.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#calculator">
                <Button className="rounded-xl bg-[#B0ED00] px-6 py-6 text-base font-semibold text-black hover:bg-[#c6ff22]">
                  Join the community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
                <Button variant="outline" className="rounded-xl border-white/15 bg-white/5 px-6 py-6 text-base text-white hover:bg-white/10">
                  Contact Program Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
