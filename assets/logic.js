

var config = {
    apiKey: "AIzaSyBLZlENad2HXr6ddkr_ZmJPWmdGNvo5P14",
    authDomain: "train-149d7.firebaseapp.com",
    databaseURL: "https://train-149d7.firebaseio.com",
    projectId: "train-149d7",
    storageBucket: "train-149d7.appspot.com",
    messagingSenderId: "722444771499"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = $("#start-input").val().trim();
    var trainRate = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainRate
    };
  
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainRate);
  
    var firstTimeConverted = moment(trainStart, "hh:mm");
    console.log(firstTimeConverted);
  
    var currentTime = moment()
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trainRate;
    console.log(tRemainder);

    var tMinutesUntilTrain = trainRate - tRemainder;
    console.log("Minutes Until Train: " + tMinutesUntilTrain);

    var nextTrain = moment().add(tMinutesUntilTrain, "minutes").format("hh:mm");
    console.log("Arrival Time: " + nextTrain);
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainRate),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesUntilTrain),
    );
  
    $("#train-table > tbody").append(newRow);
  });
  
  