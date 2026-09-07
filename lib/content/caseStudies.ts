// Owned projects, with public source evidence. Do not add outcome metrics without receipts.
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  implementation: string;
  demonstration: string;
  technologies: string[];
  image?: { src: string; alt: string; width: number; height: number };
  demo?: string;
  source: string;
  evidence: { label: string; href: string };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "just-tools",
    title: "Just Tools",
    category: "Developer utilities",
    summary: "Small tools. Useful answers. Right in your browser.",
    problem:
      "Everyday development needs quick ways to format data, inspect text, and prepare prompts.",
    implementation:
      "I develop a collection of browser utilities with processing logic separated from the interface. The JSON formatter validates and formats input locally, with dedicated regression tests.",
    demonstration:
      "Open the JSON formatter, paste an example, and format or minify it. Inspect the source to see how the tool logic is kept independent of the UI.",
    technologies: ["Next.js", "TypeScript", "Browser APIs", "Vitest"],
    image: {
      src: "/projects/justtools.jpg",
      alt: "Just Tools homepage showing its searchable collection of browser developer utilities.",
      width: 1348,
      height: 926,
    },
    demo: "https://www.justtools.net/",
    source: "https://github.com/ruizTechServices/justtools-1",
    evidence: {
      label: "Inspect the JSON processing logic",
      href: "https://github.com/ruizTechServices/justtools-1/blob/ff1fcf1c629b7121fecb5a33573d3a046acf744d/src/features/tools/json-formatter/logic.ts",
    },
  },
  {
    id: "soundboard",
    title: "Gio’s Soundboard",
    category: "Interactive web experience",
    summary: "A playful interface with deliberate playback behavior.",
    problem:
      "A sound collection needs fast discovery and predictable controls as people browse, play, and return.",
    implementation:
      "Part of my personal portfolio, the soundboard combines search, category filters, and favorites with one audio player. Playback explicitly handles loading, pause, completion, and failure.",
    demonstration:
      "Find a clip, play it, and try the controls. Favorites and settings stay in that browser; shared links select a clip without starting audio automatically.",
    technologies: ["React", "TypeScript", "Audio APIs", "Supabase portfolio"],
    image: {
      src: "/projects/soundboard.webp",
      alt: "Gio’s soundboard with searchable sound pads, category filters, favorites, and an audio player.",
      width: 1153,
      height: 795,
    },
    demo: "https://www.luis-ruiz.com/soundboard",
    source: "https://github.com/ruizTechServices/luis_ruiz_3",
    evidence: {
      label: "Inspect the audio player",
      href: "https://github.com/ruizTechServices/luis_ruiz_3/blob/d74b310eb2ca8b4202b173b39198fe48ba057d84/components/soundboard/use-audio-player.ts",
    },
  },
  {
    id: "nucleus",
    title: "Nucleus",
    category: "AI application · source walkthrough",
    summary: "The backend work behind an AI conversation.",
    problem:
      "An AI chat application must connect model selection and streaming with the user’s access and usage allowance.",
    implementation:
      "I develop Nucleus as an owned AI chat project. The chat route verifies the user, checks allowed models, reserves usage before generation, and settles usage around the response. Billing is handled separately through signed Stripe webhooks.",
    demonstration:
      "Read the chat route to follow authentication, model access, and usage accounting. This walkthrough describes the implementation; it is not a claim that every model or paid tier is currently available.",
    technologies: ["Next.js", "Supabase", "Streaming", "Stripe"],
    source: "https://github.com/ruizTechServices/nucleus-bot",
    evidence: {
      label: "Walk through the chat route",
      href: "https://github.com/ruizTechServices/nucleus-bot/blob/7bde3082885fadac4cc96304f214b77903f41747/app/api/chat/route.ts",
    },
  },
];
