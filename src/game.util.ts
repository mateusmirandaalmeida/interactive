declare let Phaser;

export namespace GameUtils {
    
    export function addText(game, x, y, text, config?) {
        const phaserText = new Phaser.Text(game, x, y, text, config || { font: "65px Arial", fill: "#ff0044", align: "center" });
        game.add.existing(phaserText);
    }
}