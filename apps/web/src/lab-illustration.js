// Original vector artwork. Decorative overview, not an experimental procedure.
export function labIllustration() {
  const bubbles = (x, y) =>
    [0, 1, 2]
      .map(
        (n) =>
          `<circle class="lab-bubble bubble-${n}" cx="${x + n * 15}" cy="${y - n * 9}" r="${4 + n}" fill="white" opacity=".75"/>`,
      )
      .join("");
  return `<svg class="lab-illustration" viewBox="0 0 720 450" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="lab-halo"><stop stop-color="#bfe6e8"/><stop offset="1" stop-color="#eaf5ed" stop-opacity="0"/></radialGradient>
    <linearGradient id="lab-glass" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#d1efed" stop-opacity=".4"/></linearGradient>
    <clipPath id="round-flask"><path d="M400 171h29v54c53 29 43 108-15 108s-68-79-14-108Z"/></clipPath>
  </defs>
  <ellipse cx="369" cy="211" rx="310" ry="205" fill="url(#lab-halo)"/>
  <g class="lab-molecule" fill="none" stroke="#9bcdc9" stroke-width="2"><path d="m176 113 33-21 34 21v39l-34 20-33-20Z"/><circle cx="176" cy="113" r="6" fill="#e4f5ee"/><circle cx="243" cy="152" r="6" fill="#e4f5ee"/></g>
  <ellipse cx="357" cy="356" rx="312" ry="13" fill="#bbd5c9" opacity=".35"/>
  <path d="M44 349h623" stroke="#789d90" stroke-width="3" stroke-linecap="round"/>
  <!-- Microscope -->
  <g><path d="M111 326c104-3 109-133 47-155" fill="none" stroke="#74bcb8" stroke-width="24"/><path d="M83 335h113l10 13H73Z" fill="#438d89"/><path d="M132 287v48h43v-60Z" fill="#69b0a7"/><circle cx="160" cy="279" r="14" fill="#bfe1ce"/><path d="m143 149 20 9-34 76-33-14 33-73Z" fill="#f4e7bf"/><path d="m145 138 20 9-5 14-20-9Z" fill="#458e8a"/><path d="m108 231 16 7-6 14-16-7Z" fill="#559e9b"/><path d="M85 268h91" stroke="#53796d" stroke-width="8"/><rect x="112" y="260" width="36" height="5" rx="2" fill="#d7ebf0"/></g>
  <!-- Reagent rack -->
  <g stroke="#fffdf8" stroke-width="3">${[0, 1, 2].map((n) => `<path d="M${226 + n * 31} 252v75q10 16 20 0v-75" fill="url(#lab-glass)"/><path d="M${230 + n * 31} 278v47q6 10 12 0v-47Z" fill="${["#d78fae", "#accd74", "#76c2c5"][n]}" stroke="none"/>`).join("")}</g>
  <path d="M216 270h105M217 343h104M221 269v73m95-73v73" fill="none" stroke="#b7a987" stroke-width="5"/>
  <!-- Retort stand and round flask -->
  <path d="M468 123v222m-26 0h57M385 183h100" fill="none" stroke="#aaa78b" stroke-width="5" stroke-linecap="round"/><circle cx="468" cy="183" r="7" fill="#7f9b91"/>
  <path d="M400 171h29v54c53 29 43 108-15 108s-68-79-14-108Z" fill="url(#lab-glass)" stroke="#fffdf8" stroke-width="4"/>
  <g clip-path="url(#round-flask)"><path class="lab-liquid" d="M353 274q30-12 60 0t65 0v72H353Z" fill="#b4d779"/>${bubbles(396, 310)}</g>
  <path d="M390 241q-20 17-15 39" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/><rect x="395" y="166" width="39" height="8" rx="4" fill="#f5fcf5"/>
  <!-- Pink conical flask -->
  <path d="M337 253h18v28l23 46q7 16-12 16h-40q-17 0-10-16l21-46Z" fill="url(#lab-glass)" stroke="#fffdf8" stroke-width="3"/><path d="m328 309-10 23q-3 8 10 8h37q13 0 9-8l-12-23Z" fill="#d995b2"/>${bubbles(335, 332)}
  <!-- Turquoise flask -->
  <path d="M531 244h21v29q43 23 25 57-9 16-34 16t-33-16q-18-34 21-57Z" fill="url(#lab-glass)" stroke="#fffdf8" stroke-width="3"/><path d="M508 308q18-10 37 0t35 0q-1 35-36 35t-36-35Z" fill="#7dc8c9"/>${bubbles(527, 331)}
  <!-- Books and floating study card -->
  <g stroke-linejoin="round"><path d="M600 333h62v14h-62z" fill="#d69fba"/><path d="M588 314h72v17h-72z" fill="#a4c3a1"/><path d="M598 294h76v17h-76z" fill="#82bdc7"/><path d="M591 278h68v14h-68z" fill="#b6a4c4"/><path d="M606 316v19l6-4 6 4v-19" fill="#e8cc83"/></g>
  <g class="lab-study-card"><rect x="520" y="105" width="76" height="100" rx="5" fill="#fdfaf0" stroke="#bdaf9e" stroke-width="3"/><rect x="542" y="98" width="31" height="12" rx="3" fill="#d9a4b6"/><path d="m534 132 4 4 8-9m-12 29 4 4 8-9m-12 29 4 4 8-9" fill="none" stroke="#82aaa0" stroke-width="3"/><path d="M554 133h27m-27 24h27m-27 24h18" stroke="#d6d9c9" stroke-width="3"/></g>
  <g fill="#d9bc7c"><path d="M329 115v16m-8-8h16" stroke="#d9bc7c" stroke-width="2"/><circle cx="617" cy="237" r="4"/><circle cx="100" cy="296" r="3"/></g>
  </svg>`;
}
