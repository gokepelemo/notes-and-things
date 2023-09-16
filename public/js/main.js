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
        success: function () {},
      });
    });
  });
}
