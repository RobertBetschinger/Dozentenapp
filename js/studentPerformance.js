
var select = document.getElementById("selectCategorys");

function loadData() {
    console.log("loadData")
    $.ajax({
        type: 'GET',
        url: 'https://projektseminarlfrb.herokuapp.com/categorys',
        data: {},
        dataType: 'json',
        success: function(data) {
            console.table(data);
            if (data == undefined || data == null || data.length == 0) {
                alert('Es konnten keine Kategorien geladen werden, wsl. sind noch keine Kategorien vorhanden!');
            } else {

                var string = JSON.stringify(data)

                var json = JSON.parse(string)

                fillInDataInDropdown(json)

            }
        },
        error: function(result) {
            console.log(result);
            alert("Es gab einen Fehler beim Laden der Daten!");
        }
    })
}

function fillInDataInDropdown(json) {
    console.log("fillInDataInDropdown")
    for (var i = 0; i < json.length; i++) {
        var el = document.createElement("OPTGROUP");
        el.label = json[i].category_name;
        el.value = json[i].category_id;

        for (var j = 0; j < json[i].sub_categories.length; j++) {
            if (json[i].sub_categories[j].subcategory_id != undefined) {
                var ellsub = document.createElement("option");
                ellsub.label = json[i].sub_categories[j].subcategory_name;
                ellsub.value = json[i].sub_categories[j].subcategory_id;
                ellsub.text = json[i].sub_categories[j].subcategory_name;
                el.appendChild(ellsub);
            }
        }
        select.appendChild(el)
    }
}

const questionsbutton = document.getElementById("loadQuestions");

function loadParameters() {
    sValue = $("option:selected", select).text()
    var selectBox = document.getElementById("selectCategorys");
    var op = selectBox.options[selectBox.selectedIndex];
    var optgroup = op.parentNode;
    var cValue = optgroup.label
  
    sessionStorage.setItem("cValue", op.text);
    sessionStorage.setItem("sValue", cValue); 
    var categoryName = optgroup.label

   createAvPie(categoryName,sValue)
}

async function createAvPie(cValue,sValue) {
    var avData = await loadAvPie(cValue,sValue); 
      new Chart(document.getElementById("chart_Av"), {
        type: 'pie',
        data: {
          labels: ["right", "wrong"],
          datasets: [{
            label: "Antworten richtig/falsch",
            backgroundColor: ["#56b988", "#800000"],
            data: avData
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Durchschnittsperformance'
          }
        }
    });

}

async function loadAvPie(cValue,sValue) {
    

    var json = [0,0]; 

    console.log(cValue+sValue); 

    const result = await $.ajax({
        type: 'GET',
        url: 'https://projektseminarlfrb.herokuapp.com/stats',
        data: { 
        "category_name": cValue, 
        "subcategory_name": sValue
        },
        dataType: 'json',
        success: function (data) {
            console.log(data); 
        return data; 
        },
        error: function (result){ 
            console.log("error" + error); 
            return null; 
        }
    });
    
    for (var i = 0; i < result.length; i++){
        json[0] = json[0] + result[i].aCorr; 
        json[1] = json[1] + result[i].aFalse; 
    }
    //var json = [result.aCorr, result.aFalse]; 
    console.log(json);
    return json; 

}