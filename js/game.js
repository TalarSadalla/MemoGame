var game = (function () {

        var initialNumberOfPieces = 4,
            currentNumberOfPieces = initialNumberOfPieces,
            piecesToGuess;
        var startGame = function () {
                currentNumberOfPieces = initialNumberOfPieces;
            },

            increaseLevel = function () {
                currentNumberOfPieces++;
            },



            piecesToGuess = function findPiecesToGuess(pieces) {
                return pieces.filter(function (piece) {
                    return piece.toGuess;
                });
            },

            getPieces = function () {
                var i,
                    pieces = [];
                for (i = 0; i < currentNumberOfPieces; i++) {
                    pieces.push({});
                    pieces[i].id = i;
                    pieces[i].toGuess = false;
                    pieces[i].isGuess = false;
                }
                pieces = numberOfPiecesToGuess(pieces);
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
                return pieces;
            },

            playerGuess = function (pieces, pieceGuessByPlayerId) {
                if (checkGuess(pieces, pieceGuessByPlayerId)) {

                    if (!anyGuessAvailable(pieces)) {
                        console.log("Next");
                        return "Next level";
                    }
                    console.log("Good");
                }
                else {
                    return "Game Over";
                    game.startGame({
                        numberOfPieces: initialNumberOfPieces
                    });
                }
            },
            anyGuessAvailable = function (pieces) {
                for (i = 0; i < pieces.length; i++) {
                    if (pieces[i].toGuess === true && pieces[i].isGuess === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            checkGuess = function (pieces, pieceGuessByPlayerId) {
                var i,
                    isGuess = false
                if (pieceGuessByPlayerId < 0 || pieceGuessByPlayerId > pieces.length) {
                    isGuess = false;
                }
                for (i = 0; i < pieces.length; i++) {
                    if (pieces[i].id === pieceGuessByPlayerId && pieces[i].toGuess) {
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
            'playerGuess': playerGuess,
            'piecesToGuess': piecesToGuess,
            'increaseLevel': increaseLevel
        }
    }
)
();
