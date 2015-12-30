/**

 */
function clearIdeasSheets(){
  for(key in ideasSets){
    var sheetNumber = ideasSets[key].sheet;

    clearIdeasSheet(sheetNumber)
  }
}

/**

 */
function clearIdeasSheet(sheetNumber){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[sheetNumber];

  sheet.clear();
}

/**

 */
function clearFirstIdeasSheet(){
  clearIdeasSheet(1);
}

/**

 */
function clearSecondIdeasSheet(){
  clearIdeasSheet(2);
}

/**

 */
function refillIdeasSheets(){
  clearIdeasSheets();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var range = sheet.getDataRange();
  var rows = range.getValues().slice(1);

  rows.forEach(function(values){
    var ideasSet = getIdeasFromValues(values);

    if(ideasSet){
      saveIdeasToSheets(ideasSet);
    }
  });
}