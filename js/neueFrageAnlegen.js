$(document).ready(function() {
    loadData()
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const select = document.getElementById("selectCategorys");
const myForm = document.getElementById("FragenForm");

function loadData() {
    console.log("LoadData")
    $.ajax({
        type: 'GET',
        url: 'https://projektseminarlfrb.herokuapp.com/categorys',
        data: {
            "category_name": 'IT-Business',
            "subcategory_name": 'Lock-in'
        },
        dataType: 'json',
        success: function(data) {
            //let questions = JSON.stringify(data); 
            console.table(data);

            if (data == undefined || data == null || data.length == 0) {
                alert('Es konnten keine Kategorien geladen werden, wsl. sind noch keine Kategorien vorhanden');
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
    console.log("Fill in Data in Dropdown")
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

myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    var x = document.forms["FragenForm"]["FragenText"].value;
    var y = document.forms["FragenForm"]["Antwort1"].value;
    var z = document.forms["FragenForm"]["Antwort2"].value;
    var ü = document.forms["FragenForm"]["Antwort3"].value;
    var l = document.forms["FragenForm"]["Antwort4"].value;
    var TriggerQuestion = document.forms["FragenForm"]["TriggerQuestion"].checked
    var TriggerType = document.forms["FragenForm"]["Trigger-Typ"].value;
  
    

    if (formValidation(x, y, z, ü, l,TriggerQuestion,TriggerType)) {

        boolean = turnBackRadioButton(document.getElementsByName('Wahrheit1'));
        boolean1 = turnBackRadioButton(document.getElementsByName('Wahrheit2'));
        boolean2 = turnBackRadioButton(document.getElementsByName('Wahrheit3'));
        boolean3 = turnBackRadioButton(document.getElementsByName('Wahrheit4'));

        var subcategory_id = document.getElementById("selectCategorys").value;
        sValue = $("option:selected", select).text()
        console.log(sValue)
        var selectBox = document.getElementById("selectCategorys");
        var op = selectBox.options[selectBox.selectedIndex];
        var optgroup = op.parentNode;

        var category_id = optgroup.value
        var category_name = optgroup.label

    
        sendQuestion(x, y, z, ü, l, boolean, boolean1, boolean2, boolean3, category_name, category_id, subcategory_id, sValue,TriggerQuestion,TriggerType);
    }

    document.getElementById("FragenForm").reset();

})

function sendQuestion(x, y, z, ü, l, boolean, boolean1, boolean2, boolean3, category_name, category_id, subcategory_id, subcategory_name,triggerQuestion,triggerType) {
    console.log("SendQuestion")
    $.ajax({
        type: 'POST',
        url: 'https://projektseminarlfrb.herokuapp.com/questions',
        data: JSON.stringify({
            "question": x,
            "category_id": category_id,
            "category_name": category_name,
            "subcategory_id": subcategory_id,
            "subcategory_name": subcategory_name,
            "triggerQuestion":triggerQuestion,
            "triggerType":triggerType,
            "answer": y,
            "boolean": boolean,
            "answer1": z,
            "boolean1": boolean1,
            "answer2": ü,
            "boolean2": boolean2,
            "answer3": l,
            "boolean3": boolean3
        }),
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
            alert('Die Frage wurde erfolgreich hochgeladen');
        },
        error: function(result) {
            console.log(result);
            alert("Es gab einen Fehler beim Hochladen der Frage!");
        }

    })
}



function formValidation(x, y, z, ü, k,TriggerQuestion,TriggerType) {
    console.log("Form Validation")
     if (x == "") {
        window.alert("Bitte geben sie eine Frage ein.");
        return false;
    } else if (y == "") {
        window.alert("Bitte geben sie die erste Antwortmöglichkeit ein.");
        return false;
    } else if (z == "") {

        window.alert("Bitte geben sie die zweite Antwortmöglichkeit ein.");
        return false;
    } else if (ü == "") {

        window.alert("Bitte geben sie die dritte Antwortmöglichkeit ein.");
        return false;
    } else if (k == "") {
        window.alert("Bitte geben sie die vierte Antwortmöglichkeit ein.");
        return false;
    } else if (!validateRaioButtons(document.getElementsByName('Wahrheit1'))) {
        window.alert("Bitte geben Sie an ob die Erste Frage wahr oder Falsch sein soll!");
        return false;
    } else if (!validateRaioButtons(document.getElementsByName('Wahrheit2'))) {
        window.alert("Bitte geben Sie an ob die zweite Frage wahr oder Falsch sein soll!");
        return false;
    } else if (!validateRaioButtons(document.getElementsByName('Wahrheit3'))) {
        window.alert("Bitte geben Sie an ob die dritte Frage wahr oder Falsch sein soll!");
        return false;
    } else if (!validateRaioButtons(document.getElementsByName('Wahrheit4'))) {
        window.alert("Bitte geben Sie an ob die vierte Frage wahr oder Falsch sein soll!");
        return false;
    } else if(TriggerQuestion == true && TriggerType =="" ){
            window.alert("Bitte geben sie einen Trigger Typ an!");
            return false;
    } else {
        return true;
    }

}

function validateRaioButtons(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // alert("Selected Value = " + radios[i].value);
            return true; // checked
            break;
        }
    }
    return false;
}

function turnBackRadioButton(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}


TriggerQuestion.addEventListener( 'change', function() {
    console.log("Function Reached")
    if(this.checked) {
        document.getElementById("triggerTypeField").disabled = false;
    } else {
        document.getElementById("triggerTypeField").disabled = true;
        document.getElementById("triggerTypeField").value = '';
    } 
});