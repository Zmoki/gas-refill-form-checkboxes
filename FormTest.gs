/**

 */
function testGetLasFormItemReponses(){
  var itemResponses = getLasFormItemReponses();
  itemResponses.forEach(function(itemResponse){
    Logger.log('!: ', itemResponse.getItem().getId() + ' ', itemResponse.getResponse());
  });
}

/**

 */
function testOnSubmitForm(){
  var e = {
    values: ['', '', 'test1', '', 'test2', '', 'test3']
  };

  onSubmitForm(e);
}