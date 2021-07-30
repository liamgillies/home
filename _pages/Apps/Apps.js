import { createLangTags, getLastUpdate, getStars, isDebug } from "../utils.js";

(async () => {
  let url;

  if (isDebug()) {
    url = "/tmp/apps.json";
  } else {
    url = "http://api.farazshaikh.com";
  }

  const colors = await (await fetch("/data/colors.json")).json();

  const container = document.querySelector("#apps .columns");
  const template = document.querySelector("template#Card");

  try {
    const { data: apps } = JSON.parse(await (await fetch(url)).text());

    apps.forEach(async (app) => {
      const card = template.content.cloneNode(true);

      const a_repo = card.querySelector("a.repo");
      const a_launch = card.querySelector("a.launch");
      const img = card.querySelector("img.main");
      const img_fallback = card.querySelector("img.fallback");
      const title = card.querySelector(".title");
      const type = card.querySelector(".type");
      const disc = card.querySelector(".subtitle");
      const langs = card.querySelector(".langs");
      const tech = card.querySelector(".tech");
      const time = card.querySelector(".time");
      const stars = card.querySelector(".stars");
      const archived = card.querySelector(".archived");
      const box = card.querySelector(".box");

      container.appendChild(card);

      title.textContent = app.name;
      disc.textContent = app.disc;
      type.textContent = app.type;

      const { repo } = app;
      const imgsrc = repo + "/raw/master/Assets/banner.png";

      const lang_tags = createLangTags(colors, app.lang, false, false);
      const tech_tags = createLangTags(colors, app.tech, false, true);

      langs.innerHTML = lang_tags;
      tech.innerHTML = tech_tags;

      if (app.archived) archived.textContent = "Archived";
      else archived.style.display = "none";

      time.textContent = await getLastUpdate(repo);
      stars.textContent = await getStars(repo);

      a_repo.setAttribute("href", repo);
      if (app.link) a_launch.setAttribute("href", app.link);
      else a_launch.style.display = "none";

      img.onload = img.setAttribute("src", imgsrc);
      img_fallback.setAttribute("src", `/assets/Apps/${app.name}.jpg`);

      box.style.opacity = 1;
    });
  } catch (error) {
    console.error(error);
  }
})();
