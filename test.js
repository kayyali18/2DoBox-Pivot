var $this = $(this);
$('#title-input').on('keyup', btnState);
$('#body-input').on('keyup', btnState);
$('.save-btn').on('click', saveBtn);
$('.bottom-box').on('mouseover', masterFunction);
$('#search-input').on('keyup', searchExecute);

onLoad();

function btnState () {
  $('.save-btn').prop('disabled', checkInputs);
}

function cardObject() {
    return {
        title: $('#title-input').val(),
        body: $('#body-input').val(),
        quality: 0,
        display: 'swill'
    };
}

function changeQuality (id, obj, num) {
    obj.quality += num;
    var stringify = JSON.stringify(obj);
    localStorage.setItem(id, stringify)
}

function checkInputs () {
  if ($('#title-input').val() === "" || $('#body-input').val() === "") {
     return true;
  } else {
    return false;
  }
}

function deleteBtn () {
  $('.delete-button').on('click', function() {
    $(this).parent().hide(200);
    console.log(this.parentNode.dataset.id);
    var id = this.parentNode.dataset.id;
    console.log(id);
    localStorage.removeItem(id);
  });
}

function fixQuality (id) {
  arr = ['swill', 'plausible', 'genius'];
  if (id) {
    var obj = JSON.parse(localStorage.getItem(id));
    obj.display = arr[obj.quality];
    var stringify = JSON.stringify(obj);
    localStorage.setItem(id, stringify)
    return obj.display;
  }
}

function getData() {
  $.each(localStorage, function(key) {
    var object = parseInt(key);
    var parsedObject = JSON.parse(localStorage.getItem(object))
    if (!parsedObject) {
      return false;
    }
    newCard(parsedObject, object);
    fixQuality(object)
  });
}

function localStoreCard (id) {
  var cardString = JSON.stringify(cardObject());
  localStorage.setItem(id, cardString);
}

function masterFunction() {
  deleteBtn();
}

function newCard (key, id) {
    var html =
      `<div data-id="${id}" class="card-container">
        <h2 class="title-of-card">${key.title}</h2>
        <button class="delete-button"></button>
        <p class="body-of-card">${key.body}</p>
        <button class="upvote"></button>
        <button class="downvote"></button>
        <p class="quality">quality: <span class="qualityVariable">${key.display}</span></p>
        <hr>
      </div>`
    $('.bottom-box').prepend(html);

};

function onLoad() {
  btnState();
  getData();
  voteUp();
  voteDown();
}

function saveBtn (event) {
  event.preventDefault();
  var titleInput = ($('#title-input').val());
  var bodyInput = ($('#body-input').val());
  var id = Date.now();
  newCard(cardObject(), id)
  localStoreCard(id);
  fixQuality(id);
  voteUp();
  voteDown();
}

function searchExecute() {
  console.log('working');
  $('.card-container').each(function() {
    if($(this).text().toLowerCase().indexOf($('#search-input').val().toLowerCase()) !== -1) {
      $(this).slideDown();
    } else {
      $(this).slideUp();
    }
  });
}

function voteUp () {
  $('.upvote').on('click', function (e) {
    var objID = this.parentNode.dataset.id
    var obj = JSON.parse(localStorage.getItem(objID));
    if (obj.quality <= 1){
      changeQuality (objID, obj, 1)
      $(this).siblings('p').children('span').html(fixQuality(objID));
    }
  })
}

function voteDown () {
  $('.downvote').on('click', function (e) {
    var objID = this.parentNode.dataset.id
    var obj = JSON.parse(localStorage.getItem(objID));
    if (obj.quality >= 1){
      changeQuality (objID, obj, -1)
      $(this).siblings('p').children('span').html(fixQuality(objID));
    }
  })
}
