// Array of dogs
var topics = ["German Shepherd", "Bulldog", "Poodle", "Chinese Crested Dog", "Labrador Retriever", "Beagle", "English Mastiff"];

// Function for displaying dog data
  function renderButtons() {

   // Deletes dogs prior to adding new dogs
   $("#buttons-view").empty();

   // Loop through array of dogs
   for (var i = 0; i < topics.length; i++) {

       //Dynamically generate buttons for each dog in the array
       var a = $("<button>");
       // Adding class to button
       a.addClass("dog-btn");
       // Adding a data-attribute
       a.attr("data-name", topics[i]);
       // Add text to button
       a.text(topics[i]);
       // Add to buttons-view div
       $("#buttons-view").append(a);

   };
 }

   //displayDogInfo function re-renders the HTML to display the appropriate content
   function displayDogInfo() {


       var dog = $(this).attr("data-name");
       var APIKey = "eHLzkINryplaVpmyZIkKEFBpqmmyfctZ";
       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=" + APIKey + "&limit=10";

   // Creating an AJAX call for specific dog button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function(response) {
       console.log(queryURL);
       // storing the data from the AJAX request in the results variable
         var results = response.data;

       for (var i = 0; i < results.length; i++) {

       // Creating and storing a div tag
       var dogDiv = $("<div>");

       // Creating an element to have the rating and title displayed
       // Adding class to each element
       var rating = $("<p>").text("Rating: " + results[i].rating).addClass("rating");
       var title = $("<p>").text("Title: " + results[i].title).addClass("title");

       // Creating and storing an image tag
       var dogImage = $("<img>");

       //Setting the src attribute of the image to a property pulled off the result item
       dogImage.attr("src", results[i].images.original_still.url);

       // Displaying the title, rating, and image
       dogDiv.append(title, rating, dogImage);

       // Prepending the animalDiv to the HTML page in the "#dogs-view" div
        $("#dogs-view").prepend(dogDiv);
       }
     });
   };


   // Adding a click event listener to all elements with a class of "dog-btn"
   $(document).on("click", ".dog-btn", displayDogInfo);
    // Calling the renderButtons function to display the intial buttons
   renderButtons();