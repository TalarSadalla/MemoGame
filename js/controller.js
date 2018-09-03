'use strict';
var controller = function () {
    var startGame = function () {
            game.startGame();
            view.renderPieces(game.getPieces());
        },
        addPiece = function () {
            view.addPiece(game.getPieces());
        },
        guess = function (i) {
            game.playerGuess(i);
        },
        getAccuracy = function () {
            return game.getAccuracy();
        },
        getNumberOfMoves = function () {
            return game.getNumberOfAllMoves();
        },
        getNumberOfMistakes = function () {
            return game.getNumberOfMistakes();
        },
        getPiecesToGuess = function () {
            return game.piecesToGuess();
        },
        moveToNextLevel = function () {
            game.increaseLevel();
            view.renderPieces(game.getPieces());
        },
        highlightPiece = function () {
            view.renderPieces(game.getPieces());
        },
        lockPieces = function () {
            view.lockButtons();
        },
        unlockPieces = function () {
            view.lockButtons();
        },
        takeAShot = function (id) {
            var resultOfGuess;
            resultOfGuess = game.playerGuess(id);
            view.changeState(id, resultOfGuess);

            if (resultOfGuess === "GAME OVER") {
                lockPieces();
                setTimeout(startGame, 2000);

            } else if (resultOfGuess === "NEXT LEVEL") {
                lockPieces();
                setTimeout(moveToNextLevel, 2000);
            }
        };

    return {
        'startGame': startGame,
        'addPiece': addPiece,
        'guess': guess,
        'moveToNextLevel': moveToNextLevel,
        'highlightPiece': highlightPiece,
        'takeAShot': takeAShot,
        'getAccuracy': getAccuracy,
        'getNumberOfMistakes': getNumberOfMistakes,
        'getNumberOfMoves': getNumberOfMoves,
        'getPiecesToGuess': getPiecesToGuess,
    }

}();
