# No Escape

FPS narratif dans le navigateur. **Three.js · TypeScript · Vite**, sans moteur de jeu et sans
modèle 3D importé.

---

## Le principe

Une pièce. Trois cibles. Tu les descends, tu passes au niveau suivant.

Sauf que le niveau suivant est la même pièce. Seuls les messages sur les murs changent :

> *Use WASD(ZQSD) to move* → *Deja vu ? :-)* → *You are not getting out* → *MURDERER MURDERER*
> → *Remember the names* → *Lena* → *Clara* → *Elise* → *Three names. Three targets, remember ?*

Le gameplay ne bouge jamais, seul le texte évolue, et il finit par requalifier rétroactivement
sept niveaux que le joueur a traversés sans se poser de question. Les trois cibles de chaque
salle avaient un nom.

Au huitième palier, l'arme n'est plus donnée au joueur. La scène est vidée et remplacée par un
plan collé devant la caméra. Fin.

Les textes vivent dans `src/textStage.json`, un tableau indexé par le numéro de niveau. Ajouter
un palier à la narration, c'est ajouter une entrée.

---

## Tout est construit en code

Aucun moteur, aucun framework de jeu, et **aucune géométrie importée**. Il n'y a pas un seul
`.gltf`, `.obj` ou sprite dans ce dépôt : tout ce qui est visible à l'écran est assemblé à
partir de primitives Three.js et positionné à la main.

Les murs sont des `BoxGeometry` aux dimensions choisies une par une. Les cibles et les balles
sont des `SphereGeometry`. Le sol est un `GridHelper`. Les textes muraux sont des
`TextGeometry` extrudés, attachés comme enfants du mur qui les porte, donc solidaires de sa
transformation.

**L'arme est le meilleur exemple.** Douze `BoxGeometry` : six pour la forme, et six copies à
peine plus grandes rendues en `THREE.BackSide`, qui n'apparaissent que là où elles dépassent.
Résultat, un contour noir net autour de chaque volume. C'est un cel-shading obtenu sans écrire
une ligne de shader et sans charger le moindre modèle.

La seule image du projet est celle de l'écran final. Le dossier `src/skybox/` contient des
textures qui ne sont utilisées nulle part, reliquat d'une piste abandonnée.

---

## La logique aussi

**Déplacement** — `PointerLockControls` pour la visée, et une carte de touches maintenue sur
`keydown` / `keyup` pour gérer les diagonales : deux touches enfoncées appliquent chaque
composante à la moitié de la vitesse, sinon on avancerait plus vite en diagonale qu'en ligne
droite. Clavier AZERTY. Shift pour marcher, Ctrl pour s'accroupir (la caméra descend de 1 à
0.5), espace pour un saut simulé par un aller-retour de la hauteur de caméra sur 300 ms.

**Collisions** — des `Box3` (AABB) sur chaque mur, chaque balle et chaque cible, sans moteur
physique. Le joueur n'est pas bloqué mais repoussé : à l'intersection, la caméra est réinjectée
de 0.1 dans la direction opposée. Plus simple qu'un vrai solveur, et suffisant sur des murs
alignés aux axes.

**Balles** — des meshes qui avancent le long d'un vecteur direction stocké dans leur `userData`
au moment du tir, retirés de la scène à l'impact ou au-delà de 100 unités de la caméra. Les
boîtes englobantes sont créées et recyclées en parallèle du tableau de balles.

**Progression** — trois cibles touchées incrémentent le niveau ; la boucle de rendu détecte le
changement, vide la scène et la reconstruit avec les textes du palier suivant.

---

## Lancer

```bash
npm install
npm run dev
```

Cliquer dans la fenêtre pour capturer le pointeur. ZQSD pour se déplacer, clic pour tirer,
Ctrl pour s'accroupir, Shift pour marcher, `m` pour le mode debug (vitesse ×5).

Docker et devcontainer sont fournis (`docker-compose up`).

---

## État

Projet personnel de novembre 2024, exploration de Three.js hors framework. Les huit paliers
sont écrits et la boucle tourne de bout en bout. Pas de son, pas de sauvegarde. La police de
caractères est chargée depuis `threejs.org` : c'est la seule dépendance réseau à l'exécution,
et le jeu perd ses textes muraux sans connexion.
