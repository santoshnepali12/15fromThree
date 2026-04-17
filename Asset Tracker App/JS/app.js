// ==========================
// API ENDPOINTS (CRUD)
// ==========================

// READ (GET) → get all posts
RAAURI = "https://jsonplaceholder.typicode.com/posts";

// CREATE (POST) → create new post
CIAURI = "https://jsonplaceholder.typicode.com/posts";

// DELETE (DELETE) → delete post
DIAURI0 = "https://jsonplaceholder.typicode.com/posts";

// Extra part of delete URL
DIAURI1 = "";


// ==========================
// PAGE LOAD
// ==========================

// Runs when page is fully loaded
$(document).ready(function () {

  // When retrieve button is clicked
  $("#retAssets").click(function () {
    getAssetList();
  });

  // When submit button is clicked
  $("#subNewForm").click(function () {
    submitNewAsset();
  });

});


// ==========================
// CREATE (POST)
// ==========================

// Send new data to server
function submitNewAsset() {

  // jsonplaceholder uses title, body, userId
  var subObj = {
    title: $('#AssetLabel').val(),
    body: $('#Note').val(),
    userId: 1
  };

  // Convert object into JSON string
  subObj = JSON.stringify(subObj);

  // Send POST request
  $.post({
    url: CIAURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
    getAssetList();
  });
}


// ==========================
// READ (GET)
// ==========================

// Get all posts and show them
function getAssetList() {

  // Show loading message
  $('#AssetList').html('<div>Loading...</div>');

  // Send GET request
  $.getJSON(RAAURI, function (data) {

    // Empty array to store output
    var items = [];

    // Loop through returned data
    $.each(data, function (key, val) {

      // Show title and body
      items.push("Post ID: " + val["id"] + "<br/>");
      items.push("Title: " + val["title"] + "<br/>");
      items.push("Body: " + val["body"] + "<br/>");

      // Update button
      items.push('<button type="button" onclick="updateAsset(' + val["id"] + ')" class="btn btn-warning">Update</button> ');

      // Delete button
      items.push('<button type="button" onclick="deleteAsset(' + val["id"] + ')" class="btn btn-danger">Delete</button><br/><br/>');

    });

    // Clear old content
    $('#AssetList').empty();

    // Add new content
    $("<div/>", {
      html: items.join("")
    }).appendTo("#AssetList");

  });
}


// ==========================
// UPDATE (PUT)
// ==========================

// Update one post by ID
function updateAsset(id) {

  // Updated data for jsonplaceholder
  var updatedObj = {
    id: id,
    title: "Updated Title " + id,
    body: "This post has been updated.",
    userId: 1
  };

  // Send PUT request
  $.ajax({
    url: CIAURI + "/" + id,
    type: "PUT",
    data: JSON.stringify(updatedObj),
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
    alert("Post " + id + " updated successfully");
    getAssetList();
  });
}


// ==========================
// DELETE (DELETE)
// ==========================

// Delete one post by ID
function deleteAsset(id) {

  $.ajax({
    type: "DELETE",
    url: DIAURI0 + "/" + id + DIAURI1
  }).done(function (msg) {
    alert("Post " + id + " deleted successfully");
    getAssetList();
  });
}