var curlFinance="";
var urlpath=window.location.href.split("://")[1];
ip=urlpath.split(":")[0];

var imgurl ='http://127.0.0.1:80/files/';//文件访问路径
// 地址
var curl="http://127.0.0.1:8088/api-im";
var wsIm="ws://127.0.0.1:8088/api-im/websocket/";

if(urlpath.indexOf("127.0.0.1")>-1)
{
	// ip="124.222.4.40";
	// ip="127.0.0.1";
	imgurl ='http://'+ip+':8091/';//文件访问路径
	// 地址
	curl='http://'+ip+':8088/api-im';
	wsIm='ws://'+ip+':8088/api-im/websocket/';
}
else
{
	imgurl ='http://'+ip+':8091/';//文件访问路径
	// 地址
	curl='http://'+ip+':8088/api-im';
	wsIm='ws://'+ip+':8088/api-im/websocket/';
}


// var curlCos="http://127.0.0.1:8100/cosapi";

function webApi(method, postType,parameter, fnSuccess, fnError, async) {
	var url = curl + method; //地址
	//判断是否需要同步ajax
	if (typeof (async) == "undefined") {
		async = true;
	}
	// $.support.cors=true;
	$.ajax({
		type: postType,
		data: JSON.stringify(parameter),
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		url: url,
		cache:false,
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("v_token", getCookie("V_TOKEN"));
		},
		crossDomain: true == !(document.all),
		xhrFields: {
			withCredentials: true
		},
		async: async,
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			var _msg=data.msg+"";
			if (_msg.indexOf("TOKEN过期") > -1 || _msg.indexOf("登录超时") > -1) {
				//$.messager.alert('提示', data.msg);
				setTimeout(function () {
					localStorage.clear();
					var nowurl = window.top.location+"";
					if (nowurl.indexOf("Layout") != -1 || nowurl.indexOf("Login") != -1) {
						top.location.href = prefix() + "Login.html";
					}
				}, 2000);
				return false;
			} else {
				fnSuccess(data);
			}
		},
		complete: function (data) {
		},
		error: function (xhr, type, errorThrown) {
			//异常处理；
			fnError(xhr, type, errorThrown);
		}
	});
}
function webapiOther(method, parameter, fnSuccess, fnError, async) {
	var url = curl1 + method; //正式地址
	//判断是否需要同步ajax
	if (typeof (async) == "undefined") {
		async = true;
	}
	// $.support.cors=true;
	$.ajax({
		type: "post",
		data: JSON.stringify(parameter),
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		url: url,
		cache:false,
		beforeSend: function(XMLHttpRequest) {
			XMLHttpRequest.setRequestHeader("token", getCookie("V_TOKEN"));
		},
		crossDomain: true == !(document.all),
		xhrFields: {
			withCredentials: true
		},
		async: async,
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			var _msg=data.msg+"";
			if (_msg.indexOf("TOKEN过期") > -1 || _msg.indexOf("登录超时") > -1) {
				$.messager.alert('提示', data.msg);
				setTimeout(function () {
					localStorage.clear();
					var nowurl = window.top.location+"";
					if (nowurl.indexOf("Layout") != -1 || nowurl.indexOf("Login") != -1) {
						top.location.href = prefix() + "Login.html";
					}
				}, 2000);
				return false;
			} else {
				fnSuccess(data);
			}
		},
		complete: function (data) {
		},
		error: function (xhr, type, errorThrown) {
			//异常处理；
			fnError(xhr, type, errorThrown);
		}
	});
}

var appKey = "kmvc2018";

function webapiSign(data) {
	var params = (data == undefined ? {} : data);
	var timestamp = Date.parse(new Date());
	params.timestamp = timestamp;
	params.V_PAGE_TYPE = "EASY";

	// 获取Unix时间戳，13位
	var time = new Date();
	var utcTime = time.toUTCString();
	var unixTime = Date.parse(utcTime);

	// 按键名升序、大小写不敏感排序键值对
	var keys = [];
	for (var i in params) {
		keys.push(i);
	}
	keys = keys.sort(function (a, b) {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	// 拼接键值对字符串，格式：Key1Value1Key2Vlue2...
	var unionString = "";
	var base64 = new Base64();
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (params[key] == null) {
			return false;
		}
		var value = params[key].toString();
		value = base64.encode(value);
		unionString += key + value;
		params[key] = value;
	}

	// 加AppKey后缀
	unionString += appKey;

	// 计算拼接字符串的MD5值
	//var encryptMD5String = hex_md5(unionString).toUpperCase();
	var encryptMD5String = hex_md5(unionString);
	var sign = encryptMD5String;

	params["sign"] = sign;
	return params;
}

//去除输入框前后空格 onkeyup调用
function trimkeyup(e) {
	Input = $(this);
	if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13) {
		var im = Input.val().replace(/\s+/g, '');
		Input.val(im);
	}
}
//解决ie8下input=number无效，同时解决input=number可输入e的问题
$.fn.onlyNum = function () {
	$(this).keypress(function (event) {
		var eventObj = event || e;
		var keyCode = eventObj.keyCode || eventObj.which;
		if ((keyCode >= 48 && keyCode <= 57))
			return true;
		else
			return false;
	}).focus(function () {
		this.style.imeMode = 'disabled';
	}).bind("paste", function () {
		var clipboard = window.clipboardData.getData("Text");
		if (/^\d+$/.test(clipboard))
			return true;
		else
			return false;
	});
};

/*cookie操作*/
//设置cookie
function setCookie(name, value, seconds) {
	seconds = seconds || 0;
	var expires = "";
	if (seconds != 0) {
		var date = new Date();
		date.setTime(date.getTime() + (seconds * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expires + "; path=/";
}

//取得cookie
function getCookie(name) {
	var nameEQ = name + "=";
	var _cookie = document.cookie;
	var ca = _cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) == 0) {
			return unescape(c.substring(nameEQ.length, c.length));
		}
	}
	return false;
}

//清除cookie
function clearCookie(name) {
	setCookie(name, "", -1);
}

//清除所有cookie
function clearAllCookie() {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;) {
			clearCookie(keys[i])
		}
	}
}


function webapiFlow(method, parameter, fnSuccess, fnError, async) {
    var url = curl2 + method; //正式地址
    //判断是否需要同步ajax
    if (typeof (async) == "undefined") {
        async = true;
    }
    // $.support.cors=true;
    $.ajax({
        type: "post",
        data: JSON.stringify(parameter),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: url,
        cache:false,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("token", getCookie("V_TOKEN"));
        },
        crossDomain: true == !(document.all),
        xhrFields: {
            withCredentials: true
        },
        async: async,
        success: function(data) {
            //服务器返回响应，根据响应结果，分析是否登录成功；
            var _msg=data.msg+"";
            if (_msg.indexOf("TOKEN过期") > -1 || _msg.indexOf("登录超时") > -1) {
                $.messager.alert('提示', data.msg);
                setTimeout(function () {
                    localStorage.clear();
                    var nowurl = window.top.location+"";
                    if (nowurl.indexOf("Layout") != -1 || nowurl.indexOf("Login") != -1) {
                        top.location.href = prefix() + "Login.html";
                    }
                }, 2000);
                return false;
            } else {
                fnSuccess(data);
            }
        },
        complete: function (data) {

        },
        error: function (xhr, type, errorThrown) {
            //异常处理；
            fnError(xhr, type, errorThrown);
        }
    });
}

var URLUtils = {
	getParam:function(k) {
		var p = {};
		location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
			p[k] = v
		})
		return k ? p[k] : p;
	}
}

