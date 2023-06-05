/**
 * This is where we place all the initialization logic.
 */
const init = () => {

    const $svg = document.getElementById('svg');
    const $pointer = document.getElementById('pointer');
    if(!$svg || !$pointer) return;

    // The ellipse path radii constants.
    const RADIUS_X = 220;
    const RADIUS_Y = 120;

    // The absolute top left coordinates of the SVG.
    const {
        left: ABS_SVG_LEFT,
        top: ABS_SVG_TOP,
        width: SVG_WIDTH,
        height: SVG_HEIGHT
    } = $svg.getBoundingClientRect();

    // The center of the SVG.
    const SVG_CENTER_LEFT = SVG_WIDTH/2;
    const SVG_CENTER_TOP = SVG_HEIGHT/2;

    const onValueChange = (evt: MouseEvent | TouchEvent) => {

        let mouseX, mouseY;

        const isMouse = evt.type.indexOf('mouse') !== -1;

        if(isMouse){
            mouseX = (evt as MouseEvent).clientX;
            mouseY = (evt as MouseEvent).clientY;
        }
        else{
            mouseX = (evt as TouchEvent).touches[0].clientX;
            mouseY = (evt as TouchEvent).touches[0].clientY;
        }

        // Calculate the relative mouse position.
        const relativeMouseX = mouseX - ABS_SVG_LEFT - SVG_CENTER_LEFT;
        const relativeMouseY = mouseY - ABS_SVG_TOP - SVG_CENTER_TOP;

        const angle = Math.atan2(relativeMouseY / RADIUS_Y, relativeMouseX / RADIUS_X);

        const newX = SVG_CENTER_LEFT + Math.cos(angle) * RADIUS_X;
        const newY = SVG_CENTER_TOP + Math.sin(angle) * RADIUS_Y;

        $pointer.setAttribute('cx', newX.toString());
        $pointer.setAttribute('cy', newY.toString());
    }

    const onMouseDown = (evt: MouseEvent) => {
        evt.preventDefault();
        onValueChange(evt);

        window.addEventListener('mousemove', onValueChange);
        window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseUp = () => {
        window.removeEventListener('mousemove', onValueChange);
        window.removeEventListener('mouseup', onValueChange);
    };

    // Attach event listeners to the $pointer element
    // to handle mouse and touch events.
    $pointer.addEventListener('mousedown', onMouseDown);
    $pointer.addEventListener('mouseup', onMouseUp);
    $pointer.addEventListener('touchmove', onValueChange);
    $pointer.addEventListener('touchstart', onValueChange);
};

init();