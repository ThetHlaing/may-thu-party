# May Thu's Birthday Party 🎂

A small website for running the party games. No install needed.

## Run it

Option 1 – just double-click `index.html`.

Option 2 – serve it locally (better for photos on some browsers):

```bash
cd /Users/hlaingthet/party-game && python3 -m http.server 8000
```

then open http://localhost:8000

## Edit content

- `games.js`  – game titles, quiz questions, parcel-game steps
- `people.js` – the participants' names and photo paths (photos go in `photos/`)

Marks are one running total per person across all games. They are saved in the browser (localStorage) and survive refreshes.
