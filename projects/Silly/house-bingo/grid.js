let usedChallenges = [];
let usedFreebies = [];
let toggle = []
let MAX = 0

async function get_bingo() {
    try {
        const response = await fetch('bingo.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading bingo.json:', error);
        return null;
    }
}

function get_unused(items, usedItems) {
    const unusedItems = items.filter(item => !usedItems.includes(item));
    if (unusedItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * unusedItems.length);
        return unusedItems[randomIndex];
    } else {
        console.log('No more unused items!');
        return null;
    }
}

async function get_challenge() {
    const content = await get_bingo();
    if (content && content.challenges) {
        const randomChallenge = get_unused(content.challenges, usedChallenges);
        if (randomChallenge) {
            usedChallenges.push(randomChallenge);
            console.log(randomChallenge);
            return randomChallenge;
        } else {
            return null;
        }
    } else {
        console.log('Error: Invalid content or missing challenges array');
        return null;
    }
}

async function get_freebie() {
    const content = await get_bingo();
    if (content && content.freebies) {
        const randomFreebie = get_unused(content.freebies, usedFreebies);
        if (randomFreebie) {
            usedFreebies.push(randomFreebie);
            console.log(randomFreebie);
            return `${randomFreebie}<br>(Freebie)`;
        } else {
            return null;
        }
    } else {
        console.log('Error: Invalid content or missing freebies array');
        return null;
    }
}

export async function create_grid(container_id, x, y)
{
    const container = document.getElementById(container_id);

    for (let column = 0; column < x; column++) {
        
        for (let row = 0; row < y; row++) {
            const square = document.createElement("div");
            square.id = (column * x) + row;
            square.innerHTML = square.id == ((x * y) - 1) / 2 ? await get_freebie() : await get_challenge()
            square.className = "grid-item"
            
            toggle[square.id] = false;

            square.addEventListener("click", function(){
                toggle[square.id] ^= true;
                updateBackground(square);
                updateCounter();
            })

            container.appendChild(square)

        }
    }

    MAX = x * y;
    updateCounter();
}

function updateCounter()
{
    const toggled = toggle.filter(Boolean).length;
    document.getElementById("score-count").innerHTML = `${toggled} / ${MAX}`;

}

function updateBackground(square)
{
    if (toggle[square.id])
    {
        square.style.backgroundColor = "#7E3F8F";
    }
    else
    {
        square.style.backgroundColor = "#8C86AA";
    }
}