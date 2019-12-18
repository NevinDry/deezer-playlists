# live-demo

https://deezer-playlist-app.etiennepuissant.eu/

# Serve App

go in deezer-playlist-app folder

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Run tests

go in deezer-playlist-app folder

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Remarque concernant l'API Deezer :

Au cours du développement, j'ai remarqué que l'API de Deezer renvoyait des réponses incohérantes.

D'après la documentation, nous pouvons utiliser les paramètres suivants dans nos requêtes : 
Pagination parameters
When the return of your request is a list of objects, you do not have to get the whole result in one time, you can paginate it if you want. Some parameters can be used to constrain the number of objects the request returns

To do this, you must pass the following parameters:
index
The offset of the first object you want to get

limit
the maximum number of objects to return

Mais en utilisant ces paramètres, je n'obtiens pas les données voulues.

Exemple : 

Prenons la playlist 5 :
https://api.deezer.com/playlist/5

La réponse nous donne une information sur le nombre de tracks que contient cette liste : nb_tracks: 58

Essayons d'obtenir ces tracks en utilisant les paramètres de pagination :

https://api.deezer.com/playlist/5/tracks?index=0&limit=25

Ici on cherche les 25 premières tracks de la playlist 5.
Or l'objet data de la réponse ne contient que 20 éléments et non 25.
De plus la propriété "next" de la réponse nous donne la requête pour obtenir les éléments suivants :
"next": "https://api.deezer.com/playlist/5/tracks?limit=25&index=25"
(a noté que le total du nombre de tracks est aussi renqeigné dans la réponse, total: 58)

Essayons la requête next :

https://api.deezer.com/playlist/5/tracks?limit=25&index=25
Cette fois-ci l'objet data de la réponse contient 24 éléments, ce qui semble inconsistant par rapport à la première requête.
La propriété next est : 
https://api.deezer.com/playlist/5/tracks?limit=25&index=50

Essayons-la :

https://api.deezer.com/playlist/5/tracks?limit=25&index=50
Cette fois-ci l'objet data de la reponse contient 7 éléments et nous avons récupéré toutes les tracks de la liste.

En suivant toutes ces requêtes, on obtient en tout : 20 + 24 + 7 = 51 tracks.
Ce nombre ne correspond pas au nombre total de tracks (58) fourni par la requête playlist.

J'ai essayé plusieurs cas de figures avec des paramètre différents, et les mêmes résultats inconsistants apparaissent.

Il y a peu d'informations sur la documentation de l'API, je n'ai donc pas plus d'informations à ce sujet.

