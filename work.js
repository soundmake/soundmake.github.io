const bibleVerses = [
    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    "The Lord is my shepherd, I shall not want.",
    "Come to me, all you who are weary and burdened, and I will give you rest.",
    "For from him and through him and for him are all things. To him be the glory forever.",
    "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
    "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    "I can do everything through him who gives me strength.",
    "In the beginning God created the heavens and the earth.",
    "In all your ways acknowledge him, and he will make your paths straight.",
    "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
    "Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God.",
];

class TypingGame {
    constructor(penaltyAmount = -1) {
        this.verseElement = document.getElementById('verse');
        this.inputArea = document.getElementById('input-area');
        this.scoreElement = document.getElementById('current-score');
        this.currentVerse = "";
        this.currentScore = parseFloat(localStorage.getItem('money')) || 0;
        this.currentIndex = 0;
        this.penaltyAmount = penaltyAmount;
        
        this.initializeGame();
        this.setupEventListeners();
    }

    getRandomVerse() {
        return bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    }

    initializeGame() {
        this.currentVerse = this.getRandomVerse();
        this.currentIndex = 0;
        this.scoreElement.textContent = this.currentScore.toFixed(2);
        this.verseElement.textContent = this.currentVerse;
        this.inputArea.value = "";
        this.inputArea.focus();
    }

    updateScore(isCorrect) {
        this.currentScore += isCorrect ? 0.2 : this.penaltyAmount;
        this.scoreElement.textContent = this.currentScore.toFixed(2);
        localStorage.setItem('money', this.currentScore.toFixed(2));
        
        // 检查游戏结束条件
        if (this.currentScore < -100) {
            window.location.href = "poor.html";
        }
    }

    setupEventListeners() {
        this.inputArea.addEventListener('input', (e) => {
            if (e.inputType === 'deleteContentBackward') {
                return;
            }
            const userInput = this.inputArea.value;
            if (userInput === this.currentVerse.slice(0, userInput.length)) {
                if (userInput.length > this.currentIndex) {
                    this.updateScore(true);
                    this.currentIndex = userInput.length;
                }
                if (userInput === this.currentVerse) {
                    alert("One verse completed!");
                    this.currentScore += 1;
                    localStorage.setItem('money', this.currentScore.toFixed(2));
                    this.initializeGame();
                }
            } else {
                this.updateScore(false);
            }
        });
    }
}

function setupTimeManagement() {
    let minutes = parseInt(localStorage.getItem('minute')) || 420;
    
    function updateTime() {
        minutes += 5;
        document.getElementById('hrs').innerHTML = 'Now the time is ' + convertMinutesToTime(minutes);
        localStorage.setItem('minute', minutes);
        
        if (minutes >= 1380) {
            window.location.href = "dayover.html";
            let day = parseInt(localStorage.getItem('day')) || 1;
            localStorage.setItem('day', day + 1);
            localStorage.setItem('minute', '420');
        }
    }
    
    document.getElementById('hrs').innerHTML = 'Now the time is ' + convertMinutesToTime(minutes);
    setInterval(updateTime, 1000);
}

function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
}

function back() {
    window.location.href = "menu.html";
}