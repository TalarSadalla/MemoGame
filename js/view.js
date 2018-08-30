var view = (function () {
    var renderPieces = function (pieces) {
            clearWindow();
            var btn,
                i,
                div;
            for (i = 0; i < pieces.length; i++) {
                if (pieces[i].toGuess) {
                    btn = document.createElement("BUTTON");  // Create a <button> element
                    btn.setAttribute("id", i);
                    btn.onclick = function () {
                        controller.guess(parseInt(this.getAttribute("id")));
                    };
                    btn.classList.add("pieceButtonNew")
                    btn.style.backgroundColor = "cornflowerblue";
                    div = document.getElementById('gameBoardDiv');
                    div.appendChild(btn);
                }
                else {
                    btn = document.createElement("BUTTON");  // Create a <button> element
                    btn.setAttribute("id", i);
                    btn.onclick = function () {
                        controller.guess(parseInt(this.getAttribute("id")));
                    };
                    btn.classList.add("pieceButton")
                    btn.style.backgroundColor = "lawngreen";
                    div = document.getElementById('gameBoardDiv');
                    div.appendChild(btn);
                }
            }

            setTimeout(function () {
                div = document.getElementById('gameBoardDiv').children;
                for (i = 0; i < div.length; i++) {
                    div[i].setAttribute("style", "background-color: lawngreen;");
                }
            }, 1000);
        },
        highlightPiece = function () {
            controller.moveToNextLevel();
        },

        addPiece = function () {
            controller.moveToNextLevel();
        },

        clearWindow = function () {
            const div = document.getElementById('gameBoardDiv');
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }

        };
    return {
        'renderPieces': renderPieces,
        'addPiece': addPiece,
        'highlightPiece': highlightPiece
    }
})();
