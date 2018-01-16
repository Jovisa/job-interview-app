'use strict';


var listOfCandidates;

fetch('http://localhost:3333/api/candidates').then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      });
    }
  }).then(function (data) {
    listOfCandidates = data;
    render(listOfCandidates);
  }).catch(function (error) {
    console.log(error.status + ' ' + error.statusText);
  });

  function render (listOfCandidates) {
    var candidates = listOfCandidates;
    var defaultAvatar = 'http://via.placeholder.com/200x200';
    var row = document.getElementById('wrapper');
    row.innerHTML = '';
  

    for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i];
        var template = makeTemplate();

        template.image.setAttribute('src', candidate.avatar !== '' ? candidate.avatar : defaultAvatar);
        template.name.textContent = candidate.name;
        template.email.textContent = candidate.email;
        template.link.setAttribute('href', './singleCandidate.html?id=' + candidate.id);

        template.cardBody.appendChild(template.name);
        template.cardBody.appendChild(template.email);
        template.card.appendChild(template.image);
        template.card.appendChild(template.cardBody);
        template.link.appendChild(template.card);
        template.column.appendChild(template.link);
        row.appendChild(template.column);
    }
  } 

  function makeTemplate() {
    
    var column = document.createElement('div');
    column.className = 'col col-12 col-sm-6 col-md-4 col-lg-3';
    var link = document.createElement('a');
    var card = document.createElement('div');
    card.className = 'card my-2';
    var image = document.createElement('img');
    image.className = 'card-img-top';
    image.setAttribute('alt', 'Avatar Image');
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    var name = document.createElement('h5');
    name.className = 'card-title';
    var email = document.createElement('p');
    email.className = 'card-text';

    return {
        column: column,
        link: link,
        card: card,
        image: image,
        cardBody: cardBody,
        name: name,
        email: email
    }
  }

  function filter(element) {
      var text = element.value.toLowerCase();
      if (text.length === 0) {
          render(listOfCandidates);
      }

      var filterCandidates = [];
      var candidates = listOfCandidates;

      for (var i = 0; i < candidates.length; i++) {
        if (candidates[i].name.toLowerCase().indexOf(text) !== -1) {
            filterCandidates.push(candidates[i]);
        }    
      }

    //   if (filterCandidates.length === 0) {

    //   }

    //   alert div for this page "your search doesn't match any candidate"

      render(filterCandidates);

  }