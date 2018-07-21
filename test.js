
$('#title-input').on('keyup', btnState);
$('#body-input').on('keyup', btnState);
$('.save-btn').on('click', saveBtn);
$('.bottom-box').on('mouseover', masterFunction);
onLoad();

function btnState () {
  $('.save-btn').prop('disabled', checkInputs);
}

function cardObject() {
    return {
        title: $('#title-input').val(),
        body: $('#body-input').val(),
        quality: "swill"
    };
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

function getData() {
  $.each(localStorage, function(key) {
    var object = parseInt(key);
    var parsedObject = JSON.parse(localStorage.getItem(object))
    if (!parsedObject) {
      return false;
    }
    console.log(parsedObject);
    newCard(parsedObject);
  });
}

function masterFunction() {
  deleteBtn();
}

//function for window load
function onLoad() {
  btnState();
  getData();
}




function saveBtn (event) {
  event.preventDefault();
  var titleInput = ($('#title-input').val());
  var bodyInput = ($('#body-input').val());
  var id = Date.now();
  newCard(cardObject(), id)
  localStoreCard(id);

}



function newCard (key, id) {
  console.log (id);
    var html =
      `<div data-id="${id}" class="card-container">
        <h2 class="title-of-card">${key.title}</h2>
        <button class="delete-button"></button>
        <p class="body-of-card">${key.body}</p>
        <button class="upvote"></button>
        <button class="downvote"></button>
        <p class="quality">quality: <span class="qualityVariable">${key.quality}</span></p>
        <hr>
      </div>`
    $('.bottom-box').prepend(html);

};

function localStoreCard (id) {
  var cardString = JSON.stringify(cardObject());
  localStorage.setItem(id, cardString);
}



// var localStoreCard = function() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('card' + numCards  , cardString);
// }
