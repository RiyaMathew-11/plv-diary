// form.js
import { addEntry } from "./db.js";

const handleSubmit = async (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const entry = {
    intervention: formData.get("intervention"),
    subject: formData.get("subject"),
    numClients: parseInt(formData.get("numClients")),
    date: new Date(formData.get("date")).toISOString(),
    narration: formData.get("narration"),
    documents: formData.get("documents").name, // For simplicity, we're just storing the file name
    contact: formData.get("contact"),
  };

  try {
    await addEntry(entry);
    alert("Entry added successfully!");
    form.reset();
  } catch (error) {
    console.error("Error adding entry:", error);
    alert("Error adding entry. Please try again.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("entry-form");
  form.addEventListener("submit", handleSubmit);
});

const interventions = [
  "Filing RTI",
  "Awareness Sessions",
  "Filing FIR",
  "Welfare Scheme Application",
  "Drafting a Notice",
  "Engaging a stakeholder",
  "Filing an online complaint",
  "Helping understand a case document",
  "Legal compliance check",
  "Connection to lawyers & NGOs",
  "ID Card Application",
];

function populateInterventionDatalist() {
  const datalist = document.getElementById("intervention-options");
  interventions.forEach((intervention) => {
    const option = document.createElement("option");
    option.value = intervention;
    datalist.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", populateInterventionDatalist);
