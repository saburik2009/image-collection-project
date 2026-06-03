// game.js
class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.hero = null;
    }

    init() {
        console.log("🚀 Game.init() запущен");

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'game-canvas';
        this.canvas.width = 420;
        this.canvas.height = 650;

        this.canvas.style.display = 'block';
        this.canvas.style.margin = '30px auto';
        this.canvas.style.border = '8px solid white';
        this.canvas.style.borderRadius = '16px';
        this.canvas.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
        this.canvas.style.background = '#1a1a1a';

        const main = document.querySelector('main');
        main.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        // Создаём экземпляр героя
        this.hero = new Hero();
        this.hero.init(this.canvas, this.ctx);

        console.log("✅ Игра и герой инициализированы");
    }
}

// Запуск игры
const game = new Game();
game.init();

// Автопереключение
setInterval(() => {
    if (game.hero) {
        game.hero.nextImage();
    }
}, 3000);