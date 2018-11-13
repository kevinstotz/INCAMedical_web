var INDICATOR_OPTION_LIST = {};
var INDICATOR_TYPE_LIST = {};

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function registerSettingsFacilityEvents() {
    getCompanyList({"active": true });

    $( "#create-facility-button" ).click(function( event ) {
      event.preventDefault();
      createCompany( $( "#settings-facility-select-form" ).serializeObject() );
    });

    $( "#delete-facility-button" ).click(function( event ) {
      deleteCompany(sessionStorage.getItem("companyId"));
      event.preventDefault();
    });

    $( "#update-facility-button" ).click(function( event ) {
      updateCompany( $( "#settings-facility-select-form" ).serializeObject() );
      event.preventDefault();
    });

    $( "#settings-facility-select" ).change(function( event ) {
      event.preventDefault();
      var companyId = 0;
      if ($( this ).val()) {
        companyId = parseInt($( this ).val());
        sessionStorage.setItem("companyId", companyId);
      }

      emptyAuditAreaForms();
      emptyTemplateForms();
      emptyIndicatorForms();
      if (companyId > 0) {
        getCompanyDetail(companyId);
        $( "#update-facility-button" ).show();
        $( "#create-facility-button" ).hide();
      } else {
        emptyCompanyForms();
        $( "#update-facility-button" ).hide();
        $( "#create-facility-button" ).show();
      }
    });
}

function registerHeaderEvents() {
  $('#audits-header').click(function () {
    $('#audits-tabs').show();
    $('#reports-tabs').hide();
    $('#settings-tabs').hide();
  });
  $('#settings-header').click(function () {
    $('#audits-tabs').hide();
    $('#reports-tabs').hide();
    $('#settings-tabs').show();
  });

  $('#reports-header').click(function () {
    $('#audits-tabs').hide();
    $('#reports-tabs').show();
    $('#settings-tabs').hide();
  });
}

function registerFooterEvents() {}

function registerAuditsAuditsEvents() {
  if (sessionStorage.getItem("companyId") > 0 ) {
    getAuditList({"active" : true, "company": sessionStorage.getItem("companyId") });
  }
}

function registerSettingsCategoryEvents() {

  $( "#create-category-button" ).click(function( event ) {
    event.preventDefault();
    createCategory(sessionStorage.getItem("companyId"), $( "#settings-category-select-form" ).serializeObject() );
  });

  $( "#update-category-button" ).click(function( event ) {
    event.preventDefault();
    updateCategory( $( "#settings-category-select-form" ).serializeObject() );
  });

  $( "#delete-category-button" ).click(function( event ) {
    event.preventDefault();
    deleteCategory(sessionStorage.getItem("categoryId"));
  });

  $( "#settings-category-select" ).change(function( event ) {
    event.preventDefault();
    var categoryId = 0;

    if ($( this ).val()) {
      categoryId = parseInt($( this ).val());
      sessionStorage.setItem("categoryId", categoryId);
    }

    if (categoryId > 0) {
      getCategoryDetail(sessionStorage.getItem("categoryId") );
      $( "#update-category-button" ).show();
      $( "#create-category-button" ).hide();
    } else {
      $( "#settings-category-select-form" )[0].reset();
      $( "#update-category-button" ).hide();
      $( "#create-category-button" ).show();
    }
  });
}

function registerSettingsIndicatorEvents() {

  $( "#create-indicator-button" ).click(function( event ) {
    event.preventDefault();
    createIndicator(sessionStorage.getItem("companyId"), $( "#settings-indicator-select-form" ).serializeObject() );
  });

  $( "#update-indicator-button" ).click(function( event ) {
    event.preventDefault();
    updateIndicator( $( "#settings-indicator-select-form" ).serializeObject() );
  });

  $( "#delete-indicator-button" ).click(function( event ) {
    event.preventDefault();
    deleteIndicator(sessionStorage.getItem("indicatorId"));
  });

  $( "#settings-indicator-select" ).change(function( event ) {
    event.preventDefault();
    var indicatorId = 0;

    if ($( this ).val()) {
      indicatorId = parseInt($( this ).val());
      sessionStorage.setItem("indicatorId", indicatorId);
    }

    if (indicatorId > 0) {
      getIndicatorDetail(sessionStorage.getItem("indicatorId") );
      $( "#update-indicator-button" ).show();
      $( "#create-indicator-button" ).hide();
    } else {
      $( "#settings-indicator-select-form" )[0].reset();
      $( "#update-indicator-button" ).hide();
      $( "#create-indicator-button" ).show();
    }
  });

}

