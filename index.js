// LOAD ALL
function loadCharacters() {
  fetch('/characters')
    .then((res) => res.json())
    .then((data) => display(data));
}

// FILTER
function filterRole(role) {
  fetch(`/characters/role/${role}`)
    .then((res) => res.json())
    .then((data) => display(data));
}

// SEARCH
function searchCharacter() {
  const value = document.getElementById('searchInput').value;

  fetch(`/search?name=${value}`)
    .then((res) => res.json())
    .then((data) => display(data));
}

// RANDOM
function getRandom() {
  fetch('/random')
    .then((res) => res.json())
    .then((data) => display([data]));
}

// ADD
function addCharacter() {
  const name = document.getElementById('name').value;
  const role = document.getElementById('role').value;
  const difficulty = document.getElementById('difficulty').value;

  if (!name || !role || !difficulty) {
    alert('Fill all fields');
    return;
  }

  fetch('/characters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, role, difficulty }),
  })
    .then((res) => res.json())
    .then(() => {
      loadCharacters();
      clearInputs();
    });
}

// DELETE
function deleteCharacter(id) {
  fetch(`/characters/${id}`, {
    method: 'DELETE',
  }).then(() => loadCharacters());
}

// DISPLAY
function display(data) {
  const list = document.getElementById('list');
  list.innerHTML = '';

  data.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>${c.name}</h3>
      <p><strong>Role:</strong> ${c.role}</p>
      <p><strong>Difficulty:</strong> ${c.difficulty}</p>
      <div class="actions">
        <button onclick="deleteCharacter(${c.id})">Delete</button>
      </div>
    `;

    list.appendChild(card);
  });
}

// CLEAR INPUTS
function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('role').value = '';
  document.getElementById('difficulty').value = '';
}

// AUTO LOAD
loadCharacters();
