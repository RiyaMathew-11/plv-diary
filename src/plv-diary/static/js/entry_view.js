// entry_view.js
import { getEntryById } from "./db.js";

function getInterventionTagColor(intervention) {
  const colorMap = {
    "Filing RTI": "blue",
    "Awareness Sessions": "green",
    "Filing FIR": "red",
    "Welfare Scheme Application": "purple",
    "Drafting a Notice": "yellow",
    "Engaging a stakeholder": "indigo",
    "Filing an online complaint": "pink",
    "Helping understand a case document": "teal",
    "Legal compliance check": "orange",
    "Connection to lawyers & NGOs": "cyan",
    "ID Card Application": "lime",
  };
  return colorMap[intervention] || "gray"; // default to gray if not found
}

const loadEntryDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const entryId = parseInt(urlParams.get("id"));

  if (!entryId) {
    console.error("No entry ID provided");
    return;
  }

  const entry = await getEntryById(entryId);

  if (!entry) {
    document.getElementById("entry-details").innerHTML =
      '<p class="text-red-500">Entry not found</p>';
    return;
  }

  // Update the page title
  document.title = `PLV Diary - ${entry.subject}`;

  // Populate the header
  document.getElementById("entry-subject").textContent = entry.subject;
  const interventionTag = document.getElementById("entry-intervention");
  const tagColor = getInterventionTagColor(entry.intervention);
  interventionTag.textContent = entry.intervention;
  interventionTag.className = `px-3 py-1 text-sm font-semibold text-${tagColor}-800 bg-${tagColor}-100 rounded-full`;

  // Populate the entry details
  const entryDetailsContainer = document.getElementById("entry-details");
  entryDetailsContainer.innerHTML = `
        <div class="space-y-4">
            <p><strong>Number of Clients:</strong> ${entry.numClients}</p>
            <p><strong>Date:</strong> ${new Date(entry.date).toLocaleDateString()}</p>
            <p><strong>Narration:</strong></p>
            <p class="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">${entry.narration}</p>
            <p><strong>Contact:</strong> ${entry.contact}</p>
            ${entry.documents ? `<p><strong>Documents:</strong> ${entry.documents}</p>` : ""}
        </div>
    `;

  const editButton = document.getElementById("edit-entry");
  editButton.addEventListener("click", () => {
    window.location.href = `/form?id=${entryId}`;
  });
};

document.addEventListener("DOMContentLoaded", loadEntryDetails);
