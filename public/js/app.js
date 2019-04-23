$(document).ready(function () {

    console.log("app.js loaded");

    //saves an article
    $(".card-body").on("click", ".save-button", function (event) {

        event.preventDefault();
        console.log("save button clicked");

        var buttonId = $(this).attr("id");
        console.log(buttonId);

        $.ajax(`/save/${buttonId}`, {
            type: "PUT"
        })
            .then(function (response) {
                location.reload();
            });

    });

    //deletes an article from saved page
    $(".card-body").on("click", ".remove-save", function (event) {

        event.preventDefault();
        console.log("remove button clicked");

        var buttonId = $(this).attr("id");
        console.log(buttonId);

        $.ajax(`/remove/${buttonId}`, {
            type: "PUT"
        })
            .then(function (response) {
                location.reload();
            });

    });

    //begins scrape
    $("#scrape-button").click(function () {

        console.log("scrape beginning.");

        $.ajax(`/scrape`, {
            type: "GET"
        })
            .done(function (response) {
                res.redirect('/');
            });
        
            console.log("scrape complete.");

}); 

});