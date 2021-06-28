import particlesMain from "/index/particles/main.js";
import submarineMain from "/index/submarine/main.js";
import airplaneMain from "/index/airplane/main.js";
import { createLangTags, getTimeSince, isDebug } from "/pages/utils.js";

function deviceType() {
  if (window.innerWidth <= 800) return "mobile";
  else if (window.innerWidth <= 1024) return "tablet";
  else return "desktop";
}

function attachScripts() {
  setTimeout(() => {
    airplaneMain();
    particlesMain();

    if (deviceType() === "desktop") {
      submarineMain();
    }
  }, 100);
}

function reveal() {
  document.querySelector(".index-container").style.display = "block";
  const loader = document.querySelector(".loading-overlay");
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.remove();
  }, 200);
}

attachScripts();

(async () => {
  let colors = await (await fetch("/colors.json")).json();

  if (deviceType() !== "mobile") {
    const b = document.querySelectorAll("#page-1 .button-title");
    b[0].textContent = "Blog";
    b[1].textContent = "LinkedIN";
    b[2].textContent = "GitHub";
  }

  {
    const knownlangs = ["JavaScript", "TypeScript", "GLSL", "C", "C++", "HTML", "CSS", "SCSS", "Shell", "Python", "Java", "Assembly", "Liquid"];
    document.querySelector("#page-2 .langs").innerHTML = createLangTags(knownlangs, colors, true).join("\n") + "\n<br /><br />";
  }
  {
    const knownlangs = ["React", "React Native", "ThreeJS", "Regl", "Git", "GitHub Actions", "GitLab CI", "Jekyll"];
    document.querySelector("#page-2 .frameworks").innerHTML = createLangTags(knownlangs, colors, true, true).join("\n") + "\n<br /><br />";
  }

  const buttons = document.querySelectorAll("footer .button");
  const tooltip = document.querySelector("#tooltip");

  const txt = ["Go to Paypal", "Click to ETH address", "Click to BTC address", "GitHub", "LinkedIn", "Blog", "Artwork", "Reddit", "farazzshaikh@gmail.com"];

  const addr = ["Thanks!", "0x1A12e003D805e39f73Dd1596eeAFDfde79Ce61D2", "17qLgjRrRQy6vy3WBzHdcnApCYQ98gVQZh"];

  let popperInstance = [];
  buttons.forEach((button, i) => {
    popperInstance.push(
      Popper.createPopper(button, tooltip, {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      })
    );

    const showEvents = ["mouseenter", "focus"];
    const hideEvents = ["mouseleave", "blur"];

    button.addEventListener("mousedown", () => {
      navigator.clipboard.writeText(addr[i]);
      show(i, "Thank You!");
    });

    showEvents.forEach((event) => {
      button.addEventListener(event, () => {
        show(i);
      });
    });

    hideEvents.forEach((event) => {
      button.addEventListener(event, () => {
        hide(i);
      });
    });
  });

  function show(ind, t) {
    tooltip.setAttribute("data-show", "");
    tooltip.textContent = t || txt[ind];
    popperInstance[ind].update();
  }

  function hide(ind) {
    tooltip.removeAttribute("data-show");
  }

  reveal();
})();
