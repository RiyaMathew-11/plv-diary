// form.js
import { addEntry } from './db.js';

const handleSubmit = async (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const entry = {
    intervention: formData.get('intervention'),
    subject: formData.get('subject'),
    numClients: parseInt(formData.get('numClients')),
    date: new Date(formData.get('date')).toISOString(),
    narration: formData.get('narration'),
    documents: formData.get('documents').name, // For simplicity, we're just storing the file name
    contact: formData.get('contact')
  };

  try {
    await addEntry(entry);
    alert('Entry added successfully!');
    form.reset();
  } catch (error) {
    console.error('Error adding entry:', error);
    alert('Error adding entry. Please try again.');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('entry-form');
  form.addEventListener('submit', handleSubmit);
});
