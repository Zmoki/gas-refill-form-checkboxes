/**

 */
function saveIdeasToSheets(ideasSet){
  for(ideasKey in ideasSet.keys){
    var sheetNumber = ideasSets[ideasKey].sheet;
    var author = ideasSet.author;

    ideasSet.keys[ideasKey].forEach(function(idea){
      if(sheetContainIdea(sheetNumber, idea)){
        return;
      }
      addRowToSheet([idea, author], sheetNumber);
    });
  }
}

/**
 Add new row with values to sheet
 */
function addRowToSheet(values, sheetNumber){
  if(!values || !Array.isArray(values)){
    return;
  }

  sheetNumber = sheetNumber || 0;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[sheetNumber];
  sheet.appendRow(values);
}

/**

 */
function sheetContainIdea(sheetNumber, idea){
  var containIdea = false;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[sheetNumber];
  var range = sheet.getDataRange();
  var rows = range.getValues();

  for(var i = 0; i < rows.length; i++){
    if(rows[i][0] == idea){
      containIdea = true;
      break;
    }
  }

  return containIdea;
}