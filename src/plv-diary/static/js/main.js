import { getRecentEntries } from './db.js';

const loadRecentEntries = async () => {
  const recentEntries = await getRecentEntries();
  const recentEntriesContainer = document.getElementById('recent-entries');

  recentEntriesContainer.innerHTML = '';

  if (recentEntries.length === 0) {
    const noEntriesElement = document.createElement('div');
    noEntriesElement.className = 'text-center py-4';
    noEntriesElement.innerHTML = `
      <p class="text-gray-500">No entries yet!</p>
    `;
    recentEntriesContainer.appendChild(noEntriesElement);
  } else {
    recentEntries.forEach(entry => {
      const entryElement = document.createElement('div');
      entryElement.className = 'border-b border-gray-200 pb-4';
      entryElement.innerHTML = `
        <h3 class="text-lg font-medium text-gray-900">${entry.intervention} - ${entry.subject}</h3>
        <p class="text-gray-500 text-sm">Updated ${new Date(entry.date).toLocaleDateString()}</p>
      `;
      recentEntriesContainer.appendChild(entryElement);
    });
  }
};

document.addEventListener('DOMContentLoaded', loadRecentEntries);
