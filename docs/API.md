# API Port Russel

API REST permettant de gérer les catways et les réservations du port de plaisance Russel.

Base URL :

http://localhost:3000

---

# Catways

## GET /catways
Récupère la liste des catways.

Réponse :
[
  {
    "_id": "123",
    "catwayNumber": 1,
    "catwayType": "short",
    "catwayState": "Libre"
  }
]

---

## POST /catways
Créer un nouveau catway.

Body JSON :
{
  "catwayNumber": 30,
  "catwayType": "short"
}

---

## DELETE /catways/:id
Supprimer un catway.

Exemple :
DELETE /catways/64afdfg456

---

# Réservations

## GET /catways/:id/reservations
Liste des réservations d'un catway.

---

## POST /catways/:id/reservations
Créer une réservation.

Body JSON :
{
  "clientName": "Dupont",
  "boatName": "Sea Breeze",
  "startDate": "2026-03-01",
  "endDate": "2026-03-10"
}