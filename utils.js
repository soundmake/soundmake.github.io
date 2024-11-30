function typeWriter(elementId, text, speed = 30) {
    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById(elementId).innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function initTimeManager(onTimeUpdate) {
    let minutes = parseInt(localStorage.getItem('minute')) || 420;
    
    function updateTime() {
        minutes += 5;
        if (onTimeUpdate) {
            onTimeUpdate(minutes);
        }
        localStorage.setItem('minute', minutes);
        
        if (minutes >= 1380) {
            window.location.href = "dayover.html";
            let day = parseInt(localStorage.getItem('day')) || 1;
            localStorage.setItem('day', day + 1);
            localStorage.setItem('minute', '420');
        }
    }
    
    setInterval(updateTime, 1000);
    return minutes;
}

function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
}

const GameState = {
    getMoney() {
        return parseFloat(localStorage.getItem('money')) || 0;
    },
    
    setMoney(amount) {
        localStorage.setItem('money', amount.toFixed(2));
    },
    
    getDay() {
        return parseInt(localStorage.getItem('day')) || 1;
    },
    
    checkGameOver() {
        const money = this.getMoney();
        const day = this.getDay();
        
        if (money < -100 && day < 14) {
            window.location.href = "poor.html";
        } else if (money < 1000 && day === 14) {
            window.location.href = "badend.html";
        } else if (money >= 1000 && day === 14) {
            window.location.href = "goodend.html";
        }
    }
}; 