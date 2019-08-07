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
            let deleteDisplay = $("<i>");

            // adds the class from bootstrap & font awesome
            noteDisplay.addClass('list-group-item list-group-item-action noteList');
            deleteDisplay.addClass('fas fa-poop delete');
           
            // saves the id, title, and body to the following attributes
            noteDisplay.attr("data-id", notesData[i].id);
            noteDisplay.attr("data-title", notesData[i].title);
            noteDisplay.attr("data-body", notesData[i].body);
            deleteDisplay.attr("data-id", notesData[i].id);

            // shows whats on each <li>
            noteDisplay.html(`<p class="noteText">${notesData[i].title}</p>`);
            noteDisplay.append(deleteDisplay);

            // appends to the div we created
            noteDiv.append(noteDisplay);

            // appends to the div on the page
            $(".list-group").prepend(noteDiv);
        }
    })

}

// saving a note to the database
$("#new").on("click", function (event) {
    event.preventDefault();

    // creating the note from the front-end form
    let newNote = {
        title: $(".bunny-note-title").val().trim(),
        body: $(".bunny-note-body").val().trim()
    }

    //clear the input lines
    $(".bunny-note-title").val("");
    $(".bunny-note-body").val("");

    // going through the post api to log the new note into it
    $.post("/api/save_note", newNote, function (data) {
        console.log(data);
    })

    location.reload();
})

// displaying note on the main section
$(document).on("click", ".noteText", function (event) {
    event.preventDefault();

    let currentTitle = $(this).attr('data-title');
    let currentBody = $(this).attr('data-body');

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
    }).then(function(response){
        console.log(response);
    });

    location.reload();
})

displayNotes();