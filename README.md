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
👉 http://localhost:8000/

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

| Code                      | Exemple                                                                                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200 OK                    | `{"id": 1,"label": "8 bd du Port, 56170 Sarzeau","housenumber": "8","street": "bd du Port","postcode": "56170","citycode": "56242","latitude": 47.58234,"longitude": -2.73745 }` |
| 400 Bad Request           | `{"error": "Le champ 'q' est requis et doit être une chaîne non vide."}`                                                                                                         |
| 404 Not Found             | `{"error": "Adresse non trouvée. Aucun résultat ne correspond à votre recherche."}`                                                                                              |
| 500 Internal Server Error | `{"error": "Erreur serveur : impossible de contacter l'API externe"} `                                                                                                           |

---

### `GET /api/addresses/:id/risks`

Récupère les risques associés à l’adresse en base via l’API Géorisques.

#### 🔁 Réponses possibles

| Code                      | Exemple                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| 200 OK                    | `json<br>{ ...JSON complet de l’API Géorisques... }`                                                 |
| 404 Not Found             | `json<br>{<br> "error": "Adresse non trouvée."<br>}`                                                 |
| 500 Internal Server Error | `json<br>{<br> "error": "Erreur serveur : échec de la récupération des données de Géorisques."<br>}` |

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
