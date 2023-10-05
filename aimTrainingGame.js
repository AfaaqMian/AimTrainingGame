const svgNS = "http://www.w3.org/2000/svg"

/**
 * Sets variables 
 */
let x = Math.round(Math.random() * 1095 + 35);
let y = Math.round(Math.random() * 495 + 35);
let intervalSpeed = 600;
let score = 0;
let timer = 0;
let endTimer = 60;

/**
 * Creates text element
 */
let text = document.createElementNS(svgNS, "text");
text.setAttribute("id", "text");
text.setAttribute("class", "text");
text.setAttribute("x", "1175");
text.setAttribute("y", "200");
text.textContent = "Welcome to my Aim Training Game! Click Start to begin and press 'Enter' to add 60 seconds to the timer.";

/**
 * Creates circle element
 */
let circle = document.createElementNS(svgNS, "circle");
circle.setAttribute("id", "circle");
circle.setAttribute("cx", x);
circle.setAttribute("cy", y);
circle.setAttribute("r", "30");

/**
 * Creates second text element
 */
let text2 = document.createElementNS(svgNS, "text");
text2.setAttribute("id", "text2");
text2.setAttribute("class", "text");
text2.setAttribute("x", "400");
text2.setAttribute("y", "200");

/**
 * Event listener that runs on load. Appends <text> to <svg> and runs the animation for the text. When Start button is clicked, removes the text/animation 
 * starts the game
 */
window.addEventListener("load", function () {
    let animation = setInterval(function () {
        let svg = document.querySelector("svg");
        svg.appendChild(text);
        text.setAttribute("x", parseInt(text.getAttribute("x") - 5));
    }, 33);

    document.getElementById("start").addEventListener("click", function () {
        clearInterval(animation);
        svg.removeChild(text);
        this.blur();
        startGame();
    })
});

/**
 * Even listener for when user press Enter, adds an additional 60 seconds before the timer runs out
 */
document.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        endTimer += 60;
    }
})

/**
 * Function to start the game, appends and removes circles based on random cx and cy co-ordinates
 */
function startGame() {
    let game = setInterval(function () {
        let x = Math.round(Math.random() * 1095 + 35);
        let y = Math.round(Math.random() * 495 + 35);
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);

        let svg = document.querySelector("svg");
        svg.appendChild(circle);

        setTimeout(intervalSpeed);

        svg.removeChild(circle);
        svg.appendChild(circle);

        if (timer == endTimer) {
            clearInterval(game);
            svg.removeChild(circle);
            svg.appendChild(text2);
            text2.textContent = "Your score was: " + score;
        }
    }, intervalSpeed);

    timerClock();
}

/**
 * Event listener for when user clicks on the circle successfully, adds +1 to score.
 */
circle.addEventListener('click', function () {
    score += 1;
    document.getElementById("score").innerHTML = score;
})

/**
 * Function for the timer - increases the timer by +1 every second.
 */
function timerClock() {
    clock = setInterval(function () {
        timer += 1
        document.getElementById("timer").innerHTML = timer;

        if (timer == endTimer) {
            clearInterval(clock);
        }
    }, 1000);
}





