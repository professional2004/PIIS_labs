const canvas = document.getElementById('canvas');
let shape = 'circle';
let startX, startY;
let currentShape = null;

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
    
    if (shape === 'circle') {
        currentShape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        currentShape.setAttribute("cx", startX);
        currentShape.setAttribute("cy", startY);
        currentShape.setAttribute("r", 0);
    } else if (shape === 'rect') {
        currentShape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        currentShape.setAttribute("x", startX);
        currentShape.setAttribute("y", startY);
        currentShape.setAttribute("width", 0);
        currentShape.setAttribute("height", 0);
    }
    
    if (currentShape) {
        currentShape.setAttribute("fill", "transparent");
        currentShape.setAttribute("stroke", "black");
        canvas.appendChild(currentShape);
    }
});

// Обновление фигуры при движении мыши
canvas.addEventListener('mousemove', (event) => {
    if (!currentShape) return;
    
    let currentX = event.offsetX;
    let currentY = event.offsetY;

    if (shape === 'circle') {
        let radius = Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2);
        currentShape.setAttribute("r", radius);
    } else if (shape === 'rect') {
        let width = currentX - startX;
        let height = currentY - startY;
        currentShape.setAttribute("width", Math.abs(width));
        currentShape.setAttribute("height", Math.abs(height));

        if (width < 0) currentShape.setAttribute("x", currentX);
        if (height < 0) currentShape.setAttribute("y", currentY);
    }
});

// Завершение рисования фигуры
canvas.addEventListener('mouseup', () => {
    currentShape = null;
});