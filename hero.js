// Hero.js
class Hero {
    constructor() {
        this.imageObjects = [];
        this.currentImageIndex = 0;
        this.characterImages = [
            "https://picsum.photos/id/64/400/600",
            "https://picsum.photos/id/201/400/600",
            "https://picsum.photos/id/251/400/600",
            "https://picsum.photos/id/133/400/600"
        ];
    }

    init(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        console.log("🦸 Герой инициализирован");
        this.loadImages();
    }

    loadImages() {
        this.characterImages.forEach((src, index) => {
            const img = new Image();
            img.src = src;

            img.onload = () => {
                this.imageObjects[index] = img;
                console.log(`✅ Герой ${index + 1} загружен`);
                if (index === 0) this.draw();
            };

            img.onerror = () => {
                console.error(`❌ Ошибка загрузки героя: ${src}`);
            };
        });
    }

    draw() {
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
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.characterImages.length;
        this.draw();
    }
}