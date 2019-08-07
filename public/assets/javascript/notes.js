// Initial display of notes to the page
function displayNotes() {

    $(".list-group").empty();
    // call to get the data
    $.get("/api/see_notes", function (notesData) {
        console.log(notesData);

        for (var i = 0; i < notesData.length; i++) {
            let noteDiv = $("<div>");
            let noteDisplay = $("<li>");
            noteDisplay.addClass('list-group-item list-group-item-action noteList');
            noteDisplay.attr("data-id", notesData[i].id);
            noteDisplay.attr("data-title", notesData[i].title);
            noteDisplay.attr("data-body", notesData[i].body);
            noteDisplay.html(`${notesData[i].title} <i class="fas fa-ban"></i>`);
            // let deleteButton = $("<p>");
            // deleteButton.html(`<i class="fas fa-ban"></i>`);
            noteDiv.append(noteDisplay);
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
$(document).on("click", ".noteList", function (event) {
    event.preventDefault();

    let currentTitle = $(this).attr('data-title');
    let currentBody = $(this).attr('data-body');

    $(".bunny-note-title").val(currentTitle);
    $(".bunny-note-body").val(currentBody);

})

displayNotes();