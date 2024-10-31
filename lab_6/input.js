document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".target");
  let draggedElement = null;
  let initialPosition = {}; // Позиция элемента при загрузке страницы
  let isStuck = false;
  let lastTouchTime = 0;

  // Запоминаем исходное положение каждого элемента
  targets.forEach((target) => {
    initialPosition[target] = { x: target.offsetLeft, y: target.offsetTop };

    // Обработчики для мыши
    target.addEventListener("mousedown", startDrag);
    target.addEventListener("dblclick", stickToMouse);

    // Обработчики для сенсорного экрана
    target.addEventListener("touchstart", startTouch);
    target.addEventListener("touchend", endTouch);
  });

  // Начало перетаскивания мышью
  function startDrag(event) {
    if (isStuck) return;
    draggedElement = event.target;
    // initialPosition = { x: draggedElement.offsetLeft, y: draggedElement.offsetTop };
    const shiftX = event.clientX - draggedElement.getBoundingClientRect().left;
    const shiftY = event.clientY - draggedElement.getBoundingClientRect().top;

    function onMouseMove(e) {
      draggedElement.style.left = e.pageX - shiftX + "px";
      draggedElement.style.top = e.pageY - shiftY + "px";
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      draggedElement = null;
    });
  }

  // Режим приклеивания к мыши
  function stickToMouse(event) {
    if (isStuck) {
      isStuck = false;
      draggedElement.style.backgroundColor = "red";
      draggedElement = null;
      return;
    }

    isStuck = true;
    draggedElement = event.target;
    // initialPosition = { x: draggedElement.offsetLeft, y: draggedElement.offsetTop };
    draggedElement.style.backgroundColor = "blue";

    function moveWithMouse(e) {
      if (isStuck) {
        draggedElement.style.left = e.pageX + "px";
        draggedElement.style.top = e.pageY + "px";
      }
    }

    document.addEventListener("mousemove", moveWithMouse);

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

  // Обработка сенсорного касания
  function startTouch(event) {
    const touches = event.touches;
    if (touches.length > 1) {
      // Второе касание прерывает приклеивание
      resetDrag();
      return;
    }

    const currentTime = new Date().getTime();
    if (currentTime - lastTouchTime < 300) {
      // Режим приклеивания для двойного нажатия
      isStuck = true;
      draggedElement = event.target;
      // initialPosition = { x: draggedElement.offsetLeft, y: draggedElement.offsetTop };
      draggedElement.style.backgroundColor = "blue";
    } else {
      // Обычное перетаскивание
      draggedElement = event.target;
      // initialPosition = { x: draggedElement.offsetLeft, y: draggedElement.offsetTop };
      const shiftX = touches[0].clientX - draggedElement.getBoundingClientRect().left;
      const shiftY = touches[0].clientY - draggedElement.getBoundingClientRect().top;

      function onTouchMove(e) {
        const touch = e.touches[0];
        draggedElement.style.left = touch.pageX - shiftX + "px";
        draggedElement.style.top = touch.pageY - shiftY + "px";
      }

      document.addEventListener("touchmove", onTouchMove);

      document.addEventListener("touchend", function onTouchEnd() {
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        draggedElement = null;
      });
    }
    lastTouchTime = currentTime;
  }

  // Режим следования за пальцем в режиме приклеивания
  function onTouchMove(event) {
    if (isStuck && event.touches.length === 1) {
      const touch = event.touches[0];
      draggedElement.style.left = touch.pageX + "px";
      draggedElement.style.top = touch.pageY + "px";
    }
  }

  document.addEventListener("touchmove", onTouchMove);

  // Завершение приклеивания для сенсора
  function endTouch(event) {
    if (isStuck && event.target === draggedElement) {
      // Короткое касание завершает режим приклеивания
      isStuck = false;
      draggedElement.style.backgroundColor = "red";
      draggedElement = null;
    }
  }

  // Прерывание и возврат элемента
  function resetDrag() {
    if (draggedElement) {
      draggedElement.style.left = initialPosition[draggedElement].x + "px";
      draggedElement.style.top = initialPosition[draggedElement].y + "px";
      draggedElement.style.backgroundColor = "red";
      draggedElement = null;
      isStuck = false;
    }
  }

  // Клавиша Esc прерывает перетаскивание
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      resetDrag();
    }
  });
});
