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

// -----------------------------------------------------------------------------
// User admin sort order toggles
// -----------------------------------------------------------------------------
function adminToggleUsername() {
  if (window.location.href.indexOf("adminByNameReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/users/adminByName';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/users/adminByNameReverse';
  }
}

function adminToggleEmail() {
  if (window.location.href.indexOf("adminByEmailReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/users/adminByEmail';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/users/adminByEmailReverse';
  }
}

function adminToggleAdmin() {
  if (window.location.href.indexOf("adminByAdminReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/users/adminByAdmin';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/users/adminByAdminReverse';
  }
}

function adminToggleHidden() {
  if (window.location.href.indexOf("adminByHiddenReverse") > -1) {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByHidden';
  } else {
    window.location.href = 'https://dev.fifteenlines.com/poems/adminByHiddenReverse';
  }
}

// -----------------------------------------------------------------------------
// Pagination
// -----------------------------------------------------------------------------
// From https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

function pageForward() {
  // Index of the 'skip' keyword.
  var i = getPosition(window.location.href, 'skip', 1);
  // console.log(i);
  var skip = window.location.href.substring(i + 5); // Because 'skip' is 4 chars long
  // console.log(skip);
  // Get the position of the first /
  i = getPosition(skip, '/', 1);
  // Cut the string from the first / to the end
  skip = skip.substring(0, i);
  // console.log(skip);

  // Index of the 'limit' keyword'.
  var j = getPosition(window.location.href, 'limit', 1);
  // console.log(j);
  var limit = window.location.href.substring(j + 6); // Because 'limit' is 5 chars long
  // console.log(skip);
  // Get the position of the first /
  j = getPosition(limit, '#', 1);
  // Cut the string from the first / to the end
  limit = limit.substring(0, j);
  // console.log(limit);

  // Get base URL
  var k = getPosition(window.location.href, 'skip', 1);
  var newUrl = window.location.href.substring(0 , k);
  // console.log(newUrl);

  // Build new URL
  skip = parseInt(skip);
  limit = parseInt(limit);
  skip += limit;
  newUrl = newUrl + 'skip/' + skip + '/limit/' + limit;
  console.log(newUrl);
  window.location.href = newUrl; //Send the browser to the new URL.
}


function turnPage(direction) {
  // Index of the 'skip' keyword.
  var i = getPosition(window.location.href, 'skip', 1);
  var skip = window.location.href.substring(i + 5); // Because 'skip' is 4 chars long
  // Get the position of the first /
  i = getPosition(skip, '/', 1);
  // Cut the string from the first / to the end
  skip = skip.substring(0, i);

  // Index of the 'limit' keyword'.
  var j = getPosition(window.location.href, 'limit', 1);
  var limit = window.location.href.substring(j + 6); // Because 'limit' is 5 chars long
  // Get the position of the first /
  j = getPosition(limit, '#', 1);
  // Cut the string from the first / to the end
  limit = limit.substring(0, j);

  // Get base URL
  var k = getPosition(window.location.href, 'skip', 1);
  var newUrl = window.location.href.substring(0 , k);

  // Build new URL
  skip = parseInt(skip);
  limit = parseInt(limit);

  if (direction === 'forward') {
    skip += limit;
  } else if (direction === 'back') {
    skip -= limit;
  } else {
    skip += limit;
  }

  newUrl = newUrl + 'skip/' + skip + '/limit/' + limit;
  console.log(newUrl);
  window.location.href = newUrl; //Send the browser to the new URL.
}
