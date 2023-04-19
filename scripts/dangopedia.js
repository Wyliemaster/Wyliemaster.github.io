async function fetch_dangopedia()
{
    let data = await (await fetch(`dangopedia.json`)).json();
    return data;
}

async function load_dangopedia()
{
    let dango = await fetch_dangopedia();
    let page = '';

    for (const key in dango) {
        page += `<details><summary class="dango-title">${key}</summary>`

        let lines = dango[key];

        for (let i = 0; i < lines.length; i++) {
            page += `<label class="dango-line">${lines[i]}</label><br>`
            
        }
        page += `</details>`
    }

    document.getElementById("dangopedia").innerHTML += page;
}