// -----------------------------------------------------------------------------
// Variables to make it easier to switch between dev and prod
// -----------------------------------------------------------------------------
var prefix = 'https://dev.'; // Change this to 'https://' when in prod.
                             // Note that the . is necessary when in dev

// -----------------------------------------------------------------------------
// Confirmation dialogue for delete buttons
// -----------------------------------------------------------------------------
$(document).ready(function(){
  $(".delete").click(function(){
    if (!confirm("Are you sure you want to delete this?")){
      return false;
    }
  });
});

// -----------------------------------------------------------------------------
// Poem sort order toggles
// -----------------------------------------------------------------------------
var limit = 20;  // Common variable for how many results will be shown on one page
function toggleTitle() {
  if (window.location.href.indexOf("byTitleReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/poems/byTitle/skip/0/limit/' + limit;
  } else {
    window.location.href = prefix + 'fifteenlines.com/poems/byTitleReverse/skip/0/limit/' + limit;
  }
}

function toggleAuthor() {
  if (window.location.href.indexOf("byAuthorReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/poems/byAuthor/skip/0/limit/' + limit;
  } else {
    window.location.href = prefix + 'fifteenlines.com/poems/byAuthorReverse/skip/0/limit/' + limit;
  }
}

function toggleDate() {
  if (window.location.href.indexOf("byDateReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/poems/byDate/skip/0/limit/' + limit;
  } else {
    window.location.href = prefix + 'fifteenlines.com/poems/byDateReverse/skip/0/limit/' + limit;
  }
}

// -----------------------------------------------------------------------------
// Poem admin sort order toggles
// -----------------------------------------------------------------------------
function adminToggleTitle() {
  if (window.location.href.indexOf("adminByTitleReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/poems/adminByTitle/skip/0/limit/' + limit;
  } else {
    window.location.href = prefix + 'fifteenlines.com/poems/adminByTitleReverse/skip/0/limit/' + limit;
  }
}

function adminToggleAuthor() {
  if (window.location.href.indexOf("adminByAuthorReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/poems/adminByAuthor/skip/0/limit/' + limit;
  } else {
    window.location.href = prefix + 'fifteenlines.com/poems/adminByAuthorReverse/skip/0/limit/' + limit;
  }
}

function adminToggleDate() {
  if (window.location.href.indexOf("adminByDateReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/poems/adminByDate/skip/0/limit/' + limit;
  } else {
    window.location.href = prefix + 'fifteenlines.com/poems/adminByDateReverse/skip/0/limit/' + limit;
  }
}

function adminToggleHidden() {
  if (window.location.href.indexOf("adminByHiddenReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/poems/adminByHidden/skip/0/limit/' + limit;
  } else {
    window.location.href = prefix + 'fifteenlines.com/poems/adminByHiddenReverse/skip/0/limit/' + limit;
  }
}

// -----------------------------------------------------------------------------
// 'my poems' toggles
// -----------------------------------------------------------------------------
function getId() {
  // Index of the 'id' keyword.
  var i = getPosition(window.location.href, 'id', 1);
  var userId = window.location.href.substring(i + 2); // Because 'id' is 2 chars long
  // Get the position of the first /
  i = getPosition(userId, '/', 1);
  // Cut the string from the first / to the end of the user id substring
  userId = userId.substring(1, 25);
  // console.log('userId:  ' + userId);
  return(userId);
}

function myPoemsToggleTitle() {
  userId = getId();
  if (window.location.href.indexOf("myPoemsByTitleReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/poems/myPoemsByTitle/id/' + userId + '/skip/0/limit/' + limit;
  } else {
    window.location.href = prefix + 'fifteenlines.com/poems/myPoemsByTitleReverse/id/' + userId + '/skip/0/limit/' + limit;
  }
}

function myPoemsToggleDate() {
  userId = getId();
  // console.log(userId);
  if (window.location.href.indexOf("myPoemsByDateReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/poems/myPoemsByDate/id/' + userId + '/skip/0/limit/' + limit;
  } else {
    window.location.href = prefix + 'fifteenlines.com/poems/myPoemsByDateReverse/id/' + userId + '/skip/0/limit/' + limit;
  }
}

// -----------------------------------------------------------------------------
// User admin sort order toggles
// -----------------------------------------------------------------------------
function adminToggleUsername() {
  if (window.location.href.indexOf("adminByNameReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/users/adminByName';
  } else {
    window.location.href = prefix + 'fifteenlines.com/users/adminByNameReverse';
  }
}

function adminToggleEmail() {
  if (window.location.href.indexOf("adminByEmailReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/users/adminByEmail';
  } else {
    window.location.href = prefix + 'fifteenlines.com/users/adminByEmailReverse';
  }
}

function adminToggleAdmin() {
  if (window.location.href.indexOf("adminByAdminReverse") > -1) {
    window.location.href = prefix + 'fifteenlines.com/users/adminByAdmin';
  } else {
    window.location.href = prefix + 'fifteenlines.com/users/adminByAdminReverse';
  }
}

// -----------------------------------------------------------------------------
// Pagination
// -----------------------------------------------------------------------------
// getPosition is from https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

// -----------------------------------------------------------------------------
// turnPage()
// -----------------------------------------------------------------------------
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

  if ((isNaN(skip)) || (skip < 0)) {
    skip = 0;
    limit = 20;
    newUrl = prefix + 'fifteenlines.com/poems/byTitle/';
  }

  if ((isNaN(limit)) || (limit < 1)) {
    skip = 0;
    limit = 20;
    newUrl = prefix + 'fifteenlines.com/poems/byTitle';
  }

  newUrl = newUrl + 'skip/' + skip + '/limit/' + limit;
  // console.log(newUrl);
  window.location.href = newUrl; //Send the browser to the new URL.
}
