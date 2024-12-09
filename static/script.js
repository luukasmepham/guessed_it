const textBox = document.querySelector('.text-box');
const inputContainer = document.getElementById('input-container');


async function fetchData() {
    const response = await fetch('/new_question');
    const data = await response.json();
    return data;
  }

async function initializeInput() {
    const data = await fetchData();

    textBox.textContent = data.description;

    inputContainer.innerHTML = `
        <input type="text" id="input-field" placeholder="Enter your guess here">
        <button id="search-button">Guess</button>
    `;

    const inputField = document.getElementById('input-field');
    const searchButton = document.getElementById('search-button');

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });


    searchButton.addEventListener('click', async () => {
        const userInput = inputField.value;
        const data = await fetchData();

        if (data.answers.includes(userInput)) {
            textBox.textContent = "Correct! You can return tomorrow for a new question.";
            inputContainer.innerHTML = '<button id="play-again">Back to todays question</button>';
            const playAgainButton = document.getElementById('play-again');
            playAgainButton.addEventListener('click', initializeInput);
        } else {
            inputField.classList.add('shake', 'incorrect');
            inputField.placeholder = "Incorrect, try again";

            setTimeout(() => {
                inputField.classList.remove('shake', 'incorrect');
            }, 1000);
        }
    });
}

initializeInput();