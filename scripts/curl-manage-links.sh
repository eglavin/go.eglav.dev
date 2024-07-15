curl \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{ "url": "https://github.com/eglavin" }' \
  http://127.0.0.1:3000/api/create


curl \
  http://127.0.0.1:3000:3000/YGA01C \
  -v


curl \
  -H 'Content-Type: application/json' \
  -X PUT \
  -d '{ "id": 1, "url": "https://github.com/eglavin" }' \
  http://127.0.0.1:3000/api/update


curl \
  -H 'Content-Type: application/json' \
  -X DELETE \
  -d '{ "id": 1 }' \
  http://127.0.0.1:3000/api/delete

