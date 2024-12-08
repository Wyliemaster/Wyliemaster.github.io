let count = 0;
let max = 0;
function make_grid()
{
    const rows = document.getElementsByClassName("bingo-grid-row");
    
    console.log(rows)

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        for (let j = 0; j < row.children.length; j++) {
            const square = row.children[j];
            max++;
            find_content(i, j).then((word) => {
                square.innerHTML = word
            })
        }
    }

    document.getElementById("counter").innerHTML = `${count} / ${max}`
}
function find_content(x, y) {
    const id = (x * 5) + y + 1;

    // Return a Promise that resolves once the CSV fetch is complete
    return new Promise((resolve, reject) => {
        fetch("bingo.csv")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.text();
            })
            .then((text) => {
                // Split the CSV into rows
                const rows = text.split("\n").map((row) => row.trim());
    
                // Extract the first and second rows
                const firstRow = rows[0].split(",").map((word) => word.trim());
                const secondRow = rows[1].split(",").map((word) => word.trim());
    
                // Pick a random word from each row
                const randomWordFromFirstRow = getRandomWord(firstRow);
                const randomWordFromSecondRow = getRandomWord(secondRow);
    
                // Apply your custom logic to select a word to return
                let result = randomWordFromFirstRow; // Example: you can apply your custom logic here

                if (id == 13) result = `<b>${randomWordFromSecondRow}</b><br>Free Square`
    
                // Resolve the promise with the selected result
                resolve(result);
            })
            .catch((error) => {
                console.error("Error fetching or processing CSV:", error);
                reject(error);
            });
    });
}
    



function getRandomWord(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function toggle_bingo_square(x)
{
    count++;
    document.getElementById(x).style.backgroundColor = "#523880";
    document.getElementById("counter").innerHTML = `${count} / ${max}`
}