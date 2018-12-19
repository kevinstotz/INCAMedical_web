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

function registerNewAuditNewEvents() {

}

function registerSettingsFacilityEvents() {
    getCompanyList();

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
        getCompanyList();
        $( "#update-facility-button" ).show();
        $( "#create-facility-button" ).hide();

      } else {
        emptyCompanyForms();
        $( "#update-facility-button" ).hide();
        $( "#create-facility-button" ).show();
      }
    });
}

function registerSettingsSpecialtyTypeEvents() {

      $( "#create-specialty-type-button" ).click(function( event ) {
        event.preventDefault();
        createSpecialtyType(sessionStorage.getItem("companyId"), $( "#settings-specialty-type-select-form" ).serializeObject() );
      });

      $( "#update-specialty-type-button" ).click(function( event ) {
        event.preventDefault();
        updateSpecialtyType( $( "#settings-specialty-type-select-form" ).serializeObject() );
      });

      $( "#delete-specialty-type-button" ).click(function( event ) {
        event.preventDefault();
        deleteSpecialtyType(sessionStorage.getItem("specialtyTypeId"));
      });

      $( "#settings-specialty-type-select" ).change(function( event ) {
        event.preventDefault();
        var specialtyTypeId = 0;

        if ($( this ).val()) {
          specialtyTypeId = parseInt($( this ).val());
          sessionStorage.setItem("specialtyTypeId", clinicTypeId);
        }

        if (specialtyTypeId > 0) {
          getSpecialtyTypeDetail(sessionStorage.getItem("specialtyTypeId") );
          $( "#update-specialty-type-button" ).show();
          $( "#create-specialty-type-button" ).hide();
        } else {
          $( "#settings-specialty-type-select-form" )[0].reset();
          $( "#update-specialty-type-button" ).hide();
          $( "#create-specialty-type-button" ).show();
        }
      });
}

function registerSettingsClinicTypeEvents() {

    $( "#create-clinic-type-button" ).click(function( event ) {
      event.preventDefault();
      createClinicType(sessionStorage.getItem("companyId"), $( "#settings-clinic-type-select-form" ).serializeObject() );
    });

    $( "#update-clinic-type-button" ).click(function( event ) {
      event.preventDefault();
      updateClinicType( $( "#settings-clinic-type-select-form" ).serializeObject() );
    });

    $( "#delete-clinic-type-button" ).click(function( event ) {
      event.preventDefault();
      deleteClinicType(sessionStorage.getItem("clinicTypeId"));
    });

    $( "#settings-clinic-type-select" ).change(function( event ) {
      event.preventDefault();
      var clinicTypeId = 0;

      if ($( this ).val()) {
        clinicTypeId = parseInt($( this ).val());
        sessionStorage.setItem("clinicTypeId", clinicTypeId);
      }

      if (clinicTypeId > 0) {
        getClinicTypeDetail(sessionStorage.getItem("clinicTypeId") );
        $( "#update-clinic-type-button" ).show();
        $( "#create-clinic-type-button" ).hide();
      } else {
        $( "#settings-clinic-type-select-form" )[0].reset();
        $( "#update-clinic-type-button" ).hide();
        $( "#create-clinic-type-button" ).show();
      }
    });
}

function registerHeaderEvents() {
  $('#audits-header').click(function () {
    $('#audits-tabs').show();
    $('#new-audit-tabs').hide();
    $('#reports-tabs').hide();
    $('#settings-tabs').hide();
  });

  $('#settings-header').click(function () {
    $('#audits-tabs').hide();
    $('#new-audit-tabs').hide();
    $('#reports-tabs').hide();
    $('#settings-tabs').show();
  });

  $('#reports-header').click(function () {
    $('#audits-tabs').hide();
    $('#new-audit-tabs').hide();
    $('#reports-tabs').show();
    $('#settings-tabs').hide();
  });

  $('#new-audit-header').click(function () {
    $('#audits-tabs').hide();
    $('#new-audit-tabs').show();
    $('#reports-tabs').hide();
    $('#settings-tabs').hide();
  });
}

