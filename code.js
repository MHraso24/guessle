
var WORDS = [];
fetch("words.txt").then(response => response.text()).then(txt => {
    WORDS = txt.split("\n");
});


var WORDSToday = [];
fetch("wordstoday.json")
    .then(response => response.json())
    .then(words => {
        WORDSToday = words;
        document.getElementById("loadingwords").innerHTML = "";
    });


let wc = 10;
let c = 0;
let numww = "/10</b> guessed";
let forScore = "Your Score: <br>";
let counteryw = 0;

let myWORDS = [];

let for_hints = false, ttt;

let hint_counter = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function usehints() {
    document.getElementById("alerttxt").style.display = 'none';
    setTimeout(() => {
        document.getElementById("alerttxt").style.display = 'block';
    }, 10); 
    document.getElementById("alerttxt").style.backgroundColor = '#cc7e00';

    document.getElementById("lblerr").innerHTML = "<b>Hints</b>:<br> <i>pause, share, phase, waste</i>.";
}

function checkSubmitted() {
    document.getElementById("alerttxt").style.display = 'none';
    setTimeout(() => {
        document.getElementById("alerttxt").style.display = 'block';
    }, 10);
    document.getElementById("lblerr").innerHTML = '<b>Error found<b><br>';
    document.getElementById("alerttxt").style.backgroundColor = '#d73b1a';

    if (WORDS != null && WORDSToday != null && c != wc) {
        //  for(let i=0; i<WORDSToday.length; i++){
        // console.log(WORDSToday[i]); console.log("\n");}
        var x = document.getElementById("t").value;
        x = x.toLowerCase();
        let ch = WORDS.some(check1), ch1 = 0, ch2 = myWORDS.some(check1);
        for (let i = 0; i < WORDSToday.length; i++) {
            if (String(WORDSToday[i]) == String(x)) { ch1 = 1; break; }
            //console.log(WORDSToday[i]); console.log("\n");
        }


        if (ch == true) {
            if (ch1 == 1) {
                if (ch2 == false) {
                    let xx = String(document.getElementById("answers").innerHTML);
                    if (c == 0) {
                        xx = "<b>Your Words</b>: "
                    }
                    xx += "<br>";
                    xx += x;

                    xx += "";
                    document.getElementById("answers").innerHTML = xx;

                    counteryw = counteryw + 1;
                    let chast = "<b>" + String(counteryw);
                    let rrrr = chast + numww;
                    document.getElementById("guessed_words").innerHTML = rrrr;

                    myWORDS.push(x);

                    document.getElementById("t").value = "";
                    c = c + 1;

                    document.getElementById("alerttxt").style.backgroundColor = 'green';
                    document.getElementById("lblerr").innerHTML = "<b>Correct guess</b><br> Your guessed word \"" + x + "\" is added to the list <i>Your Words</i>!";

                    let sc = parseInt((c / wc) * 100);
                    if (sc >= 100) {
                        document.getElementById("Score").style.color = "lightgreen";
                        document.getElementById("lblerr").style.color = "lightgreen";
                        document.getElementById("lblerr").innerHTML = "CONGRATULATIONS! <i>You guessed all " + String(wc) + " wanted words!</i>";
                    }
                    document.getElementById("Score").innerHTML = forScore + "<b>" + String(sc) + "%</b>";

                }
                else {
                    document.getElementById("lblerr").innerHTML += "Word must NOT be repeating with one of your guessed words!";
                }
            }
            else {
                document.getElementById("lblerr").innerHTML += "Word is either NOT a possible answer to a wordle with the information from the guess above or not found in the wanted words list!";
            }
        }
        else {
            if (x.length == 5) document.getElementById("lblerr").innerHTML += "Word is either not found in the guessle list or in the wanted words list!";
            if (x.length < 5) {
                if (x.length == 0) {
                    document.getElementById("lblerr").innerHTML += "No word filled in the input field!";
                }
                else {
                    document.getElementById("lblerr").innerHTML += "Word too Short!";
                }
            }
        }

        function check1(value, index, array) {
            return value == x;
        }
    } else {
        if (c < wc) alert("Words are not loaded... Please wait...");
    }
}

async function proverka() {
    checkSubmitted();
}


var countDownDate = new Date("Aug 1, 2025 00:00:00").getTime();
var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (days < 10) {
        document.getElementById("timer").innerHTML =
            "0" + days + ":" +
            Math.floor(hours / 10) + hours % 10 + ":"
            + Math.floor(minutes / 10) + minutes % 10 + ":" + Math.floor(seconds / 10) + seconds % 10;
    }
    else {
        document.getElementById("timer").innerHTML =
            days + ":" +
            Math.floor(hours / 10) + hours % 10 + ":"
            + Math.floor(minutes / 10) + minutes % 10 + ":" + Math.floor(seconds / 10) + seconds % 10;
    }

    if (distance <= 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "<i>(END)</i>";
        const qqq = document.getElementById("alerttxt");
        qqq.remove();
        document.getElementById("uuuuu").innerHTML = "<b><i>New word will be published soon!<br> Please wait...</i></b>";
        const zest = document.getElementById("t");
        zest.remove();
    }
}, 1000);
