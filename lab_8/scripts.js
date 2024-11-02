const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let shape = 'circle';
let startX, startY;
let isDrawing = false;
const shapes = []; // Массив для хранения всех нарисованных фигур

// Обработчик выбора фигуры
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', (event) => {
        shape = event.target.value;
    });
});

// Начало рисования
canvas.addEventListener('mousedown', (event) => {
    startX = event.offsetX;
    startY = event.offsetY;
    isDrawing = true;
});

// Рисование фигуры при движении мыши
canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;
    const width = currentX - startX;
    const height = currentY - startY;


    // Очистка холста
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Перерисовываем все сохраненные фигуры
    shapes.forEach(({ type, x, y, w, h }) => {
        ctx.beginPath();
        if (type === 'circle') {
            const radius = Math.sqrt(w ** 2 + h ** 2);
            ctx.arc(x, y, radius, 0, Math.PI * 2);
        } else if (type === 'rect') {
            ctx.rect(x, y, w, h);
        }
        ctx.stroke();
    });



    // Рисуем текущую фигуру
    ctx.beginPath();
    if (shape === 'circle') {
        const radius = Math.sqrt(width ** 2 + height ** 2);
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    } else if (shape === 'rect') {
        ctx.rect(startX, startY, width, height);
    }
    ctx.stroke();
});


// Завершение рисования фигуры и сохранение ее на холсте
canvas.addEventListener('mouseup', (event) => {
    if (!isDrawing) return;
    isDrawing = false;

    const currentX = event.offsetX;
    const currentY = event.offsetY;
    const width = currentX - startX;
    const height = currentY - startY;

    // Сохраняем фигуру в массив
    shapes.push({ type: shape, x: startX, y: startY, w: width, h: height });

    // Рисуем фигуру окончательно
    ctx.beginPath();
    if (shape === 'circle') {
        const radius = Math.sqrt(width ** 2 + height ** 2);
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    } else if (shape === 'rect') {
        ctx.rect(startX, startY, width, height);
    }
    ctx.stroke();
});


// Очистка canvas при отжатии мыши
canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});