function registerSettingsAuditAreaEvents() {
  if (sessionStorage.getItem("companyId") > 0 ) {
    getSpecialtyTypeList();
    getClinicTypeList();
  }
  $( "#create-audit-area-button" ).click(function( event ) {
    event.preventDefault();
    createAuditArea(sessionStorage.getItem("companyId"), $( "#settings-audit-area-form" ).serializeObject() );
  });

  $( "#update-audit-area-button" ).click(function( event ) {
    event.preventDefault();
    updateAuditArea( sessionStorage.getItem("areaId"),  $( "#settings-audit-area-form" ).serializeObject() );
  });

  $( "#delete-audit-area-button" ).click(function( event ) {
    event.preventDefault();
    deleteAuditArea(sessionStorage.getItem("areaId"));
  });


  $( "#settings-audit-area-form-select" ).change(function( event ) {
    event.preventDefault();
    var areaId = 0;

    if ($( this ).val()) {
      areaId = parseInt($( this ).val());
      sessionStorage.setItem("areaId", areaId);
    }
    if (areaId > 0) {
      getAuditAreaDetail(areaId);
      $( "#update-audit-area-button" ).show();
      $( "#create-audit-area-button" ).hide();
    } else {
      $( "#settings-audit-area-form" )[0].reset();
      $( "#update-audit-area-button" ).hide();
      $( "#create-audit-area-button" ).show();
    }
  });

}
function registerReportsReportEvents() {}

function registerSettingsTemplateEvents() {
  getTemplateCategoryList(sessionStorage.getItem("companyId"), sessionStorage.getItem("templateId"));
  $( "#create-template-button" ).click(function( event ) {
    event.preventDefault();
    createTemplate(sessionStorage.getItem("companyId"), $( "#settings-template-select-form" ).serializeObject() );
  });

  $( "#update-template-button" ).click(function( event ) {
    event.preventDefault();
    var data = $( "#settings-template-select-form" ).serializeObject();
    //console.log(JSON.stringify(data));
    updateTemplate(data);
  });

  $( "#delete-template-button" ).click(function( event ) {
    event.preventDefault();
    deleteTemplate(sessionStorage.getItem("templateId"));
  });

  $(document).on("dnd_stop.vakata", function (e, data) {
    var updateData = { "uuid": data.data.nodes[0], "parent": $('#jstree_category_assignment').jstree().get_parent(data.data.obj) }
    if ( $('#jstree_category_assignment').jstree().get_type(data.data.obj) == "indicator") {
      updateTemplateIndicator(updateData);
    } else {
      updateTemplateCategory(updateData);
    }
    return true;
  });

  $( "#settings-template-select" ).change(function( event ) {
    event.preventDefault();
    var templateId = 0;

    if ($( this ).val()) {
      templateId = parseInt($( this ).val());
      sessionStorage.setItem("templateId", templateId);
    }

    if (templateId > 0) {
      getTemplateDetail(sessionStorage.getItem("templateId") );
      $( "#update-template-button" ).show();
      $( "#create-template-button" ).hide();
    } else {
      emptyTemplateCategoryTree();
      $( "#settings-template-select-form" )[0].reset();
      $( "#update-template-button" ).hide();
      $( "#create-template-button" ).show();
    }
  });

}

function registerTableHeadEvents() {}
function registerTableFirstRowEvents() {}
function registerTableRemainingRowEvents() {}

function isInSession(variable) {
  if ( (sessionStorage.getItem(variable) === null) ||
       (sessionStorage.getItem(variable) == 0) ||
       (sessionStorage.getItem(variable) == undefined) ||
       (typeof sessionStorage.getItem(variable) == 'undefined') ) {
      return true;
  }
  return false;
}
$( document ).ready(function() {

    if ( !isInSession(sessionStorage.getItem("companyId")) ) {
      sessionStorage.setItem("companyId", 0);
    }
    sessionStorage.setItem("areaId", 0);
    sessionStorage.setItem("categoryId", 0);
    sessionStorage.setItem("indicatorId", 0);
    sessionStorage.setItem("templateId", 0);

    if ( !isInSession(sessionStorage.getItem("areaId")) ) {
      sessionStorage.setItem("areaId", 0);
    }
    if ( !isInSession(sessionStorage.getItem("templateId")) ) {
      sessionStorage.setItem("templateId", 0);
    }
    if ( !isInSession(sessionStorage.getItem("categoryId")) ) {
      sessionStorage.setItem("categoryId", 0);
    }
    if ( !isInSession(sessionStorage.getItem("indicatorId")) ) {
      sessionStorage.setItem("indicatorId", 0);
    }

    $(".audit-note").click(function() {
      $('#modal1').modal({
          show: true,
          backdrop: false
      });
    });

    $("button.audit-images").click(function() {
        $("button.audit-images figure").toggleClass("showhide");
      });

    $("button.audit-question-images").click(function() {
      $("button.audit-question-images figure").toggleClass("showhide");
    });

    $('#about-us').click(function () {
        console.log("about us");
    });

});
