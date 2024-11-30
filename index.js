function firstday() {
    window.location.href = "firstday.html";
}

function continueon() {
    window.location.href = parseInt(localStorage.getItem('day')) > 0 ? "menu.html" : "cg1.html";
}

function gamelunch() {
    window.location.href = "menu.html";
    localStorage.setItem('day', '1');
    localStorage.setItem('money', '50.00');
    localStorage.setItem('minute', '420');
    localStorage.setItem("news", "The stock market was plunged into the Crazy Years when the government expanded the stock meltdown limit to 70%.");

    // 初始化所有股票数据
    const initialStockPrices = {
        'ibm': '34.50',
        'exxonmobil': '10.50', 
        'generalelectric': '10.00',
        'att': '15.00',
        'cocacola': '0.50',
        'procterandgamble': '12.00',
        'johnsonandjohnson': '10.50',
        'mcdonalds': '5.50',
        'walmart': '3.05',
        'disney': '5.50'
    };

    // 设置股票价格和份额
    Object.entries(initialStockPrices).forEach(([stock, price]) => {
        localStorage.setItem(stock, price);
        localStorage.setItem(`${stock}_s`, '0');
    });
}

function navigateTo(page) {
    window.location.href = page;
}

function work() {
    navigateTo("work.html");
}

function stock() {
    navigateTo("stock.html");
}

function convertMinutesToTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
}

function back() {
    navigateTo("menu.html");
}

function bet() {
    navigateTo("bet.html");
}

function updateStockPrices() {
    const stockConfig = {
        "IBM": { name: 'ibm', defaultPrice: 10, 
            goodNews: "IBM's AI Robot Gains Self-Awareness.",
            badNews: "IBM had a massive failure of large machines and equipment, causing factories around the world to shut down for 1 day."
        },
        "ExxonMobil": { name: 'exxonmobil', defaultPrice: 15,
            goodNews: "Exxon Mobil discovers 10,000 times more oil and gas on Mars than on Earth.",
            badNews: "Exxon Mobil caused marine pollution due to an oil spill."
        },
        "General Electric": { name: 'generalelectric', defaultPrice: 12,
            goodNews: "General Electric invents the world's first airplane to the moon.",
            badNews: "General Electric's airplane crash kills 423 people."
        },
        "AT&T": { name: 'att', defaultPrice: 8 },
        "Coca-Cola": { name: 'cocacola', defaultPrice: 18,
            goodNews: "Coca-Cola discovers that the human body is made up of 80 percent Coca-Cola.",
            badNews: "Coca-Cola ingredient list found to contain excessive amounts of sweeteners."
        },
        "Procter & Gamble": { name: 'procterandgamble', defaultPrice: 20,
            goodNews: "Procter & Gamble develops skin care products that reverse skin growth.",
            badNews: "Procter & Gamble produced detergents that caused about 10,000 Americans to develop skin cancer."
        },
        "Johnson & Johnson": { name: 'johnsonandjohnson', defaultPrice: 25,
            goodNews: "Johnson & Johnson develops a vaccine that protects against all diseases.",
            badNews: "Johnson & Johnson's talcum powder had asbestos, causing cancer in 2 million children worldwide."
        },
        "McDonalds": { name: 'mcdonalds', defaultPrice: 30,
            goodNews: "McDonald's introduces the world's first plant-based meatloaf.",
            badNews: "McDonald's is accused of finding human tissue in its meatloaf."
        },
        "Walmart": { name: 'walmart', defaultPrice: 22,
            goodNews: "Walmart acquires 70% of the world's supermarkets, becoming the world's largest supermarket chain.",
            badNews: "500 Walmart employees went on strike after being owed long overdue wages."
        },
        "Disney": { name: 'disney', defaultPrice: 28,
            goodNews: "Disney built Disneyland on the moon.",
            badNews: "Disney employee lifted a boy into a pond with his foot."
        }
    };

    let stocks = {};
    Object.entries(stockConfig).forEach(([key, config]) => {
        stocks[key] = {
            name: config.name,
            sname: `${config.name}_s`,
            price: parseFloat(localStorage.getItem(config.name)) || config.defaultPrice,
            shares: parseInt(localStorage.getItem(`${config.name}_s`)) || 0
        };
    });

    const stockKeys = Object.keys(stocks);
    const randomSpecialIndex = Math.floor(Math.random() * stockKeys.length);

    // 保存当前股价
    stockKeys.forEach((key) => {
        const stock = stocks[key];
        localStorage.setItem(`${stock.name}_lastday`, stock.price);
    });

    // 更新股价
    stockKeys.forEach((key, index) => {
        const stock = stocks[key];
        const config = stockConfig[key];

        if (index === randomSpecialIndex) {
            // 特殊股票处理
            const isPositive = Math.random() < 0.5;
            stock.price = isPositive ? 
                parseFloat((stock.price * 1.7).toFixed(2)) : 
                parseFloat((stock.price * 0.3).toFixed(2));
            
            localStorage.setItem(`${stock.name}_comp`, isPositive ? "+70%" : "-70%");
            
            if (config.goodNews && config.badNews) {
                localStorage.setItem("news", isPositive ? config.goodNews : config.badNews);
            }
        } else {
            // 普通股票处理
            const changePercent = (Math.random() * 0.4 - 0.2);
            stock.price = parseFloat((stock.price * (1 + changePercent)).toFixed(2));
            localStorage.setItem(`${stock.name}_comp`, `${(changePercent * 100).toFixed(0)}%`);
        }

        localStorage.setItem(stock.name, stock.price);
    });
    
    localStorage.setItem('minute', '420');
}

function nextday() {
    const money = parseFloat(localStorage.getItem('money')).toFixed(2);
    const day = parseInt(localStorage.getItem('day'));
    
    if (money < -100 && day < 14) {
        navigateTo("poor.html");
    } else if (money < 1000 && day == 14) {
        navigateTo("badend.html");
    } else if (money >= 1000 && day == 14) {
        navigateTo("goodend.html");
    } else {
        navigateTo("menu.html");
    }
}

function gameover() {
    localStorage.clear();
    navigateTo("index.html");
}

function tur() {
    navigateTo("tur.html");
}