const projects = {
  "soft-robot": {
    kicker: "Soft robotics · Pneumatic control",
    title: "Soft Robot Control Panel",
    subtitle: "A pressure-feedback control system for a four-chamber soft robot arm.",
    overview:
      "This project focused on designing a pneumatic actuation and control panel that could regulate a soft robotic arm through sensor feedback, valve control, and real-time PID tuning.",
    tools: ["C/C++", "Python", "Arduino MEGA", "Pressure sensors", "Flow control valves", "PID control"],
    details: [
      "Designed the pneumatic system architecture for a four-chamber soft robot arm.",
      "Integrated pressure sensors and flow control valves for closed-loop feedback.",
      "Implemented PID control for real-time pressure regulation and adaptive tuning.",
      "Improved pneumatic control efficiency by 45% through feedback-based tuning.",
      "Connects to soft robotics research on distributed strain sensing and shape reconstruction.",
    ],
    note:
      "Related publication: Model-based 3D shape reconstruction of soft robots via distributed strain sensing, Soft Robotics 12(6), 2025.",
  },
  "autonomous-rover": {
    kicker: "Autonomous navigation · Competition build",
    title: "Autonomous Rover Robot",
    subtitle: "A GPS-localized rover using suspension design, path planning, and heading control.",
    overview:
      "The rover project combined mechanical design, localization, and autonomous navigation for a robust mobile platform built around an inverse double-lambda suspension mechanism.",
    tools: ["C/C++", "Python", "NEO-8M GPS", "A* path planning", "Pure Pursuit", "Mechanical design"],
    details: [
      "Constructed an autonomous rover around an inverse double-lambda suspension mechanism.",
      "Integrated a NEO-8M GPS module for continuous localization.",
      "Implemented A* path planning for route generation.",
      "Used Pure Pursuit for precise heading control and navigation behavior.",
      "Placed 2nd nationally out of 150 teams in Robofest 3.0.",
      "Received $12K funding and filed a provisional patent for the rover design.",
    ],
    note:
      "This project is where the prize, funding, and patent context belongs: detailed enough for interested readers without crowding the homepage.",
  },
  bfmc: {
    kicker: "Autonomous mobility · Bosch Future Mobility Challenge",
    title: "Bosch Future Mobility Challenge",
    subtitle: "A global autonomous mobility challenge focused on vehicle behavior and navigation.",
    overview:
      "The BFMC project centered on developing autonomous mobility behavior in a competition setting, balancing perception, navigation, and reliable vehicle response.",
    tools: ["Autonomous navigation", "Perception", "Control systems", "Team engineering", "Debugging"],
    details: [
      "Built autonomous mobility functionality for the 6th edition of the Bosch Future Mobility Challenge.",
      "Worked in a global competition environment with iterative development, debugging, and testing.",
      "Focused on reliable navigation behavior and competition-readiness.",
      "Ranked 21st globally among 118 teams.",
    ],
    note:
      "The competition standing is intentionally shown inside the project detail view so the homepage remains calm and professional.",
  },
};

const dialog = document.querySelector("[data-project-dialog]");
const backdrop = document.querySelector("[data-dialog-backdrop]");
const closeButton = document.querySelector("[data-dialog-close]");
const title = document.querySelector("[data-dialog-title]");
const subtitle = document.querySelector("[data-dialog-subtitle]");
const overview = document.querySelector("[data-dialog-overview]");
const kicker = document.querySelector("[data-dialog-kicker]");
const tools = document.querySelector("[data-dialog-tools]");
const details = document.querySelector("[data-dialog-details]");
const note = document.querySelector("[data-dialog-note]");
let activeTrigger = null;

function setHidden(element, hidden) {
  if (!element) return;
  element.hidden = hidden;
  element.setAttribute("aria-hidden", String(hidden));
}

function openProject(projectId, trigger) {
  const project = projects[projectId];
  if (!project || !dialog || !backdrop) return;

  activeTrigger = trigger;
  kicker.textContent = project.kicker;
  title.textContent = project.title;
  subtitle.textContent = project.subtitle;
  overview.textContent = project.overview;
  tools.innerHTML = project.tools.map((tool) => `<span>${tool}</span>`).join("");
  details.innerHTML = project.details.map((item) => `<li>${item}</li>`).join("");
  note.textContent = project.note;

  setHidden(backdrop, false);
  setHidden(dialog, false);
  document.body.classList.add("dialog-open");
  closeButton?.focus();
}

function closeProject() {
  if (!dialog || !backdrop) return;

  setHidden(dialog, true);
  setHidden(backdrop, true);
  document.body.classList.remove("dialog-open");

  if (activeTrigger) {
    activeTrigger.focus();
    activeTrigger = null;
  }
}

function handleProjectCardActivation(event) {
  const card = event.currentTarget;
  const projectId = card.getAttribute("data-project");
  openProject(projectId, card);
}

function handleProjectCardKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  handleProjectCardActivation(event);
}

function handleImageFallback(image) {
  image.classList.add("is-missing");
  image.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", handleProjectCardActivation);
  card.addEventListener("keydown", handleProjectCardKeydown);
});

document.querySelectorAll("[data-optional-image]").forEach((image) => {
  if (image.complete && image.naturalWidth === 0) {
    handleImageFallback(image);
  }
  image.addEventListener("error", () => handleImageFallback(image), { once: true });
});

closeButton?.addEventListener("click", closeProject);
backdrop?.addEventListener("click", closeProject);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dialog && !dialog.hidden) {
    closeProject();
  }
});

const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.site-nav a[href="#${id}"]`);
        if (entry.isIntersecting && link) {
          navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
}
