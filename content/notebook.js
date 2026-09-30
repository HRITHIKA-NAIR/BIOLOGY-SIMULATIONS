// Independently written explanations after reviewing supplied PMT notes and Pearson sheets.
// Protocol variants are identified rather than silently combined.
export const notebook = {
  microscopy: {
    observations: [
      "A thin, flat specimen lets light pass through.",
      "The epidermis should lie flat, without folds.",
      "Lowering one edge first helps push air out.",
      "Start with low power: the field of view is wider.",
      "The cell wall and nucleus become easier to distinguish as focus improves.",
    ],
    notes: [
      "Mount a thin onion epidermis on a clean slide. The supplied notes use water followed by iodine; the Pearson sequence introduces iodine first. Both are mounting variants: follow one approved method consistently.",
      "Lower the coverslip at an angle and blot extra liquid. Air bubbles can obscure the specimen.",
      "Watch from the side when bringing the objective near the slide. Never let the objective touch the coverslip. At high power use fine focus, not coarse adjustment.",
      "Make a clear line drawing of what is visible, with labels and magnification. Onion bulb epidermis usually has no chloroplasts.",
      "Total magnification is eyepiece × objective. For image-size calculations, convert measurements to matching units before dividing.",
    ],
  },
  enzymes: {
    observations: [
      "Each well contains iodine for a separate sample.",
      "Buffer controls pH; temperature must also be controlled.",
      "Timing begins when starch meets amylase.",
      "Successive samples show whether starch is still detected.",
      "A shorter endpoint time means faster digestion under comparable conditions.",
    ],
    notes: [
      "Amylase breaks down starch. Iodine is an indicator of remaining starch, not a direct measurement of enzyme quantity.",
      "Use one approved protocol: the Pearson preview uses 2 cm³ amylase, 1 cm³ buffer and 2 cm³ starch. The supplied PMT notes use a different buffer volume and sampling interval; do not mix these schedules.",
      "Equilibrate reagents to the chosen water-bath temperature before mixing. Keep volumes, concentrations and sampling intervals consistent across pH values.",
      "Transfer a fresh sample to iodine at each interval. Do not add fresh starch at each sampling time: the PMT step cross-reference is an error.",
      "Record the first sample that remains yellow-brown, repeat each pH, calculate a mean endpoint time, and compare relative rate as 1/time in s⁻¹.",
    ],
  },
  osmosis: {
    observations: [
      "Equal dimensions help make the comparison fair.",
      "Record each piece’s own starting mass.",
      "Match each piece to its labelled concentration.",
      "Water crosses partially permeable membranes in both directions; net movement depends on the gradient.",
      "Blot consistently before comparing final and initial mass.",
    ],
    notes: [
      "Prepare equal-length potato cylinders or strips with similar surface area. Use the same potato source, solution volume, temperature and immersion time.",
      "Record each starting mass and place each piece into its assigned solution once. The supplied notes repeat the insertion instruction; it is not a second addition.",
      "After the agreed exposure, remove the pieces and blot them consistently. Surface liquid would distort the final mass.",
      "Percentage change = (final mass − initial mass) ÷ initial mass × 100. A change from 2.00 g to 2.20 g is +10%. Repeat each concentration and calculate means.",
      "Plot mean percentage mass change against concentration. The zero-change crossing estimates an isotonic concentration; it is an estimate subject to sampling and measurement error.",
    ],
  },
  photosynthesis: {
    observations: [
      "Equal algal samples start with the same indicator colour.",
      "Foil excludes light while respiration continues.",
      "Measured distance changes the light reaching each sample.",
      "A change in dissolved carbon dioxide gradually changes indicator colour.",
      "Purple means lower CO₂; yellow means higher CO₂. These colours are illustrative.",
    ],
    notes: [
      "This is the algal-ball and hydrogencarbonate-indicator method. It does not count oxygen bubbles from cut pondweed.",
      "Keep the algal quantity, indicator volume, starting conditions, temperature and exposure period consistent. Include a dark comparison and measure lamp distances.",
      "The supplied notes use a 30-minute exposure; the Pearson sheet uses 60 minutes or longer. These are protocol variants. The short animation does not represent a real waiting time.",
      "Photosynthesis removes CO₂ and respiration releases it. Indicator colour reflects the net balance: lower CO₂ shifts towards purple, higher CO₂ towards yellow.",
      "Do not turn colour observations into bubble counts or a precise rate without calibration. Relative light intensity can be approximated by 1/d² for a suitable source and geometry; this is not itself a measured photosynthesis rate.",
    ],
  },
  respiration: {
    observations: [
      "A barrier prevents organisms contacting the CO₂ absorbent.",
      "The bung and connections must be airtight for measurement.",
      "Allow apparatus and organisms to reach the set temperature.",
      "The marker moves towards the organisms as oxygen is taken up.",
      "Use a control and repeat readings to evaluate the result.",
    ],
    notes: [
      "A respirometer measures gas-volume change. CO₂ absorbent removes respiratory CO₂ so oxygen uptake can be inferred from marker displacement.",
      "Keep the absorbent physically separated from organisms. Temperature changes and leaks can move the marker independently of respiration.",
      "After equilibration, note the starting position and record displacement at consistent intervals. Use a control to assess environmental effects.",
      "For a uniform capillary, volume change = cross-sectional area × displacement. Volume uptake rate = volume change ÷ elapsed time.",
      "To compare different masses, divide the uptake rate by organism mass, for example cm³ min⁻¹ g⁻¹. The supplied notes’ final formula omits time; volume divided only by mass is not a rate.",
    ],
  },
  fieldwork: {
    observations: [
      "A transect follows an environmental gradient.",
      "Place the same quadrat at predetermined intervals.",
      "Count the chosen species using a consistent boundary rule.",
      "Measure the abiotic factor at the same sampling positions.",
      "Compare patterns without assuming that correlation proves a cause.",
    ],
    notes: [
      "For a population estimate, generate random coordinate pairs, place a quadrat at each location and count the target species. Avoid selecting visibly busy patches.",
      "Estimated population = mean count per quadrat × total area ÷ quadrat area. Use the same units for both areas and take enough independent samples.",
      "For a gradient investigation, lay a transect from one condition to another and sample at fixed intervals. The supplied notes call this continuous but describe interrupted systematic sampling.",
      "Record an abiotic variable such as light intensity alongside abundance. Repeat transects and keep quadrat size, identification and boundary-counting rules consistent.",
      "Use the method selector to watch either systematic transect sampling or random quadrats. They answer different questions and have separate sequences.",
    ],
  },
  "food-tests": {
    observations: [
      "Use separate samples and clean equipment for each test.",
      "A blue-black iodine result indicates starch.",
      "Benedict’s needs a hot water bath; a precipitate may form.",
      "The Biuret test gives a lilac or purple positive result.",
      "Adding the ethanol extract to water can produce a cloudy white emulsion.",
    ],
    notes: [
      "Test separate samples with suitable positive and negative controls. These animations show possible positive observations, not measured results from a named food.",
      "Iodine changes from yellow-brown to blue-black when starch is detected.",
      "Heat the Benedict’s mixture in a supervised water bath. Depending on the amount of reducing sugar, the observation can range from green or yellow through orange to brick-red precipitate; not every positive sample is brick red.",
      "A Biuret positive is lilac or purple. Follow the approved reagent method; alkali and copper-containing solutions require appropriate handling.",
      "For lipids, mix with ethanol and add the clear extract to water. A cloudy white emulsion is positive. Keep ethanol away from flames; do not heat the ethanol sample.",
    ],
  },
  antimicrobials: {
    observations: [
      "The dish represents an approved, teacher-prepared plate.",
      "Test discs are compared with a suitable control.",
      "The waiting period is shortened in the animation.",
      "Clear zones indicate growth inhibition under these conditions.",
      "Measure through the closed lid; the drawing is not a measurement scale.",
    ],
    notes: [
      "This preview explains observations from a prepared plate. Preparation, incubation and disposal remain governed by the school-approved protocol.",
      "Compare labelled test discs with an appropriate control, keeping disc size and other conditions consistent.",
      "Observe incubated plates through the closed lid. Clear zones indicate inhibited visible growth; they do not by themselves prove that every cell has been killed.",
      "Measure two perpendicular zone diameters and take their mean. If estimating a circular area, use radius = mean diameter ÷ 2, then area = πr². State whether the disc itself is included.",
      "Repeat comparisons. Zone size also depends on diffusion, concentration and organism susceptibility; it is not a direct ranking of clinical effectiveness.",
    ],
  },
};
