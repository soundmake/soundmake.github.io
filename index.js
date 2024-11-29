
function firstday() {
    window.location.href = "firstday.html";
}

function continueon() {
    if (parseInt(localStorage.getItem('day'))>0) {
        window.location.href = "menu.html";
    }
    else {
        window.location.href = "cg1.html";
    }
}
function gamelunch() {
    window.location.href = "menu.html";
    localStorage.setItem('day', '1');
    localStorage.setItem('money', '50.00');
    localStorage.setItem('minute', '420');
    localStorage.setItem('supdie', 'no');
    localStorage.setItem("news", "The stock market was plunged into the Crazy Years when the government expanded the stock meltdown limit to 70%.");

    //stock price
    localStorage.setItem('ibm', '34.50');
    localStorage.setItem('exxonmobil', '10.50');
    localStorage.setItem('generalelectric', '10.00');
    localStorage.setItem('att', '15.00');
    localStorage.setItem('cocacola', '0.50');
    localStorage.setItem('procterandgamble', '12.00');
    localStorage.setItem('johnsonandjohnson', '10.50');
    localStorage.setItem('mcdonalds', '5.50');
    localStorage.setItem('walmart', '3.05');
    localStorage.setItem('disney', '5.50');
    //stock shares
    localStorage.setItem('ibm_s', '0');
    localStorage.setItem('exxonmobil_s', '0');
    localStorage.setItem('generalelectric_s', '0');
    localStorage.setItem('att_s', '0');
    localStorage.setItem('cocacola_s', '0');
    localStorage.setItem('procterandgamble_s', '0');
    localStorage.setItem('johnsonandjohnson_s', '0');
    localStorage.setItem('mcdonalds_s', '0');
    localStorage.setItem('walmart_s', '0');
    localStorage.setItem('disney_s', '0');
}

function work() {
    let supdie = localStorage.getItem('supdie');
    let day = parseInt(localStorage.getItem('day'));
    if (supdie == 'no' && day < 7) {
        window.location.href = "work1.html";
    }
    else if (supdie == 'no' && day == 7) {
        localStorage.setItem('supdie','yes')
        window.location.href = "work2.html";
    }
    else if (day > 7) {
        window.location.href = "work3.html";
    }
}

function stock() {
    window.location.href = "stock.html";
}

function convertMinutesToTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
}

function back() {
    window.location.href = "menu.html";
}
function bet() {
    window.location.href = "bet.html";
}

