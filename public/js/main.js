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
// Poem sort order toggles
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

// -----------------------------------------------------------------------------
// Poem admin sort order toggles
// -----------------------------------------------------------------------------
function adminToggleTitle() {
  if (window.location.href.indexOf("adminByTitleReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByTitle';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByTitleReverse';
  }
}

function adminToggleAuthor() {
  if (window.location.href.indexOf("adminByAuthorReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByAuthor';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByAuthorReverse';
  }
}

function adminToggleDate() {
  if (window.location.href.indexOf("adminByDateReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByDate';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByDateReverse';
  }
}

function adminToggleHidden() {
  if (window.location.href.indexOf("adminByHiddenReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByHidden';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByHiddenReverse';
  }
}
