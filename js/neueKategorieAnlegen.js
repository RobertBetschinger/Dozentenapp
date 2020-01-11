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
                
                var string = JSON.stringify(data)
              
                var json = JSON.parse(string)
                
                fillInDataInDropdown(json)
                
            }
        },
        error: function (result){ 
            console.log(result);
            alert("Es gab einen Fehler beim Laden der Daten!"); 
        }
        })
        }


        
    function fillInDataInDropdown(json) {
        console.log("fillInDataInDropdown")
        for (var i = 0; i < json.length; i++) {
            
            var el = document.createElement("option");
            el.value = json[i]._id;
            el.label = json[i].category_name;
            el.lang = json[i].category_id
            var length = json[i].sub_categories.length
            length--
            el.data = json[i].sub_categories[length].subcategory_id
            select.appendChild(el)
        }
    }

    myForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var selectBox = document.getElementById("selectCategorys");
        var op = selectBox.options[selectBox.selectedIndex];
        var catName= op.label
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
          createNewStat(categoryID,catName,subID,subcategory_name)
          document.getElementById("UnterkategorieForm").reset();
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

    function createNewStat (categoryid,catName,subID,subcategory_name) { 
        var a = parseInt(categoryid)
        var b = parseFloat(subID)
        console.log()
        $.ajax({
            type: 'POST',
            crossDomain: true,
            url: 'https://projektseminarlfrb.herokuapp.com/stats',
            data: JSON.stringify({
                "category_id":a,
                "category_name":catName,
                "subcategory_id":b,
                "subcategory_name":subcategory_name,
                "aCorr": 0,
                "aFalse": 0
            }),
            dataType: 'json',
            contentType: 'application/json',
            success: function() {
               // alert('Die neue Statistik wurde erfolgreich hinzugefügt');
            },
            error: function(result) {
                console.log(result);
                alert("Es gab einen Fehler beim Hochladen der neuen Statistik Kategorie, bitte kontaktieren Sie den Datenbank Admin");
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
            //alert(lastValue)
            //alert(categoryName)
          sendCategory(lastValue,categoryName)
          document.getElementById("ÜberkategorieForm").reset();
        }
        
    })

    function sendCategory(categoryid,categoryName){
        console.log("SendCategory")
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
