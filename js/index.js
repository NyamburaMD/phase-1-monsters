const monsterList = document.getElementById('monster-list');
const loadMoreButton = document.getElementById('load-more');
const monsterForm = document.getElementById('monster-form');

let currentPage = 1;
const limit = 50;

// Function to load monsters from the API
function loadMonsters(page) {
    fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            if (monsters.length < limit) {
                loadMoreButton.style.display = 'none'; // Hide button if no more monsters
            } else {
                loadMoreButton.style.display = 'block'; // Show button if there are more monsters
            }
            displayMonsters(monsters);
        });
}

// Function to display monsters in the DOM
function displayMonsters(monsters) {
    monsters.forEach(monster => {
        const monsterDiv = document.createElement('div');
        monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
        `;
        monsterList.appendChild(monsterDiv);
    });
}

// Function to create a new monster
function createMonster(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const description = document.getElementById('description').value;

    const newMonster = {
        name,
        age: Number(age),
        description,
    };

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(newMonster),
    })
    .then(response => response.json())
    .then(monster => {
        console.log('New monster created:', monster);
        // Clear the form fields
        monsterForm.reset();
        //reload monsters 
        loadMonsters(currentPage);
    });
}

// Event listeners
monsterForm.addEventListener('submit', createMonster);
loadMoreButton.addEventListener('click', () => {
    currentPage++;
    loadMonsters(currentPage);
});

// Initial load of monsters
loadMonsters(currentPage);
