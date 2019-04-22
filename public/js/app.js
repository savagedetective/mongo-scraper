$(document).ready(function() {

    //saves an article
    $(".save-button").on("click", "a", function(event) {
        event.preventdefault();
        console.log("save button clicked");
    });

    //deletes an article
    $(".remove-button").on("click", "a", function(event) {
        console.log("remove button clicked");
    });


});