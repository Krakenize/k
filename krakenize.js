var $kdb;

$kdb = (function() {
  function $kdb(url, username, password) {
    this.url = url;
    this.username = username;
    this.password = password;
  }

  $kdb.prototype.helper = function(how, data, next) {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open(how, this.url, false);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    xmlHttp.send(data);
    return next(JSON.parse(xmlHttp.responseText));
  };

  $kdb.prototype._helper = function(how, data, next) {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open(how, this.url, false);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    xmlHttp.send(data);
    return JSON.parse(xmlHttp.responseText);
  };

  $kdb.prototype.get = function(next) {
    return this.helper("GET", null, next);
  };

  $kdb.prototype.post = function(data, next) {
    var _data, i, j, keys, len;
    keys = Object.keys(data);
    _data = "";
    for (j = 0, len = keys.length; j < len; j++) {
      i = keys[j];
      _data += encodeURIComponent(i) + "=" + encodeURIComponent(data[i])+"&";
    }
    data = _data.slice(0, -1);
    return this.helper("POST", data, next);
  };

  $kdb.prototype.update = function(next) {
    return this.helper("UPDATE", null, next);
  };

  $kdb.prototype.remove = function(next) {
    return this.helper("DELETE", null, next);
  };

  $kdb.prototype._get = function() {
    return this._helper("GET", null);
  };

  $kdb.prototype._post = function(data) {
    var _data, i, j, keys, len;
    keys = Object.keys(data);
    _data = "";
    for (j = 0, len = keys.length; j < len; j++) {
      i = keys[j];
      _data += encodeURIComponent(i) + "=" + encodeURIComponent(data[i])+"&";
    }
    data = _data.slice(0, -1);
    return this._helper("POST", data);
  };

  $kdb.prototype._update = function() {
    return this._helper("UPDATE", null);
  };

  $kdb.prototype._remove = function() {
    return this._helper("DELETE", null);
  };

  return $kdb;

})();
