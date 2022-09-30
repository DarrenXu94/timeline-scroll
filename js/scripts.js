let stickyTop = 0,
  scrollTarget = false;

let timeline = document.querySelector(".timeline__nav");
let items = document.querySelectorAll(".timeline__nav li");
let milestones = document.querySelectorAll(".timeline__section .milestone");
const offsetTop = parseInt(timeline.offsetTop);

const TIMELINE_VALUES = {
  start: 190,
  step: 30,
};

const updateYear = () => {
  let viewLine = window.scrollY + window.innerHeight / 3,
    active = -1;

  if (scrollTarget === false) {
    for (let milestone of milestones) {
      if (milestone.offsetTop - viewLine > 0) {
        continue;
      }
      active++;
    }
  } else {
    active = scrollTarget;
  }

  timeline.style.top =
    -1 * active * TIMELINE_VALUES.step + TIMELINE_VALUES.start + "px";

  items.forEach((item) => item.classList.remove("active"));
  items.forEach((item, idx) => active === idx && item.classList.add("active"));
};

// window.addEventListener("scroll", updateYear);

items.forEach((item, idx) => {
  item.addEventListener("click", () => {
    const milestone = milestones[idx];
    milestone.scrollIntoView({ behavior: "smooth" });
  });
});

let options = {
  rootMargin: "0px 0px -55% 0px",
  threshold: 0.9,
};

function observerCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //do something
      updateYear();
    }
  });
}

let observer = new IntersectionObserver(observerCallback, options);

for (let i = 0; i < milestones.length; i++) {
  observer.observe(milestones[i]);
}
