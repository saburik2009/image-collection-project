// game.js - Загрузка изображений на Canvas 2D

const Game = {
    canvas: null,
    ctx: null,
    currentImageIndex: 0,
    imageObjects: [],

    characterImages: [
        "https://picsum.photos/id/64/400/600",
        "https://picsum.photos/id/201/400/600",
        "https://picsum.photos/id/251/400/600",
        "https://picsum.photos/id/133/400/600"
    ],

    init() {
        console.log("🚀 Game.init() запущен");

        // Создаём canvas
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

        console.log("✅ Canvas создан");

        this.loadImages();
    },

    loadImages() {
        console.log("📥 Загружаем изображения...");

        this.characterImages.forEach((src, index) => {
            const img = new Image();
            img.src = src;

            img.onload = () => {
                this.imageObjects[index] = img;
                console.log(`✅ Изображение ${index + 1} загружено`);

                // Рисуем первое изображение сразу
                if (index === 0) this.drawImage0();
            };

            img.onerror = () => {
                console.error(`❌ Не удалось загрузить: ${src}`);
            };
        });
    },

    drawImage0() {
        if (!this.ctx || this.imageObjects.length === 0) return;

        const img = this.imageObjects[this.currentImageIndex];
        if (!img) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const x = (this.canvas.width - 400) / 2;
        const y = 40;

        this.ctx.drawImage(img, x, y, 400, 600);

        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 22px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Персонаж ${this.currentImageIndex + 1} / 4`, this.canvas.width / 2, 28);
    },

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.characterImages.length;
        this.drawImage0();
    }
};

// Запуск
Game.init();

// Автосмена каждые 3 секунды
setInterval(() => {
    if (Game.imageObjects.length > 0) {
        Game.nextImage();
    }
}, 3000);