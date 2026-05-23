// Получаем элементы
const gallery = document.getElementById('gallery');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const modal = document.getElementById('modal');
const imageUrlInput = document.getElementById('image-url');
const addImageBtn = document.getElementById('add-image-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Загрузка коллекции из localStorage или начальной
let collection = JSON.parse(localStorage.getItem('imageCollection')) || [...initialImages];

// Рендер галереи
function renderGallery() {
    gallery.innerHTML = '';
    
    collection.forEach((url, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${url}" alt="Изображение ${index + 1}" onerror="this.src='https://via.placeholder.com/300x200?text=Ошибка+загрузки'">
            <div class="card-info">
                <span>Изображение ${index + 1}</span>
                <button onclick="deleteImage(${index})">Удалить</button>
            </div>
        `;
        
        gallery.appendChild(card);
    });
}

// Удаление изображения
window.deleteImage = function(index) {
    if (confirm('Удалить это изображение?')) {
        collection.splice(index, 1);
        saveToLocalStorage();
        renderGallery();
    }
};

// Сохранение в localStorage
function saveToLocalStorage() {
    localStorage.setItem('imageCollection', JSON.stringify(collection));
}

// Добавление изображения
function addImage() {
    const url = imageUrlInput.value.trim();
    
    if (!url) {
        alert('Пожалуйста, вставьте ссылку на изображение');
        return;
    }
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        alert('Ссылка должна начинаться с http:// или https://');
        return;
    }
    
    collection.unshift(url); // Добавляем в начало
    saveToLocalStorage();
    renderGallery();
    
    modal.style.display = 'none';
    imageUrlInput.value = '';
}

// Обработчики событий
addBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    imageUrlInput.focus();
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    imageUrlInput.value = '';
});

addImageBtn.addEventListener('click', addImage);

clearBtn.addEventListener('click', () => {
    if (confirm('Очистить всю коллекцию? Это действие нельзя отменить.')) {
        collection = [];
        saveToLocalStorage();
        renderGallery();
    }
});

// Закрытие модального окна при клике вне его
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Инициализация
renderGallery();