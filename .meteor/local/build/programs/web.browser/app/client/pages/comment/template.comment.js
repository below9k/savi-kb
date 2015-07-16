(function(){
Template.__checkName("comments");
Template["comments"] = new Template("Template.comments", (function() {
  var view = this;
  return HTML.DIV({
    "class": "no_print"
  }, HTML.Raw('\n		<h4>Comments</h4>\n		<i class="fa fa-3x fa-sort-up section_marker"></i>\n		'), HTML.DIV({
    "class": "comment_wrapper block form-group"
  }, "\n			", HTML.DIV("\n				", HTML.DIV({
    "class": "comments container form-control"
  }, "\n					", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getComments"));
  }, function() {
    return [ "\n					", HTML.DIV({
      "class": "comment row"
    }, "\n						", HTML.DIV({
      "class": "comment_poster col-lg-1 col-md-2 col-s-12"
    }, "\n							", HTML.P("\n								", Blaze.View("lookup:..creator_email", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "creator_email"));
    }), "\n							"), "\n							", HTML.P({
      "class": "article_last_updated"
    }, "Last updated ", Blaze.View("lookup:timeSinceUpdate", function() {
      return Spacebars.mustache(view.lookup("timeSinceUpdate"), Spacebars.dot(view.lookup("."), "last_updated"));
    })), "\n						"), "\n						", HTML.DIV({
      "class": "comment_text col-lg-9 col-m-9 col-s-11"
    }, Blaze.View("lookup:..comment.text", function() {
      return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(view.lookup("."), "comment", "text")));
    })), "\n						", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("isCreator"), Spacebars.dot(view.lookup("."), "creator_id"));
    }, function() {
      return [ "\n						", HTML.DIV({
        "class": "remove_comment col-lg-1 col-m-1 col-s-1"
      }, "\n							", HTML.INPUT({
        type: "hidden",
        "class": "comment_id",
        value: function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "_id", "toHexString"));
        }
      }), "\n							", HTML.I({
        "class": "fa fa-times"
      }), "\n						"), "\n						" ];
    }), "\n					"), "\n					" ];
  }), "\n				"), "\n				", HTML.Raw("<hr>"), "\n				", HTML.Raw('<div class="input-group">\n					<span class="comment_reply input-group-addon">\n						<i class="fa fa-share"></i>\n					</span>\n					<div class="comment_input form-control" contenteditable="true"></div>\n				</div>'), "\n			"), "\n		"), "\n	");
}));

})();
