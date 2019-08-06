

// Initial display of notes to the page
function displayNotes(){
    // call to get the data
    $.get("/api/see_notes", function(notesData){
        console.log(notesData);
    })


}

displayNotes();