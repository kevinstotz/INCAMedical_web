function emptyTemplateCategoryTree() {
  $('#jstree_category_assignment').empty().jstree('destroy');
}

function loadTemplateCategoryTree(data) {
  var tree = [];

  for (var item in data) {
    var node = { "id" : "", "parent" : "", "text" : "" , "type" : "category",} ;
    node.id = data[item].attributes.uuid;
    node.parent = data[item].attributes.parent;
    node.text = data[item].attributes.text;
    tree.push(node);
  }
   $.jstree.plugins.dndCheck = function(options, parent) {
         console.log(options);
         console.log(parent);
         return true;
       };

  $('#jstree_category_assignment').jstree({
    "core" : {
      "error": function(err) {
        console.log(err);
        $("#lblError").html(err.reason);
      },
      "check_callback" : true,
      "multiple": false,
      "animation" : 0,
      "themes" : { "stripes" : true },
      "data" : tree
    },
    "plugins" : ["contextmenu", "dnd", "types", "wholerow" ],
     "types" : {
        "#" : {
          "max_children" : 10,
          "max_depth" : 10,
          "icon" : "/static/assets/images/tree_icon.png"
        },
        "root" : {
          "icon" : "/static/assets/images/tree_icon.png"
        },
        "default" : {
          "valid_children" : ["default", "category", "indicator"]
        },
        "category" : {
          "icon" : "fa fa-tree"
        },
        "indicator" : {
          "icon" : "fa fa-leaf"
        }

      },
      "dnd": {
      	"large_drag_target": true,
      	"large_drop_target": true
      }
    });
}

//---------------------------------------------------//
// Update template category functions
function updateTemplateCategory(data) {
  template = { "id": sessionStorage.getItem("templateId"), "categories": [data] };
  API_UPDATE(API_ENDPOINT + API_TEMPLATE + sessionStorage.getItem("templateId")  + "/", template, updateTemplateCategorySuccess, updateTemplateCategoryFailure, "json");
}

function updateTemplateCategorySuccess(response) {
  console.log(response);
}

function updateTemplateCategoryFailure(response) {
  console.log(response);
}

//---------------------------------------------------//
// Get Template Category Tree List button functions

function getTemplateCategoryList(companyId, templateId) {
  if ( (companyId > 0) && (templateId > 0) ) {
    API_GET(API_ENDPOINT + API_TEMPLATE_CATEGORY, "?template__id=" + templateId , getTemplateCategoryListSuccess, getTemplateCategoryListFailure, "text");
  }
}

function getTemplateCategoryListSuccess(response) {
  loadTemplateCategoryTree(parseResponse(response));
  getTemplateIndicatorList(sessionStorage.getItem("companyId"), sessionStorage.getItem("templateId"));
}

function getTemplateCategoryListFailure(response) {
  loadTemplateCategoryTree([]);
  console.log(response);
}
//---------------------------------------------------//
