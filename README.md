# No Escape

FPS narratif dans le navigateur. **Three.js · TypeScript · Vite**, sans moteur de jeu.

---

## Le principe

Une pièce. Trois cibles. Tu les descends, la porte s'ouvre, tu passes au niveau suivant.

Sauf que le niveau suivant est la même pièce. Et les messages sur les murs changent :

> *Use WASD(ZQSD) to move* → *Deja vu ? :-)* → *You are not getting out* → *MURDERER MURDERER*
> → *Remember the names* → *Lena* → *Clara* → *Elise* → *Three names. Three targets, remember ?*

Le gameplay ne bouge jamais, seul le texte évolue, et il finit par requalifier rétroactivement
ce que le joueur a fait pendant huit niveaux sans se poser de question. Les trois cibles de
chaque salle avaient un nom.

Les textes vivent dans `src/textStage.json`, un tableau indexé par le numéro de niveau. Ajouter
un palier à la narration, c'est ajouter une entrée.

---

## Technique

Aucun moteur, aucun framework de jeu. Three.js pour le rendu, et tout le reste écrit à la main.

**Déplacement** — `PointerLockControls` pour la visée souris, et une carte de touches maintenue
sur `keydown` / `keyup` pour gérer les diagonales : deux touches enfoncées appliquent chaque
composante à la moitié de la vitesse, sinon on avancerait plus vite en diagonale qu'en ligne
droite. Clavier AZERTY (ZQSD). Shift pour marcher, Ctrl pour s'accroupir (la caméra descend de
1 à 0.5), espace pour un saut simulé par un aller-retour de la hauteur de caméra sur 300 ms.

**Collisions** — des `Box3` (AABB) sur chaque mur, chaque balle et chaque cible. Le joueur n'est
pas bloqué mais repoussé : à l'intersection, la caméra est réinjectée de 0.1 dans la direction
opposée. C'est plus simple qu'un vrai solveur, et sur des murs alignés aux axes ça suffit.

**Balles** — des meshes qui avancent le long d'un vecteur direction stocké dans leur `userData`,
retirés de la scène à l'impact ou au-delà de 100 unités de la caméra. Les boîtes englobantes
sont recyclées en parallèle du tableau de balles.

**Arme** — modélisée en douze `BoxGeometry`, six pour la forme et six en `BackSide` légèrement
plus grandes pour le contour noir. C'est la façon la moins chère d'obtenir un rendu cel-shadé
sans écrire de shader ni charger de modèle.

**Progression** — trois cibles touchées incrémentent le niveau ; la boucle de rendu détecte le
changement, vide la scène et la reconstruit avec les nouveaux textes.

---

## Lancer

```bash
npm install
npm run dev
```

Cliquer dans la fenêtre pour capturer le pointeur. ZQSD pour se déplacer, clic pour tirer,
Ctrl pour s'accroupir, Shift pour marcher.

Docker et devcontainer sont fournis (`docker-compose up`).

---

## État

Projet personnel de novembre 2024, exploration de Three.js hors framework. Huit niveaux de
texte écrits, la boucle de jeu tourne de bout en bout. Pas de son, pas de sauvegarde, pas
d'écran de fin au-delà du dernier palier.
