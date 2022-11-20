async function get_config() {
  let res = await fetch(
    "https://raw.githubusercontent.com/Wyliemaster/GD-Bugs/main/config.json"
  );

  if (res.status != 200) return NULL;

  let file = await res.text();

  return file;
}

async function fetch_bugs() {
  let config = JSON.parse(await get_config());
  let data = [];

  for (let i = 0; i < config.files.length; i++) {
    const item = config.files[i];

    let res = await fetch(
      `https://raw.githubusercontent.com/Wyliemaster/GD-Bugs/main/bugs/${item}.gdp`
    );

    if (res.status != 200) return null;

    let file = await res.text();

    data.push(file);
    // dont want to risk rate limiting
    setTimeout(50);
  }

  return data;
}

async function load_files() {
  let bugs = await fetch_bugs();

  for (let i = 0; i < bugs.length; i++) {
    create_btn(bugs[i], i);
  }
}

function parse_file(bug, i = -1) {
  let regex = /\[.*?](.*?)\[\/.*?\]/gms;
  const data = [...bug.matchAll(regex)];

  let details = null;
  let fix = null;

  let title = data[0][1];
  let desc = data[1][1];

  if (data[2]) fix = data[2][1];

  if (data[3]) details = data[3][1];

  let btn = `<div class="bug-btn" onclick="show_popup(${i + 1})">
            <bug-title><u>${title}</u></bug-title>
            <bug-desc>${desc}</bug-desc>
        </div>`;

  let details_section = details
    ? `<u><b>Bug Details</b></u> <br><bug-details>${details}</bug-details>`
    : "";
  let fixes_section = fix
    ? `<u><b>Fixes</b></u><br><bug-fix>${fix}</bug-fix>`
    : "<big-fix>There are no Known Fixes</bug-fix>";
  // add hidden popup

  let popup = `<div class="bug-popup" id="bug-popup-${
    i + 1
  }" onclick="hide_popup(${i + 1})">
            <bug-title><u>${title}</u></bug-title>
            ${fixes_section}
            ${details_section}
        </div>`;

  return [btn, popup];
}

function show_popup(id) {
  let popup = document.getElementById("bug-popup-" + id);
  popup.style.transition = "all 0.5s, z-index 0s";
  popup.style.scale = 1;

  let shadow = document.getElementById("shadow");
  shadow.style.visibility = "visible";
}

function hide_popup(id) {
  let popup = document.getElementById("bug-popup-" + id);
  popup.style.transition = "all 0.5s, z-index 0s";
  popup.style.scale = 0;

  let shadow = document.getElementById("shadow");
  shadow.style.visibility = "hidden";
}

function create_btn(bug, i = -1) {
  let container = document.getElementById("bug-container");

  let file = parse_file(bug, i);

  container.innerHTML += file[0];
  document.body.innerHTML += file[1];
}
