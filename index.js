function showTab(tabId) {
    // Get all elements with class="tab-content" and hide them
    var tabContent = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Get all elements with class="tab-button" and remove the class "active"
    var tabButtons = document.getElementsByClassName('tab-button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabId).style.display = 'block';
    event.currentTarget.className += " active";
}

// Add event listeners for tab buttons
document.getElementById('overviewTab').addEventListener('click', function() {
    showTab('overview');
});
document.getElementById('informationTab').addEventListener('click', function() {
    showTab('information');
});
document.getElementById('locationTab').addEventListener('click', function() {
    showTab('location');
});


document.addEventListener('DOMContentLoaded', function() {
    // Open the default tab
    showTab('overview');
    document.getElementById('overviewTab').className += " active";
});

// function initMap() {
//     var mapOptions = {
//       center: new google.maps.LatLng(-34.397, 150.644),
//       zoom: 8
//     }
//     var map = new google.maps.Map(document.getElementById("map"), mapOptions);
// }
  

  
  