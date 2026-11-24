// Homepage content (source: PROBRIDGE homepage brief). Edit here; the page renders from these objects.

const SERVICES = [
  { title: "Buy Property", label: "Zero Brokerage", icon: "home" },
  { title: "Sell Property", label: "Zero Brokerage", icon: "tag" },
  { title: "Rental Services", label: "Zero Brokerage", icon: "key" },
  { title: "Interior Connections", label: "Free consultation", icon: "sofa" }
];

// Official logos supplied by the client. Add more builders here; the carousel arrows appear when they overflow.
const BUILDERS = [
  { name: "Prestige Group", logo: "assets/builders/prestige.png" },
  { name: "Brigade Group", logo: "assets/builders/brigade.png" },
  { name: "Godrej Properties", logo: "assets/builders/godrej.png" },
  { name: "Puravankara", logo: "assets/builders/puravankara.png" }
];

// TODO(client): replace representative images with approved project photographs.
const FEATURED = [
  {
    builder: "Puravankara",
    name: "Lakevista @ Purva Windermere",
    location: "OMR South, Pallikaranai",
    type: "Apartment",
    image: 2,
    facts: [
      ["Project area", "55 Acres"],
      ["Units", "1,200 Units"],
      ["Structure", "Stilt + 10 / 11 / 12 Floors"],
      ["Possession", "December 2026"]
    ],
    rera: "TN/29/Building/0008/2023",
    highlights: ["40+ lifestyle amenities", "76% open space", "Clubhouse: 35,000 + 10,000 sq. ft."],
    amenities: [
      "Swimming pool", "Children's play area", "Supermarket", "Restaurant", "Jogging track",
      "Basketball and tennis courts", "Garden sit-out", "Pet park", "Multipurpose hall", "Crèche",
      "Gymnasium", "Billiards", "Table tennis", "Squash court", "Cards room", "Multipurpose court"
    ],
    prices: [
      ["1 BHK", "620–625 sq. ft.", "₹52 L + registration"],
      ["2 BHK", "902–915 sq. ft.", "₹80 L + registration"],
      ["3 BHK + 2T", "1,140–1,240 sq. ft.", "₹1.10 Cr + registration"],
      ["3 BHK + 3T", "1,440–1,490 sq. ft.", "₹1.26 Cr + registration"]
    ],
    cta: "Enquire Now"
  },
  {
    builder: "Godrej",
    name: "Smart Plug & Play Plots",
    location: "Near Wonderla, Chennai – Thiruporur",
    type: "Plots",
    image: 0,
    partner: "PROBRIDGE – Associate Partner",
    status: "Expression of Interest (EOI) open",
    facts: [
      ["Starting price", "₹35.25 Lakhs"],
      ["Launch availability", "December 1, 2026"]
    ],
    highlights: [
      "Premium planned plots",
      "Smart Plug & Play Plot concept",
      "Excellent connectivity",
      "Green and peaceful surroundings",
      "Ideal for dream homes and investment"
    ],
    ctaLine: "Register Your EOI Today & Get Priority Updates!",
    // TODO(client): confirm which number this CTA should use (brief §10, §16 item 2).
    contact: { label: "917 666 3200", tel: "+919176663200", whatsapp: "919176663200" },
    disclaimer: "Price, amenities, launch date and allotment are subject to official confirmation.",
    cta: "Register Interest"
  }
];

const CHOICE = [
  { name: "Godrej Wonderla", type: "Plots", price: "From ₹35.25L", location: "Thiruporur, OMR" },
  // TODO(client): promotional "from ₹55L" conflicts with the Lakevista price list (2 BHK ₹80L). Confirm before launch.
  { name: "Lake Vista", type: "2 & 3 BHK", price: "From ₹55L", location: "Pallikaranai" },
  { name: "Brigade", type: "2, 3 & 4 BHK", price: "From ₹1.33Cr", location: "Vanagaram" },
  { name: "Prestige Palm Court", type: "2, 3 & 3.5 BHK", price: "From ₹1.83Cr", location: "Madhavaram" }
];
