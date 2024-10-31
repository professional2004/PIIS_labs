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
    toggleStuckMode(event.target);
  }

  function toggleStuckMode(target) {
    if (isStuck) {
      isStuck = false;
      target.style.backgroundColor = "red";
      draggedElement = null;
    } else {
      isStuck = true;
      draggedElement = target;
      draggedElement.style.backgroundColor = "blue";
      document.addEventListener("mousemove", moveWithMouse);
      document.addEventListener("click", stopStuckMode);
    }
  }

  function moveWithMouse(e) {
    if (isStuck && draggedElement) {
      draggedElement.style.left = e.pageX + "px";
      draggedElement.style.top = e.pageY + "px";
    }
  }

  function stopStuckMode() {
    if (isStuck) {
      isStuck = false;
      draggedElement.style.backgroundColor = "red";
      document.removeEventListener("mousemove", moveWithMouse);
      document.removeEventListener("click", stopStuckMode);
      draggedElement = null;
    }
  }

  // Начало сенсорного прикосновения
  function startTouch(event) {
    const touches = event.touches;
    if (touches.length > 1) {
      // Второе касание прерывает режим и возвращает элемент на исходное место
      resetDrag();
      return;
    }

    const currentTime = new Date().getTime();
    if (currentTime - lastTouchTime < 300) {
      // Двойное касание: активируем режим приклеивания
      toggleStuckMode(event.target);
    } else if (!isStuck) {
      // Обычное перетаскивание
      draggedElement = event.target;
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

  // Перемещение приклеенного элемента при сенсорном касании
  function onTouchMove(event) {
    if (isStuck && event.touches.length === 1 && draggedElement) {
      const touch = event.touches[0];
      draggedElement.style.left = touch.pageX + "px";
      draggedElement.style.top = touch.pageY + "px";
    }
  }

  document.addEventListener("touchmove", onTouchMove);

  // Завершение приклеивания для сенсора
  function endTouch(event) {
    if (isStuck && event.target === draggedElement) {
      const currentTime = new Date().getTime();
      if (currentTime - lastTouchTime < 300) {
        // Короткое касание (отпустить приклеенный элемент)
        stopStuckMode();
      }
      lastTouchTime = currentTime;
    }
  }

  // Сброс положения и возвращение элемента на начальную позицию
  function resetDrag() {
    if (draggedElement) {
      const initial = initialPosition[draggedElement];
      draggedElement.style.left = initial.x + "px";
      draggedElement.style.top = initial.y + "px";
      draggedElement.style.backgroundColor = "red";
      draggedElement = null;
      isStuck = false;
    }
  }

  // Клавиша Esc или второе касание прерывает перетаскивание
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      resetDrag();
    }
  });
});
