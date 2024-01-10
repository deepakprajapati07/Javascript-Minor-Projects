document.addEventListener("DOMContentLoaded", function () {
    // Initially hide the cardContainer
    var container = document.querySelector(".container");
    var cardContainer = document.querySelector(".cardContainer");
    cardContainer.style.display = "none";
  
    // Add click event listener to the submit button
    document.getElementById("submit").addEventListener("click", function () {
      var nameInput = document.getElementById("name");
      var displayName = document.getElementById("displayName");
  
      // If the input field is empty, alert the user
        if (nameInput.value === "") {
            alert("Please enter the name");
        }
        else {
            // Update the display name in the card
            displayName.textContent = nameInput.value;
        
            // Hide the container and show the cardContainer
            container.style.display = "none";
            cardContainer.style.display = "flex";
        }
    });
  
    // Add click event listener to the reset button
    document.getElementById("reset").addEventListener("click", function () {
      // Show the container and hide the cardContainer
      container.style.display = "flex";
      cardContainer.style.display = "none";
  
      // Clear the input field
      document.getElementById("name").value = "";
    });
  });
  