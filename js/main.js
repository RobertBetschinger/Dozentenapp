/*
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container");

left.addEventListener("mouseenter", () => {
  container.classList.add("hover-left");
});

left.addEventListener("mouseleave", () => {
  container.classList.remove("hover-left");
});

right.addEventListener("mouseenter", () => {
  container.classList.add("hover-right");
});

right.addEventListener("mouseleave", () => {
  container.classList.remove("hover-right");
});
*/
document.addEventListener("deviceready", onDeviceReady, true);

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

function onDeviceReady() {
    // navigator.notification.alert("PhoneGap is working");
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
}

function callMainMenu() {
    window.location = "index.html";
}

function onOffline() {
    alert("Keine Internetverbindung! App nur eingeschränkt verwendungsfähig.");
}

function onOnline() {
    alert("Internetverbindung wieder vorhanden.");
}

var select = document.getElementById("selectCategorys");
const myForm = document.getElementById("UnterkategorieForm")
const überkategoireForm= document.getElementById("ÜberkategorieForm")    

loadData();

    function loadData(){
            console.log("loadData")
        $.ajax({
        type: 'GET',
        url: 'https://projektseminarlfrb.herokuapp.com/categorys',
        data: { 
        "category_name": 'IT-Business',
        "subcategory_name": 'Lock-in'
        },
        dataType: 'json',
        success: function (data) {
            console.table(data); 
            if(data == undefined || data == null || data.length == 0) {
            alert('Es konnten keine Kategorien geladen werden, wsl. sind noch keine Kategorien vorhanden!'); 
                window.location.href = './test_lernen.html'; 
            } else {
                // generateCategorysArray(data)
                //  console.table(data.sub_categories);
                var string = JSON.stringify(data)
                //console.log('Testen des Strings auf Inhalt')
                // console.log(string);
                //console.log('Testen des Parsen auf JSON')
                var json = JSON.parse(string)
                // console.log(json[0].category_name)
                fillInDataInDropdown(json)
                //generateCategorysArray(json)
            }
        },
        error: function (result){ 
            console.log(result);
            alert("Es gab einen Fehler beim Laden der Daten!"); 
        }
        })
        }


        
    function fillInDataInDropdown(json) {
        for (var i = 0; i < json.length; i++) {
            
            var el = document.createElement("option");
            el.value = json[i]._id;
            el.label = json[i].category_name;
            el.lang = json[i].category_id
            var length = json[i].sub_categories.length
            length--
           // alert(json[i].category_name + "Sub Länge"+ length)
            el.data = json[i].sub_categories[length].subcategory_id
            
            // el.id = json.categories[i].category_name;
            select.appendChild(el)
        }
    }

    myForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var selectBox = document.getElementById("selectCategorys");
        var op = selectBox.options[selectBox.selectedIndex];
        categoryID= op.value
        
        
            var subID =parseFloat(op.data)
            subID= Math.round(subID * 100) / 100
        
      
        var catID = parseFloat(op.lang)
        catID = Math.round(catID * 100) / 100
        console.log("Check if subcategory Undefined")
        console.log("subcategory ID: "+ subID)
        if(subID == undefined){
            console.log("subid = undefined")
            subID= catID + 0.01;
            subID= Math.round(subID * 100) / 100
        }
        else if(isNaN(subID)){
            console.log("NAN")
            subID = catID + 0.01;
            subID= Math.round(subID * 100) / 100
        }
        else{
            console.log("Subs vorhanden")
            subID = subID + 0.01;
            subID= Math.round(subID * 100) / 100
        }
        console.log("subcategory ID: "+ subID)
        subcategory_name = document.forms["UnterkategorieForm"]["Unterkategorie"].value;
        if(subcategory_name ==""){
            alert("Bitte geben sie Eine Unterkategorie ein")
            return false;
        }
        else{
         
          sendSubCategory(categoryID,subID,subcategory_name);
        }
        
    })


    function sendSubCategory(categoryID,subID,subcategory_name) {
        var string = categoryID
        $.ajax({
            type: 'PATCH',
            crossDomain: true,
            url: 'https://projektseminarlfrb.herokuapp.com/categorys' + '/' + string,
            data: JSON.stringify({
                "subcategory_id":subID,
                "subcategory_name":subcategory_name
            }),
            dataType: 'json',
            contentType: 'application/json',
            success: function() {
                alert('Die Kategorie wurde erfolgreich erweitert');
            },
            error: function(result) {
                console.log(result);
                alert("Es gab einen Fehler beim Hochladen der neuen Unterkategorie");
            }

        })
    }


    überkategoireForm.addEventListener("submit", (e) => {
        e.preventDefault();

        var theSelect = document.getElementById('selectCategorys');
        var lastValue = theSelect.options[theSelect.options.length - 1].lang;
        lastValue++

        categoryName = document.forms["ÜberkategorieForm"]["Überkategorie"].value;
        if(categoryName ==""){
            alert("Bitte geben sie Eine Überkategorie ein")
            return false;
        }
        else{
            alert(lastValue)
            alert(categoryName)
          sendCategory(lastValue,categoryName)
        }
        
    })

    function sendCategory(categoryid,categoryName){
        $.ajax({
            type: 'POST',
            crossDomain: true,
            url: 'https://projektseminarlfrb.herokuapp.com/categorys',
            data: JSON.stringify({
                "category_id":categoryid,
                "category_name":categoryName
            }),
            dataType: 'json',
            contentType: 'application/json',
            success: function() {
                alert('Die neue Kategorie wurde erfolgreich hinzugefügt');
            },
            error: function(result) {
                console.log(result);
                alert("Es gab einen Fehler beim Hochladen der neuen Überkategorie");
            }

        })
    }

   

