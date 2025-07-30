var WORDS = [];
fetch("words.txt").then(response => response.text()).then(txt => {
    WORDS = txt.split("\n");
    document.getElementById("loadingwords").innerHTML = "";
});

function compile(field, e) {
    document.getElementById("output").innerHTML = field.value;
}

function copyCode() {
    var copyText = document.getElementById("comp");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.innerHTML);

    alert("Copied the text: " + copyText.value);
}

function copyCode1() {
    var copyText = document.getElementById("JSONvis");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.innerHTML);

    alert("Copied the text: " + copyText.value);
}

function convertToJSON() {
    var nigger = document.getElementById("wordsT");

    nigger.select();
    nigger.setSelectionRange(0, 99999);
    var inputText = nigger.value;
   /// console.log(inputText);
    const lines = inputText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== "");

    document.getElementById("JSONvis").innerHTML = JSON.stringify(lines);
}
