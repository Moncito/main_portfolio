export const profile = {
  first: "Moncito",
  last: "Hernandez",
  role: "Full Stack Software Engineer",
  location: "Manila, PH",
  email: "moncitoglenn03@gmail.com",
  linkedin: "https://www.linkedin.com/in/moncito-glenn-hernandez-238605261/",
  github: "https://github.com/Moncito",
  resume: "/resume.pdf",
};

export const nav = [
  { label: "Work", target: "#work" },
  { label: "Apps", target: "#apps" },
  { label: "About", target: "#about" },
  { label: "Contact", target: "#contact" },
];

export const statement =
  "I build web platforms and mobile apps from Manila. Before I wrote production code I spent years in recruitment and outreach, so I build for the person on the other side of the screen.";

export const facts = [
  { value: 7, pad: 2, suffix: "", label: "Projects in this index" },
  { value: 21, pad: 2, suffix: "H", label: "Hackathon build, TrabaWHO" },
  { value: 2027, pad: 4, suffix: "", label: "BSIT, National University Manila" },
];

export type WebProject = {
  no: string;
  title: string;
  kind: string;
  role: string;
  summary: string;
  points: string[];
  image: string;
  href: string;
  host: string;
};

export const webProjects: WebProject[] = [
  {
    no: "01",
    title: "EasyHire VA",
    kind: "Recruitment platform",
    role: "Full stack engineering",
    summary:
      "A recruitment platform for Filipino virtual assistants where every employer is checked by a person before a role goes live.",
    points: ["Verified employer pipeline", "Job board and applications", "Shortlist, message, interview"],
    image: "/images/work/easyhire.png",
    href: "https://easyhireva.com",
    host: "easyhireva.com",
  },
  {
    no: "02",
    title: "But First Coffee",
    kind: "Brand experience",
    role: "Design and development",
    summary:
      "A scroll-driven storefront for a specialty coffee label, from bean to roast to ritual, with sound and a staged loading sequence.",
    points: ["Scroll-led storytelling", "Sound design toggle", "Product and roast catalogue"],
    image: "/images/work/coffee.png",
    href: "https://but-first-coffee-three.vercel.app",
    host: "but-first-coffee-three.vercel.app",
  },
  {
    no: "03",
    title: "Roomify 2.0",
    kind: "AI design tool",
    role: "Design and development",
    summary:
      "An AI-first design environment. Upload a floor plan and get rendered visualisations of the space back.",
    points: ["Floor plan upload", "AI-generated renders", "Community feed and tags"],
    image: "/images/work/roomify.png",
    href: "https://roomify-omega-orpin.vercel.app",
    host: "roomify-omega-orpin.vercel.app",
  },
  {
    no: "04",
    title: "Luwas Travel",
    kind: "Travel platform",
    role: "Full stack engineering",
    summary:
      "A travel companion for the Philippines: curated destinations, personalised itineraries and booking in one place.",
    points: ["Destination discovery", "Itinerary planning", "Promos and travel history"],
    image: "/images/work/luwas.png",
    href: "https://luwas-travel-app.vercel.app",
    host: "luwas-travel-app.vercel.app",
  },
];

export type AppProject = {
  no: string;
  slug: "trabawho" | "groove" | "luwas";
  title: string;
  kind: string;
  summary: string;
  tags: string[];
  note?: string;
  screen: string;
  /** width / height of the visible screen area */
  aspect: number;
  /** percent of the screenshot hidden at top and bottom (system bars) */
  crop: { top: number; bottom: number };
  href: string;
  theme: { bg: string; fg: string; accent: string };
};

export const appProjects: AppProject[] = [
  {
    no: "05",
    slug: "trabawho",
    title: "TrabaWHO",
    kind: "On-device AI booking",
    summary:
      "Describe the problem at home in Taglish. A language model running on the phone turns it into a bookable job, and it keeps working in airplane mode.",
    tags: ["On-device LLM", "Offline-first sync", "React Native", "TypeScript"],
    note: "Built in 21 hours with Team 404 at the AppBuildersPH Hackathon 2026.",
    screen: "/images/apps/trabawho.webp",
    aspect: 900 / 1810,
    crop: { top: 5, bottom: 4.5 },
    href: "https://github.com/Moncito/TrabaWHO",
    theme: { bg: "#06184a", fg: "#ffffff", accent: "#f5a31a" },
  },
  {
    no: "06",
    slug: "groove",
    title: "Groove",
    kind: "Community habit tracker",
    summary:
      "Log what you did today, from running to reading to shipping code, and watch it fill a contribution grid. Then share the streak with a community feed.",
    tags: ["Expo", "React Native", "Supabase", "Skia", "Reanimated"],
    screen: "/images/apps/groove.webp",
    aspect: 1067 / 2000,
    crop: { top: 0, bottom: 0 },
    href: "https://github.com/Moncito/groove",
    theme: { bg: "#f5f2ec", fg: "#12100c", accent: "#f08a2e" },
  },
  {
    no: "07",
    slug: "luwas",
    title: "Luwas Native",
    kind: "Travel companion",
    summary:
      "The mobile side of Luwas. Browse destinations, book trips and manage itineraries, with in-app chat support, weather and traveller reviews.",
    tags: ["Expo", "React Native", "Firebase", "OAuth"],
    screen: "/images/apps/luwas-native.webp",
    aspect: 921 / 2000,
    crop: { top: 0, bottom: 0 },
    href: "https://github.com/Moncito/luwas-native",
    theme: { bg: "#1b1a14", fg: "#f3efe6", accent: "#3b6cf6" },
  },
];

export const experience = [
  {
    period: "Current",
    title: "Full Stack Software Engineer",
    org: "EasyHire VA Solutions",
    desc: "Building and maintaining a full-stack recruitment platform: responsive web apps, secure backend services, databases and performance.",
  },
  {
    period: "2024 — Now",
    title: "Freelance Mobile Developer",
    org: "Independent",
    desc: "Mobile apps with authentication flows, profile management, navigation and data-driven interfaces, wired to backend services and APIs.",
  },
  {
    period: "2023 — Now",
    title: "Freelance Web Developer",
    org: "Independent",
    desc: "Web applications in Next.js, TypeScript, Tailwind CSS, Firebase and Appwrite. Auth systems, admin dashboards, booking workflows, API integrations.",
  },
  {
    period: "",
    title: "Customer Support Agent",
    org: "Amazon",
    desc: "Resolved order, account, return and refund issues across chat, email and phone.",
  },
  {
    period: "2024",
    title: "Outreach Manager",
    org: "WorkEdge",
    desc: "Built and ran structured outreach strategies and events to connect with clients and partners.",
  },
  {
    period: "2023 — 2024",
    title: "Outreach Consultant",
    org: "WorkEdge",
    desc: "Advised on outreach planning and analysed performance data to improve response rates.",
  },
  {
    period: "2021 — 2022",
    title: "Recruitment Specialist",
    org: "AddWorth",
    desc: "Sourced candidates with LinkedIn Recruiter, Boolean and X-Ray search.",
  },
];

export const stack = [
  ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Node.js"],
  ["React Native", "Expo", "Flutter", "Firebase", "Supabase", "Appwrite"],
];
