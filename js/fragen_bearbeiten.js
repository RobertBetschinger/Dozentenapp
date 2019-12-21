$(document).ready(function() {
    loadData();
});

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
                window.location.href = './test_lernen.html';
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
let fragenArray
let fragenData
const fragenForm = document.getElementById("FragenForm");

function loadParameters() {
    sValue = $("option:selected", select).text()
    var selectBox = document.getElementById("selectCategorys");
    var op = selectBox.options[selectBox.selectedIndex];
    var optgroup = op.parentNode;
    var cValue = optgroup.label
    console.log(sValue)

    fragenData = loadQuestions(cValue, sValue).then(data => {
            console.log("JSON Sollte kommen");
            var string = JSON.stringify(data);
            var json = JSON.parse(string)
            fragenArray = json
            console.log(json[0]);
            fillInQuestionnHTML(json);
        }).catch((data) =>
            reject(data)
        )
        /*
                 fragenData = new Promise((resolve,reject)=>{
                    loadQuestions(cValue,sValue).then(data=>{
                        console.log("Promise")
                        resolve(data);               
                }).catch((data)=>
                reject(data)
                )
            })
            fragenData.then((data)=>{
                console.log("JSON Sollte kommen");
                var string= JSON.stringify(data);
                var json = JSON.parse(string)
                fragenArray = json
                console.log(json[0]);
                fillInQuestionnHTML(json);
            })
            */
}

function fillInQuestionnHTML(json) {
    console.log("FillInQuestionHTML")
    document.forms["FragenForm"]["Frage"].value = json[0].question;
    document.forms["FragenForm"]["Antwort1"].value = json[0].answers[0].aText;
    document.forms["FragenForm"]["Antwort2"].value = json[0].answers[1].aText;
    document.forms["FragenForm"]["Antwort3"].value = json[0].answers[2].aText;
    document.forms["FragenForm"]["Antwort4"].value = json[0].answers[3].aText;

    document.forms["FragenForm"]["Wahrheit1"].value = json[0].answers[0].trueOrFalse;
    document.forms["FragenForm"]["Wahrheit2"].value = json[0].answers[1].trueOrFalse;
    document.forms["FragenForm"]["Wahrheit3"].value = json[0].answers[2].trueOrFalse;
    document.forms["FragenForm"]["Wahrheit4"].value = json[0].answers[3].trueOrFalse;
    document.forms["FragenForm"]["id"].value = json[0]._id;
    document.forms["FragenForm"]["index"].value = 0
}

function swapQuestions(json, index) {

    console.log("swapQuestions")
    document.forms["FragenForm"]["Frage"].value = json.question;
    document.forms["FragenForm"]["Antwort1"].value = json.answers[0].aText;
    document.forms["FragenForm"]["Antwort2"].value = json.answers[1].aText;
    document.forms["FragenForm"]["Antwort3"].value = json.answers[2].aText;
    document.forms["FragenForm"]["Antwort4"].value = json.answers[3].aText;

    document.forms["FragenForm"]["Wahrheit1"].value = json.answers[0].trueOrFalse;
    document.forms["FragenForm"]["Wahrheit2"].value = json.answers[1].trueOrFalse;
    document.forms["FragenForm"]["Wahrheit3"].value = json.answers[2].trueOrFalse;
    document.forms["FragenForm"]["Wahrheit4"].value = json.answers[3].trueOrFalse;
    document.forms["FragenForm"]["id"].value = json._id;
    document.forms["FragenForm"]["index"].value = index;
}

function moveLeft() {
    console.log("MoveLeft")
    var index = document.forms["FragenForm"]["index"].value
    console.log("Momentaner eingelesner Index: " + index)
    console.log("Momentaner Fragen Array länge: " + fragenArray.length)
    if (index == 0) {
        console.log("Weiter nach Links geht nicht")
    } else {
        index--;
        swapQuestions(fragenArray[index], index);
    }
}

function moveRight() {
    console.log("MoveRight")
    var index = document.forms["FragenForm"]["index"].value
    var laenge = fragenArray.length
    laenge--
    console.log("Momentaner eingelesner Index: " + index)
    console.log("Momentaner Fragen Array länge: " + fragenArray.length)
    if (index < laenge) {
        index++;
        swapQuestions(fragenArray[index], index)
    } else {
        console.log("Ende der Fragen erreicht.")
    }
}

function loadQuestions(cValue, sValue) {
    console.log("loadQestion")
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: 'https://projektseminarlfrb.herokuapp.com/questions',
            data: {
                "category_name": cValue,
                "subcategory_name": sValue
            },
            dataType: 'json',
            success: function(data) {

                if (data == undefined || data == null || data.length == 0) {
                    alert('Zu dieser Kategorie gibt es keine Fragen!');
                    reject(data)

                } else {

                    resolve(data)

                }
            },
            error: function(result) {
                console.log(result);
                reject(result)
                alert("Es gab einen Fehler beim Laden der Daten!");

            }
        })
    })
}

const myForm = document.getElementById("FragenForm");

$(document).ready(function() {
    document.querySelector('#update').addEventListener("click", update)
});

function update() {
    console.log("Update")

    var x = document.forms["FragenForm"]["FragenText"].value;
    var y = document.forms["FragenForm"]["Antwort1"].value;
    var z = document.forms["FragenForm"]["Antwort2"].value;
    var ü = document.forms["FragenForm"]["Antwort3"].value;
    var l = document.forms["FragenForm"]["Antwort4"].value;
    var questionID = document.forms["FragenForm"]["id"].value;

    if (formValidation(x, y, z, ü, l)) {

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

        sendQuestion(x, y, z, ü, l, boolean, boolean1, boolean2, boolean3, category_name, category_id, subcategory_id, sValue, questionID);
        fragenArray = null;
    }
    document.getElementById("FragenForm").reset();
}

function deletion() {
    console.log("deletion")
    var questionID = document.forms["FragenForm"]["id"].value;

    deleteQuestion(questionID);
    fragenArray = null;
    document.getElementById("FragenForm").reset();
}

function deleteQuestion(questionID) {
    console.log("deleteQuestion")
    $.ajax({
        type: 'Delete',
        crossDomain: true,
        url: 'https://projektseminarlfrb.herokuapp.com/questions' + '/' + questionID,

        success: function() {
            alert('Die Frage wurde erfolgreich gelöscht');
        },
        error: function(result) {
            console.log(result);
            alert("Es gab einen Fehler beim Löschen der Frage!");
        }

    })
}

function sendQuestion(x, y, z, ü, l, boolean, boolean1, boolean2, boolean3, category_name, category_id, subcategory_id, subcategory_name, questionID) {
    console.log("sendQuestion")
    $.ajax({
        type: 'PATCH',
        crossDomain: true,
        url: 'https://projektseminarlfrb.herokuapp.com/questions' + '/' + questionID,
        data: JSON.stringify({
            "question": x,
            "category_id": category_id,
            "category_name": category_name,
            "subcategory_id": subcategory_id,
            "subcategory_name": subcategory_name,
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
            alert('Die Frage wurde erfolgreich verändert');
        },
        error: function(result) {
            console.log(result);
            alert("Es gab einen Fehler beim Hochladen der Änderungen!");
        }

    })
}

function formValidation(x, y, z, ü, l) {
    console.log("Test der Validation")
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
    } else if (l = "") {
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