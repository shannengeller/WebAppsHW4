// array of json objects
var classmate_data = [
  {
    name: "John",
    shadow: "no",
    garlic: "no",
    complexion: "pale",
    totalscore: 0,
  },
  {
    name: "Lee",
    shadow: "yes",
    garlic: "no",
    complexion: "pale",
    totalscore: 0,
  },
  {
    name: "Emma",
    shadow: "no",
    garlic: "yes",
    complexion: "brown",
    totalscore: 0,
  },
  {
    name: "Ava",
    shadow: "yes",
    garlic: "yes",
    complexion: "olive ",
    totalscore: 0,
  },
  {
    name: "Alex",
    shadow: "no",
    garlic: "no",
    complexion: "brown",
    totalscore: 0,
  },
]; // demo in console how to access each element
// e.g. classmate_data[0]['name']

// Load the Visualization API and the corechart package.
google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

var randomGuess = false;

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  var data = new google.visualization.DataTable();
  classmate_data_processing(data);

  // Set chart options
  var options = {
    title: "How many vampires in the class?",
    chartArea: { left: 50, bottom: 0, right: 0, width: "75%", height: "75%" },
    width: 500,
    height: 500,
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

// model of MVC
// this function process classmate data and create data table
function classmate_data_processing(result_data) {
  var num_human = 0;
  var num_vampire = 0;

  for (var i = 0; i <= classmate_data.length - 1; i++) {
    // logic based on shadow
    if (classmate_data[i]["shadow"] == "no") {
      classmate_data[i]["totalscore"] += 4;
    }
    if (classmate_data[i]["complexion"] == "pale") {
      classmate_data[i]["totalscore"] += 3;
    }
    if (classmate_data[i]["garlic"] == "no") {
      classmate_data[i]["totalscore"] += 3;
    }

    if (classmate_data[i]["totalscore"] > 6) {
      num_vampire++;
    } else {
      num_human++;
    }
  }

  // Resets totalScore Counter
  for (var i = 0; i <= classmate_data.length - 1; i++) {
    classmate_data[i]["totalscore"] = 0;
  }

  if (randomGuess == true) {
    num_human = classmate_data.length - 1;
    num_vampire = 1;
    randomGuess = false;
  }
  // Create the data table.
  result_data.addColumn("string", "Element");
  result_data.addColumn("number", "Vampire");
  result_data.addRows([
    ["Human", num_human],
    ["Vampire", num_vampire],
  ]);
}

function display_student_added() {
  var first_name = document.getElementById("first_name").value;

  var shadow = "no";
  if (document.getElementById("yes_shadow").checked) {
    shadow = "yes";
  }

  var garlic = "no";
  if (document.getElementById("yes_garlic").checked) {
    garlic = "yes";
  }
  var complexion = document.getElementById("mySelect").selectedIndex;
  var option = document.getElementById("mySelect").options;

  // Stores added user into json
  classmate_data.push({
    name: first_name,
    shadow: shadow,
    garlic: garlic,
    complexion: option[complexion].text,
    totalscore: 0,
  });

  // Insert row to table
  insert_row(first_name, shadow, garlic, option[complexion].text);

  console.log(JSON.stringify(classmate_data));
  drawChart();
}

// function for making table out of the JSON objects
function insert_row(first_name, shadow, garlic, complexion) {
  var table = document.getElementById("classmate_data");
  // Create an empty <tr> element and add it to the 1st position of the table:
  // BE CAREFUL!!! row 0 is our heading row
  var row = table.insertRow(1);
  // Try this
  // var row = table.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  complexion = complexion[0].toUpperCase() + complexion.substring(1);
  // Add some text to the new cells:
  cell1.innerHTML = first_name;
  cell2.innerHTML = shadow;
  cell3.innerHTML = garlic;
  cell4.innerHTML = complexion;
}

function delete_row() {
  // delete the second row
  document.getElementById("classmate_data").deleteRow(1);
}

function delete_last_row() {
  var table = document.getElementById("classmate_data");
  var row_count = table.rows.length;

  table.deleteRow(row_count - 1);
}

// makes random student and updates chart
function random_guess() {
  var randomIndex = Math.floor(Math.random() * classmate_data.length);
  var vampire_name = classmate_data[randomIndex].name;
  var vampire_textbox = document.getElementById("vampireName");

  vampire_textbox.textContent = vampire_name + " is a vampire";
  randomGuess = true;
  drawChart();
}

function showDiv(select) {
  var choice = document.getElementById("modelType").selectedIndex;
  var option = document.getElementById("modelType").options;
  var enterChoice = option[choice].text;

  if (enterChoice == "Random Guess") {
    document.getElementById("hidden_div").style.display = "block";
    document.getElementById("student_form").style.display = "none";
    document.getElementById("pick_model").style.display = "none";
  } else if (enterChoice == "Threshold Based Method") {
    document.getElementById("hidden_div").style.display = "none";
    document.getElementById("student_form").style.display = "block";
    document.getElementById("pick_model").style.display = "none";
  }
}
