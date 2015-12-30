/**
 Get fresh ideas from current response, save to sheets and update form's checkboxes
 */
function onSubmitForm(e){
  Logger.log('ok');

  var values = e.values;

  Logger.log(values);

  var ideasSet = getIdeasFromValues(values);

  Logger.log(ideasSet);

  if(ideasSet){
    saveIdeasToSheets(ideasSet);
    updateFormIdeasCheckboxes();
  }
}

/**

 */
function getIdeasFromValues(values){
  var hasIdea = false;

  var ideasSet = {
    'author': null,
    'keys': {
      'postcss': [],
      'gulp': [],
      'webpack': []
    }
  };

  var filterIdeas = function(value){
    return value.trim().length > 0;
  };

  for(ideaKey in ideasSet.keys){
    var column = ideasSets[ideaKey].inputColumn;
    var ideas = values[column].split('\n').filter(filterIdeas);

    if(ideas.length){
      hasIdea = true;

      ideasSet.keys[ideaKey] = ideas;
    }
  }

  ideasSet.author = values[authorInputColumn];

  return hasIdea ? ideasSet : false;
}


/**

 */
function updateFormIdeasCheckboxes(){
  var form = FormApp.openById(formId);

  for(key in ideasSets){
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[ideasSets[key].sheet];
    var range = sheet.getDataRange();
    var rows = range.getValues();

    var checkboxValues = [];

    for(var i = 0; i < rows.length; i++){
      var idea = rows[i] && rows[i][0];
      var author = rows[i] && rows[i][1];

      if(idea && author){
        checkboxValues.push(idea + ' --- { автор: ' + author + ' }');
      }
    }

    if(!checkboxValues.length){
      checkboxValues.push('...');
    }

    form.getItemById(ideasSets[key].checkboxId).asCheckboxItem().setChoiceValues(checkboxValues);
  }
}