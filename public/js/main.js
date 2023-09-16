// success/failure/alert messaging
let messagingPane = $(".alert");
let messagingClose = $("#cancel-message");
messagingClose.on("click", function () {
  messagingPane.hide();
});
function createMessage(msg, type) {
  let msgType =
    type === `success`
      ? `alert-success`
      : type === `info`
      ? `alert-info`
      : type === `failure`
      ? `alert-danger`
      : `alert-light`;
  messagingPane.addClass(msgType);
  $("#alert-content").html(msg);
  messagingPane.show();
  $("html, body").animate({ scrollTop: messagingPane });
}

// live update of the progress indicator on the edit profile view
let readingProgress = document.querySelector("#readingProgress");
if (readingProgress) {
  readingProgress.addEventListener("change", function () {
    document.querySelector(
      "#readingProgressDisplay"
    ).innerText = `${readingProgress.value}%`;
  });
}

// add to list drop-down on index views
let addToListActions = document.querySelectorAll(".add-to-list-action");
if (addToListActions) {
  addToListActions.forEach((action) => {
    action.addEventListener("click", function () {
      $.ajax({
        method: "POST",
        url: `/lists/${action.dataset.list}?_method=PUT`,
        data: { books: action.dataset.book },
        success: createMessage(
          `Added <strong>${action.dataset.booktitle}</strong> to <strong>${action.innerText}</strong>`,
          "success"
        ),
        statusCode: {
          500: function () {
            createMessage(
              `The application is not currently responding. Try again later.`,
              "failure"
            );
          },
          404: function () {
            createMessage(
              `The list that you trying to add a book to doesn't exist.`,
              "failure"
            );
          },
        },
      });
    });
  });
}

// link to books when notes are clicked
let notesAction = document.querySelectorAll(".notes-action");
if (notesAction) {
  notesAction.forEach((action) => {
    action.addEventListener("click", function () {
      window.location.assign(`/books/${action.dataset.book}#notes`);
    });
  });
}
