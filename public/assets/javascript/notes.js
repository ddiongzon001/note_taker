// Initial display of notes to the page
function displayNotes() {

    $(".list-group").empty();
    // call to get the data
    $.get("/api/see_notes", function (notesData) {
        console.log(notesData);

        for (var i = 0; i < notesData.length; i++) {
            var noteDisplay = $("<a>");
            noteDisplay.addClass('list-group-item list-group-item-action noteList');
            noteDisplay.attr("data-id", notesData[i].id);
            noteDisplay.attr("data-title", notesData[i].title);
            noteDisplay.attr("data-body", notesData[i].body);
            noteDisplay.text(notesData[i].title);
            $(".list-group").prepend(noteDisplay);
        }
    })

}

// saving a note to the database
$("#new").on("click", function (event) {
    event.preventDefault();

    let newNote = {
        title: $(".bunny-note-title").val().trim(),
        body: $(".bunny-note-body").val().trim()
    }

    //clear the input lines
    $(".bunny-note-title").val("");
    $(".bunny-note-body").val("");

    $.post("/api/save_note", newNote, function (data) {
        console.log(data);
    })

    location.reload();
})

// displaying note on the main section
$(".noteList").on("click", function (event) {
    event.preventDefault();
    console.log("this was clicked");
    let currentTitle = $(this).attr('data-title');
    let currentBody = $(this).attr('data-body');
    console.log(currentTitle);
    console.log(currentBody);
    $(".bunny-note-title").val(currentTitle);
    $(".bunny-note-body").val(currentBody);

})

displayNotes();