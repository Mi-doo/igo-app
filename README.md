En termes de difficulté, je n'ai pas trouvé l'exercice difficile. Le concept est celui d'une application assez classique. Cependant, j'ai rencontré quelques difficultés avec **igo-dust**. J'aurais aimé que la documentation fournisse plus d'exemples. Pour le reste, j'ai trouvé **Igo** plutôt agréable à utiliser, surtout pour la partie tests. Le fait qu'il intègre directement la base de données a vraiment simplifié l'écriture des tests d'intégration.
Concernant l'**agent**, j'ai constaté qu'il manquait les méthodes **PUT** et **DELETE**, donc je les ai ajoutées manuellement dans le fichier *agent.js* situé dans *node\_modules*. Si vous souhaitez que les tests de modification et de suppression fonctionnent, il serait préférable de les ajouter vous-même, car GitHub ignore ce dossier.

```javascript
module.exports.put = async (url, options = {}) => {
  return await send(url, { ...options, method: 'PUT' });
};

module.exports.delete = async (url, options = {}) => {
  return await send(url, { ...options, method: 'DELETE' });
};
```

J'ai également utilisé un package npm appelé **method-override** pour pouvoir envoyer des requêtes PUT et DELETE en HTML sans compliquer les choses avec AJAX.
