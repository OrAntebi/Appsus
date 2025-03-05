export const utilService = {
    makeId,
    makeLorem,
    getRandomInt,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    loadFromStorage,
    saveToStorage,
    convertRatingToStars,
    getRandomValue,
    getRandomYear,
    generateRandomText,
    debounce,
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}

function makeId(length = 6) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function convertRatingToStars(rating, maxRating = 5) {
    const stars = []
    for (let i = 0; i < rating; i++) {
        stars.push(<img key={`filled-star-${i}`} className="rating-img" src="assets/img/book/star-icon.png" alt="star-icon" />)
    }
    for (let i = rating; i < maxRating; i++) {
        stars.push(<img key={`empty-star-${i}`} className="rating-img" src="assets/img/book/star-line-yellow-icon.png" alt="star-line-yellow-icon" />)
    }
    return stars
}

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomYear(startYear, endYear) {
    return Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
}

function generateRandomText(length = 100) {
    const words = ['the', 'cat', 'runs', 'to', 'eat', 'the', 'mouse', 'in', 'the', 'garden', 'they', 'are', 'playing', 'they', 'are', 'going', 'to', 'watch', 'a', 'movie'];
    let sentence = '';
    for (let i = 0; i < length; i++) {
        sentence += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return sentence.trim() + '.';
}

function debounce(func, delay) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}