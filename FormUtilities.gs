/**
 Use it for get list of form items in log
 */
function showFormItems(){
  var form = FormApp.openById(formId);

  var items = form.getItems();
  for (i = 0; i < items.length; i++) {
    Logger.log("ID: " + items[i].getId(), ': ' + items[i].getType());
  }
}

/**

 */
function refillFormIdeasCheckboxes(){
  updateFormIdeasCheckboxes();
}

/**

 */
function getLasFormItemReponses(){
  var form = FormApp.openById(formId);
  var formResponses = form.getResponses();

  if(!formResponses.length){
    return false;
  }

  var lastFormResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastFormResponse.getItemResponses();

  return itemResponses;
}

/**

 */
function getIdeasFromItemResponses(itemResponses){
  if(!itemResponses){
    return false;
  }

  var hasIdea = false;

  var ideasSet = {
    'author': null,
    'keys': {
      'SHEET_NAME1': [],
      'SHEET_NAME2': [],
      'SHEET_NAME3': []
    }
  };

  itemResponses.forEach(function(itemResponse, key){
    var inputId = itemResponse.getItem().getId();

    var ideasFromResponse = getIdeasFromItemResponse(inputId, itemResponse.getResponse());

    if(ideasFromResponse){
      hasIdea = true;
      ideasSet.keys[ideasFromResponse.key] = ideasFromResponse.ideas;

      return;
    }

    if(inputId == authorInputId){
      ideasSet.author = itemResponse.getResponse();
      return;
    }
  });

  return hasIdea ? ideasSet : false;
}

/**
 Return false or key of idea and list of ideas
 */
function getIdeasFromItemResponse(inputId, response){
  var filterIdeas = function(value){
    return value.trim().length > 0;
  };

  for(ideaKey in ideasSets){
    if(inputId == ideasSets[ideaKey].inputId){
      ideas = response.split('\n').filter(filterIdeas);

      if(ideas.length){
        return {
          key: ideaKey,
          ideas: ideas
        };
      }
    }
  }

  return false;
}