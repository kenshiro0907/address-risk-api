# 🏠 Address Risk API

API NestJS permettant :

- D’enregistrer une adresse (via l’API Adresse du gouvernement)
- De consulter les risques géographiques associés (via l’API Géorisques)

---

## 🚀 Lancement rapide avec Docker

```bash
docker compose build
docker compose up
```

L'API sera accessible sur :  
👉 http://localhost:8000/api/addresses

---

## ⚙️ Variables d’environnement

À placer dans un fichier `.env` ou `.env.example` :

```env
TYPEORM_CONNECTION=sqlite
TYPEORM_DATABASE=/data/db.sqlite
```

---

## 📌 Endpoints disponibles

### `POST /api/addresses/`

Enregistre une adresse à partir d’un champ `q`.

#### ✅ Exemple de requête

```json
POST /api/addresses/
Content-Type: application/json

{
  "q": "8 bd du port, Sarzeau"
}
```

#### 🔁 Réponses possibles

| Code   | Exemple |
| ------ | ------- |
| 200 OK | ```json |

{
"id": 1,
"label": "8 bd du Port, 56170 Sarzeau",
"housenumber": "8",
"street": "bd du Port",
"postcode": "56170",
"citycode": "56242",
"latitude": 47.58234,
"longitude": -2.73745
}`|
| 400 Bad Request |`json
{
"error": "Le champ 'q' est requis et doit être une chaîne non vide."
}`|
| 404 Not Found |`json
{
"error": "Adresse non trouvée. Aucun résultat ne correspond à votre recherche."
}`|
| 500 Internal Server Error |`json
{
"error": "Erreur serveur : impossible de contacter l'API externe."
}``` |

---

### `GET /api/addresses/:id/risks`

Récupère les risques associés à l’adresse en base via l’API Géorisques.

#### 🔁 Réponses possibles

| Code                                          | Exemple |
| --------------------------------------------- | ------- |
| 200 OK                                        | ```json |
| { ...JSON complet de l’API Géorisques... }``` |
| 404 Not Found                                 | ```json |

{
"error": "Adresse non trouvée."
}`|
| 500 Internal Server Error |`json
{
"error": "Erreur serveur : échec de la récupération des données de Géorisques."
}``` |

---

## 🧪 Tests unitaires

Un test simple est disponible dans :

```
tests/address.service.spec.ts
```

Commandes :

```bash
npm run test
```

---

## 🗂 Arborescence

```
src/
├── address/
│   ├── address.controller.ts
│   ├── address.service.ts
│   ├── address.entity.ts
│   ├── dto/
│   │   └── create-address.dto.ts
│   └── __tests__/
│       └── address.service.spec.ts
├── app.module.ts
```

---

## 📬 Dépôt Git clonable

Merci de rendre ce dépôt public et fonctionnel sans authentification.

Une fois terminé, envoie le lien à : **contact@klaire.cc**

---

**Bonne chance & bon code ⚡**
