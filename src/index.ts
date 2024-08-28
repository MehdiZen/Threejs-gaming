import { sceneSetup } from './sceneSetup';
import { controlsSetup } from './controlsSetup';
import { animate } from './animate';

const { scene, camera, renderer, wall } = sceneSetup();
const fps = controlsSetup(camera, renderer.domElement);

renderer.setAnimationLoop(() => {
  animate(wall, camera);
  renderer.render(scene, camera);
});

document.body.addEventListener('click', () => {
  fps.lock();
});
