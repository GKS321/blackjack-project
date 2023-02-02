let player = {
    name: "Player",
    chips: 110
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function alertRefresh() {
    alert("You have no more chips available.\nPlease refresh to start again")
}

function chipsAvailable() {
    if(player.chips>0)
        return true
    else
        return false
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    cardPush(randomNumber)
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function cardPush(arg1) {
    switch(arg1){
        case 1 :
            cards.push("A")
            break
        case 11 :
            cards.push("J")
            break
        case 12 :
            cards.push("Q")
            break
        case 13 :
            cards.push("K")
            break
        default :
            cards.push(arg1)
    }
}

function startGame() {
    if(chipsAvailable()) {
        cards = []
        isAlive = true
        hasBlackJack = false
        player.chips -= 10
        playerEl.textContent = player.name + ": $" + player.chips
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        sum = firstCard + secondCard
        renderGame()
    }
    else
        alertRefresh()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 60
        playerEl.textContent = player.name + ": $" + player.chips
    } else {
        message = "You're out of the game!"
        isAlive = false
        player.chips -= 20
        playerEl.textContent = player.name + ": $" + player.chips
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        renderGame()        
    }
}

