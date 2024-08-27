import { sceneSetup } from './sceneSetup';
import { controlsSetup } from './controlsSetup';
import { animate } from './animate';

const { scene, camera, renderer, cube1, cube2, cube3 } = sceneSetup();
const fps = controlsSetup(camera, renderer.domElement);

renderer.setAnimationLoop(() => {
  animate(cube1, cube2, cube3);
  renderer.render(scene, camera);
});

document.body.addEventListener('click', () => {
  fps.lock();
});
