// script.js
const gallery = document.getElementById('gallery');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const modal = document.getElementById('modal');
const imageUrlInput = document.getElementById('image-url');
const addImageBtn = document.getElementById('add-image-btn');
const cancelBtn = document.getElementById('cancel-btn');

// ========== МЕТОДЫ РАБОТЫ С localStorage (по заданию) ==========

function loadImages() {
    const saved = localStorage.getItem(config.imagesKey);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Ошибка загрузки из localStorage:', e);
        }
    }
    // Если данных нет — создаём из начальных
    return initialImages.map(url => ({
        id: Date.now() + Math.random() * 1000,
        url: url,
        fullUrl: url,
        timestamp: new Date().toISOString()
    }));
}

function saveImages(images) {
    // Проверка на выход за пределы массива (по заданию)
    if (images.length > config.maxImages) {
        console.warn(`Превышен лимит (${config.maxImages} изображений). Лишние обрезаны.`);
        images = images.slice(0, config.maxImages);
    }
    localStorage.setItem(config.imagesKey, JSON.stringify(images));
}

// ========== Основная логика ==========

let collection = loadImages();

// Рендер
function renderGallery() {
    gallery.innerHTML = '';
    collection.forEach((img, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${img.url}" alt="Изображение ${index + 1}" 
                 onerror="this.src='https://via.placeholder.com/300x200?text=Ошибка+загрузки'">
            <div class="card-info">
                <span>Изображение ${index + 1}</span>
                <button onclick="deleteImage(${index})">Удалить</button>
            </div>
        `;
        gallery.appendChild(card);
    });
}

// Удаление с защитой
window.deleteImage = function(index) {
    if (index < 0 || index >= collection.length) return;
    if (confirm('Удалить это изображение?')) {
        collection.splice(index, 1);
        saveImages(collection);
        renderGallery();
    }
};

// Добавление
function addImage() {
    const url = imageUrlInput.value.trim();
    if (!url || !url.startsWith('http')) {
        alert('Введите корректную ссылку на изображение');
        return;
    }

    collection.unshift({
        id: Date.now(),
        url: url,
        fullUrl: url,
        timestamp: new Date().toISOString()
    });

    saveImages(collection);
    renderGallery();
    
    modal.style.display = 'none';
    imageUrlInput.value = '';
}

// Обработчики...
addBtn.addEventListener('click', () => { modal.style.display = 'flex'; imageUrlInput.focus(); });
cancelBtn.addEventListener('click', () => { modal.style.display = 'none'; imageUrlInput.value = ''; });
addImageBtn.addEventListener('click', addImage);

clearBtn.addEventListener('click', () => {
    if (confirm('Очистить всю коллекцию?')) {
        collection = [];
        saveImages(collection);
        renderGallery();
    }
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Инициализация
renderGallery();