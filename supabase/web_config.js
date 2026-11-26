//web javascript 
//follows pattern from labwork

const listView = document.querySelector("#list-view");
const detailView = document.querySelector("#details-view");
const songsGrid = document.querySelector("#songs-gird");
const songsStatus = document.querySelector("#songs-status");
const songsCount = document.querySelector("#songs-count");
const refreshButton = document.querySelector("#songs-refresh");
const backButton = document.querySelector("#back-button");
const detailsStatus = document.querySelector("#details-status");
const songDetails = document.querySelector("#song-details");

async function loadSongs () {
	if (!songsGrid || !songsStatus) return;
	songsStatus.textContent = "Loading songs from Supabase...";
	songsGrid.replaceChildren();
	if (songsCopunt) songsCount.textContent = "";

try {
    const url = `${SUPABASE_CONFIG.url}/rest/v1/songs?select=id,title,artist,category,image_url&order=id.asc`;
    const response = await fetch(url, {
      headers: { apikey: SUPABASE_CONFIG.key }
    });
    if (!response.ok) throw new Error("HTTP " + response.status);

    const songs = await response.json();

    for (const song of songs) {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "song-card";
      card.addEventListener("click", () => loadSongDetails(song.id));

      if (song.image_url && song.image_url.startsWith("https://")) {
        const cover = document.createElement("img");
        cover.className = "song-cover";
        cover.src = song.image_url;
        cover.alt = `Album art for ${song.title}`;
        cover.loading = "lazy";
        cover.addEventListener("error", () => cover.remove());
        card.appendChild(cover);
      }

      const body = document.createElement("div");
      body.className = "song-body";

      const title = document.createElement("h2");
      title.textContent = song.title;

      const meta = document.createElement("small");
      meta.textContent = `${song.artist} · ${song.category}`;

      body.append(title, meta);
      card.appendChild(body);
      songsGrid.appendChild(card);
    }

    songsStatus.textContent = songs.length ? "Loaded successfully." : "No songs yet.";
    if (songsCount) songsCount.textContent = `${songs.length} songs`;
  } catch (error) {
    songsStatus.textContent = "Could not load songs. Check the Console.";
    console.error("Songs list API error:", error);
  }
}
