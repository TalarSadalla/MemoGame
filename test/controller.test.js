'use strict';
describe('Controller', function () {
    it('should start game', function () {
        spyOn(game, 'startGame');
        //var stats = shoots === 0 ? 0 : 10 / shoots;
        game.startGame();
        spyOn(game, 'getPieces').and.returnValue(4);
        var initialNumberOfPieces = game.getPieces();
        spyOn(view, 'renderPieces');
        view.renderPieces(initialNumberOfPieces);
        controller.startGame();

        expect(view.renderPieces).toHaveBeenCalledWith(4);
    });

    it('should increase level', function () {
        spyOn(game, 'startGame');
        game.startGame();
        spyOn(game, 'increaseLevel').and.returnValue(5);
        var initialNumberOfPieces = game.increaseLevel();
        spyOn(view, 'renderPieces');
        view.renderPieces(initialNumberOfPieces);
        controller.startGame();

        expect(view.renderPieces).toHaveBeenCalledWith(5);
    });
});