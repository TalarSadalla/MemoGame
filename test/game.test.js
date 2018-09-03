'use strict';
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
        var pieces;
        game.startGame();

        pieces = game.getPieces();

        expect(pieces.length).toBe(4);
    });

    it('should return number of pieces to guess when initial number of pieces is 4', function () {
        var pieces,
            piecesToGuess,
            config = {
                numberOfPieces: 4
            };
        game.startGame();

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);
        expect(piecesToGuess.length).toBe(1);
    });

    it('should return number of pieces to guess with initial number of pieces', function () {
        var pieces,
            piecesToGuess;
        game.startGame();

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);

        expect(piecesToGuess.length).toBe(1);
    });

    it('should return true if there are correct guesses', function () {
        var pieces,
            piecesToGuess,
            piecesGuessByPlayer,
            foundElements;

        game.startGame();

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = pieces;

        foundElements = piecesGuessByPlayer.findIndex(function (element) {
            return element.toGuess === true;
        });

        expect(game.playerGuess(foundElements)).toBe("NEXT LEVEL");
    });

    it('should return false if there are no correct guesses', function () {
        var i,
            pieces,
            piecesToGuess,
            piecesGuessByPlayer;


        game.startGame();
        pieces = game.getPieces();
        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = pieces;

        expect(game.playerGuess(piecesGuessByPlayer.findIndex(function (element) {
            return element.toGuess === false;
        }))).toBe("GAME OVER");
    });

    it('should return false if there is wrong shoot', function () {
        var i,
            pieces,
            piecesToGuess,
            piecesGuessByPlayer;

        game.startGame();
        pieces = game.getPieces();
        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = -1;

        expect(game.playerGuess(piecesGuessByPlayer)).toBe("GAME OVER");
    });

    it('should return false if there is shoot out of bound', function () {
        var i,
            pieces,
            piecesToGuess,
            piecesGuessByPlayer;

        game.startGame();
        pieces = game.getPieces();
        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = 6;

        expect(game.playerGuess(piecesGuessByPlayer)).toBe("GAME OVER");
    });
    it('should return noGuess available if there are 4 pieces', function () {
        var pieces,
            piecesToGuess,
            piecesGuessByPlayer,
            foundElements;

        game.startGame();

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = pieces;

        foundElements = piecesGuessByPlayer.findIndex(function (element) {
            return element.toGuess === true;
        });

        expect(game.playerGuess(foundElements)).toBe("NEXT LEVEL");
    });

    it('should initialize Pieces', function () {
        var pieces;
        game.startGame();

        pieces = game.initializePieces();

        expect(pieces.length).toBe(4);
    });

    it('should increase level', function () {
        var pieces;
        game.startGame();

        game.increaseLevel();

        pieces = game.getPieces();

        expect(pieces.length).toBe(5);
    });

    it('should return current number of pieces', function () {
        var pieces;
        game.startGame();

        pieces = game.getPieces();
        expect(pieces.length).toBe(4);

        game.increaseLevel();
        pieces = game.getPieces();

        expect(pieces.length).toBe(5);
    });

    it('should return number of pieces to guess', function () {
        var pieces;
        game.startGame();

        pieces = game.piecesToGuess();
        expect(pieces).toBe(1);

        game.increaseLevel();
        pieces = game.piecesToGuess();

        expect(pieces).toBe(1);

        game.increaseLevel();
        game.increaseLevel();
        game.increaseLevel();
        game.increaseLevel();

        pieces = game.piecesToGuess();

        expect(pieces).toBe(3);
    });

    it('should return number of moves after correct guesses', function () {
        var pieces,
            piecesToGuess,
            piecesGuessByPlayer,
            foundElements;

        game.startGame();

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = pieces;

        foundElements = piecesGuessByPlayer.findIndex(function (element) {
            return element.toGuess === true;
        });

        game.playerGuess(foundElements);
        expect(game.getNumberOfAllMoves()).toBe(1);
    });

    it('should return number of allowed mistakes if there is wrong shoot', function () {
        var i,
            pieces,
            piecesToGuess,
            piecesGuessByPlayer;

        game.startGame();
        pieces = game.getPieces();
        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = -1;

        game.playerGuess(piecesGuessByPlayer);

        expect(game.getNumberOfMistakes()).toBe(0);
    });

    it('should return accuracy after move if there is correct shoot', function () {
        var pieces,
            piecesToGuess,
            piecesGuessByPlayer,
            foundElements;

        game.startGame();

        pieces = game.getPieces();

        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = pieces;

        foundElements = piecesGuessByPlayer.findIndex(function (element) {
            return element.toGuess === true;
        });

        game.playerGuess(foundElements);
        expect(game.getAccuracy()).toBe(100.00);
    });

    it('should return accuracy if there is wrong shoot', function () {
        var i,
            pieces,
            piecesToGuess,
            piecesGuessByPlayer;

        game.startGame();
        pieces = game.getPieces();
        piecesToGuess = findPiecesToGuess(pieces);
        piecesGuessByPlayer = -1;

        game.playerGuess(piecesGuessByPlayer);

        expect(game.getAccuracy()).toBe(0);
    });


    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
            return piece.toGuess;
        });
    }
});
