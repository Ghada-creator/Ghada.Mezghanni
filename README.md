# Publications Instagram flottantes

## Installer
Remplacez index.html et style.css. Ajoutez instagram-posts.js et le dossier posts.
Conservez les autres fichiers, notamment badge.js, bubbles.js, logos, pict_profile.png et logo-gm.png.

## Ajouter vos publications
1. Enregistrez une capture ou une miniature de chaque publication dans posts, par exemple posts/post-01.jpg.
2. Ouvrez instagram-posts.js et modifiez le tableau instagramPosts au début du fichier :

```javascript
{ title: "Titre de la publication", category: "Social media", image: "posts/post-01.jpg", url: "https://www.instagram.com/p/VOTRE_IDENTIFIANT/", alt: "Description de votre image" }
```

3. Remplacez les cinq exemples par vos publications réelles ; vous pouvez en ajouter ou supprimer.
4. Téléversez les images et le fichier modifié dans GitHub.

La galerie montre des emplacements explicitement indiqués en attendant vos contenus ; aucun travail ou résultat n’est inventé. Les images ne sont pas récupérées automatiquement depuis Instagram. Les liens ouvrent les posts dans un nouvel onglet.
La carte centrale est mise en avant ; les flèches ou un clic sur une carte latérale permettent de naviguer. Aucun défilement automatique. Compatible avec la réduction des animations.
