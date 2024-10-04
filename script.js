const cardValues = [
    { text: 'Discriminacion contra la mujer', img: 'img1.png' },
    { text: 'Equidad', img: 'img2.png' },
    { text: 'Estereotipos de genero', img: 'img3.png' },
    { text: 'Genero', img: 'img4.png' },
    { text: 'Identidad de genero', img: 'img5.png' },
    { text: 'Igualdad de genero', img: 'img6.png' },
    { text: 'Igualdad sustantiva', img: 'img7.png' },
    { text: 'Lenguaje incluyente', img: 'img8.png' },
    { text: 'Masculinidades', img: 'img9.png' },
    { text: 'Perspectiva de Genero', img: 'img10.png' },
];

// Duplicamos las cartas para tener pares
const cards = [];
cardValues.forEach(({ text, img }) => {
    cards.push({ id: text, type: 'text', value: text });
    cards.push({ id: text, type: 'img', value: img });
});

const grid = document.getElementById('grid');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCards() {
    const shuffledCards = [...cards];
    shuffle(shuffledCards);
    
    shuffledCards.forEach(({ id, type, value }) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = id; // Guardamos el id para el emparejamiento
        card.dataset.value = value; // Guardamos el texto o la imagen
        card.dataset.type = type; // Guardamos el tipo
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    showCard(this);
    
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function showCard(card) {
    const value = card.dataset.value;
    const type = card.dataset.type;

    // Limpiar el contenido anterior antes de mostrar el nuevo
    card.innerHTML = ''; // Limpia el contenido actual

    if (type === 'text') {
        card.innerText = value; // Muestra el texto
    } else {
        const imgElement = document.createElement('img');
        imgElement.src = value; // Usa la ruta de la imagen
        imgElement.alt = value; // Usa el valor como alt
        card.appendChild(imgElement); // Añade la imagen a la carta
    }
}

function checkForMatch() {
    // Comprobamos si los IDs son iguales
    if (firstCard.dataset.id === secondCard.dataset.id) {
        // Son un par, no hacemos nada más
        resetBoard();
    } else {
        // No son un par, se vuelven a dar vuelta
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerHTML = ''; // Limpia el contenido de la carta
            secondCard.innerHTML = ''; // Limpia el contenido de la carta
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.getElementById('reset').addEventListener('click', () => {
    grid.innerHTML = '';
    createCards();
});

// Inicializar el juego
createCards();
