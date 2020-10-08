# Pizzeria
<br />

## Introduction
---

Ce projet est un squelette de projet pour une API REST de commande de pizzas. Il vous sera demandé d'ajouter les fonctionnalités mentionnées plus loin dans ce document

## Prérequis
---

Afin de pouvoir faire tourner le projet sur votre machine, il est nécessaire d'avoir MongoDB installé. Nous utilisons mongoose comme ODM pour la base de données.

Sur le lien suivant, vous trouverez les instructions d'installation correspondant à votre OS :

https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials

Pour accéder à votre base de données, vous pouvez utiliser au choix :
- MongoDB Atlas : https://www.mongodb.com/cloud/atlas
- Robo3T : https://robomongo.org/download (attention, la version studio est payante).


## Récupération du projet
---

Nous vous laissons le soin de cloner le projet sur votre machine et de réaliser les étapes suivantes

* Créez un fichier .env en suivant le fichier .env-example, afin de créer vos variables d'environnement nécessaires pour la connexion à la base de données par exemple.

* Pour initialiser les variables, lancez : `source .env`

* exécutez : `npm install`

* Afin d'hydrater votre base données avec des premières données, vous pouvez lancer les scripts situés dans le repertoire /seeders  :
```
node seeders/seedPizzas.js
node seeders/seedCustomers.js
```

* Votre serveur est prêt à être lancé : `node index.js`

**NB :** pensez à lancer Mongo si nécessaire : `service mongod start`

## Vos objectifs
---

Aujourd'hui, l'API contient les définitions des modèles Clients et Pizzas. Il est nécessaire d'ajouter plusieurs fonctionnalités pour la rendre opérationnelle. Nous cherchons à construire une API REST qui permettra d'ajouter et retrouver des informations  dans la BDD.

1. Obtenir la liste de toutes les pizzas disponibles.

2. Les clients vont pouvoir commander des pizzas. Il faut donc garder ces informations dans un document "Order". Ce document doit permettre de retrouver :
    * quelles pizzas ont été commandées par quel client
    * Chaque pizza peut être commandée avec une taille différente : S, M ou XL
    * l'heure à laquelle la commandée a été passée
    * le temps de préparation estimé. Pour chaque ingrédient qui compose une pizza de taille S, il faut compter 1 minute de préparation supplémentaire. Il faut prévoir 30 % de temps supplémentaire, pour une pizza de taille M, et encore 30 % de temps supplémentaire pour une taille XL. Il faut savoir que le four à pizza permet de cuire 4 pizzas en même temps et que leur cuisson prend 3 minutes quelque soit la taille. Le four n'est utilisée que pour une commande à la fois. Il y a deux pizzailo, l'un est chargé et de préparer les pizzas et l'autre s'occupe de la cuisson dès lors que 4 pizzas sont prête à être cuites. 

3. L'api doit donc contenir, au minimum, une route qui permet la création d'une nouvelle commande ainsi qu'une route qui permet retrouver les commandes passées.


## Informations utiles
---

Vous trouverez dans le repertoire `examples`, les JSON que vous recevez (`newOrder1.json`, `newOrder2.json` ). Nous vous conseillons de les copier/coller dans Postman ou Insomnia pour faire vos tests.

Vous pouvez organisez vos fichiers librement et créer de nouveaux repertoires si le besoins s'en fait sentir.
L'api fonctionne avec Mongoose: voici quelques liens utiles de la documentation :
* https://mongoosejs.com/docs/guide.html : pour la créaction du schema d'un nouveau document.
* https://mongoosejs.com/docs/queries.html : pour les requêtes


