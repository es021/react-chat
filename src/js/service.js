var Service = function (url) {
    this.url = url;
    this.specialKey = "not_jQuery";
};

Service.prototype.ajax = function (type, action, data, success, error) {

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open(type, this.url + action);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3) {
            if (xhr.status == 200) {
                try {
                    var res = JSON.parse(xhr.responseText);
                    success(res);

                } catch (err) {
                    error(err);
                }
            }
        }
    };

    var param = this.specialKey + "=" + JSON.stringify(data);
    xhr.send(param);
    return xhr;
};

/**** CHAT SERVICE ********************************************/
var ChatService = function () {
    
    var api_url = "";
    if (process.env.NODE_ENV === "development") {
        api_url = "http://localhost:3000/v1/chat/";
    }

    if (process.env.NODE_ENV === "production") {
        api_url = "http://138.197.112.227/chatapi/v1/chat/";
    }

    this.service = new Service(api_url);
};

ChatService.prototype.getByPage = function (page, success, error) {
    this.service.ajax("GET", "page/" + page, {}, success, error);
};

ChatService.prototype.search = function (param, success, error) {
    this.service.ajax("GET", "search/" + param, {}, success, error);
};


module.exports = ChatService;


