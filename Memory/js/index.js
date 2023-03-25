const startGame = () => {
    const playBtn = document.querySelector('.intro button');
    const introScreen = document.querySelector('.intro');
    const match = document.querySelector('.match');

    playBtn.addEventListener('click', () => {
        introScreen.classList.add('fadeOut');
        match.classList.add('fadeIn');

    });
};

const card = document.querySelectorAll('.cell')
const front = document.querySelectorAll('.front')
const container = document.querySelector('.container')
const score = document.querySelector('.score span')

suffleImage()
clicking()
startGame();
function suffleImage() {
    card.forEach(c => {
        const num = [...Array(card.length).keys()]
        const random = Math.floor(Math.random() * card.length)
        c.style.order = num[random]
    })
}

function clicking() {
    for (let i = 0; i < card.length; i++) {
        front[i].classList.add('show')

        setInterval(() => {
            front[i].classList.remove('show')
        }, 2000);

        card[i].addEventListener('click', () => {

            front[i].classList.add('flip')
            const filppedCard = document.querySelectorAll('.flip')

            if (filppedCard.length == 2) {

                container.style.pointerEvents = 'none'
                setInterval(() => {
                    container.style.pointerEvents = 'all'
                }, 1000);

                match(filppedCard[0], filppedCard[1])
            }
        })
    }
}

function match(cardOne, cardTwo) {

    if (cardOne.dataset.index == cardTwo.dataset.index) {

        score.innerHTML = parseInt(score.innerHTML) + 1

        cardOne.classList.remove('flip')
        cardTwo.classList.remove('flip')

        cardOne.classList.add('match')
        cardTwo.classList.add('match')

        if (score.innerHTML == 6) {
            result.innerHTML = `<h2>You Won!</h2>`;
            container.style.display = "none";
            moves.innerHTML = `<span>Wrong moves:</span>${movesCount}`;
            hideCards();
            scoreCard.removeAttribute("hidden");
        }

    } else {
        setTimeout(() => {
            cardOne.classList.remove('flip')
            cardTwo.classList.remove('flip')
            movesCounter();
        }, 1000);
    }
}

let movesCount = 0;
const moves = document.getElementById("moves-count");
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Wrong moves:</span>${movesCount}`;
};

const startCard = document.querySelector("#start-card");
const scoreCard = document.querySelector("#score-card");
const leaderboardCard = document.querySelector("#leaderboard-card");
const submitButton = document.querySelector("#submit-button");
const inputElement = document.querySelector("#initials");
submitButton.addEventListener("click", storeScore);

function hideCards() {
    startCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
}

function storeScore(event) {
    event.preventDefault();

    if (!inputElement.value) {
        alert("Please enter your name before pressing submit!");
        return;
    }
    let leaderboardItem = {
        initials: inputElement.value,
        score: movesCount,
        today: today
    };

    updateStoredLeaderboard(leaderboardItem);
    hideCards();
    leaderboardCard.removeAttribute("hidden");
    renderLeaderboard();
}

function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}

function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
        let leaderboardArray = JSON.parse(storedLeaderboard);
        return leaderboardArray;
    } else {
        leaderboardArray = [];
    }
    return leaderboardArray;
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '/' + mm + '/' + dd;


function renderLeaderboard() {
    let sortedLeaderboardArray = sortLeaderboard();
    const highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < sortedLeaderboardArray.length; i++) {
        let leaderboardEntry = sortedLeaderboardArray[i];
        let newListItem = document.createElement("li");
        newListItem.textContent =
        leaderboardEntry.today + " - " + leaderboardEntry.initials + " - " + leaderboardEntry.score + " wrong moves";
        highscoreList.append(newListItem);
    }
}

function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
        return;
    }

    leaderboardArray.sort(function (a, b) {
        return a.score - b.score;
    });
    return leaderboardArray;
}

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearHighscores);

function clearHighscores() {
    localStorage.clear();
    renderLeaderboard();
}

const backButton = document.querySelector("#back-button");
backButton.addEventListener("click", returnToStart);

function returnToStart() {
    location.reload();
}

const leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", showLeaderboard);

function showLeaderboard() {
    hideCards();
    leaderboardCard.removeAttribute("hidden");
    container.style.display = "none";
    info.style.display = "none";
    renderLeaderboard();
}

