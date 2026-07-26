const projects = {
  "soft-robot": {
    kicker: "Soft robotics · Pneumatic control",
    title: "Soft Robot Control Panel",
    subtitle: "A pressure-feedback control system for a four-chamber soft robot arm.",
    overview:
      "I designed this control panel to make a soft robot arm easier to regulate and test. The system used pressure feedback, valve control, and real-time PID tuning instead of guesswork.",
    tools: ["C/C++", "Python", "Arduino MEGA", "Pressure sensors", "Flow control valves", "PID control"],
    details: [
      "Designed the pneumatic architecture for a four-chamber soft robot arm.",
      "Integrated pressure sensors and flow control valves for closed-loop feedback.",
      "Implemented PID control for real-time pressure regulation and adaptive tuning.",
      "Improved pneumatic control efficiency by 45% through feedback-based tuning.",
      "Connected the build to soft robotics research on strain sensing and shape reconstruction.",
    ],
    note:
      "Related publication: Model-based 3D shape reconstruction of soft robots via distributed strain sensing, Soft Robotics 12(6), 2025.",
    code: {
      label: "View code on GitHub",
      url: "https://github.com/USCzhaolab/PINN-based-Shape-Reconstruction-of-Soft-Robots/tree/vision_tracking/Camera-based-motion-tracking-marker-tracker",
    },
    pdf: {
      label: "View PDF documentation",
      url: "https://drive.google.com/file/d/1J7EDSH7Ij7155wrqOTuC3uVODx_88WTB/view?usp=sharing",
    },
    images: [
      {
        src: "assets/projects/soft-robot/grasping.png",
        alt: "Soft robot grasping motion",
        caption: "Grasping motion",
        scale: 0.68,
      },
      {
        src: "assets/projects/soft-robot/bending.png",
        alt: "Soft robot bending motion",
        caption: "Bending motion",
      },
      {
        src: "assets/projects/soft-robot/twisting.png",
        alt: "Soft robot twisting motion",
        caption: "Twisting motion",
      },
    ],
  },
  "autonomous-rover": {
    kicker: "Autonomous navigation · Competition build",
    title: "Autonomous Rover Robot",
    subtitle: "A GPS-localized rover using suspension design, path planning, and heading control.",
    overview:
      "This rover brought together mechanical design, localization, and autonomous navigation. The fun part was making the suspension, GPS, path planning, and control logic all behave as one system.",
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
      "This project placed 2nd nationally out of 150 teams, received $12K in funding, and led to a provisional patent filing for the rover design.",
    images: [
      {
        src: "assets/projects/autonomous-rover/chassis.png",
        alt: "Autonomous rover chassis",
        caption: "Rover chassis",
      },
      {
        src: "assets/projects/autonomous-rover/prototype.png",
        alt: "Autonomous rover prototype build",
        caption: "Prototype build",
      },
      {
        src: "assets/projects/autonomous-rover/prize.png",
        alt: "Autonomous rover competition prize",
        caption: "Competition prize",
      },
    ],
  },
  bfmc: {
    kicker: "Autonomous mobility · Bosch Future Mobility Challenge",
    title: "Bosch Future Mobility Challenge",
    subtitle: "A global autonomous mobility challenge focused on vehicle behavior and navigation.",
    overview:
      "This project was about building autonomous mobility behavior in a competition setting, where the vehicle had to make good decisions consistently under real testing pressure.",
    tools: ["Autonomous navigation", "Perception", "Control systems", "Team engineering", "Debugging"],
    details: [
      "Built autonomous mobility functionality for the 6th edition of the Bosch Future Mobility Challenge.",
      "Worked in a global competition environment with iterative development, debugging, and testing.",
      "Focused on reliable navigation behavior and competition-readiness.",
      "Ranked 21st globally among 118 teams.",
    ],
    note:
      "I keep the ranking here instead of leading with it because the engineering work matters more than the scoreboard.",
    code: {
      label: "View code on GitHub",
      url: "https://github.com/Vedanshee03/BFMC_Bosch_Code",
    },
    images: [
      {
        src: "assets/projects/bfmc/holding-demo-vehicle.png",
        alt: "Vedanshee holding the BFMC demo vehicle",
        caption: "With the demo vehicle",
        scale: 0.68,
      },
      {
        src: "assets/projects/bfmc/teamwork.png",
        alt: "BFMC team working together",
        caption: "Team collaboration",
      },
      {
        src: "assets/projects/bfmc/competition.png",
        alt: "BFMC team on demo day",
        caption: "BFMC - demo day",
      },
    ],
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
const gallerySection = document.querySelector("[data-dialog-gallery-section]");
const gallery = document.querySelector("[data-dialog-gallery]");
const codeSection = document.querySelector("[data-dialog-code-section]");
const codeLink = document.querySelector("[data-dialog-code]");
const pdfSection = document.querySelector("[data-dialog-pdf-section]");
const pdfLink = document.querySelector("[data-dialog-pdf]");
let activeTrigger = null;

function setHidden(element, hidden) {
  if (!element) return;
  element.hidden = hidden;
  element.setAttribute("aria-hidden", String(hidden));
}

function getImageFallback(image) {
  const sibling = image.nextElementSibling;
  return sibling?.classList.contains("image-fallback") ? sibling : null;
}

function handleImageFallback(image) {
  image.classList.add("is-missing");
  image.setAttribute("aria-hidden", "true");

  const fallback = getImageFallback(image);
  if (fallback) {
    fallback.hidden = false;
  }
}

function setupOptionalImage(image) {
  image.classList.add("is-missing");
  image.setAttribute("aria-hidden", "true");

  const revealImage = () => {
    if (image.naturalWidth > 0) {
      image.classList.remove("is-missing");
      image.removeAttribute("aria-hidden");

      const fallback = getImageFallback(image);
      if (fallback) {
        fallback.hidden = true;
      }
    }
  };

  image.addEventListener("load", revealImage, { once: true });
  image.addEventListener("error", () => handleImageFallback(image), { once: true });

  if (image.complete) {
    revealImage();
  }
}

function renderProjectGallery(images) {
  if (!gallery || !gallerySection) return;

  gallery.innerHTML = "";

  if (!images?.length) {
    setHidden(gallerySection, true);
    return;
  }

  setHidden(gallerySection, false);

  images.forEach(({ src, alt, caption, scale }) => {
    const item = document.createElement("figure");
    item.className = "dialog-gallery-item";

    const shell = document.createElement("div");
    shell.className = "image-shell dialog-gallery-image";

    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.setAttribute("data-optional-image", "");

    if (scale) {
      image.classList.add("dialog-gallery-image-scaled");
      image.style.setProperty("--gallery-image-scale", scale);
    }

    const fallback = document.createElement("div");
    fallback.className = "image-fallback";
    fallback.innerHTML = `<span>Add project photo</span><small>${src}</small>`;

    shell.appendChild(image);
    shell.appendChild(fallback);
    item.appendChild(shell);

    if (caption) {
      const captionEl = document.createElement("figcaption");
      captionEl.textContent = caption;
      item.appendChild(captionEl);
    }

    setupOptionalImage(image);

    gallery.appendChild(item);
  });
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
  renderProjectGallery(project.images);

  if (codeSection && codeLink) {
    if (project.code?.url) {
      codeLink.href = project.code.url;
      codeLink.textContent = project.code.label || "View code on GitHub";
      setHidden(codeSection, false);
    } else {
      codeLink.removeAttribute("href");
      codeLink.textContent = "";
      setHidden(codeSection, true);
    }
  }

  if (pdfSection && pdfLink) {
    if (project.pdf?.url) {
      pdfLink.href = project.pdf.url;
      pdfLink.textContent = project.pdf.label || "View PDF";
      setHidden(pdfSection, false);
    } else {
      pdfLink.removeAttribute("href");
      pdfLink.textContent = "";
      setHidden(pdfSection, true);
    }
  }

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
  if (event.target.closest("a")) return;
  const card = event.currentTarget;
  const projectId = card.getAttribute("data-project");
  openProject(projectId, card);
}

function handleProjectCardKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  handleProjectCardActivation(event);
}

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", handleProjectCardActivation);
  card.addEventListener("keydown", handleProjectCardKeydown);
});

