export interface Question {
  id: number;
  pillar: string;
  text: string;
  options: { label: string; score: number }[];
}

export const questions: Question[] = [
  // PILLAR 1: Data & Infrastructure
  { id: 1, pillar: "Data & Infrastructure", text: "How would you describe the current state of your organization's data?", options: [
    { label: "Data is siloed across departments with no central repository", score: 1 },
    { label: "Some data is centralized but quality and accessibility are inconsistent", score: 2 },
    { label: "Data is centralized, well-governed, and accessible to those who need it", score: 3 },
  ]},
  { id: 2, pillar: "Data & Infrastructure", text: "How confident are you in the accuracy and completeness of your core business data?", options: [
    { label: "Low confidence — data errors are common and decisions are often made without trusting the data", score: 1 },
    { label: "Moderate confidence — some datasets are reliable but gaps exist", score: 2 },
    { label: "High confidence — data quality is actively monitored and maintained", score: 3 },
  ]},
  { id: 3, pillar: "Data & Infrastructure", text: "Does your organization have documented data governance policies?", options: [
    { label: "No formal policies exist", score: 1 },
    { label: "Some policies exist but are inconsistently applied", score: 2 },
    { label: "Yes — data governance is formalized and enforced", score: 3 },
  ]},
  { id: 4, pillar: "Data & Infrastructure", text: "How accessible is your data to the people and systems that need it?", options: [
    { label: "Access is difficult — data is locked in legacy systems or requires IT tickets", score: 1 },
    { label: "Access is improving but friction remains", score: 2 },
    { label: "Data is readily accessible through well-designed systems and APIs", score: 3 },
  ]},

  // PILLAR 2: Team & Skills
  { id: 5, pillar: "Team & Skills", text: "Does your organization have people with hands-on AI or machine learning experience?", options: [
    { label: "No — we have no internal AI/ML expertise", score: 1 },
    { label: "A few individuals have some exposure, but it's not a core competency", score: 2 },
    { label: "Yes — we have dedicated AI/ML talent or strong partnerships in place", score: 3 },
  ]},
  { id: 6, pillar: "Team & Skills", text: "How would you rate your team's overall digital and data literacy?", options: [
    { label: "Low — many employees are uncomfortable with data-driven tools", score: 1 },
    { label: "Mixed — some teams are strong, others lag significantly", score: 2 },
    { label: "High — data fluency is a core expectation across the organization", score: 3 },
  ]},
  { id: 7, pillar: "Team & Skills", text: "Does your organization invest in ongoing AI/technology upskilling for employees?", options: [
    { label: "No formal investment in this area", score: 1 },
    { label: "Some training exists but it's ad hoc or limited to certain roles", score: 2 },
    { label: "Yes — structured AI/technology learning programs are in place", score: 3 },
  ]},

  // PILLAR 3: Process Readiness
  { id: 8, pillar: "Process Readiness", text: "How well-documented are your core business processes?", options: [
    { label: "Most processes live in people's heads — little formal documentation", score: 1 },
    { label: "Key processes are documented but not consistently maintained", score: 2 },
    { label: "Processes are well-documented, regularly reviewed, and accessible", score: 3 },
  ]},
  { id: 9, pillar: "Process Readiness", text: "How stable and repeatable are the workflows you'd want to automate or enhance with AI?", options: [
    { label: "Highly variable — workflows change frequently and lack consistency", score: 1 },
    { label: "Somewhat stable — core workflows exist but exceptions are common", score: 2 },
    { label: "Stable and predictable — workflows are consistent enough to automate", score: 3 },
  ]},
  { id: 10, pillar: "Process Readiness", text: "Has your organization identified specific processes where AI could add measurable value?", options: [
    { label: "No — we haven't mapped AI to specific use cases yet", score: 1 },
    { label: "We've had informal discussions but nothing formally prioritized", score: 2 },
    { label: "Yes — we have a prioritized list of AI use cases tied to business outcomes", score: 3 },
  ]},

  // PILLAR 4: Governance & Risk
  { id: 11, pillar: "Governance & Risk", text: "Does your organization have a formal AI governance policy or ethical AI guidelines?", options: [
    { label: "No policy exists", score: 1 },
    { label: "Informal guidelines exist but are not documented or enforced", score: 2 },
    { label: "Yes — a formal AI governance framework is in place", score: 3 },
  ]},
  { id: 12, pillar: "Governance & Risk", text: "How does your organization handle data privacy and security for sensitive information?", options: [
    { label: "Limited controls — data privacy is not a formal priority", score: 1 },
    { label: "Basic controls exist but comprehensive data privacy management is lacking", score: 2 },
    { label: "Strong controls — data privacy and security protocols are well-established", score: 3 },
  ]},
  { id: 13, pillar: "Governance & Risk", text: "How prepared is your organization to manage AI-related risks (bias, errors, compliance)?", options: [
    { label: "Not prepared — we haven't considered AI-specific risks formally", score: 1 },
    { label: "Somewhat aware — risks are discussed but no formal mitigation plan exists", score: 2 },
    { label: "Well-prepared — AI risk management is part of our governance approach", score: 3 },
  ]},

  // PILLAR 5: Leadership & Strategy
  { id: 14, pillar: "Leadership & Strategy", text: "How committed is your senior leadership to AI adoption?", options: [
    { label: "Low — AI is not a priority in leadership conversations", score: 1 },
    { label: "Growing — leadership is interested but hasn't formally committed resources", score: 2 },
    { label: "High — AI is a named strategic priority with executive sponsorship", score: 3 },
  ]},
  { id: 15, pillar: "Leadership & Strategy", text: "Does your organization have a defined AI strategy or roadmap?", options: [
    { label: "No — we don't have an AI strategy", score: 1 },
    { label: "We have informal goals but no documented roadmap", score: 2 },
    { label: "Yes — we have a documented AI strategy aligned to business objectives", score: 3 },
  ]},
  { id: 16, pillar: "Leadership & Strategy", text: "Is there a dedicated budget allocated for AI initiatives?", options: [
    { label: "No dedicated budget — AI projects compete for general IT funds", score: 1 },
    { label: "Some funding is available but it's inconsistent year to year", score: 2 },
    { label: "Yes — AI has a dedicated, recurring budget line", score: 3 },
  ]},

  // PILLAR 6: Current AI Maturity
  { id: 17, pillar: "Current AI Maturity", text: "What best describes your organization's current AI activity?", options: [
    { label: "No AI tools or projects in use beyond standard software", score: 1 },
    { label: "Experimenting with AI tools (e.g., ChatGPT, Copilot) at individual or team level", score: 2 },
    { label: "AI is integrated into one or more core business processes in production", score: 3 },
  ]},
  { id: 18, pillar: "Current AI Maturity", text: "Does your organization have a structured approach to rolling out new technology?", options: [
    { label: "No — adoption is largely self-directed with minimal organizational support", score: 1 },
    { label: "Some change management practices exist but are applied inconsistently", score: 2 },
    { label: "Yes — a structured change management approach is consistently applied", score: 3 },
  ]},
  { id: 19, pillar: "Current AI Maturity", text: "How aligned are your departments around shared technology goals?", options: [
    { label: "Teams operate in silos with different tools and priorities", score: 1 },
    { label: "Some cross-functional coordination exists, but friction remains common", score: 2 },
    { label: "Cross-functional alignment on technology is standard practice", score: 3 },
  ]},
  { id: 20, pillar: "Current AI Maturity", text: "How urgent does AI adoption feel to your organization today?", options: [
    { label: "Not urgent — other priorities take precedence", score: 1 },
    { label: "Moderately urgent — the need is recognized but the path forward is unclear", score: 2 },
    { label: "Highly urgent — competitive pressure is driving the need to move faster", score: 3 },
  ]},
];

export const pillars = [
  "Data & Infrastructure",
  "Team & Skills",
  "Process Readiness",
  "Governance & Risk",
  "Leadership & Strategy",
  "Current AI Maturity",
] as const;

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
    narrative: "Your organization is at the beginning of its AI journey. There's significant opportunity to build foundational capabilities across data, team, process, governance, leadership, and current maturity. The good news? Starting from here means you can leapfrog common pitfalls by building a deliberate, well-structured AI roadmap from day one."
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
