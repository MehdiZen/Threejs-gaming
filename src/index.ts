import { sceneSetup } from './sceneSetup';
import { controlsSetup } from './controlsSetup';
import { animate } from './animate';

const { scene, camera, renderer, wallUp, wallBack, wallLeft, wallRight, firstRoomWallLeft, firstRoomWallRight, crouchWall} = sceneSetup();
const fps = controlsSetup(camera, renderer.domElement);

renderer.setAnimationLoop(() => {
  animate(wallUp,
    wallLeft,
    wallRight,
    wallBack,
    firstRoomWallRight,
    firstRoomWallLeft,
    crouchWall, 
    camera);
  renderer.render(scene, camera);
});

document.body.addEventListener('click', () => {
  fps.lock();
});
