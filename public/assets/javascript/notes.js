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
            deleteDisplay.attr("title", "Delete Note")

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

    // set input id as new
    $(".bunny-note-title").attr("data-id", "new");

    $(".save").remove();

})

// when the user clicks out of typing a title
$("input").blur(function () {
    // creates the save button so they can save their note
    let saveButton = $("<i>");
    saveButton.addClass("fas fa-paw save");
    saveButton.attr("title", "Save Note");
    $(".col-sm-2").prepend(saveButton);
});

// editing note to the database
$(document).on("click", ".save", function (event) {
    event.preventDefault();

    // store the id of the input
    let currentID = $('.bunny-note-title').attr('data-id');

    //stores the title and the body into these variables
    let newNote = {
        title: $(".bunny-note-title").val().trim(),
        body: $(".bunny-note-body").val().trim()
    }

    //clear the input lines so they can input the new note
    $(".bunny-note-title").val("");
    $(".bunny-note-body").val("");

    // if the currentID is new, then run the post api
    if (currentID === "new") {

        // going through the post api to log the new note into it
        $.post("/api/save_note", newNote, function (data) {
            console.log(data);
        })
    }
    // if the currentID is not new, then run the update api
    else {

        $.ajax({
            url: `/api/update_note/${currentID}`,
            type: `PUT`,
            data: newNote
        }).then(function(response){
            // console.log(response)
        })

    }
    location.reload();
    $(".save").remove();

})

// displaying note on the main section
$(document).on("click", ".noteList", function (event) {
    event.preventDefault();

    // take the title and the body from the note
    let currentTitle = $(this).attr('data-title');
    let currentBody = $(this).attr('data-body');
    let currentID = $(this).attr('data-id');

    // display it to the main note section
    $(".bunny-note-title").val(currentTitle);
    $(".bunny-note-body").val(currentBody);

    // store the ID to the input
    $(".bunny-note-title").attr("data-id", currentID);

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

// initial display of notes
displayNotes();