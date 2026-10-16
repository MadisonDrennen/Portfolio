/** One rectangular region to blur, expressed as percentages 0–100
 *  of the item's rendered box. Leave `left` / `width` undefined for a
 *  full-width horizontal band. */
export type RedactBox = {
  top: number;
  height: number;
  left?: number;
  width?: number;
};

export type GalleryItem = {
  src: string;
  alt: string;
  type?: "image" | "video";
  /** Blur specific zones to anonymize names/clubs while keeping
   *  numbers and the design legible. Pass an array of boxes with
   *  percentage coordinates. */
  redact?: RedactBox[];
};

/**
 * A single visual row inside a project's gallery.
 * All items share the same aspect ratio and lay out in a clean horizontal strip ,
 * no staggering, no cropping. On mobile, large rows collapse to 2 columns.
 */
export type GalleryRow = {
  /** Optional small caption label above the row (e.g. "Social Campaign", "Brand Kit"). */
  label?: string;
  /** CSS aspect-ratio string applied to every tile in the row (e.g. "4/5", "16/9"). */
  aspect: string;
  /** "cover" crops to fit (use when images already match the aspect); "contain" never crops. */
  fit?: "cover" | "contain";
  /** Background color behind contain images. Defaults to a soft tint of the project accent. */
  bg?: string;
  /** Show the row at half width, centred, so a short row keeps the tile size of its neighbours. */
  narrow?: boolean;
  /** Render as a swipeable carousel instead of a grid (images only). */
  carousel?: boolean;
  items: GalleryItem[];
  /** Chapter id this row belongs to (see Project.chapters). */
  chapter?: string;
};

export type PdfAsset = {
  label: string;
  href: string;
};

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  shortDescription: string;
  whatIDid: string[];
  tags: string[];
  accentColor: string;
  year: string;
  caseStudyAvailable: boolean;
  heroImage?: string;
  /** When true, the hero image renders at a smaller max-width (max-w-3xl) instead of full-width. */
  heroCompact?: boolean;
  challenge?: string;
  approach?: string;
  results?: { value: string; label: string }[];
  resultsCaption?: string;
  gallery?: GalleryRow[];
  pdfs?: PdfAsset[];
  /** Live site shown in a browser window that scrolls a full-page capture. */
  liveSite?: { url: string; scroll: string };
  /** The client's own colours, used by the chapter case-study layout. */
  brand?: { dark: string; accent: string; /** Extra glow colours for a richer opening. */ hues?: string[] };
  /** Public URL of the live site, shown in the quick facts. */
  liveUrl?: string;
  /** Services for the quick-facts row. */
  services?: string[];
  /** When set, the case study renders in the chapter layout, grouping
   *  gallery rows by their `chapter` id in this order. */
  chapters?: { id: string; title: string; caption: string; tone: "light" | "dark" }[];
  /** Headline dissolves into dust and regathers (chapter layout). */
  particleTitle?: boolean;
}

