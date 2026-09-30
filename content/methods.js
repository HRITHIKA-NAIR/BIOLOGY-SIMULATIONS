const step = (title, text, action = null) => ({
  title,
  text,
  action,
  duration: 11,
});
export const methodChoices = {
  fieldwork: [
    { id: "transect", label: "Systematic transect" },
    { id: "random", label: "Random quadrats" },
  ],
  microscopy: [
    { id: "onion", label: "Prepare an onion slide" },
    { id: "prepared", label: "Observe a prepared slide" },
  ],
};
export function withMethod(base, method) {
  const selected =
    methodChoices[base.id]?.find((x) => x.id === method)?.id ||
    methodChoices[base.id]?.[0].id ||
    "default";
  const lesson = { ...base, method: selected };
  if (base.id === "fieldwork" && selected === "random")
    return {
      ...lesson,
      version: 21,
      steps: [
        step(
          "Define the sampling area",
          "Mark two perpendicular axes to locate sampling positions. Decide which plant species to count.",
        ),
        step(
          "Generate random coordinates",
          "Choose coordinate pairs before looking at the plants. This avoids selecting patches that appear more populated.",
        ),
        step(
          "Place the quadrat",
          "Move the quadrat to the chosen coordinate. Use the same quadrat area and a consistent rule for plants on the boundary.",
          "Place the quadrat at the random coordinate",
        ),
        step(
          "Repeat independent samples",
          "Record the count, then move to the next randomly chosen coordinate. Repeat enough times to represent the area.",
        ),
        step(
          "Estimate population size",
          "Calculate the mean count per quadrat. Multiply by total area divided by quadrat area. This is an estimate, not a census.",
        ),
      ],
      observations: [
        "The area must have clear boundaries.",
        "Coordinates are selected independently of plant abundance.",
        "Count only the target species within the sampling rule.",
        "The quadrat travels between different sample locations.",
        "Mean count × total area ÷ quadrat area gives the estimate.",
      ],
    };
  if (base.id === "microscopy" && selected === "prepared")
    return {
      ...lesson,
      version: 22,
      steps: [
        step(
          "Choose a prepared slide",
          "Read the label and handle the glass by its edges. This method begins with a specimen that is already mounted.",
        ),
        step(
          "Secure the slide",
          "Place the prepared slide on the stage and secure it with the stage clips.",
          "Place the prepared slide on the stage",
        ),
        step(
          "Locate at low power",
          "Select the lowest-power objective. Watch from the side while positioning it near the slide, without touching the glass.",
        ),
        step(
          "Bring the image into focus",
          "Focus carefully at low power. Move to higher power only after locating the specimen, and use fine focus there.",
        ),
        step(
          "Record the observation",
          "Draw and label what you can actually see. Record total magnification and identify the specimen from its label.",
        ),
      ],
      observations: [
        "No staining or coverslip preparation is needed here.",
        "The slide moves onto the stage.",
        "Low power gives a wider field of view.",
        "Fine adjustment gradually sharpens the image.",
        "This example shows a prepared onion epidermis slide; other specimens look different.",
      ],
    };
  return lesson;
}
