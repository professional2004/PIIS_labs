document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".target");
    let draggedElement = null;
    let initialPosition = null;
    let isStuck = false;
  
    // Добавляем обработчики событий для каждого элемента с классом 'target'
    targets.forEach((target) => {
      target.addEventListener("mousedown", startDrag);
      target.addEventListener("dblclick", stickToMouse);
    });
  
    // Перетаскивание элемента
    function startDrag(event) {
      if (isStuck) return;
  
      draggedElement = event.target;
      initialPosition = { x: draggedElement.offsetLeft, y: draggedElement.offsetTop };
  
      const shiftX = event.clientX - draggedElement.getBoundingClientRect().left;
      const shiftY = event.clientY - draggedElement.getBoundingClientRect().top;
  
      // Функция для перемещения элемента по координатам мыши
      function onMouseMove(e) {
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
      initialPosition = { x: draggedElement.offsetLeft, y: draggedElement.offsetTop };
      draggedElement.style.backgroundColor = "blue";
  
      function moveWithMouse(e) {
        if (isStuck) {
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
  
    // Прерывание по клавише Esc
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (draggedElement) {
          draggedElement.style.left = initialPosition.x + "px";
          draggedElement.style.top = initialPosition.y + "px";
          draggedElement.style.backgroundColor = "red";
          draggedElement = null;
          isStuck = false;
        }
      }
    });
  });
  