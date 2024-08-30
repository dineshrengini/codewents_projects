let cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let winCount = 0;
let lossCount = 0;

function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = card;
        return;
    }

    secondCard = card;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('.card-back').style.backgroundImage === secondCard.querySelector('.card-back').style.backgroundImage;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    winCount++;
    document.getElementById('winCount').textContent = winCount;
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
        lossCount++;
        document.getElementById('lossCount').textContent = lossCount;
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
