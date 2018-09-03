'use strict';
var view = (function () {
    var renderPieces = function (pieces) {
            clearWindow();

            var btn,
                i,
                div,
                defaultHighlightTime = 1,
                customHighlightTime = getHighlightTime();
            lockButtons();
            for (i = 0; i < pieces.length; i++) {

                if (pieces[i].toGuess) {
                    btn = document.createElement("BUTTON");  // Create a <button> element
                    btn.setAttribute("id", i);
                    btn.onclick = function () {
                        controller.takeAShot(parseInt(this.getAttribute("id")));
                    };
                    btn.classList.add("pieceButtonNew");
                    div = document.getElementById('gameBoardDiv');
                    div.appendChild(btn);
                }
                else {
                    btn = document.createElement("BUTTON");  // Create a <button> element
                    btn.setAttribute("id", i);
                    btn.onclick = function () {
                        controller.takeAShot(parseInt(this.getAttribute("id")));
                    };
                    btn.classList.add("pieceButton");
                    div = document.getElementById('gameBoardDiv');
                    div.appendChild(btn);
                }
            }

            if (defaultHighlightTime < customHighlightTime) {
                defaultHighlightTime = customHighlightTime;
            }
            setTimeout(function () {
                div = document.getElementById('gameBoardDiv').children;
                for (i = 0; i < div.length; i++) {
                    div[i].setAttribute("class", "pieceButton");

                }
            }, defaultHighlightTime * 1000);
            unlockButtons();

            addStatistics();
        },
        highlightPiece = function () {
            controller.moveToNextLevel();
        },
        getHighlightTime = function () {
            return document.getElementById("highlightTimeId").value;
        },

        addPiece = function () {
            controller.moveToNextLevel();
        },

        changeState = function (id, resultOfGuess) {
            var div = document.getElementById(id);
            if (resultOfGuess === "CORRECT") {
                div.setAttribute("class", "hitedPiece");
            } else if (resultOfGuess === "NEXT LEVEL") {
                div.setAttribute("class", "hitedPiece");
            } else if (resultOfGuess === "GAME OVER") {
                div.setAttribute("class", "missedPiece");
            } else if (resultOfGuess === "MISSED") {
                div.setAttribute("class", "missedPiece");
            }

        },
        lockButtons = function () {
            const div = document.getElementById('gameBoardDiv');
            div.classList.add("disable");
        },
        unlockButtons = function () {
            const div = document.getElementById('gameBoardDiv');
            div.classList.remove("disable");
        },
        clearWindow = function () {
            const div = document.getElementById('gameBoardDiv');
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            div.classList.remove("disable");
        },

        addStatistics = function () {
            var accuracy,
                numberOfMistakes,
                numberOfMoves,
                piecesToGuess;
            accuracy = controller.getAccuracy();
            numberOfMistakes = controller.getNumberOfMistakes();
            numberOfMoves = controller.getNumberOfMoves();
            piecesToGuess = controller.getPiecesToGuess();
            document.getElementById("accuracy").innerText = accuracy.toString();
            document.getElementById("numberOfMistakes").innerText = numberOfMistakes.toString();
            document.getElementById("numberOfMoves").innerText = numberOfMoves.toString();
            document.getElementById("piecesToGuess").innerText = piecesToGuess.toString();

        };
    return {
        'renderPieces': renderPieces,
        'addPiece': addPiece,
        'highlightPiece': highlightPiece,
        'changeState': changeState,
        'addStatistics': addStatistics,
        'lockButtons': lockButtons,
        'unlockButtons': unlockButtons,
        'getHighlightTime': getHighlightTime
    }
})();
