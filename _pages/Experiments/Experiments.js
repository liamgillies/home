import { createLangTags, getLastUpdate, getStars, isDebug } from "../utils.js";

(async () => {
  let url;

  if (isDebug()) {
    url = "/tmp/experiments.json";
  } else {
    url = "http://api.farazshaikh.com/experiments";
  }

  const colors = await (await fetch("/data/colors.json")).json();

  const container = document.querySelector("#experiments .columns");
  const template = document.querySelector("template#Card");

  try {
    const { data: apps } = JSON.parse(await (await fetch(url)).text());

    apps.forEach((app) => {
      const card = template.content.cloneNode(true);

      const a_repo = card.querySelector("a.repo");
      const a_launch = card.querySelector("a.launch");
      const a_blog = card.querySelector("a.blog");
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
      if (app.type) type.textContent = app.type;
      else type.style.display = "none";

      time.style.display = "none";
      stars.style.display = "none";

      const { repo } = app;
      const imgsrc = repo.replace("tree", "raw") + "/Assets/banner.jpg";

      const lang_tags = createLangTags(colors, app.lang, false);
      const tech_tags = createLangTags(colors, app.tech, false);

      langs.innerHTML = lang_tags;
      tech.innerHTML = tech_tags;

      if (app.archived) archived.textContent = "Archived";
      else archived.style.display = "none";

      a_repo.setAttribute("href", repo);
      if (app.link) a_launch.setAttribute("href", app.link);
      else a_launch.style.display = "none";
      if (app.blog) a_blog.setAttribute("href", app.blog);
      else a_blog.style.display = "none";

      img.onload = img.setAttribute("src", imgsrc);
      img_fallback.setAttribute("src", `/assets/Experiments/${app.name}.jpg`);

      box.style.opacity = 1;
    });
  } catch (error) {
    console.error(error);
  }
})();
