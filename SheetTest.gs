/**

 */
function testSheetContainIdea(){
  Logger.log(sheetContainIdea(1, 'test text'));
}

/**

 */
function testSaveIdeasToSheets(){
  var itemResponses = getLasFormItemReponses();
  var ideasSet = getIdeasFromItemResponses(itemResponses);

  Logger.log(ideasSet);

  if(ideasSet){
    saveIdeasToSheets(ideasSet);
  }
}