export const projects: Project[] = [
  {
    slug: "gymrise",
    title: "GYMRISE",
    client: "GYMRISE",
    category: "Brand, Web Design & Growth",
    shortDescription:
      "Designed and built the GYMRISE website end-to-end, plus the full brand system, social campaigns, and sales creative that all live around it.",
    whatIDid: [
      "Designed & built the GYMRISE website end-to-end",
      "Social media campaigns & content production",
      "Sales creative & pricing sheets",
    ],
    tags: ["Web Design & Build", "Brand Systems", "Content & Social"],
    accentColor: "#D4255F",
    brand: { dark: "#040C0E", accent: "#00CDFD" },
    liveUrl: "https://gymrise.com",
    services: ["Website Design & Build", "Brand System", "Social Content", "Reels & Motion"],
    chapters: [
      { id: "website", title: "The Website", caption: "Designed and built end to end. Every page, every section, every interaction.", tone: "light" },
      { id: "reels", title: "Reels & Motion", caption: "Short-form motion that carries the brand into every feed.", tone: "dark" },
      { id: "social", title: "Social Content", caption: "A weekly content system: client wins, testimonials, monthly numbers and the leaderboard.", tone: "light" },
      { id: "mockups", title: "In the Wild", caption: "The finished site across every screen it lives on.", tone: "dark" },
    ],
    year: "2026",
    caseStudyAvailable: true,
    heroImage: "/work/gymrise/cover.jpg",
    heroCompact: true,
    challenge:
      "GYMRISE was scaling fast in the fitness industry and needed a brand presence that matched the ambition.\n\nThe website, marketing assets, and content needed to feel unified, built around a single visual system that could ship at the speed the program was growing.",
    approach:
      "I designed and built the entire GYMRISE website myself, every page, every interaction, every section, then extended the same visual system across the brand kit, social campaigns, and sales creative.\n\nEverything lives together: the same typography, the same energy, the same point of view. Owners, members, and prospects all see one brand, no matter where they meet it.",
    gallery: [
      // Row 1, THE BUILD: the GYMRISE website pages, full-width sequence
      {
        chapter: "website",
        label: "Designed & Built, The GYMRISE Website",
        aspect: "3/4",
        fit: "cover",
        carousel: true,
        items: [
          { src: "/work/gymrise/site-01.jpg", alt: "GYMRISE website, homepage hero & client highlights" },
          { src: "/work/gymrise/site-02.jpg", alt: "GYMRISE website, system & member testimonials" },
          { src: "/work/gymrise/site-03.jpg", alt: "GYMRISE website, university, FAQs & next-step CTA" },
        ],
      },
      // Reels & Motion (mockup-approved exports). Identity is 4:5, so the
      // row letterboxes on GYMRISE dark instead of cropping it.
      {
        chapter: "reels",
        label: "Reels & Motion",
        aspect: "9/16",
        fit: "contain",
        bg: "#040C0E",
        items: [
          { src: "/work/gymrise/reels/brand.mp4", alt: "GYMRISE brand reel animation", type: "video" },
          { src: "/work/gymrise/reels/identity.mp4", alt: "GYMRISE identity reel animation", type: "video" },
          { src: "/work/gymrise/reels/proof.mp4", alt: "GYMRISE proof reel animation", type: "video" },
          { src: "/work/gymrise/reels/proof-v3.mp4", alt: "GYMRISE proof reel, testimonial cut", type: "video" },
          { src: "/work/gymrise/reels/september-numbers.mp4", alt: "GYMRISE September numbers reel", type: "video" },
        ],
      },
      // Social media designs. Mockup-approved exports: names and clubs are
      // already placeholder text, numbers are real, so no redaction needed.
      {
        chapter: "social",
        label: "Client Wins & Recognition",
        aspect: "4/5",
        fit: "cover",
        items: [
          { src: "/work/gymrise/social/client-wins-1.jpg", alt: "Client win of the day post, dark" },
          { src: "/work/gymrise/social/client-wins-2.jpg", alt: "Client win of the day post, light" },
          { src: "/work/gymrise/social/recognition-1.jpg", alt: "Coach recognition post" },
          { src: "/work/gymrise/social/recognition-2.jpg", alt: "Coach milestone recognition post" },
        ],
      },
      {
        chapter: "social",
        label: "Testimonials & Sales Confidence",
        aspect: "4/5",
        fit: "cover",
        items: [
          { src: "/work/gymrise/social/testimonial-1.jpg", alt: "Client testimonial post" },
          { src: "/work/gymrise/social/testimonial-2.jpg", alt: "Client testimonial post" },
          { src: "/work/gymrise/social/sales-confidence-1.jpg", alt: "Sales confidence quote post" },
          { src: "/work/gymrise/social/sales-confidence-2.jpg", alt: "Sales confidence tip post" },
        ],
      },
      {
        chapter: "social",
        label: "Monthly Numbers & Program Pillars",
        aspect: "4/5",
        fit: "cover",
        items: [
          { src: "/work/gymrise/social/monthly-numbers-1.jpg", alt: "Monthly numbers headline post" },
          { src: "/work/gymrise/social/monthly-numbers-2.jpg", alt: "Monthly top clubs leaderboard post" },
          { src: "/work/gymrise/social/pillars-1.jpg", alt: "Content pillars list post" },
          { src: "/work/gymrise/social/pillars-2.jpg", alt: "Program pillars checklist post" },
        ],
      },
      {
        chapter: "social",
        aspect: "32/15",
        fit: "cover",
        items: [
          { src: "/work/gymrise/social/leaderboard.jpg", alt: "Monthly leaderboard wall graphic" },
        ],
      },
      // Website mockups, after the social work
      {
        chapter: "mockups",
        label: "Website Mockups",
        aspect: "16/9",
        fit: "cover",
        items: [
          { src: "/hero/m2-gymrise-site.jpg", alt: "GYMRISE website on laptop and floating screens" },
        ],
      },
    ],
  },
  {
    slug: "social-mulli",
    title: "Social Mulli",
    client: "Social Mulli",
    category: "Brand & Web Design",
    shortDescription:
      "Designed and built the Social Mulli website from scratch, plus the brand identity, social content, reels, and email signature system that complete the system.",
    whatIDid: [
      "Designed & built the Social Mulli website end-to-end",
      "Social posts, reels & animated content",
      "Meta ad creative for Anytime Fitness campaigns",
      "Email signature system (dark + light modes)",
      "OG visuals, audit deliverables & sales collateral",
    ],
    tags: ["Web Design & Build", "Brand Identity", "Meta Ads", "Marketing Systems"],
    accentColor: "#3B6EFF",
    brand: { dark: "#05082E", accent: "#3B6EFF", hues: ["#6C4BFF", "#C6F432"] },
    particleTitle: true,
    liveUrl: "https://socialmulli.com",
    services: ["Website Design & Build", "Brand Identity", "Social Content", "Reels & Motion", "Meta Ads"],
    chapters: [
      { id: "website", title: "The Website", caption: "Designed and built from scratch. A site that converts on first read.", tone: "light" },
      { id: "reels", title: "Reels & Motion", caption: "Motion pieces that put the REPS point of view into every feed.", tone: "dark" },
      { id: "social", title: "Social Content", caption: "Photo posts, post graphics, campaigns and Meta ads, all speaking one voice.", tone: "light" },
      { id: "mockups", title: "In the Wild", caption: "The finished site across every screen it lives on.", tone: "dark" },
    ],
    year: "2026",
    caseStudyAvailable: true,
    heroImage: "/work/social-mulli/cover-monitor.jpg",
    heroCompact: true,
    challenge:
      "Social Mulli was launching as a no-nonsense marketing partner for gyms and local businesses. The brand had to feel grown-up, confident, and refreshingly direct, opposite of the over-promising agency stereotype.\n\nIt needed a complete identity, a website that converted on first read, and assets the team could ship the day they went live.",
    approach:
      "I designed and built the Social Mulli website end-to-end, every page, every interaction, every section. Then I extended the same visual system across social content, email signatures, and audit deliverables.\n\nEverything reinforces one point of view: \"Marketing isn't a magic pill. It's the reps.\" The site, signatures, and pitch assets all share one voice, a brand that feels confident and consistent everywhere it shows up.",
    gallery: [
      // Row 1, THE BUILD: full Social Mulli website (three full-page screenshots)
      {
        chapter: "website",
        label: "Designed & Built, The Social Mulli Website",
        aspect: "3/4",
        fit: "cover",
        carousel: true,
        items: [
          { src: "/work/social-mulli/site-01.jpg", alt: "Social Mulli website, homepage & marketing system pillars" },
          { src: "/work/social-mulli/site-02.jpg", alt: "Social Mulli website, services & client transformations" },
          { src: "/work/social-mulli/site-03.jpg", alt: "Social Mulli website, FAQs, results & next-step CTA" },
        ],
      },
      // Row, Content & Post Graphics
      // Original posts and reels (Danelle has approved appearing in these).
      {
        chapter: "reels",
        label: "Reels & Motion",
        aspect: "9/16",
        fit: "cover",
        items: [
          { src: "/work/social-mulli/originals/reel-free-audit.mp4", alt: "Free marketing audit reel", type: "video" },
          { src: "/work/social-mulli/originals/reel-we-do.mp4", alt: "What we do reel", type: "video" },
          { src: "/work/social-mulli/originals/reel-january.mp4", alt: "January reel", type: "video" },
          { src: "/work/social-mulli/originals/reel-pendulum.mp4", alt: "Pendulum brand reel", type: "video" },
        ],
      },
      {
        chapter: "social",
        label: "Photo Posts",
        aspect: "4/5",
        fit: "cover",
        items: [
          { src: "/work/social-mulli/originals/fastest-reply.jpg", alt: "The fastest reply wins the member, photo post" },
          { src: "/work/social-mulli/originals/ads-not-scrolled-past.jpg", alt: "Making ads people don't scroll past, photo post" },
          { src: "/work/social-mulli/originals/creative-gets-the-click.jpg", alt: "Creative gets the click, strategy gets the result, photo post" },
        ],
      },
      {
        chapter: "social",
        label: "Post Graphics",
        aspect: "4/5",
        fit: "cover",
        items: [
          { src: "/work/social-mulli/originals/no-magic-pill.jpg", alt: "No magic pill, just the reps, post graphic" },
          { src: "/work/social-mulli/originals/nobody-watching.jpg", alt: "Most of it happens when nobody's watching, post graphic" },
          { src: "/work/social-mulli/originals/we-read-the-numbers.jpg", alt: "We read the numbers before we spend yours, post graphic" },
          { src: "/work/social-mulli/originals/ads-managed-daily.jpg", alt: "Ads managed daily, numbers reported weekly, post graphic" },
        ],
      },
      {
        chapter: "social",
        label: "Campaigns & Animated Posts",
        aspect: "4/5",
        fit: "cover",
        items: [
          { src: "/work/social-mulli/originals/longevity-project.jpg", alt: "Join the Longevity Project campaign post" },
          { src: "/work/social-mulli/originals/reps-lab.jpg", alt: "REPS Lab client portal post" },
          { src: "/work/social-mulli/originals/anim-weekly-report.mp4", alt: "Weekly report animated post", type: "video" },
          { src: "/work/social-mulli/originals/anim-every-gym-gets-leads.mp4", alt: "Every gym gets leads animated post", type: "video" },
        ],
      },
      {
        chapter: "social",
        label: "Meta Ads",
        aspect: "4/5",
        fit: "contain",
        bg: "transparent",
        items: [
          { src: "/work/social-mulli/meta-ad-busy-mom.png", alt: "Anytime Fitness Meta ad, Busy Mom 40+ program" },
          { src: "/work/social-mulli/meta-ad-stay-strong.png", alt: "Anytime Fitness Meta ad, Stay Strong, Stay Steady (Ageless 65+)" },
          { src: "/work/social-mulli/meta-ad-franklin-moms.png", alt: "Anytime Fitness Meta ad, Franklin Moms Reset campaign" },
        ],
      },
      // Website mockups, after the social work
      {
        chapter: "mockups",
        label: "Website Mockups",
        aspect: "16/9",
        fit: "cover",
        items: [
          { src: "/hero/m2-socialmulli-devices.jpg", alt: "Social Mulli website across laptop, tablet and phone" },
        ],
      },
      // Row 2, Dashboard mockup + laptop website mockup, side by side
      // Row 3, Brand touchpoints
      // Row 3, Email signature design bundle (iPad mockup)
      // Row 4, Email signature system (dark + light modes)
    ],
  },
  {
    slug: "rekmed",
    title: "RekMed",
    client: "RekMed",
    category: "Product & Content Marketing",
    shortDescription:
      "End-to-end marketing for a healthcare education brand, including product promotion, social content, and visual campaigns designed to build trust and drive engagement.",
    whatIDid: [
      "Product marketing and promotional campaign execution",
      "Social media content and visual assets across platforms",
      "Brand messaging and copy aligned with audience needs",
      "Structured content calendars for consistency and output",
    ],
    tags: ["Product Marketing", "Content Strategy", "Social Video"],
    accentColor: "#2DB891",
    year: "2025",
    caseStudyAvailable: true,
    heroImage: "/rekmed-hero.jpg",
    heroCompact: true,
    challenge:
      "RekMed was scaling its presence in the healthcare education space and needed a more elevated, cohesive digital experience to match its growth.\n\nThe opportunity: enhance social, refine visual consistency, and elevate product presentation, creating a more polished, trustworthy, and engaging experience for nursing students and their educators.",
    approach:
      "I focused on elevating the brand's overall digital presence through a strategy-first approach to content and design.\n\nThis included enhancing social media content, refining visual consistency, and improving product presentation across the website. I built structured content calendars and created cohesive visuals that aligned both educational value and product promotion.\n\nEvery touchpoint was designed to feel polished, intentional, and aligned with the brand's growth.",
    results: [
      { value: "5x/Week", label: "Consistent Content Execution" },
      { value: "Multi-Platform", label: "Content System Implementation" },
      { value: "Stronger", label: "Brand Consistency & Positioning" },
      { value: "Improved", label: "Engagement & Audience Trust" },
    ],
    resultsCaption: "Focus: Building consistency, trust, and conversion through strategic content.",
    gallery: [
      {
        label: "Product & Brand Photography",
        aspect: "3/2",
        fit: "cover",
        items: [
          { src: "/work/rekmed/01-product.jpg", alt: "RekMed branded product photography" },
        ],
      },
      {
        label: "Social Video Content",
        aspect: "9/16",
        fit: "cover",
        items: [
          { src: "/work/rekmed/video-01.mp4", alt: "RekMed social video", type: "video" },
          { src: "/work/rekmed/video-02.mp4", alt: "RekMed Instagram video", type: "video" },
          { src: "/work/rekmed/video-03.mp4", alt: "RekMed promo video", type: "video" },
          { src: "/work/rekmed/video-04.mp4", alt: "Nurses Week carousel video", type: "video" },
        ],
      },
      {
        label: "Promotional Stills",
        aspect: "3/4",
        fit: "cover",
        items: [
          { src: "/work/rekmed/02-poster.png", alt: "RekMed promotional poster" },
          { src: "/work/rekmed/03-photo.png", alt: "RekMed product detail" },
          { src: "/work/rekmed/04-photo.png", alt: "RekMed lifestyle photo" },
        ],
      },
    ],
  },
  {
    slug: "explorations",
    title: "Explorations",
    client: "Personal",
    category: "Concept Work & Creative Experiments",
    shortDescription:
      "A collection of concept-driven visuals, mockups, and creative explorations across branding, advertising, and digital design.",
    whatIDid: [
      "Brand concept development",
      "Mockup and visual design",
      "Advertising concept exploration",
      "Experimental digital design",
    ],
    tags: ["Mockups", "Concept Design", "Visual Experiments"],
    accentColor: "#8CB6DF",
    year: "Ongoing",
    caseStudyAvailable: true,
    heroImage: "/work/explorations/cover.jpg",
    heroCompact: true,
    challenge:
      "A running sketchbook of ideas, campaigns I'd ship if the brief existed, brand systems I'd want to build, type and layout experiments.\n\nLess a project, more a feed of thinking.",
    approach:
      "I treat exploration as practice. Anything that catches my eye, a phrase, a layout, a typographic moment, gets a mockup. Some become campaigns. Some stay studies. All of them sharpen the work I ship at the companies I work for.",
    gallery: [
      {
        label: "Campaign Concept",
        aspect: "16/9",
        fit: "cover",
        items: [
          { src: "/work/explorations/01-glove.jpg", alt: "Boxing concept campaign, Don't Fear the Fight" },
        ],
      },
      {
        label: "Email Marketing Mockups, Brand Studies",
        aspect: "3/5",
        fit: "cover",
        items: [
          { src: "/work/explorations/email-01-glossier.jpg", alt: "Glossier, email design study" },
          { src: "/work/explorations/email-02-quizlet.jpg", alt: "Quizlet, email design study" },
          { src: "/work/explorations/email-03-notion.jpg", alt: "Notion, email design study" },
        ],
      },
      {
        label: "Concept Studies",
        aspect: "1/1",
        fit: "cover",
        items: [
          { src: "/work/explorations/03-concept.png", alt: "Concept exploration" },
        ],
      },
    ],
  },
];
