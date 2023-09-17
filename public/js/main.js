// success/failure/alert messaging
let messagingPane = $(".alert");
let messagingClose = $("#cancel-message");
messagingClose.on("click", function (e) {
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
};

// handle notes/book lists on book detail view
let bookViewLink = $(".books-nav-link");
bookViewLink.on("click", function (e) {
  if (e.target.id === "book-list-btn") {
    $("#book-list-btn")
      .addClass("bg-black active text-white")
      .removeClass("text-body");
    $("#notes-btn")
      .addClass("text-body")
      .removeClass("bg-black active text-white");
    $("#notes-view").hide();
    $("#book-list-view").show();
  } else {
    $("#notes-btn")
      .addClass("bg-black active text-white")
      .removeClass("text-body");
    $("#book-list-btn")
      .addClass("text-body")
      .removeClass("bg-black active text-white");
    $("#book-list-view").hide();
    $("#notes-view").show();
  }
});

// handle read/to read on list detail view
let bookNav = $(".lists-nav-link,.user-nav-link");
bookNav.on("click", function (e) {
  if (e.target.id === "read-books-btn") {
    $("#read-books-btn")
      .addClass("bg-black active text-white")
      .removeClass("text-body");
    $("#to-read-books-btn")
      .addClass("text-body")
      .removeClass("bg-black active text-white");
    $("#to-read-books-view").hide();
    $("#read-books-view").show();
  } else if (e.target.id === "to-read-books-btn") {
    $("#to-read-books-btn")
      .addClass("bg-black active text-white")
      .removeClass("text-body");
    $("#read-books-btn")
      .addClass("text-body")
      .removeClass("bg-black active text-white");
    $("#read-books-view").hide();
    $("#to-read-books-view").show();
  }
});

// live update of the progress indicator on the edit profile view
let readingProgress = document.querySelector("#readingProgress");
if (readingProgress) {
  readingProgress.addEventListener("change", function () {
    document.querySelector(
      "#readingProgressDisplay"
    ).innerText = `${readingProgress.value}%`;
  });
};

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
          `Added <strong>${action.dataset.booktitle}</strong> to <strong><a href=/lists/${action.dataset.list}>${action.innerText}</a></strong>`,
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
};

// link to books when notes are clicked
let notesAction = document.querySelectorAll(".notes-action");
if (notesAction) {
  notesAction.forEach((action) => {
    action.addEventListener("click", function () {
      window.location.assign(`/books/${action.dataset.slug}#notes`);
    });
  });
};

// share buttons
let link, text, media, shareAction = $(".share-x,.share-facebook,.share-pinterest");
shareAction.on("click", function(e) {
  if (e.target.classList.contains("share-x")) {
    link = e.target.dataset.link;
    text = e.target.dataset.text;
    media = e.target.dataset.media;
    window.location.assign(`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`);
  };
  if (e.target.classList.contains("share-facebook")) {
    link = e.target.dataset.link;
    text = e.target.dataset.text;
    media = e.target.dataset.media;
    window.location.assign(`http://facebook.com/dialog/feed?link=${encodeURIComponent(link)}&app_id=1064187921698537`);
  };
  if (e.target.classList.contains("share-pinterest")) {
    link = e.target.dataset.link;
    text = e.target.dataset.text;
    media = e.target.dataset.media;
    window.location.assign(`http://pinterest.com/pin/create/link/?url=${encodeURIComponent(link)}&description=${encodeURIComponent(text)}&media=${encodeURIComponent(media)}`);
  };
})