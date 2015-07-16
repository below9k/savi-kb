(function(){
Template.__checkName("edit");
Template["edit"] = new Template("Template.edit", (function() {
  var view = this;
  return [ HTML.DIV({
    id: "edit",
    "class": "edit"
  }, "\n		", HTML.Raw("<h4>Article</h4>"), "\n		", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n		", HTML.DIV({
    "class": "block"
  }, "\n			", HTML.INPUT({
    type: "hidden",
    name: "article_id",
    id: "article_id",
    value: function() {
      return Spacebars.mustache(view.lookup("setArticleId"));
    }
  }), "\n			", HTML.INPUT({
    name: "parent",
    id: "parent",
    type: "text",
    "class": "form-control",
    placeholder: "Process Group",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
    }
  }), "\n			", HTML.INPUT({
    type: "hidden",
    id: "parent_id",
    name: "parent_id",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "_id"));
    }
  }), "\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("parentSearch"));
  }, function() {
    return [ "\n			", HTML.DIV({
      id: "parent_search"
    }, "\n				", HTML.UL("\n					", Blaze.Each(function() {
      return Spacebars.call(view.lookup("parentSearch"));
    }, function() {
      return [ "\n					", HTML.LI({
        "class": "parent_select",
        "data-title": function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
        }
      }, HTML.P(Blaze.View(function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
      }))), "\n					" ];
    }), "\n				"), "\n			"), "\n			" ];
  }), "\n			", HTML.INPUT({
    name: "article_title",
    id: "article_title",
    type: "text",
    "class": "form-control",
    placeholder: "Article Title",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
    }
  }), "\n\n		"), "\n		", HTML.P(HTML.LABEL({
    "for": "add_prereq"
  }, HTML.INPUT({
    name: "add_prereq",
    id: "add_prereq",
    type: "checkbox",
    "class": "checkbox",
    checked: function() {
      return Spacebars.mustache(view.lookup("checkPrereq"), view.lookup("prereq_enable"));
    }
  }), "Prerequisites?")), "\n		", HTML.DIV({
    id: "prereq"
  }, "\n			", HTML.Raw("<h4>Prereqs.</h4>"), "\n			", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n			", HTML.DIV({
    "class": "block prereq"
  }, "\n				", Blaze.Each(function() {
    return Spacebars.call(view.lookup("prereq"));
  }, function() {
    return [ "\n				", Spacebars.include(view.lookupTemplate("prereqEdit")), "\n				" ];
  }), "\n			"), "\n			", HTML.Raw('<div id="prereq_controls" class=""><i id="new" class="fa fa-3x fa-plus-square box"></i> </div>'), "\n		"), "\n		", HTML.Raw("<h4>Steps</h4>"), "\n		", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n		", HTML.DIV({
    id: "steps",
    "class": "steps row block"
  }, "\n			", Blaze.If(function() {
    return Spacebars.call(view.lookup("steps"));
  }, function() {
    return [ "\n			", Blaze.Each(function() {
      return Spacebars.call(view.lookup("steps"));
    }, function() {
      return [ "\n			", Spacebars.include(view.lookupTemplate("stepEdit")), "\n			" ];
    }), "\n			" ];
  }, function() {
    return [ "\n			", Spacebars.include(view.lookupTemplate("stepEdit")), "\n			" ];
  }), "\n		"), "\n		", HTML.Raw('<div id="steps_controls" class="box row">\n			<div class="col-md-4 col-xs-4"><i id="openUploads" class="fa fa-4x fa-image sb-toggle-right"></i><p>Uploads</p></div>\n			<div class="col-md-4 col-xs-4"><i id="new" class="fa fa-4x fa-plus-square"></i><p>Add Step</p></div>\n			<div class="col-md-4 col-xs-4"><i id="save" class="fa fa-4x fa-save"></i><p>Save</p></div>\n		</div>'), "\n	"), "\n	", Spacebars.include(view.lookupTemplate("uploads")) ];
}));

})();
