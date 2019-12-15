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
            // el.id = json.categories[i].category_name;
            select.appendChild(el)
        }
    }

    myForm.addEventListener("submit", (e) => {
        e.preventDefault();
        sendSubCategory();
    })


    function sendSubCategory() {
        var string = "5de29a127ee2cb628c185e0d"
        $.ajax({
            type: 'PATCH',
            crossDomain: true,
            url: 'https://projektseminarlfrb.herokuapp.com/categorys' + '/' + string,
            data: JSON.stringify({
                "subcategory_id":"1.15",
                "subcategory_name":"Oberländer Funktionen"
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
    

   

  loadData();