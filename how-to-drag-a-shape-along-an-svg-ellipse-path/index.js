"use strict";
(() => {
  // index.ts
  var init = () => {
    const $svg = document.getElementById("svg");
    const $pointer = document.getElementById("pointer");
    if (!$svg || !$pointer)
      return;
    const RADIUS_X = 220;
    const RADIUS_Y = 120;
    const {
      left: ABS_SVG_LEFT,
      top: ABS_SVG_TOP,
      width: SVG_WIDTH,
      height: SVG_HEIGHT
    } = $svg.getBoundingClientRect();
    const SVG_CENTER_LEFT = SVG_WIDTH / 2;
    const SVG_CENTER_TOP = SVG_HEIGHT / 2;
    const onValueChange = (evt) => {
      let mouseX, mouseY;
      const isMouse = evt.type.indexOf("mouse") !== -1;
      if (isMouse) {
        mouseX = evt.clientX;
        mouseY = evt.clientY;
      } else {
        mouseX = evt.touches[0].clientX;
        mouseY = evt.touches[0].clientY;
      }
      const relativeMouseX = mouseX - ABS_SVG_LEFT - SVG_CENTER_LEFT;
      const relativeMouseY = mouseY - ABS_SVG_TOP - SVG_CENTER_TOP;
      const angle = Math.atan2(relativeMouseY / RADIUS_Y, relativeMouseX / RADIUS_X);
      const newX = SVG_CENTER_LEFT + Math.cos(angle) * RADIUS_X;
      const newY = SVG_CENTER_TOP + Math.sin(angle) * RADIUS_Y;
      $pointer.setAttribute("cx", newX.toString());
      $pointer.setAttribute("cy", newY.toString());
    };
    const onMouseDown = (evt) => {
      evt.preventDefault();
      onValueChange(evt);
      window.addEventListener("mousemove", onValueChange);
      window.addEventListener("mouseup", onMouseUp);
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onValueChange);
      window.removeEventListener("mouseup", onValueChange);
    };
    $pointer.addEventListener("mousedown", onMouseDown);
    $pointer.addEventListener("mouseup", onMouseUp);
    $pointer.addEventListener("touchmove", onValueChange);
    $pointer.addEventListener("touchstart", onValueChange);
  };
  init();
})();
