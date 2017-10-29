// -----------------------------------------------------------------------------
// Confirmation dialogue for delete buttons
// -----------------------------------------------------------------------------
$(document).ready(function(){
  $(".delete").click(function(){
    if (!confirm("Do you want to delete")){
      return false;
    }
  });
});

// -----------------------------------------------------------------------------
// Sort order toggles
// -----------------------------------------------------------------------------
function toggleTitle() {
  if (window.location.href.indexOf("byTitleReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/poems/byTitle';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/poems/byTitleReverse';
  }
}

function toggleAuthor() {
  if (window.location.href.indexOf("byAuthorReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/poems/byAuthor';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/poems/byAuthorReverse';
  }
}

function toggleDate() {
  if (window.location.href.indexOf("byDateReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/poems/byDate';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/poems/byDateReverse';
  }
}