document.querySelectorAll("[data-optional-image]").forEach((image) => {
  setupOptionalImage(image);
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

const funCarousel = document.querySelector("[data-fun-carousel]");

if (funCarousel) {
  const track = funCarousel.querySelector("[data-fun-carousel-track]");
  const prevButton = funCarousel.querySelector("[data-fun-carousel-prev]");
  const nextButton = funCarousel.querySelector("[data-fun-carousel-next]");
  const cards = track ? [...track.children] : [];
  let activeIndex = 0;

  function getVisibleCount() {
    const styles = getComputedStyle(funCarousel);
    const visible = Number.parseInt(styles.getPropertyValue("--fun-visible"), 10);
    return Number.isFinite(visible) && visible > 0 ? visible : 1;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  function updateFunCarousel() {
    if (!track || cards.length === 0) return;

    activeIndex = Math.min(activeIndex, getMaxIndex());

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    track.style.transform = `translateX(-${activeIndex * (cardWidth + gap)}px)`;

    if (prevButton) prevButton.disabled = activeIndex === 0;
    if (nextButton) nextButton.disabled = activeIndex >= getMaxIndex();
  }

  prevButton?.addEventListener("click", () => {
    activeIndex = Math.max(0, activeIndex - 1);
    updateFunCarousel();
  });

  nextButton?.addEventListener("click", () => {
    activeIndex = Math.min(getMaxIndex(), activeIndex + 1);
    updateFunCarousel();
  });

  window.addEventListener("resize", updateFunCarousel);
  updateFunCarousel();
}
