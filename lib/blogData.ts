export type BlogPost = {
  slug: string;
  title: string;
  titleAr?: string;
  format: "Blog post" | "Case study" | "Thought leadership";
  month: string;
  priority: "High" | "Medium" | "Low";
  audience: string;
  keywordFocus: string;
  goal: string;
  project?: string;
  location?: string;
  scope?: string;
  client?: string;
  status?: string;
  excerpt: string;
  excerptAr?: string;
  content?: string[];
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "luxury-hotel-refurbishment-dubai",
    title: "How to Refurbish a Luxury Hotel in Dubai Without Disrupting Operations",
    format: "Blog post",
    month: "July",
    priority: "High",
    audience: "Hotel owners, operators, consultants",
    keywordFocus: "luxury hotel refurbishment Dubai, phased hotel refurbishment",
    goal: "Capture high-intent search traffic",
    project: "Park Hyatt Hotel, Dubai Creek - Phase 2",
    location: "Dubai, UAE",
    scope: "98 Rooms Hotel Refurbishment",
    client: "Wasl LLC",
    status: "On-going",
    image: "/brand-pages/page_01.jpg",
    excerpt:
      "A live luxury hotel refurbishment depends on phasing, floor-by-floor sequencing, dust control, guest buffers, and close coordination between the operator, consultant, contractor, and suppliers.",
    content: [
      "Refurbishing a luxury hotel while it stays open is one of the hardest jobs in hospitality construction. Guests are still checking in, staff are still running services, and contractors are upgrading rooms behind the scenes.",
      "In Dubai, phased hotel refurbishment is usually the practical route. One or two floors close at a time while the rest of the property keeps operating. Public areas are scheduled around slow hours, and back-of-house work often moves at night.",
      "Noise, dust, material movement, and room blocking need hard rules from day one. The strongest projects protect the guest experience while keeping the renovation commercially useful for the owner.",
      "The final challenge is brand discipline. Every finish, fixture, and layout decision has to improve comfort without losing the identity returning guests already recognize."
    ]
  },
  {
    slug: "turnkey-luxury-villa-contractor-dubai",
    title: "What Private Clients Look for in a Turnkey Construction Partner",
    format: "Blog post",
    month: "July",
    priority: "High",
    audience: "Private clients, family offices, developers",
    keywordFocus: "turnkey villa contractor Dubai, luxury construction Dubai",
    goal: "Build trust and lead generation",
    project: "Emirates Golf Club Villas - Phase 2",
    location: "Dubai, UAE",
    scope: "14 Villas Development",
    client: "Wasl LLC",
    status: "On-going",
    image: "/brand-pages/page_04.jpg",
    excerpt:
      "Private clients value one accountable partner, consistent communication, discreet execution, and finishing quality that preserves the original design intent."
  },
  {
    slug: "park-hyatt-dubai-creek-case-study",
    title: "Case Study: Park Hyatt Dubai Creek Refurbishment Project",
    format: "Case study",
    month: "July",
    priority: "High",
    audience: "Hospitality decision-makers",
    keywordFocus: "hotel fit out Dubai, hotel refurbishment Dubai",
    goal: "Show credibility and capability",
    project: "Ritz Carlton Abu Dhabi Hotel",
    location: "Dubai, UAE",
    scope: "63 Villas Refurbishment",
    client: "ADNH",
    status: "On-going",
    image: "/brand-pages/page_07.jpg",
    excerpt:
      "A credibility-led project story for hospitality owners evaluating live-environment refurbishment and fit-out partners."
  },
  {
    slug: "luxury-villa-development-dubai",
    title: "What Makes a Luxury Villa Development Successful in Dubai?",
    format: "Blog post",
    month: "July",
    priority: "High",
    audience: "Private developers, homeowners",
    keywordFocus: "private villa construction Dubai, luxury villa development",
    goal: "Attract villa project enquiries",
    project: "Ritz Carlton Abu Dhabi Hotel",
    location: "Dubai, UAE",
    scope: "10 Hotel Luxury Villa Construction",
    client: "ADNH",
    status: "On-going",
    image: "/brand-pages/page_10.jpg",
    excerpt:
      "Luxury villa work is judged by privacy, exact detailing, procurement discipline, long-term comfort, and a client experience that feels as refined as the finished residence."
  },
  {
    slug: "interior-fit-out-luxury-hotels",
    title: "Why Interior Fit-Out Matters in Luxury Hotel Projects",
    format: "Blog post",
    month: "August",
    priority: "High",
    audience: "Hotel brands, operators",
    keywordFocus: "hospitality interior fit out, hotel fit out Dubai",
    goal: "Position expertise in interiors",
    project: "Park Hyatt Hotel, Dubai Creek",
    location: "Dubai, UAE",
    scope: "114 Rooms Hotel Refurbishment",
    client: "Wasl LLC",
    status: "On-going",
    image: "/brand-pages/page_13.jpg",
    excerpt:
      "Fit-out is where brand standards become physical: joinery, lighting, flooring, guest flow, durability, and the quiet details guests feel before they name them."
  },
  {
    slug: "soft-refurbishment-five-star-hotel",
    title: "How Soft Refurbishment Can Transform a Five-Star Hotel",
    format: "Blog post",
    month: "August",
    priority: "Medium",
    audience: "Hospitality brands",
    keywordFocus: "soft refurbishment UAE, hotel refurbishment",
    goal: "Educate and support SEO",
    project: "Emirates Golf Club Villas",
    location: "Dubai, UAE",
    scope: "13 Villas Development",
    client: "Wasl LLC",
    status: "On-going",
    image: "/brand-pages/page_16.jpg",
    excerpt:
      "Soft refurbishments can refresh the guest impression quickly through fabrics, loose furniture, lighting mood, artwork, and surface-level upgrades."
  },
  {
    slug: "high-end-design-build-villas",
    title: "How to Deliver High-End Design-and-Build Villa Projects in Dubai",
    format: "Blog post",
    month: "August",
    priority: "Medium",
    audience: "Developers, private clients",
    keywordFocus: "design and build UAE, luxury construction Dubai",
    goal: "Build authority in delivery",
    project: "Park Hyatt Saadiyat Island",
    location: "Abu Dhabi, UAE",
    scope: "236 Rooms Hotel Refurbishment",
    client: "ADNH",
    status: "Phase 1 - 2025 / Phase 2 - 2026",
    image: "/brand-pages/page_19.jpg",
    excerpt:
      "Design-and-build succeeds when creative decisions, procurement, specialist trades, and site realities are managed through one disciplined delivery rhythm."
  },
  {
    slug: "district-one-meydan-turnkey-case-study",
    title: "Case Study: District One Meydan Private Villa Turnkey Delivery",
    format: "Case study",
    month: "August",
    priority: "Medium",
    audience: "Private clients, developers",
    keywordFocus: "turnkey villa Dubai, private villa construction",
    goal: "Strengthen portfolio proof",
    project: "Dusit Thani Dubai Hotel",
    location: "Dubai, UAE",
    scope: "319 Rooms Hotel Refurbishment",
    client: "Dusit Thani Hotel Dubai",
    status: "Phase 1 - 2025 / Phase 2 - 2026",
    image: "/brand-pages/page_22.jpg",
    excerpt:
      "A portfolio-led narrative for private residential clients who want proof of discretion, control, and complete delivery."
  },
  {
    slug: "dubai-luxury-hotel-refurbishment-market",
    title: "Why Dubai Is a Leading Market for Luxury Hotel Refurbishment",
    format: "Thought leadership",
    month: "September",
    priority: "Medium",
    audience: "Investors, operators",
    keywordFocus: "luxury hotel refurbishment Dubai",
    goal: "Improve brand positioning",
    project: "Al Mizhar Private Compound - 6 VVIP Villas",
    location: "Dubai, UAE",
    scope: "Construction works",
    client: "Private Client",
    status: "On-going",
    image: "/brand-pages/page_25.jpg",
    excerpt:
      "Dubai's hotel market moves quickly, and refurbishment keeps established properties aligned with rising guest expectations and rate positioning."
  },
  {
    slug: "high-value-project-handover",
    title: "What Makes a High-Value Project Handover Successful?",
    format: "Blog post",
    month: "September",
    priority: "Medium",
    audience: "Developers, project managers",
    keywordFocus: "premium contractor UAE, project handover",
    goal: "Demonstrate process expertise",
    image: "/brand-pages/page_28.jpg",
    excerpt:
      "Premium handover is not a final-day event. It is a controlled closeout process built around snagging, documentation, training, and client confidence."
  },
  {
    slug: "repeat-clients-luxury-construction",
    title: "Why Repeat Clients Matter in Luxury Construction and Fit-Out",
    format: "Thought leadership",
    month: "September",
    priority: "Medium",
    audience: "Prospects, referral partners",
    keywordFocus: "luxury construction Dubai, premium contractor",
    goal: "Reinforce trust and reputation",
    image: "/brand-pages/page_31.jpg",
    excerpt:
      "Repeat clients signal something stronger than marketing: delivery consistency, trust, problem-solving maturity, and quality that holds up after handover."
  },
  {
    slug: "modernize-guest-rooms-protect-brand",
    title: "How to Modernize Guest Rooms While Protecting a Hotel Brand",
    format: "Blog post",
    month: "October",
    priority: "Low",
    audience: "Hotel operators",
    keywordFocus: "hotel guest room refurbishment",
    goal: "Support long-tail search",
    project: "Park Hyatt Luxury Lifestyle Villa",
    location: "Dubai, UAE",
    scope: "Design and Build",
    client: "Dubai Golf",
    status: "Completed",
    image: "/brand-pages/page_34.jpg",
    excerpt:
      "Guest room modernization works best when practical comfort improves while the visual language remains unmistakably connected to the hotel brand."
  }
];

export const featuredBlogPost = blogPosts[0];