function updateStockPrices() {
    let ibm = parseFloat(localStorage.getItem('ibm')) || 10;
    let exxonmobil = parseFloat(localStorage.getItem('exxonmobil')) || 15;
    let generalelectric = parseFloat(localStorage.getItem('generalelectric')) || 12;
    let att = parseFloat(localStorage.getItem('att')) || 8;
    let cocacola = parseFloat(localStorage.getItem('cocacola')) || 18;
    let procterandgamble = parseFloat(localStorage.getItem('procterandgamble')) || 20;
    let johnsonandjohnson = parseFloat(localStorage.getItem('johnsonandjohnson')) || 25;
    let mcdonalds = parseFloat(localStorage.getItem('mcdonalds')) || 30;
    let walmart = parseFloat(localStorage.getItem('walmart')) || 22;
    let disney = parseFloat(localStorage.getItem('disney')) || 28;

    let ibm_s = parseInt(localStorage.getItem('ibm_s')) || 0;
    let exxonmobil_s = parseInt(localStorage.getItem('exxonmobil_s')) || 0;
    let generalelectric_s = parseInt(localStorage.getItem('generalelectric_s')) || 0;
    let att_s = parseInt(localStorage.getItem('att_s')) || 0;
    let cocacola_s = parseInt(localStorage.getItem('cocacola_s')) || 0;
    let procterandgamble_s = parseInt(localStorage.getItem('procterandgamble_s')) || 0;
    let johnsonandjohnson_s = parseInt(localStorage.getItem('johnsonandjohnson_s')) || 0;
    let mcdonalds_s = parseInt(localStorage.getItem('mcdonalds_s')) || 0;
    let walmart_s = parseInt(localStorage.getItem('walmart_s')) || 0;
    let disney_s = parseInt(localStorage.getItem('disney_s')) || 0;



    let stocks = {
        "IBM": { name: 'ibm', sname: 'ibm_s', price: ibm, shares: ibm_s },
        "ExxonMobil": { name: 'exxonmobil', sname: 'exxonmobil_s', price: exxonmobil, shares: exxonmobil_s },
        "General Electric": { name: 'generalelectric', sname: 'generalelectric_s', price: generalelectric, shares: generalelectric_s },
        "AT&T": { name: 'att', sname: 'att_s', price: att, shares: att_s },
        "Coca-Cola": { name: 'cocacola', sname: 'cocacola_s', price: cocacola, shares: cocacola_s },
        "Procter & Gamble": { name: 'procterandgamble', sname: 'procterandgamble_s', price: procterandgamble, shares: procterandgamble_s },
        "Johnson & Johnson": { name: 'johnsonandjohnson', sname: 'johnsonandjohnson_s', price: johnsonandjohnson, shares: johnsonandjohnson_s },
        "McDonalds": { name: 'mcdonalds', sname: 'mcdonalds_s', price: mcdonalds, shares: mcdonalds_s },
        "Walmart": { name: 'walmart', sname: 'walmart_s', price: walmart, shares: walmart_s },
        "Disney": { name: 'disney', sname: 'disney_s', price: disney, shares: disney_s }
    };
    const stockKeys = Object.keys(stocks);
    const randomSpecialIndex = Math.floor(Math.random() * stockKeys.length); // 随机选择一个特殊股票
    let news = "";

    // 保存当天股价到 localStorage 的 _lastday 中
    stockKeys.forEach((key) => {
        const stock = stocks[key];
        localStorage.setItem(`${stock.name}_lastday`, stock.price);
    });

    // 更新股价
    stockKeys.forEach((key, index) => {
        const stock = stocks[key];
        if (index === randomSpecialIndex) {
            // 特殊股票 -70% 或 +70%
            const isPositive = Math.random() < 0.5; // 决定是涨还是跌
            const oldPrice = stock.price;
            stock.price = isPositive ? parseFloat((stock.price * 1.7).toFixed(2)) : parseFloat((stock.price * 0.3).toFixed(2));

            // 计算涨幅并存储到 localStorage
            const changePercent = isPositive ? "+70%" : "-70%";
            localStorage.setItem(`${stock.name}_comp`, changePercent);

            // 设置对应的新闻内容
            if (!isPositive) {
                switch (key) {
                    case "IBM":
                        news = "IBM had a massive failure of large machines and equipment, causing factories around the world to shut down for 1 day.";
                        break;
                    case "ExxonMobil":
                        news = "Exxon Mobil caused marine pollution due to an oil spill.";
                        break;
                    case "General Electric":
                        news = "General Electric's airplane crash kills 423 people.";
                        break;
                    case "Coca-Cola":
                        news = "Coca-Cola ingredient list found to contain excessive amounts of sweeteners.";
                        break;
                    case "McDonalds":
                        news = "McDonald's is accused of finding human tissue in its meatloaf.";
                        break;
                    case "Walmart":
                        news = "500 Walmart employees went on strike after being owed long overdue wages.";
                        break;
                    case "Procter & Gamble":
                        news = "Procter & Gamble produced detergents that caused about 10,000 Americans to develop skin cancer.";
                        break;
                    case "Johnson & Johnson":
                        news = "Johnson & Johnson's talcum powder had asbestos, causing cancer in 2 million children worldwide.";
                        break;
                    case "Disney":
                        news = "Disney employee lifted a boy into a pond with his foot.";
                        break;
                }
            } else {
                switch (key) {
                    case "IBM":
                        news = "IBM's AI Robot Gains Self-Awareness.";
                        break;
                    case "ExxonMobil":
                        news = "Exxon Mobil discovers 10,000 times more oil and gas on Mars than on Earth.";
                        break;
                    case "General Electric":
                        news = "General Electric invents the world's first airplane to the moon.";
                        break;
                    case "Coca-Cola":
                        news = "Coca-Cola discovers that the human body is made up of 80 percent Coca-Cola.";
                        break;
                    case "McDonalds":
                        news = "McDonald's introduces the world's first plant-based meatloaf.";
                        break;
                    case "Walmart":
                        news = "Walmart acquires 70% of the world's supermarkets, becoming the world's largest supermarket chain.";
                        break;
                    case "Procter & Gamble":
                        news = "Procter & Gamble develops skin care products that reverse skin growth.";
                        break;
                    case "Johnson & Johnson":
                        news = "Johnson & Johnson develops a vaccine that protects against all diseases.";
                        break;
                    case "Disney":
                        news = "Disney built Disneyland on the moon.";
                        break;
                }
            }

            // 将新闻存储到 localStorage
            localStorage.setItem("news", news);
        } else {
            // 常规股票变化 -20% 到 +20%
            const changePercent = (Math.random() * 0.4 - 0.2); // -20% 到 +20%
            const oldPrice = stock.price;
            stock.price = parseFloat((stock.price * (1 + changePercent)).toFixed(2));

            // 计算涨幅百分比并存储到 localStorage
            const comp = (changePercent * 100).toFixed(0) + "%";
            localStorage.setItem(`${stock.name}_comp`, comp);
        }

        // 更新股价到 localStorage
        localStorage.setItem(stock.name, stock.price);
    });
    localStorage.setItem('minute', '420');
}
function nextday() {
    let money = parseFloat(localStorage.getItem('money')).toFixed(2);
    let day = parseInt(localStorage.getItem('day'));
    window.location.href = "menu.html";
    if (money < -100 && day < 14) {
        window.location.href = "poor.html";
    }
    else if (money < 1000 && day == 14) {
        window.location.href = "badend.html";
    }
    else if (money > 1000 && money == 1000 && day == 14) {
        window.location.href = "goodend.html";
    }
}

function gameover() {
    window.location.href = "index.html";
    localStorage.clear();
}