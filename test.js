var $this = $(this);
$('#title-input').on('keyup', btnState);
$('#body-input').on('keyup', btnState);
$('.save-btn').on('click', saveBtn);
// $('.save-btn').on('click', masterFunction);
$('#search-input').on('keyup', searchExecute);
$('.bottom-box').on('click', masterFunction);
$('.display-btn').on('click', displayAll);
$('.pri-none').on('click', none)
$('.pri-low').on('click', low)
$('.pri-normal').on('click', normal)
$('.pri-high').on('click', high)
$('.pri-critical').on('click', critical)


onLoad();

function btnState () {
  $('.save-btn').prop('disabled', checkInputs);
}

function cardObject () {
    return {
        title: $('#title-input').val(),
        body: $('#body-input').val(),
        quality: 2,
        display: 'Normal',
        completed: false
    };
}

function changeQuality (id, obj, num) {
    obj.quality += num;
    var stringify = JSON.stringify(obj);
    localStorage.setItem(id, stringify)
}

function checkCompleted (id) {
  var obj = JSON.parse(localStorage.getItem(id));
  if (obj.completed) {
    $('.card-container').data('data-id', obj.id).children('.complete').first().addClass('completed');
  }
}

function checkInputs () {
  if ($('#title-input').val() === "" || $('#body-input').val() === "") {
     return true;
  } else {
    return false;
  }
}

function clearInputs () {
   $('#title-input').val('');
   $('#body-input').val('');
}

function complete () {
  $(event.target).toggleClass('completed');
  var id = event.target.parentNode.dataset.id;
  var obj = JSON.parse(localStorage.getItem(id));
  if (obj.completed == false) obj.completed = true;
  else obj.completed = false;
  var stringify = JSON.stringify(obj);
  localStorage.setItem(id, stringify);
};

function critical () {
  $(event.target).toggleClass('red');
  $('.card-container').each(function() {
    if($(this).text().toLowerCase().indexOf('critical') == -1) {
      $(this).slideToggle('slow');
    }
  });
}

function deleteBtn () {
  if ($(event.target).hasClass('delete-button')) {
      $(event.target).parent().hide(200);
      var id = event.target.parentNode.dataset.id;
      $(event.target).parent().remove();
      localStorage.removeItem(id);
      deleteIdArray(id);
      updateCount(-1);
    };
    displayTheDisplayBtn();
    displayTopTen();
}


function deleteIdArray (id) {
  array = JSON.parse(localStorage.getItem('idArray'));
  if (array.length > 1) {
    for (x in array) {
      if (array[x] == id && x !== 0) {
        array.splice(x, 1);
      }
    }
  } else array.shift();
  localStorage.setItem('idArray', JSON.stringify(array));
}

function displayAll () {
  $('.card-container').css('display', 'block');
  $('.display-btn').hide();
}

function displayTheDisplayBtn () {
  var counter = JSON.parse(localStorage.getItem('counter'));
  if (counter < 10) {
    $('.display-btn').hide();
  } else {
    $('.display-btn').show(500);
  }
}

function displayTopTen () {
  var array = JSON.parse(localStorage.getItem('idArray'));
  var counter = 0;
  while (counter <= 9) {
    var card = $('.card-container')[counter];
    card.setAttribute('style', 'display:block')
    counter++;
  }
  for (x in array) {
    if (x > 10) {
      var card = $('.card-container')[counter];
      card.setAttribute('style', 'display:none')
    }
  }
}

function entryFixData (id, obj, text, location) {
  if (location == 'title') {
    obj.title = text;
  } else obj.body = text;
  var stringify = JSON.stringify(obj);
  localStorage.setItem(id, stringify);
}

function fixQuality (id) {
  arr = ['None', 'Low', 'Normal', 'High', 'Critical'];
  if (id) {
    var obj = JSON.parse(localStorage.getItem(id));
    obj.display = arr[obj.quality];
    var stringify = JSON.stringify(obj);
    localStorage.setItem(id, stringify)
    return obj.display;
  }
}

function getCounter () {
  var counter = JSON.parse(localStorage.getItem('counter'));
  if (!counter) {
    counter = 0;
    JSON.stringify(counter)
    localStorage.setItem('counter', counter);
  }
}

function getData () {
  var counter = 0;
  $.each(localStorage, function(key) {
    var object = parseInt(key);
    var parsedObject = JSON.parse(localStorage.getItem(object));
    if (!parsedObject) {
      return false;
    }
    newCard(parsedObject, object);
    idArray (object);
    fixQuality(object);
    checkCompleted(object);
  });
}

