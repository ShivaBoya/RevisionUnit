const searchInput = document.getElementById("searchInput");
const suggestionList = document.getElementById("suggestionList");
const wordDetails = document.getElementById("wordDetails");
const historyDiv = document.getElementById("history");
const modeToggle = document.getElementById("modeToggle");

let debounceTimer;
let searchHistory = [];

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  const query = searchInput.value.trim();
  if (!query) {
    suggestionList.innerHTML = "";
    return;
  }
  debounceTimer = setTimeout(() => {
    fetchSuggestions(query);
  }, 400);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWord(searchInput.value.trim());
  }
});

async function fetchSuggestions(query) {
  const url = `https://api.datamuse.com/sug?s=${query}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    suggestionList.innerHTML = "";
    data.slice(0, 7).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.word;
      li.addEventListener("click", () => searchWord(item.word));
      suggestionList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching suggestions:", err);
  }
}

// Search word details
async function searchWord(word) {
  if (!word) return;
  searchInput.value = word;
  suggestionList.innerHTML = "";

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Word not found");
    const data = await res.json();

    displayWordDetails(data[0]);
    updateHistory(word);
  } catch (err) {
    wordDetails.innerHTML = `<p class="error">❌ ${err.message}</p>`;
  }
}

function displayWordDetails(entry) {
  let html = `<h3>${entry.word}</h3>`;

  if (entry.phonetics && entry.phonetics.length) {
    entry.phonetics.forEach(p => {
      if (p.text) {
        html += `<p><strong>Phonetic:</strong> ${p.text}</p>`;
      }
      if (p.audio) {
        html += `<audio controls src="${p.audio}"></audio>`;
      }
    });
  }

  if (entry.origin) {
    html += `<p><strong>Origin:</strong> ${entry.origin}</p>`;
  }

  entry.meanings.forEach(meaning => {
    html += `<h4>${meaning.partOfSpeech}</h4>`;
    meaning.definitions.forEach(def => {
      html += `<p>- ${def.definition}</p>`;
      if (def.example) html += `<p><em>Example:</em> ${def.example}</p>`;

      if (def.synonyms && def.synonyms.length) {
        html += `<p><em>Synonyms:</em> `;
        def.synonyms.slice(0, 5).forEach(syn => {
          html += `<span class="synonym" style="cursor:pointer; color:blue;">${syn}</span> `;
        });
        html += `</p>`;
      }

      if (def.antonyms && def.antonyms.length) {
        html += `<p><em>Antonyms:</em> ${def.antonyms.join(", ")}</p>`;
      }
    });
  });

  wordDetails.innerHTML = html;

  document.querySelectorAll(".synonym").forEach(synEl => {
    synEl.addEventListener("click", () => {
      searchWord(synEl.textContent);
    });
  });
}

function updateHistory(word) {
  if (searchHistory.includes(word)) {
    searchHistory = searchHistory.filter(w => w !== word);
  }
  searchHistory.unshift(word);
  if (searchHistory.length > 5) searchHistory.pop();

  renderHistory();
}

function renderHistory() {
  historyDiv.innerHTML = "";
  searchHistory.forEach(word => {
    const span = document.createElement("span");
    span.textContent = word;
    span.addEventListener("click", () => searchWord(word));
    historyDiv.appendChild(span);
  });
}

modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", modeToggle.checked);
});
