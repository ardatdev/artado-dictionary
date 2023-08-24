// Get the "q" query string parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('i');

// Check if a query is present
if (query) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;

  // Create a new element for displaying results
  const resultElement = document.createElement('div');
    resultElement.id = 'result';
    resultElement.style.textAlign = 'left';
    resultElement.style.marginLeft = '100px';
    resultElement.style.maxWidth = '500px';
    resultElement.style.backgroundColor = 'transparent';
    resultElement.style.border = "1px solid #bdbdbd";
    resultElement.style.borderRadius = "10px";
    resultElement.style.lineHeight = "20px";
    resultElement.style.padding = "10px 10px 10px 10px";

    // Media query for smaller screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
        resultElement.style.marginRight = 'auto';
        resultElement.style.marginLeft = 'auto';
    }


  // Send a request to the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process the JSON response
      const wordData = data[0];
      const word = wordData.word;
      const phonetics = wordData.phonetics;
      const meanings = wordData.meanings;

      // Generate HTML representation
      let html = `<h2>${word}</h2>`;
      
      if (phonetics && phonetics.length > 0) {
        html += '<h3>Phonetics</h3>';
        phonetics.forEach(phonetic => {
          html += `<p>${phonetic.text}</p>`;
          if (phonetic.audio) {
            html += `<audio controls><source src="${phonetic.audio}" type="audio/mpeg"></audio>`;
          }
        });
      }
      
      if (meanings && meanings.length > 0) {
        html += '<h3>Meanings</h3>';
        meanings.forEach(meaning => {
          html += `<p><strong>${meaning.partOfSpeech}</strong></p>`;
          meaning.definitions.forEach(definition => {
            html += `<p>${definition.definition}</p>`;
          });
        });
      }

      // Set the generated HTML content
      resultElement.innerHTML = html;

      // Get the reference element
        const buttons = document.getElementById('buttons_r');

      // Insert the resultElement after the infocardElement
        buttons.insertAdjacentElement('afterend', resultElement);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
} else {

}
