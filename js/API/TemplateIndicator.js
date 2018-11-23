
function loadTemplateIndicatorTree(data) {
  var tree = [];

  for (var item in data) {
    var node = { "id" : "", "parent" : "", "text" : "" , "type" : "indicator",} ;
    node.id = data[item].attributes.uuid;
    node.parent = data[item].attributes.parent;
    node.text = data[item].attributes.text;
    tree.push(node);
  }

  Array.prototype.push.apply(tree,$('#jstree_category_assignment').jstree(true).settings.core.data);
  $('#jstree_category_assignment').jstree(true).settings.core.data = tree;
  $('#jstree_category_assignment').jstree(true).refresh();
  $('#jstree_category_assignment').show();
  $('.category-indicator-tree-spinner').hide();

}

//---------------------------------------------------//
// Update template indicator functions
function updateTemplateIndicator(data) {
  template = { "id": sessionStorage.getItem("templateId"), "indicators": [data] };
  API_UPDATE(API_ENDPOINT + API_TEMPLATE + sessionStorage.getItem("templateId")  + "/", template, updateTemplateIndicatorSuccess, updateTemplateIndicatorFailure, "json");
}

function updateTemplateIndicatorSuccess(response) {
  //console.log(response);
}

function updateTemplateIndicatorFailure(response) {
  console.log(response);
}

//---------------------------------------------------//
// Get Template Indicator Tree List button functions

function getTemplateIndicatorList(companyId, templateId) {
  if ( (companyId > 0) && (templateId > 0) ) {
    API_GET(API_ENDPOINT + API_TEMPLATE_INDICATOR, "?template__id=" + templateId , getTemplateIndicatorListSuccess, getTemplateIndicatorListFailure, "text");
  }
}

function getTemplateIndicatorListSuccess(response) {
  loadTemplateIndicatorTree(parseResponse(response));
}

function getTemplateIndicatorListFailure(response) {
  loadTemplateIndicatorTree([]);
  console.log(response);
}
//---------------------------------------------------//
