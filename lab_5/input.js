document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".target");
  let draggedElement = null;
  let initialPosition = []; // Позиции каждого элемента при загрузке страницы
  let isStuck = false;

  // Сохраняем начальные координаты для каждого элемента по его индексу
  targets.forEach((target, index) => {
    initialPosition[index] = { x: target.offsetLeft, y: target.offsetTop };

    target.addEventListener("mousedown", (event) => startDrag(event, index));
    target.addEventListener("dblclick", stickToMouse);
  });

  // Перетаскивание элемента
  function startDrag(event, index) {
    if (isStuck) return;

    draggedElement = event.target;
    const shiftX = event.clientX - draggedElement.getBoundingClientRect().left;
    const shiftY = event.clientY - draggedElement.getBoundingClientRect().top;

    // Функция для перемещения элемента по координатам мыши
    function onMouseMove(e) {
      if (!draggedElement) return;
      draggedElement.style.left = e.pageX - shiftX + "px";
      draggedElement.style.top = e.pageY - shiftY + "px";
    }

    document.addEventListener("mousemove", onMouseMove);

    // Отменяем перетаскивание при отпускании кнопки мыши
    document.addEventListener("mouseup", function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      draggedElement = null;
    });
  }

  // Приклеивание к курсору при двойном клике
  function stickToMouse(event) {
    if (isStuck) {
      isStuck = false;
      draggedElement.style.backgroundColor = "red";
      draggedElement = null;
      return;
    }

    isStuck = true;
    draggedElement = event.target;
    draggedElement.style.backgroundColor = "blue";

    function moveWithMouse(e) {
      if (isStuck && draggedElement) {
        draggedElement.style.left = e.pageX + "px";
        draggedElement.style.top = e.pageY + "px";
      }
    }

    document.addEventListener("mousemove", moveWithMouse);

    // Открепление при клике
    document.addEventListener("click", function unstick() {
      if (isStuck) {
        isStuck = false;
        draggedElement.style.backgroundColor = "red";
        document.removeEventListener("mousemove", moveWithMouse);
        document.removeEventListener("click", unstick);
        draggedElement = null;
      }
    });
  }

  // Прерывание по клавише Esc, возвращение в начальную позицию
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && draggedElement) {
      const index = Array.from(targets).indexOf(draggedElement);
      const initial = initialPosition[index];

      if (initial) {
        draggedElement.style.left = initial.x + "px";
        draggedElement.style.top = initial.y + "px";
        draggedElement.style.backgroundColor = "red";
      }

      draggedElement = null;
      isStuck = false;
    }
  });
});
