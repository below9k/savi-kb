(function(){
Template.__checkName("imexImport");
Template["imexImport"] = new Template("Template.imexImport", (function() {
  var view = this;
  return [ HTML.Raw('<div>\n		<input type="file" name="import" id="import" accept=".c4p,.xml">\n		<input type="hidden" name="cont" id="cont" value="0">\n		<input type="hidden" name="run_once" id="run_once" value="0">\n	</div>\n	'), Blaze.If(function() {
    return Spacebars.call(view.lookup("isCont"));
  }, function() {
    return [ "\n	", HTML.DIV("\n		", HTML.TEXTAREA({
      style: "width: 780px;",
      rows: "40",
      value: function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("parseFin")));
      }
    }), "\n	"), "\n	" ];
  }) ];
}));

})();
