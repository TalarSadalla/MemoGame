'use strict';
var game = (function () {

        var initialNumberOfPieces = 4,
            currentNumberOfPieces = initialNumberOfPieces,
            pieces = [],
            initialNumberOfAllowedMistakes = 0,
            allowedMistakes,
            numberOfMistakes = 0,
            numberOfMoves = 0,
            numberOfShots = 0,
            startGame = function () {
                currentNumberOfPieces = initialNumberOfPieces;
                initialNumberOfAllowedMistakes;
                allowedMistakes = 0;
                numberOfMistakes = allowedMistakes;
                pieces = initializePieces();
            },

            increaseLevel = function () {
                currentNumberOfPieces++;
                numberOfMistakes;
                numberOfMoves;
                pieces = initializePieces();
                initialNumberOfAllowedMistakes;
            },

            getNumberOfAllMoves = function () {
                return numberOfMoves;
            },

            getNumberOfMistakes = function () {
                return allowedMistakes;
            },

            getAccuracy = function () {
                if (numberOfMoves === 0) {
                    return 0;
                }
                return Math.round((numberOfShots / numberOfMoves) * 10000) / 100;
            },

            piecesToGuess = function findPiecesToGuess() {
                return pieces.filter(function (piece) {
                    return piece.toGuess;
                }).length;
            },

            getNumberOfPieces = function () {
                return currentNumberOfPieces;
            },

            initializePieces = function () {
                var i,
                    pieces = [];
                for (i = 0; i < currentNumberOfPieces; i++) {
                    pieces.push({
                        id: i,
                        toGuess: false,
                        isGuess: false
                    });
                }
                pieces = numberOfPiecesToGuess(pieces);
                return pieces;
            },

            getPieces = function () {
                return pieces;
            },

            numberOfPiecesToGuess = function (pieces) {
                var i = 0,
                    randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * pieces.length);
                    if (!pieces[randomIndex].toGuess) {
                        pieces[randomIndex].toGuess = true;
                        i++;
                    }
                }
                while (i < Math.floor((pieces.length / 2) - 1));
                allowedMistakes = Math.floor(((pieces.length / 2) - 1) / 3);
                numberOfMistakes = allowedMistakes;
                return pieces;
            },

            playerGuess = function (pieceGuessByPlayerId) {
                if (pieceGuessByPlayerId < 0 || pieceGuessByPlayerId > pieces.length) {
                    numberOfMoves = numberOfMoves + 1;
                    numberOfMistakes = numberOfMistakes - 1;
                    return "GAME OVER";
                }
                if (pieces[pieceGuessByPlayerId].isGuess) {
                    if (numberOfMistakes <= allowedMistakes) {
                        return "GAME OVER";
                    }
                    numberOfMoves = numberOfMoves + 1;
                    numberOfMistakes = numberOfMistakes - 1;
                }
                if (checkGuess(pieceGuessByPlayerId)) {
                    if (!anyGuessAvailable()) {
                        numberOfShots = numberOfShots + 1;
                        numberOfMoves = numberOfMoves + 1;
                        return "NEXT LEVEL";
                    }
                    numberOfShots = numberOfShots + 1;
                    numberOfMoves = numberOfMoves + 1;
                    return "CORRECT";
                }
                else {
                    if (numberOfMistakes <= allowedMistakes) {
                        return "GAME OVER";
                    }
                    numberOfMoves = numberOfMoves + 1;
                    numberOfMistakes = numberOfMistakes - 1;
                }
            },
            anyGuessAvailable = function () {
                var i,
                    isGuessAvailable = false;
                for (i = 0; i < pieces.length; i++) {
                    if (pieces[i].toGuess === true && pieces[i].isGuess === false) {
                        isGuessAvailable = true;
                    }
                }
                return isGuessAvailable;
            },
            checkGuess = function (pieceGuessByPlayerId) {
                var i,
                    isGuess = false;
                for (i = 0; i < pieces.length; i++) {
                    if (pieces[i].id === pieceGuessByPlayerId && pieces[i].toGuess) {
                        pieces[i].isGuess = true;
                        isGuess = true;
                    } else if (pieces[i].id === pieceGuessByPlayerId && pieces[i].isGuess) {
                        isGuess = false;
                    }
                }
                return isGuess;
            };

        return {
            'startGame': startGame,
            'getPieces': getPieces,
            'initializePieces': initializePieces,
            'playerGuess': playerGuess,
            'piecesToGuess': piecesToGuess,
            'increaseLevel': increaseLevel,
            'getNumberOfPieces': getNumberOfPieces,
            'getNumberOfAllMoves': getNumberOfAllMoves,
            'getNumberOfMistakes': getNumberOfMistakes,
            'getAccuracy': getAccuracy
        }
    }
)
();
