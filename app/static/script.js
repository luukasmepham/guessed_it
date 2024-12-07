const correctAnswer = "secret_answer"; // Replace with your desired correct answer
const textBox = document.querySelector('.text-box');
const inputContainer = document.getElementById('input-container');

function initializeInput() {
    inputContainer.innerHTML = `
        <input type="text" id="input-field" placeholder="Enter your guess here">
        <button id="search-button">Search</button>
    `;

    textBox.textContent = "This is where the descriptive hint will be displayed.";

    const inputField = document.getElementById('input-field');
    const searchButton = document.getElementById('search-button');

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });


    searchButton.addEventListener('click', () => {
        const userInput = inputField.value;

        if (userInput === correctAnswer) {
            textBox.textContent = "Answer was correct, do you want to play again?";
            inputContainer.innerHTML = '<button id="play-again">Play again</button>';

            // Add event listener for the "Play again" button
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