function registerFooterEvents() {
  $('#about-us').click(function () {
      console.log("about us");
  });
}

function registerSettingsIndicatorOptionsEvents() {
  if (sessionStorage.getItem("companyId") > 0 ) {
    getIndicatorOptionList(sessionStorage.getItem("companyId"));
  }
  $( "#create-indicator-option-button" ).click(function( event ) {
    event.preventDefault();
    createIndicatorOption(sessionStorage.getItem("companyId"), $( "#settings-indicator-option-select-form" ).serializeObject() );
  });

  $( "#update-indicator-option-button" ).click(function( event ) {
    event.preventDefault();
    console.log($( "#settings-indicator-option-select-form" ).serializeObject());
    //updateIndicatorOption(  );
  });

  $( "#delete-indicator-option-button" ).click(function( event ) {
    event.preventDefault();
    deleteIndicatorOption(sessionStorage.getItem("indicatorOptionId"));
  });

  $( "#settings-indicator-option-select" ).change(function( event ) {
    event.preventDefault();
    var indicatorOptionId = 0;

    if ($( this ).val()) {
      indicatorOptionId = parseInt($( this ).val());
      sessionStorage.setItem("indicatorOptionId", indicatorOptionId);
    }

    if (indicatorOptionId > 0 ) {
      getIndicatorOption(sessionStorage.getItem("indicatorOptionId") );
      $( "#update-indicator-option-button" ).show();
      $( "#create-indicator-option-button" ).hide();
    } else {
      $( "#settings-indicator-option-select-form" )[0].reset();
      $( "#update-indicator-option-button" ).hide();
      $( "#create-indicator-option-button" ).show();
    }
  });
}

function registerAuditsAuditsEvents() {
  $('#section-audits-audits-tablist').show();
  if (sessionStorage.getItem("companyId") > 0 ) {
    sessionStorage.setItem("auditId", 0);
    getAuditList({"active" : true, "company": sessionStorage.getItem("companyId") });
  }

  $( "#create-new-audit-button" ).click(function( event ) {
    event.preventDefault();
    $( '#new-audit-form' ).submit();
  });

  $('#new-audit-form').submit(function() {
    createNewAudit( $( "#new-audit-form" ).serializeObject() );
    return false;
  });

  $( "#new-audit-facility-select" ).change(function( event ) {
    event.preventDefault();
    var companyId = 0;

    if ($( this ).val()) {
      companyId = parseInt($( this ).val());
      sessionStorage.setItem("companyId", companyId);
    }

    if (companyId > 0) {
      getAuditList( { "company": companyId, "active": true } );
    }
  });

  $( "#new-audit-audit-area-form-select" ).change(function( event ) {
    event.preventDefault();
    var areaId = 0;

    if ($( this ).val()) {
      areaId = parseInt($( this ).val());
      sessionStorage.setItem("areaId", areaId);
    }
    if (areaId > 0) {
      getAuditAreaDetail(areaId);
    }
  });

  $( "#new-audit-template-select" ).change(function( event ) {
    event.preventDefault();
    var templateId = 0;

    if ($( this ).val()) {
      templateId = parseInt($( this ).val());
      sessionStorage.setItem("templateId", templateId);
    }

    if (templateId > 0) {
      getTemplateDetail(sessionStorage.getItem("templateId") );
    }
  });
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
    getSpecialtyTypeList(sessionStorage.getItem("companyId"));
    getClinicTypeList(sessionStorage.getItem("companyId"));
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
    createTemplate(sessionStorage.getItem("companyId"), $( "#settings-template-select-form" ).serializeObject() );
  });

  $( "#update-template-button" ).click(function( event ) {
    var data = $( "#settings-template-select-form" ).serializeObject();
    updateTemplate(data);
  });

  $( "#delete-template-button" ).click(function( event ) {
    event.preventDefault();
    deleteTemplate(sessionStorage.getItem("templateId"));
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
      $('.category-indicator-tree-spinner').hide();
    }
  });

}
