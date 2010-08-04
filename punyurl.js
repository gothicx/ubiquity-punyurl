// SAPO PunyURL Ubiquity

CmdUtils.CreateCommand({
  names: ["punyurl", "puny.sapo"],
  arguments: [{role: "object", nountype: noun_type_url, label: "URL to Shorten"}],
  homepage: "http://www.marblehole.com",
  author: {name: "Marco Rodrigues", email: "gothicx@gmail.com" },
  description: "Shortens and replaces the selected URL using <a href=\"http://puny.sapo.pt\">SAPO PunyURL</a>, copying the new URL to the clipboard.",
  icon: "http://imgs.sapo.pt/images/sapo.ico",
  license: ["GPL"],

  preview: function(pblock, arguments) {
    var baseUrl = "http://services.sapo.pt/PunyURL/GetCompressedURLByURL";
    var params = {url: encodeURIComponent(arguments.object.text)};

    pblock.innerHTML = _("Shorten URL: ...");

    var me = this;
    jQuery.get(baseUrl, params, function(xml) {
      me.purl = jQuery(xml).find("ascii").text();
      if (me.purl)
      	pblock.innerHTML = _("Shorten URL: <strong>" + me.purl + "</strong>");
      else
      	pblock.innerHTML = _("Error shortining URL");
    })
  },

  execute: function() {
    if (this.purl) {
      CmdUtils.setSelection(this.purl);
      CmdUtils.copyToClipboard(this.purl);
      displayMessage({icon: this.icon, title: _("Shorten URL copied to the Clipboard"), text: this.purl});
    }
  }
});