function high () {
  $(event.target).toggleClass('red');
  $('.card-container').each(function() {
    if($(this).text().toLowerCase().indexOf('high') == -1) {
      $(this).slideToggle('slow');
    }
  });
}

function idArray (object) {
  var idArray = JSON.parse(localStorage.getItem("idArray")) || [];
  idArray.unshift(object);
  var stringify = JSON.stringify(idArray)
  localStorage.setItem('idArray', stringify);
}

function localStoreCard (id) {
  var cardString = JSON.stringify(cardObject());
  localStorage.setItem(id, cardString);
}

function low () {
  $(event.target).toggleClass('red');
  $('.card-container').each(function() {
    if($(this).text().toLowerCase().indexOf('low') == -1) {
      $(this).slideToggle('slow');
    }
  });
}

function masterFunction() {
  if ($(event.target).hasClass('delete-button')) {
    deleteBtn(event);
  } else if ($(event.target).hasClass('upvote')) {
    voteUp(event);
  } else if ($(event.target).hasClass('downvote')) {
    voteDown(event);
  } else if ($(event.target).hasClass('complete')) {
    complete(event);
  }
}

function none () {
  $(event.target).toggleClass('red');
  $('.card-container').each(function() {
    if($(this).text().toLowerCase().indexOf('none') == -1) {
      $(this).slideToggle('slow');
    }
  });
}

function newCard (key, id) {
  var html =
    `<div data-id="${id}" class="card-container" style="display:none">
      <h2 class="title-of-card" contenteditable="true" onkeydown="updateText(event, 'title')" onfocusout="updateText(event, 'title')"
      >${key.title}</h2>
      <button class="delete-button"></button>
      <p class="body-of-card" contenteditable="true" onkeydown="updateText(event, 'body')" onfocusout="updateText(event, 'body')"
      >${key.body}</p>
      <button class="upvote"></button>
      <button class="downvote"></button>
      <i class="fas fa-check-circle complete"></i>
      <p class="quality">quality: <span class="qualityVariable">${key.display}</span></p>
      <hr>
    </div>`
  $('.bottom-box').prepend(html);
};

function normal () {
  $(event.target).toggleClass('red');
  $('.card-container').each(function() {
    if($(this).text().toLowerCase().indexOf('normal') == -1) {
      $(this).slideToggle('slow');
    }
  });
}

function onLoad () {
  btnState();
  getData();
  getCounter();
  displayTheDisplayBtn();
  displayTopTen();
}

function saveBtn (event) {
  event.preventDefault();
  var titleInput = ($('#title-input').val());
  var bodyInput = ($('#body-input').val());
  var id = Date.now();
  newCard(cardObject(), id)
  localStoreCard(id);
  fixQuality(id);
  updateCount(1);
  idArray(id);
  displayTheDisplayBtn();
  clearInputs();
  displayTopTen();
}

function searchExecute () {
  $('.card-container').each(function() {
    if($(this).text().toLowerCase().indexOf($('#search-input').val().toLowerCase()) !== -1) {
      $(this).slideDown();
    } else {
      $(this).slideUp();
    }
  });
}

function updateCount (num) {
  var counter = JSON.parse(localStorage.getItem('counter'));
  counter+= num;
  counter = JSON.stringify(counter);
  localStorage.setItem('counter', counter);
}

function updateText (e, location) {
  if (event.keyCode == 10 || event.keyCode == 13) {
    event.preventDefault();
    document.activeElement.blur();
  }
  var id = event.target.parentNode.dataset.id;
  var obj = JSON.parse(localStorage.getItem(id));
  var newText = $(`.${location}-of-card`).html();
  entryFixData(id, obj, newText, location);
}

function voteUp () {
  var objID = event.target.parentNode.dataset.id
  var obj = JSON.parse(localStorage.getItem(objID));
  if (obj.quality <= 3){
    changeQuality (objID, obj, 1)
    $(event.target).siblings('p').children('span').html(fixQuality(objID));
  }
}

function voteDown (event) {
  var objID = event.target.parentNode.dataset.id
  var obj = JSON.parse(localStorage.getItem(objID));
  if (obj.quality >= 1){
    changeQuality (objID, obj, -1);
    $(event.target).siblings('p').children('span').html(fixQuality(objID));
  }
}
