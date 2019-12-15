var select = document.getElementById("selectCategorys");

  
    function loadData(){
        console.log("loadData")
    $.ajax({
 type: 'GET',
 url: 'https://projektseminarlfrb.herokuapp.com/categorys',
 data: { 
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
    let fragenArray
    let fragenData
    const fragenForm = document.getElementById("FragenForm");

 
    function loadParameters(){
        sValue =$("option:selected", select).text()
        var selectBox = document.getElementById("selectCategorys");
        var op = selectBox.options[selectBox.selectedIndex];
        var optgroup = op.parentNode;
        var cValue = optgroup.label
        console.log(sValue)
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
}
    function fillInQuestionnHTML(json){
        console.log("FillInQuestionHTML")
        document.forms["FragenForm"]["Frage"].value =json[0].question;
        document.forms["FragenForm"]["Antwort1"].value =json[0].answers[0].aText;
        document.forms["FragenForm"]["Antwort2"].value =json[0].answers[1].aText;
        document.forms["FragenForm"]["Antwort3"].value =json[0].answers[2].aText;
        document.forms["FragenForm"]["Antwort4"].value =json[0].answers[3].aText;
       
        document.forms["FragenForm"]["Wahrheit1"].value =json[0].answers[0].trueOrFalse;
        document.forms["FragenForm"]["Wahrheit2"].value =json[0].answers[1].trueOrFalse;
        document.forms["FragenForm"]["Wahrheit3"].value =json[0].answers[2].trueOrFalse;
        document.forms["FragenForm"]["Wahrheit4"].value =json[0].answers[3].trueOrFalse;
        document.forms["FragenForm"]["id"].value =json[0]._id;
       // document.forms["FragenForm"]["index"].value =json
       //IDEA: SAVE ALL Questions TO Form, SWAP over index
       document.forms["FragenForm"]["index"].value =0
    }

    function swapQuestions(json,index){
            
            console.log("swapQuestions")
            document.forms["FragenForm"]["Frage"].value =json.question;
            document.forms["FragenForm"]["Antwort1"].value =json.answers[0].aText;
            document.forms["FragenForm"]["Antwort2"].value =json.answers[1].aText;
            document.forms["FragenForm"]["Antwort3"].value =json.answers[2].aText;
            document.forms["FragenForm"]["Antwort4"].value =json.answers[3].aText;
           
            document.forms["FragenForm"]["Wahrheit1"].value =json.answers[0].trueOrFalse;
            document.forms["FragenForm"]["Wahrheit2"].value =json.answers[1].trueOrFalse;
            document.forms["FragenForm"]["Wahrheit3"].value =json.answers[2].trueOrFalse;
            document.forms["FragenForm"]["Wahrheit4"].value =json.answers[3].trueOrFalse;
            document.forms["FragenForm"]["index"].value = index;
    }

      
    function moveLeft(){
        console.log("MoveLeft")
        var index =  document.forms["FragenForm"]["index"].value
          console.log("Momentaner eingelesner Index: "+ index)
          console.log("Momentaner Fragen Array länge: " + fragenArray.length)
          if(index ==0){
                console.log("Weiter nach Links geht nicht")
          }
          else{
              index--;
              swapQuestions(fragenArray[index],index);
          }
    }

    function moveRight(){
        console.log("MoveRight")
        var index =  document.forms["FragenForm"]["index"].value
        var laenge= fragenArray.length
        laenge--
        console.log("Momentaner eingelesner Index: "+ index)
        console.log("Momentaner Fragen Array länge: " + fragenArray.length)
        if(index < laenge){
            //if(index < fragenArray.length--) das geht nicht...
            index++;
            swapQuestions(fragenArray[index],index)
        }
        else{
            console.log("Ende der Fragen erreicht.")
        }
       

    }




    function loadQuestions(cValue,sValue){
    return new Promise((resolve,reject)=>{
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
                    //  console.log(data); 
                  if(data == undefined || data == null || data.length == 0) {
                  alert('Zu dieser Kategorie gibt es keine Fragen!'); 
                  reject(data)
                     // window.location.href = './test_lernen.html'; 
                  } else {
                     // console.log("Daten Länge")
                    // console.log(data.length);
                    resolve(data)
                      
                  }
          },
          error: function (result){ 
                  console.log(result);
                  reject(result)
                  alert("Es gab einen Fehler beim Laden der Daten!"); 

          }
      })
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