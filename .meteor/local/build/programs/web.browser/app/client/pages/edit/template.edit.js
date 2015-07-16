(function(){
Template.__checkName("edit");
Template["edit"] = new Template("Template.edit", (function() {
  var view = this;
  return [ HTML.DIV({
    id: "edit",
    "class": "edit"
  }, "\n		", HTML.I({
    "class": "fa fa-times remove_article",
    "data-id": function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
    },
    "data-title": function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
    }
  }), "\n		", HTML.Raw("<h4>Article</h4>"), "\n		", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n		", HTML.DIV({
    "class": "block"
  }, "\n			", HTML.INPUT({
    type: "hidden",
    name: "article_id",
    id: "article_id",
    value: function() {
      return Spacebars.mustache(view.lookup("setArticleId"));
    }
  }), "\n			", HTML.DIV({
    "class": "form-group"
  }, "\n				", HTML.Raw('<label for="statusSelect">View</label>'), "\n				", HTML.SELECT({
    name: "status",
    id: "statusSelect",
    "class": "form-control"
  }, "\n					", HTML.OPTION(HTML.Attrs({
    value: "3"
  }, function() {
    return Spacebars.attrMustache(view.lookup("isSelected"), "3", Spacebars.dot(view.lookup("."), "status"));
  }), "Incomplete"), "\n			", HTML.Raw('<!--	<option value="0" {{isSelected "0" this.status}}>Hidden/Deleted</option> -->'), "\n					", HTML.OPTION(HTML.Attrs({
    value: "1"
  }, function() {
    return Spacebars.attrMustache(view.lookup("isSelected"), "1", Spacebars.dot(view.lookup("."), "status"));
  }), "Public"), "\n					", HTML.OPTION(HTML.Attrs({
    value: "2"
  }, function() {
    return Spacebars.attrMustache(view.lookup("isSelected"), "2", Spacebars.dot(view.lookup("."), "status"));
  }), "Diem User(s)"), "\n					", HTML.OPTION(HTML.Attrs({
    value: "4"
  }, function() {
    return Spacebars.attrMustache(view.lookup("isSelected"), "4", Spacebars.dot(view.lookup("."), "status"));
  }), "Diem Management"), "\n                    ", HTML.OPTION(HTML.Attrs({
    value: "10"
  }, function() {
    return Spacebars.attrMustache(view.lookup("isSelected"), "10", Spacebars.dot(view.lookup("."), "status"));
  }), "Dealer(s)"), "\n					", HTML.OPTION(HTML.Attrs({
    value: "5"
  }, function() {
    return Spacebars.attrMustache(view.lookup("isSelected"), "5", Spacebars.dot(view.lookup("."), "status"));
  }), "Personal Document (Do Not Share)"), "\n				"), "\n			"), "\n			", HTML.DIV({
    "class": "form-group"
  }, "\n				", HTML.Raw('<label for="parent">Article Group Name</label>'), "\n				", HTML.INPUT({
    name: "parent",
    id: "parent",
    type: "text",
    "class": "form-control",
    placeholder: "Parent Name",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
    }
  }), "\n			"), "\n			", HTML.Raw("<!-- Depricated parent_id, just using the name - it unique or its not. Keeping this just cause -->"), "\n			", HTML.INPUT({
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
      }, HTML.P(HTML.CharRef({
        html: "&middot;",
        str: "·"
      }), " ", Blaze.View("lookup:..parent.title", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "title"));
      }))), "\n					" ];
    }), "\n				"), "\n			"), "\n			" ];
  }), "\n			", HTML.DIV({
    "class": "form-group"
  }, "\n				", HTML.Raw('<label for="article_title">Article Name</label>'), "\n				", HTML.INPUT({
    name: "article_title",
    id: "article_title",
    type: "text",
    "class": "form-control",
    placeholder: "Article Title",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "title"));
    }
  }), "\n				", HTML.Raw('<label for="article_sort_number">Group Order Number (Highest first, lowest last)</label>'), "\n				", HTML.INPUT({
    name: "article_sort_number",
    id: "article_sort_number",
    type: "number",
    "class": "form-control",
    placeholder: [ "Article sort order (1", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "-", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&infin;",
      str: "∞"
    }), ")" ],
    min: "1",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "parent", "group_order"));
    }
  }), "\n			"), "\n		"), "\n		", HTML.P(HTML.LABEL({
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
  }), "\n			"), "\n			", HTML.Raw('<div id="prereq_controls" class=""><i id="new" class="fa fa-3x fa-plus-square"></i></div>'), "\n		"), "\n		", HTML.Raw("<h4>Steps</h4>"), "\n		", HTML.Raw('<i class="fa fa-3x fa-sort-up section_marker"></i>'), "\n		", HTML.DIV({
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
  }), "\n		"), "\n		", HTML.DIV({
    "class": "no-print"
  }, "\n		", Blaze.If(function() {
    return Spacebars.call(view.lookup("loggedIn"));
  }, function() {
    return [ "\n		", Spacebars.include(view.lookupTemplate("comments")), "\n		" ];
  }), "	\n		"), "\n		\n		", HTML.Raw('<div id="steps_controls" class="row">\n			<div class="col-md-4 col-xs-4"><i id="openUploads" class="fa fa-4x fa-cloud-upload"></i><p>Uploads</p></div>\n			<div class="col-md-4 col-xs-4"><i id="new" class="fa fa-4x fa-plus-square"></i><p>Add Step</p></div>\n			<div class="col-md-4 col-xs-4"><i id="save" class="fa fa-4x fa-save"></i><p>Save</p></div>\n		</div>'), "\n	"), "\n	", Spacebars.include(view.lookupTemplate("uploads")) ];
}));

})();
