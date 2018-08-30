var controller = function () {
    var startGame = function () {
            game.startGame();
            view.renderPieces(game.getPieces());
        },
        addPiece = function () {
            view.addPiece(game.getPieces());
        },
        guess = function (i) {
            game.playerGuess(game.getPieces(), i);
        },

        moveToNextLevel= function () {
            game.increaseLevel();
            view.renderPieces(game.getPieces());
        },
        higlightPiece = function () {
            view.renderPieces(game.getPieces());
        }


    return {
        'startGame': startGame,
        'addPiece': addPiece,
        'guess': guess,
        'moveToNextLevel': moveToNextLevel,
        'higlightPiece': higlightPiece
    }

}();
