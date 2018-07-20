
$('#title-input').on('keyup', btnState);
$('#body-input').on('keyup', btnState);
$('.save-btn').on('click', saveBtn);
onLoad();





function btnState () {
  $('.save-btn').prop('disabled', checkInputs);
}

function cardObject() {
    return {
        id: Date.now(),
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

//function for window load
function onLoad() {
  btnState();
  getData();
}




function saveBtn (event) {
  event.preventDefault();
  var titleInput = ($('#title-input').val());
  var bodyInput = ($('#body-input').val());
  newCard(cardObject())
  localStoreCard();

}



function newCard (key) {
    var html =
      `<div id="${key.id}"class="card-container">
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

function localStoreCard () {
  var cardString = JSON.stringify(cardObject());
  localStorage.setItem(Date.now(), cardString);
}



// var localStoreCard = function() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('card' + numCards  , cardString);
// }
