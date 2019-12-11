var select = document.getElementById("selectCategorys");

  
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
            var el = document.createElement("OPTGROUP");
            el.label = json[i].category_name;
            el.value = json[i].category_id;

            for (var j = 0; j < json[i].sub_categories.length; j++) {
                var ellsub = document.createElement("option");
                ellsub.label = json[i].sub_categories[j].subcategory_name;
                ellsub.value = json[i].sub_categories[j].subcategory_id;
                ellsub.text=json[i].sub_categories[j].subcategory_name;
                el.appendChild(ellsub);
            }
            select.appendChild(el)
        }
    }

    const questionsbutton = document.getElementById("loadQuestions");

 
    function loadParameters(){
        sValue =$("option:selected", select).text()
        var selectBox = document.getElementById("selectCategorys");
        var op = selectBox.options[selectBox.selectedIndex];
        var optgroup = op.parentNode;
        var cValue = optgroup.label
        console.log(sValue)
        console.log(cValue)
        loadQuestions(cValue,sValue);
    }

    function loadQuestions(cValue,sValue){
        
	$.ajax({
        type: 'GET',
        url: 'https://projektseminarlfrb.herokuapp.com/questions',
        data: { 
              "category_name": cValue, 
              "subcategory_name": sValue
          },
        dataType: 'json',
        success: function (data) {
                  //let questions = JSON.stringify(data); 
                  console.log(data); 
                  if(data == undefined || data == null || data.length == 0) {
                  alert('Zu dieser Kategorie gibt es keine Fragen!'); 
                     // window.location.href = './test_lernen.html'; 
                  } else {
                      console.log(data);
                  }
          },
          error: function (result){ 
                  console.log(result);
                  alert("Es gab einen Fehler beim Laden der Daten!"); 
          }
      })
    }
    


function generateCategorysArray(json){
    console.log('generateCategorysArray')
    //console.log(json[0].sub_categories[0].subcategory_name)

    var categorysarray = [[]]
    var subarray =[]
    for(var i =0; i<json.length;i++){
    categorysarray.push(json[i].category_name)
    for(var j =0; j<json[i].sub_categories.length;j++){
       subarray.push(json[i].sub_categories[j].subcategory_name)
       categorysarray.push(json[i].sub_categories[j].subcategory_name)
    }
}
    console.log('Array wird jetzt ausgegeben')
    console.log(categorysarray)
    console.log(subarray)
}

  loadData();