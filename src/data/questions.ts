export interface Question {
  id: number;
  pillar: string;
  text: string;
  options: { label: string; score: number }[];
}

export const questions: Question[] = [
  { id: 1, pillar: "Strategy", text: "How would you describe your organization's current AI strategy?", options: [{ label: "We don't have a formal AI strategy", score: 1 }, { label: "We have an informal or emerging AI strategy", score: 2 }, { label: "We have a documented, executive-sponsored AI strategy", score: 3 }] },
  { id: 2, pillar: "Strategy", text: "How aligned is your AI roadmap with overall business objectives?", options: [{ label: "AI efforts are siloed or ad hoc", score: 1 }, { label: "Some AI projects map to business goals", score: 2 }, { label: "AI initiatives are fully aligned with strategic priorities", score: 3 }] },
  { id: 3, pillar: "Strategy", text: "How does leadership view AI investment?", options: [{ label: "As a cost center or experiment", score: 1 }, { label: "As a promising area worth exploring", score: 2 }, { label: "As a critical competitive advantage", score: 3 }] },
  { id: 4, pillar: "Strategy", text: "How often does your executive team review AI progress?", options: [{ label: "Rarely or never", score: 1 }, { label: "Quarterly or occasionally", score: 2 }, { label: "Monthly or as a standing agenda item", score: 3 }] },
  { id: 5, pillar: "Data", text: "How would you rate your organization's data quality?", options: [{ label: "Data is fragmented and unreliable", score: 1 }, { label: "Data quality is mixed — some areas are solid", score: 2 }, { label: "We have clean, governed, well-structured data", score: 3 }] },
  { id: 6, pillar: "Data", text: "How accessible is data across your organization?", options: [{ label: "Data is locked in departmental silos", score: 1 }, { label: "Some cross-functional data sharing exists", score: 2 }, { label: "We have a unified data platform accessible to all teams", score: 3 }] },
  { id: 7, pillar: "Data", text: "Do you have a formal data governance framework?", options: [{ label: "No formal governance in place", score: 1 }, { label: "Basic policies exist but aren't consistently enforced", score: 2 }, { label: "Comprehensive governance with clear ownership and policies", score: 3 }] },
  { id: 8, pillar: "Data", text: "How do you handle data privacy and compliance?", options: [{ label: "We react to issues as they arise", score: 1 }, { label: "We have some privacy processes in place", score: 2 }, { label: "We have proactive, audited privacy and compliance programs", score: 3 }] },
  { id: 9, pillar: "Talent", text: "How would you describe your team's AI/ML expertise?", options: [{ label: "Very limited — no dedicated AI talent", score: 1 }, { label: "A few individuals with relevant skills", score: 2 }, { label: "A dedicated team with deep AI/ML expertise", score: 3 }] },
  { id: 10, pillar: "Talent", text: "Do you invest in AI upskilling for non-technical staff?", options: [{ label: "No AI training programs exist", score: 1 }, { label: "Some ad hoc training or lunch-and-learns", score: 2 }, { label: "Structured AI literacy programs across the organization", score: 3 }] },
  { id: 11, pillar: "Talent", text: "How easy is it for your organization to recruit AI talent?", options: [{ label: "We struggle to attract and retain AI talent", score: 1 }, { label: "We've made some hires but it's competitive", score: 2 }, { label: "We have a strong pipeline and employer brand for AI roles", score: 3 }] },
  { id: 12, pillar: "Talent", text: "Is there a clear career path for AI roles in your organization?", options: [{ label: "AI roles are undefined or informal", score: 1 }, { label: "Some AI roles exist but career paths are unclear", score: 2 }, { label: "Well-defined AI roles with growth trajectories", score: 3 }] },
  { id: 13, pillar: "Technology", text: "What is the state of your AI/ML infrastructure?", options: [{ label: "No dedicated AI infrastructure", score: 1 }, { label: "Basic tools and some cloud services", score: 2 }, { label: "Mature MLOps pipeline with production-grade infrastructure", score: 3 }] },
  { id: 14, pillar: "Technology", text: "How do you manage AI model lifecycle (training, deployment, monitoring)?", options: [{ label: "Mostly manual, no standard process", score: 1 }, { label: "Some automation but inconsistent", score: 2 }, { label: "Fully automated CI/CD for models with monitoring", score: 3 }] },
  { id: 15, pillar: "Technology", text: "How well do AI tools integrate with your existing tech stack?", options: [{ label: "Poorly — lots of manual workarounds", score: 1 }, { label: "Some integrations, but gaps remain", score: 2 }, { label: "Seamless integration with core business systems", score: 3 }] },
  { id: 16, pillar: "Technology", text: "How do you approach AI vendor and tool selection?", options: [{ label: "Ad hoc — whatever individuals choose", score: 1 }, { label: "Some evaluation criteria exist", score: 2 }, { label: "Rigorous evaluation framework aligned with architecture standards", score: 3 }] },
  { id: 17, pillar: "Culture", text: "How does your organization view AI adoption?", options: [{ label: "Skeptical or fearful", score: 1 }, { label: "Curious but cautious", score: 2 }, { label: "Enthusiastic and proactive", score: 3 }] },
  { id: 18, pillar: "Culture", text: "How comfortable are teams with experimenting and failing fast?", options: [{ label: "Failure is penalized or avoided", score: 1 }, { label: "Some tolerance for experimentation", score: 2 }, { label: "Experimentation is encouraged and celebrated", score: 3 }] },
  { id: 19, pillar: "Culture", text: "How are AI ethics and responsible use discussed in your organization?", options: [{ label: "Not discussed at all", score: 1 }, { label: "Informally or reactively", score: 2 }, { label: "We have an AI ethics committee or formal guidelines", score: 3 }] },
  { id: 20, pillar: "Culture", text: "How would you describe cross-functional collaboration on AI projects?", options: [{ label: "Minimal — AI is an IT-only initiative", score: 1 }, { label: "Some cross-functional involvement", score: 2 }, { label: "AI projects involve business, tech, and operations together", score: 3 }] },
];

export const pillars = ["Strategy", "Data", "Talent", "Technology", "Culture"] as const;

export interface Tier {
  name: string;
  range: [number, number];
  color: string;
  narrative: string;
}

export const tiers: Tier[] = [
  {
    name: "AI Dormant",
    range: [20, 33],
    color: "#94A3B8",
    narrative: "Your organization is at the beginning of its AI journey. There's significant opportunity to build foundational capabilities across strategy, data, talent, technology, and culture. The good news? Starting from here means you can leapfrog common pitfalls by building a deliberate, well-structured AI roadmap from day one."
  },
  {
    name: "AI Awakening",
    range: [34, 47],
    color: "#E8784A",
    narrative: "Your organization has begun its AI journey and has pockets of capability. To accelerate, focus on connecting isolated efforts into a cohesive strategy, investing in data infrastructure, and building cross-functional collaboration. You're in a strong position to scale what's working and close gaps strategically."
  },
  {
    name: "AI Accelerating",
    range: [48, 60],
    color: "#22C55E",
    narrative: "Your organization is well-positioned to lead with AI. You have strong foundations across most pillars and are likely already seeing measurable business impact. The next frontier is optimization — refining your approach, scaling successful initiatives, and staying ahead of emerging capabilities."
  }
];

export function getTier(score: number): Tier {
  return tiers.find(t => score >= t.range[0] && score <= t.range[1]) || tiers[0];
}
