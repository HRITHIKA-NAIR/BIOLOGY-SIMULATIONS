import { notebook } from "./notebook.js";
export const pearson =
  "https://www.pearson.com/en-gb/schools/subject-resources/science/tried-and-tested/support-from-pearson/gcse-core-practical-videos/biology-core.html";
const sheets =
  "https://www.pearson.com/content/dam/one-dot-com/one-dot-com/uk/documents/subjects/science/GCSE-core-practical-sheets/";
const step = (title, text, action = null) => ({
  title,
  text,
  action,
  duration: 11,
});
export const practicals = [
  {
    id: "microscopy",
    ref: "1.6",
    title: "A closer look at cells",
    topic: "Microscopy",
    icon: "microscope",
    core: true,
    video: "qlv2YsL7tCY",
    sheet: "cp1-looking-at-cells-2021.pdf",
    summary:
      "Prepare an onion slide, focus the microscope and explore magnification.",
    apparatus:
      "Light microscope, slide, coverslip, forceps, onion epidermis, iodine, paper towel.",
    safety:
      "Handle glass carefully; use eye protection and gloves with stains. Never point a microscope mirror at the Sun.",
    steps: [
      step(
        "Prepare the slide",
        "Place a small drop of iodine on a clean slide.",
      ),
      step(
        "Add a thin specimen",
        "Use forceps to lay a thin piece of onion epidermis flat in the drop.",
        "Place the specimen on the slide",
      ),
      step(
        "Lower the coverslip",
        "Lower one edge first, then gently lower the coverslip to limit trapped air. Blot excess liquid.",
        "Lower the coverslip",
      ),
      step(
        "Start with low power",
        "Secure the slide and select the lowest-power objective. Watch from the side as you bring the lens close, without touching the slide; focus away carefully.",
        "Place the slide on the stage",
      ),
      step(
        "Observe and record",
        "Use fine focus at higher power. Draw and label visible structures; record magnification. Onion bulb epidermis normally lacks chloroplasts.",
      ),
    ],
    concept:
      "Total magnification = eyepiece magnification × objective magnification. Image size and actual size must use matching units.",
    question: "A 10× eyepiece and 4× objective give what total magnification?",
    answers: ["14×", "40×", "400×"],
    correct: 1,
    explanation: "Multiply the two magnifications: 10 × 4 = 40.",
  },
  {
    id: "enzymes",
    ref: "1.10",
    title: "Finding an enzyme’s optimum",
    topic: "pH & enzymes",
    icon: "test-tube",
    core: true,
    video: "aHVcJ1fHYWg",
    sheet: "cp2-ph-and-enzyme-activity.pdf",
    summary: "Follow starch digestion using iodine while changing pH.",
    apparatus:
      "Amylase, starch, buffers, syringes, pipette, spotting tile, iodine, timer.",
    safety:
      "Wear eye protection. Avoid contact with iodine and enzyme solutions; use teacher-approved concentrations.",
    steps: [
      step(
        "Prepare the indicator",
        "Put iodine drops into separate wells of a spotting tile.",
      ),
      step(
        "Set the pH",
        "Measure 2 cm³ amylase and 1 cm³ buffer into a tube. Keep temperature controlled.",
        "Add the buffer",
      ),
      step(
        "Start the reaction",
        "Add 2 cm³ starch, mix and start timing.",
        "Add the starch",
      ),
      step(
        "Sample into iodine",
        "Test a sample after 20 seconds, then at 10-second intervals. Blue-black indicates starch remains.",
        "Transfer a sample",
      ),
      step(
        "Compare the endpoints",
        "Record the first sample that stays yellow-brown. Repeat across pH values with controlled volumes and concentrations.",
      ),
    ],
    concept:
      "A shorter endpoint time indicates a faster reaction under comparable conditions. Relative rate can be calculated as 1/time; enzyme sources can have different optima.",
    question: "Which observation indicates starch is no longer detected?",
    answers: [
      "Iodine stays yellow-brown",
      "Iodine turns blue-black",
      "The tube becomes warmer",
    ],
    correct: 0,
    explanation:
      "Iodine does not turn blue-black when starch is no longer detected.",
  },
  {
    id: "osmosis",
    ref: "1.16",
    title: "Water on the move",
    topic: "Osmosis in potatoes",
    icon: "droplet",
    core: true,
    video: "wVr8AqTqwqg",
    sheet: "cp4-osmosis-in-potatoes.pdf",
    summary:
      "Compare potato mass before and after immersion in different solutions.",
    apparatus:
      "Equal-sized potato strips, labelled solutions, tubes, balance, forceps, paper towel.",
    safety:
      "Do not eat the potato or drink solutions. A teacher should supervise any cutting.",
    steps: [
      step(
        "Label and prepare",
        "Use equal-sized strips and labelled tubes for each solution concentration.",
      ),
      step(
        "Measure the starting mass",
        "Blot each strip gently, weigh it and record its starting mass.",
        "Move the strip to the balance",
      ),
      step(
        "Immerse the strips",
        "Cover each strip with its assigned solution. Keep immersion time and temperature the same.",
        "Place the strip in solution",
      ),
      step(
        "Allow osmosis",
        "Leave for at least 15 minutes in the reference method. This animation abbreviates the wait.",
      ),
      step(
        "Blot, reweigh and compare",
        "Remove and blot each strip, then record final mass. Calculate percentage change; repeat and investigate anomalous results.",
        "Return the strip to the balance",
      ),
    ],
    concept:
      "Percentage mass change = (final mass − initial mass) ÷ initial mass × 100. Water moves across partially permeable membranes down a water-potential gradient.",
    question:
      "A strip changes from 2.00 g to 2.20 g. What is its percentage change?",
    answers: ["−10%", "+0.20%", "+10%"],
    correct: 2,
    explanation: "(2.20 − 2.00) ÷ 2.00 × 100 = +10%.",
  },
  {
    id: "photosynthesis",
    ref: "6.5",
    title: "Bring photosynthesis to light",
    topic: "Light & photosynthesis",
    icon: "leaf",
    core: true,
    video: "1893JKe08M0",
    sheet: "cp6-how-light-intensity-effect-photosynthesis.pdf",
    summary:
      "Explore light intensity using algal balls and hydrogencarbonate indicator.",
    apparatus:
      "Algal balls, capped bottles, hydrogencarbonate indicator, lamp, heat filter, ruler, foil, timer.",
    safety:
      "Wear eye protection. Keep water away from electrical equipment and avoid touching a hot lamp.",
    steps: [
      step(
        "Prepare equal samples",
        "Use equal numbers of algal balls and equal volumes of indicator in capped bottles. Note the initial colour.",
      ),
      step(
        "Include a dark control",
        "Wrap one bottle in foil to exclude light.",
        "Cover the control bottle",
      ),
      step(
        "Set the light conditions",
        "Position bottles at measured distances. Use a heat filter to reduce heating; control other conditions.",
        "Move the lamp to the marked position",
      ),
      step(
        "Allow time for change",
        "Expose the samples for an equal period; the reference sheet uses 60 minutes or longer. Time is abbreviated here.",
      ),
      step(
        "Compare the indicator",
        "Lower carbon dioxide shifts the indicator towards purple; higher carbon dioxide towards yellow. Compare against a colour standard and the dark control.",
      ),
    ],
    concept:
      "The indicator reflects net carbon dioxide change: photosynthesis removes CO₂ while respiration releases it. Colour alone is not a calibrated numerical photosynthesis rate.",
    question: "Why include a foil-covered bottle?",
    answers: [
      "To increase light intensity",
      "To compare with a sample kept in darkness",
      "To stop respiration",
    ],
    correct: 1,
    explanation:
      "The covered bottle provides a dark comparison. Respiration can still occur.",
  },
  {
    id: "respiration",
    ref: "8.11",
    title: "The quiet work of respiration",
    topic: "Respiration",
    icon: "flask",
    core: true,
    video: "iPbUCzkF_tk",
    sheet: "cp7-rate-of-respiration.pdf",
    summary: "See why oxygen uptake moves a liquid marker in a respirometer.",
    apparatus:
      "Respirometer, small organisms, control tube, soda lime separated by cotton wool, water bath, scale, timer.",
    safety:
      "Soda lime is corrosive: teacher preparation is required. Keep it separated from organisms, handle organisms gently and follow the school risk assessment.",
    steps: [
      step(
        "Prepare the apparatus",
        "Use a teacher-prepared tube with soda lime isolated by cotton wool.",
      ),
      step(
        "Add the organisms",
        "Place organisms above the barrier. Fit the bung and capillary; include a control without organisms.",
        "Fit the bung",
      ),
      step(
        "Equilibrate",
        "Place both tubes in the water bath. Allow five minutes to adjust in the reference method.",
      ),
      step(
        "Follow the marker",
        "Introduce coloured liquid, mark its starting position, then measure its movement over five minutes.",
      ),
      step(
        "Compare fairly",
        "Repeat at approved temperatures with a known, comparable mass of organisms. Use the control to interpret environmental pressure changes.",
      ),
    ],
    concept:
      "Oxygen uptake reduces gas volume when carbon dioxide is absorbed. Marker movement is an indirect measure and depends on an airtight apparatus.",
    question: "What is the soda lime for?",
    answers: [
      "Absorbing carbon dioxide",
      "Providing oxygen",
      "Feeding the organisms",
    ],
    correct: 0,
    explanation:
      "Removing carbon dioxide allows oxygen uptake to produce a measurable gas-volume change.",
  },
  {
    id: "fieldwork",
    ref: "9.5",
    title: "Read the living landscape",
    topic: "Quadrats & transects",
    icon: "frame",
    core: true,
    video: "ipTvsEVjuQQ",
    sheet: "cp8a-using-a-transect.pdf",
    summary: "Sample plants systematically along an environmental gradient.",
    apparatus:
      "Quadrat, tape measure, species guide, recording sheet and an appropriate abiotic sensor.",
    safety:
      "Follow the site risk assessment, avoid disturbing organisms and wash hands after fieldwork.",
    steps: [
      step(
        "Choose the gradient",
        "Lay a tape from one environmental condition to another, for example shade to open ground.",
      ),
      step(
        "Use a consistent sample",
        "Position the same quadrat at planned intervals along the tape.",
        "Place the quadrat at the next interval",
      ),
      step(
        "Record the plants",
        "Identify species and record abundance using a consistent counting or percentage-cover rule.",
      ),
      step(
        "Measure the environment",
        "Measure an abiotic factor at the sample positions. Repeat with further transects.",
      ),
      step(
        "Interpret the pattern",
        "Compare abundance with the environmental measurements. A correlation alone does not establish causation.",
      ),
    ],
    concept:
      "Systematic transects investigate change along a gradient. Random quadrats answer a different question: estimating abundance without choosing favourable locations.",
    question: "Why keep the quadrat area constant?",
    answers: [
      "To guarantee identical counts",
      "To make abundance comparisons fair",
      "To remove all environmental variation",
    ],
    correct: 1,
    explanation:
      "Different sample areas can change counts even if plant density is unchanged.",
  },
  {
    id: "food-tests",
    ref: "1.13B",
    title: "What’s in the sample?",
    topic: "Food tests",
    icon: "test-tube",
    core: false,
    video: "xFLuYKy3m1g",
    sheet: "cp3-testing-food.pdf",
    summary: "Distinguish the observations used in four food tests.",
    apparatus:
      "Separate samples, iodine, Benedict’s reagent, Biuret reagents, ethanol, water, tubes and a supervised water bath.",
    safety:
      "Eye protection is required. Ethanol is flammable; keep it away from flames. Alkali and hot water require supervised handling.",
    steps: [
      step(
        "Use separate samples",
        "Clean equipment between tests to prevent cross-contamination.",
      ),
      step(
        "Test for starch",
        "Add iodine to a sample. A blue-black change is a positive result.",
        "Add iodine",
      ),
      step(
        "Test reducing sugars",
        "Mix a separate aqueous sample with Benedict’s reagent and heat in a water bath. A coloured precipitate can indicate reducing sugars.",
      ),
      step(
        "Test for protein",
        "Use the Biuret test on another sample. A lilac or purple result indicates protein.",
      ),
      step(
        "Test for lipids",
        "Extract another sample with ethanol; add the clear extract to water. A cloudy white emulsion indicates lipids.",
      ),
    ],
    concept:
      "These are qualitative tests. Negative and positive controls help interpret colour changes. The preview shows positive examples, not results for an identified food.",
    question: "Which positive result indicates lipids in an emulsion test?",
    answers: ["Blue-black colour", "Cloudy white emulsion", "Purple colour"],
    correct: 1,
    explanation:
      "Lipids form a cloudy emulsion when the ethanol extract is added to water.",
  },
  {
    id: "antimicrobials",
    ref: "5.18B",
    title: "Where growth stops",
    topic: "Antimicrobial effects",
    icon: "circle",
    core: false,
    video: "Cl6EMg0zA-A",
    sheet: "cp5-investigating-the-effect-of-antibiotics.pdf",
    summary:
      "Interpret inhibition zones around discs on a prepared culture plate.",
    apparatus:
      "Teacher-prepared approved culture plate, test discs, control disc, sterile forceps and ruler.",
    safety:
      "School laboratory supervision only. Use approved organisms and aseptic procedures. Keep incubated plates closed; disposal is managed by trained staff.",
    steps: [
      step(
        "Start with a prepared plate",
        "This interpretation preview begins with a teacher-prepared plate; it does not teach culture preparation.",
      ),
      step(
        "Compare test and control discs",
        "Use labelled test discs and a suitable control. Keep disc size and conditions consistent.",
        "Position a test disc",
      ),
      step(
        "Incubation is teacher managed",
        "Follow the school-approved incubation protocol. The animation skips elapsed time, not safety procedures.",
      ),
      step(
        "Observe without opening",
        "View clear zones around discs through the closed plate.",
      ),
      step(
        "Measure and evaluate",
        "Compare zone diameters consistently. Replicate measurements; diffusion and dose affect zone size, so it is not a direct clinical ranking.",
      ),
    ],
    concept:
      "A clear zone indicates inhibited growth under the test conditions. This preview intentionally omits the preparation and incubation procedure pending full safety and video review.",
    question: "How should an incubated plate be observed?",
    answers: [
      "With its lid removed",
      "By touching the clear area",
      "Through the closed lid",
    ],
    correct: 2,
    explanation:
      "Keep the incubated plate closed and follow supervised disposal procedures.",
  },
].map((p) => ({
  ...p,
  ...notebook[p.id],
  version: 2,
  source: pearson,
  sheet: sheets + p.sheet,
  videoUrl: `https://www.youtube.com/watch?v=${p.video}`,
  review: "Reference-based preview · video check pending",
}));
