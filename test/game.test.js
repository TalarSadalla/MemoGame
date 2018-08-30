describe('Game', function () {
    it('should have 4 pieces after game start', function () {
        var pieces;
        game.startGame();

        pieces = game.getPieces();

        expect(pieces.length).toBe(4);
    });

    it('one pieces should be to guess after game start', function () {
        var piecesToGuess;
        game.startGame();

        piecesToGuess = findPiecesToGuess(game.getPieces());

        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces,
            config = {
                numberOfPieces: 6
            };
        game.startGame(config);

        pieces = game.getPieces();

        expect(pieces.length).toBe(6);
    });

    it('should return number of pieces to guess when initial number of pieces is 4', function () {
        var pieces,
            piecesToGuess,
            config = {
                numberOfPieces: 4
            };
        game.startGame(config);

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);
        expect(piecesToGuess.length).toBe(1);
    });

    it('should return number of pieces to guess when initial number of pieces is 8', function () {
        var pieces,
            piecesToGuess,
            config = {
                numberOfPieces: 8
            };
        game.startGame(config);

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);

        expect(piecesToGuess.length).toBe(3);
    });

    it('should return true if there are correct guesses', function () {
        var pieces,
            piecesToGuess,
            piecesGuessByPlayer,
            foundElements,
            config = {
                numberOfPieces: 5
            };

        game.startGame(config);

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = pieces;

        foundElements= piecesGuessByPlayer.findIndex(function (element) {
            return element.toGuess === true;
        });

        expect(game.playerGuess(pieces,foundElements)).toBe("Next level");
    });

    it('should return false if there are no correct guesses', function () {
        var i,
            pieces,
            piecesToGuess,
            piecesGuessByPlayer,
            config = {
                numberOfPieces: 5
            };

        game.startGame(config);
        pieces = game.getPieces();
        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = pieces;

        expect(game.playerGuess(pieces, piecesGuessByPlayer.findIndex(function (element) {
            return element.toGuess === false;
        }))).toBe("Game Over");
    });

    it('should return false if there is wrong shoot', function () {
        var i,
            pieces,
            piecesToGuess,
            piecesGuessByPlayer,
            config = {
                numberOfPieces: 5
            };

        game.startGame(config);
        pieces = game.getPieces();
        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = -1;

        expect(game.playerGuess(pieces, piecesGuessByPlayer)).toBe("Game Over");
    });

    it('should return false if there is shoot out of bound', function () {
        var i,
            pieces,
            piecesToGuess,
            piecesGuessByPlayer,
            config = {
                numberOfPieces: 5
            };

        game.startGame(config);
        pieces = game.getPieces();
        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = 6;

        expect(game.playerGuess(pieces, piecesGuessByPlayer)).toBe("Game Over");
    });
    it('should return noGuess available if there are 4 pieces', function () {
        var pieces,
            piecesToGuess,
            piecesGuessByPlayer,
            foundElements,
            config = {
                numberOfPieces: 4
            };

        game.startGame(config);

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = pieces;

        foundElements= piecesGuessByPlayer.findIndex(function (element) {
            return element.toGuess === true;
        });

        expect(game.playerGuess(pieces,foundElements)).toBe("Next level");
    });


    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
            return piece.toGuess;
        });
    }
});
