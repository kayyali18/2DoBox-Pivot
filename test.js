
$('#title-input').on('keyup', btnState);
$('#body-input').on('keyup', btnState);
$('.save-btn').on('click', saveBtn);


onLoad();


function btnState () {
  $('.save-btn').prop('disabled', checkInputs);
}

function checkInputs () {
  if ($('#title-input').val() === "" || $('#body-input').val() === "") {
     return true;
  } else {
    return false;
  }
}

//function for window load
function onLoad() {
  btnState();
}




function saveBtn (event) {
  event.preventDefault();
  var titleInput = ($('#title-input').val());
  var bodyInput = ($('#body-input').val());
  newCard()

}



function newCard () {
    let id = 1;
    let title = 'hi';
    let body = 'hello';
    let quality = 'swill';
    var html =
      `<div id="${id}"class="card-container">
        <h2 class="title-of-card">${title}</h2>
        <button class="delete-button"></button>
        <p class="body-of-card">${body}</p>
        <button class="upvote"></button>
        <button class="downvote"></button>
        <p class="quality">quality: <span class="qualityVariable">${quality}</span></p>
        <hr>
      </div>`
    $('.bottom-box').prepend(html);

};
