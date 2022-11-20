function calculate_age() {
  return Math.floor(
    (new Date().getTime() / 1000 - 1031087815) / 60 / 60 / 24 / 365
  );
}

/*
    Collects all valid imports using the config file and returns them in a list
*/
async function get_imports(config) {
  let files = [];

  let data = await (await fetch(`/imports/${config}`)).json();

  for (let i = 0; i < data.items.length; i++) {
    let res = await fetch(`/imports/${data.path}/${data.items[i]}`);

    if (res.status != 200) continue;

    let file = await res.text();

    files.push(file);
  }

  return files;
}

/*
    Injects imports retrieved from get_imports into an element based on ID
*/
async function load_imports(config, id) {
  let container = document.getElementById(id);
  let imports = await get_imports(config);

  imports.forEach((element) => {
    container.innerHTML += element;
  });
}
