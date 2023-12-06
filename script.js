let players = [];

function generateCard() {
    const playerName = document.getElementById('jogador-name').value;
    if (!playerName) {
        alert('Por favor, insira seu nome.');
        return;
    }

    const existingPlayer = players.find(jogador => jogador.name === playerName);
    if (existingPlayer) {
        alert('Este nome já foi utilizado. Por favor, escolha outro.');
        return;
    }

    const card = generateRandomCard();
    players.push({ name: playerName, card: card });

    displayCards();
}

function generateRandomCard() {
    const columns = ['B', 'I', 'N', 'G', 'O'];
    let card = {};

    columns.forEach(column => {
        card[column] = [];
        let startRange, endRange;

        switch (column) {
            case 'B':
                startRange = 1;
                endRange = 15;
                break;
            case 'I':
                startRange = 16;
                endRange = 30;
                break;
            case 'N':
                startRange = 31;
                endRange = 45;
                break;
            case 'G':
                startRange = 46;
                endRange = 60;
                break;
            case 'O':
                startRange = 61;
                endRange = 75;
                break;
        }

        while (card[column].length < 5) {
            let num = Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
            if (card[column].indexOf(num) === -1) {
                card[column].push(num);
            }
        }
    });

    return card;
}

function displayCards() {
    const cardsContainer = document.getElementById('bingo-cards');
    cardsContainer.innerHTML = '';

    players.forEach(jogador => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.innerHTML = `<p>${jogador.name}</p>`;

        Object.keys(jogador.card).forEach(column => {
            cardDiv.innerHTML += `<p>${column}: ${jogador.card[column].join(', ')}</p>`;
        });

        cardsContainer.appendChild(cardDiv);
    });
}

function startGame() {
    if (players.length < 2) {
        alert('É necessário pelo menos 2 jogadores para começar o jogo.');
        return;
    }

    document.getElementById('drawn-number').innerHTML = 'Número Sorteado: ';
    document.getElementById('ganhadores').innerHTML = 'Vencedores: ';
}

function drawNumber() {
    const drawnNumber = Math.floor(Math.random() * 75) + 1;
    document.getElementById('drawn-number').innerHTML = `Número Sorteado: ${drawnNumber}`;

    vencedores(drawnNumber);
}

function checar_vencedores(drawnNumber) {
    const ganhadores = players.filter(jogador => {
        return jogador.card['B'].includes(drawnNumber) ||
               jogador.card['I'].includes(drawnNumber) ||
               jogador.card['N'].includes(drawnNumber) ||
               jogador.card['G'].includes(drawnNumber) ||
               jogador.card['O'].includes(drawnNumber);
    });

    tela_ganhador(ganhadores);
}

function tela_ganhador(ganhadores) {
    const ganhadoresDiv = document.getElementById('ganhadores');
    ganhadoresDiv.innerHTML = 'Vencedores: ';

    ganhadores.forEach(winner => {
        ganhadoresDiv.innerHTML += `<p id="winner">${winner.name}</p>`;
    });
}