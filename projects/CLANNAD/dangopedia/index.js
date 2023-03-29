async function load_dangopedia()
{
    let last_block = 0
    let current_block = 0
    
    let content = '';

    let data = await (await fetch(`/projects/CLANNAD/dangopedia/Dangopedia.txt`)).text();

    let lines = data.split("\r\n");


    for (let i = 0; i < lines.length; i++) {
        
        if (lines[i].match(/^\d\d/))
        {
            if (current_block != last_block)
            {
                content += `</dango_container>`
                current_block = last_block
            }

            content += `<dango_title>${lines[i]}</dango_title><br>`;

            content += `<dango_container>`;

            current_block ++;
        }

        else
        {
            content += `${lines[i]}<br>`;
        }
    }

    document.body.innerHTML += content;

}
