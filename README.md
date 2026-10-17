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

Quiz option photos in `photos/options/` come from Wikimedia Commons:

- Won Bin – "Won Bin from acrofan.jpg", acrofan.com, CC BY-SA 3.0
- Lee Min-ho – "Lee Min-ho in June 2026.png", K-POPIT, CC BY 4.0
- Lee Dong-wook – "Lee Dong-wook at the 2024 Toronto International Film Festival (cropped).jpg", Johnsearsmedia, CC BY-SA 4.0
- Mohinga – "Mohnga.jpg", Charles Haynes, CC BY-SA 2.0
- Laphet thoke – "Lahpet thohk (20250315181751).jpg", Allervous, CC BY-SA 4.0
- Nan gyi thoke – "Nan gyi thoke.png", Yee Mon Mon, CC BY-SA 4.0
- Green tea – "China - Chengdu 22 - green tea (140902695).jpg", McKay Savage, CC BY 2.0
- Cola – "Glass of Cola.jpg", Cocktailmarler, CC BY-SA 4.0

Marks are one running total per person across all games. They are saved in the browser (localStorage) and survive refreshes.
