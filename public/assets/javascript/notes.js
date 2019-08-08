// Initial display of notes to the page
function displayNotes() {

    $(".list-group").empty();

    // call to get the data
    $.get("/api/see_notes", function (notesData) {
        console.log(notesData);

        // for each note, creates the div, list and delete button
        for (var i = 0; i < notesData.length; i++) {
            // create the divs & the list group
            let noteDiv = $("<div>");
            let noteDisplay = $("<li>");
            let noteText = $("<p>")
            let deleteDisplay = $("<i>");

            // adds the class from bootstrap & font awesome
            noteDisplay.addClass('list-group-item list-group-item-action');
            noteText.addClass(`noteList`);
            deleteDisplay.addClass('fas fa-poop delete');

            // saves the id, title, and body to the following attributes
            noteText.attr("data-id", notesData[i].id);
            noteText.attr("data-title", notesData[i].title);
            noteText.attr("data-body", notesData[i].body);
            deleteDisplay.attr("data-id", notesData[i].id);

            // shows whats on each <li>
            noteText.text(`${notesData[i].title}`);
            noteDisplay.html(noteText);
            noteDisplay.append(deleteDisplay);

            // appends to the div we createdgi
            noteDiv.append(noteDisplay);

            // appends to the div on the page
            $(".list-group").prepend(noteDiv);
        }
    })

}

// creating a NEW note to the database
$("#new").on("click", function (event) {
    event.preventDefault();

    //clear the input lines so they can input the new note
    $(".bunny-note-title").val("");
    $(".bunny-note-body").val("");

})

// editing note to the database
$("#save").on("click", function (event) {

})

// displaying note on the main section
$(document).on("click", ".noteList", function (event) {
    event.preventDefault();

    // take the title and the body from the note
    let currentTitle = $(this).attr('data-title');
    let currentBody = $(this).attr('data-body');

    // display it to the main note section
    $(".bunny-note-title").val(currentTitle);
    $(".bunny-note-body").val(currentBody);

})

// deleting the notes
$(document).on("click", ".delete", function (event) {
    event.preventDefault();

    let currentID = $(this).attr('data-id');

    $.ajax({
        url: `/api/delete_note/${currentID}`,
        method: `DELETE`
    }).then(function (response) {
        console.log(response);
    });

    location.reload();
})



displayNotes();

$("input").keyup(function(){
    let saveButton = $("<i>");
    $(".col-sm-2").prepend();
  });