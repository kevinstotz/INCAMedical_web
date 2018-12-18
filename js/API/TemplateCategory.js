function emptyTemplateCategoryTree() {
  $('#jstree_category_assignment').empty().jstree('destroy');
  $('#jstree_category_assignment').hide();
  $('.category-indicator-tree-spinner').show();
}

function loadTemplateCategoryTree(data) {
  $('#jstree_category_assignment').empty().jstree('destroy');
  $('#jstree_category_assignment').hide();
  $('.category-indicator-tree-spinner').show();
  var tree = [];

  for (var item in data) {
    var node = { "id" : "", "parent" : "", "text" : "", "type" : "category", "li_attr": 0 };

    node.id = data[item].attributes.uuid;
    node.parent = data[item].attributes.parent;
    node.text = data[item].attributes.name;
    node.li_attr = { "data-id": data[item].id };

    tree.push(node);
  }

  $('#jstree_category_assignment').jstree({
    "core" : {
      "error": function(err) {
        console.log("tree error");
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

    $('#jstree_category_assignment').on("move_node.jstree", function (e, data) {
        var moveItemID = data.node.id;
        var newParentID = data.node.parent;
        if (newParentID == "#") { newParentID="00000000-0000-0000-0000-000000000000"; }
        if (moveItemID == "#") { moveItemID="00000000-0000-0000-0000-000000000000"; }
        var updateData = { "uuid": moveItemID, "position": data.position, "parent": newParentID }

        if ( $('#jstree_category_assignment').jstree().get_type(data.node) == "indicator") {
          var templateIndicatorID = data.node.li_attr['data-id'];
          updateTemplateIndicator(templateIndicatorID, updateData);
        } else {
          var templateCategoryID = data.node.li_attr['data-id'];
          updateTemplateCategory(templateCategoryID, updateData);
        }
        return true;
    });
}

//---------------------------------------------------//
// Update template category functions
function updateTemplateCategory(templateCategoryID, data) {
  API_UPDATE(API_ENDPOINT + API_TEMPLATE_CATEGORY + templateCategoryID + "/", data, updateTemplateCategorySuccess, updateTemplateCategoryFailure, "json");
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
  //console.log(parseResponse(response));
  loadTemplateCategoryTree(parseResponse(response));
  getTemplateIndicatorList(sessionStorage.getItem("companyId"), sessionStorage.getItem("templateId"));
}

function getTemplateCategoryListFailure(response) {
  loadTemplateCategoryTree([]);
  console.log(response);
}
//---------------------------------------------------//

// Get Template Category Tree List button functions

function getTemplateCategoryDetail(categoryId) {
  if ( categoryId > 0 ) {
    API_GET(API_ENDPOINT + API_TEMPLATE_CATEGORY, categoryId + "/?audit=" + sessionStorage.getItem("auditId") , getTemplateCategoryDetailSuccess, getTemplateCategoryDetailFailure, "text");
  }
}

function getTemplateCategoryDetailSuccess(response) {
  console.log(parseResponse(response));
}

function getTemplateCategoryDetailFailure(response) {
  console.log(response);
}
//---------------------------------------------------//
