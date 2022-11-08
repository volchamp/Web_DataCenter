//获取url地址参数
var Tool = {
    getParam: function (k) {
        var p = {};
        location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
            p[k] = v
        })
        return k ? p[k] : p;
    },
    formatMoney: function (s, n) {
        //金额转换成千位符
        var sStr = s + "";
        if (null != sStr && sStr.indexOf("E") != -1) {
            var arr = sStr.split("E");
            if (arr.length == 2) {
                s = parseFloat(arr[0]) * Math.pow(10, parseInt(arr[1]));
            }
        }
        var d = 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(d) + "";
        var isNeg = false;
        if (s.indexOf("-") != -1) {
            s = s.replace("-", "");
            isNeg = true;
        }
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if (isNeg) {
            return "-" + t.split("").reverse().join("") + "." + r;
        } else {
            return t.split("").reverse().join("") + "." + r;
        }
    },
    convertMoney: function (currencyDigits) {
        /**
         * 人民币金额转中文大写
         * 可用
         * 200000301.25
         * 贰亿零叁佰零壹元贰角伍分
         * 贰亿零叁佰零壹元贰角伍分
         * Created by liwx on 2017-06-27.
         */
        var MAXIMUM_NUMBER = 99999999999.99;
        // Predefine the radix characters and currency symbols for output:
        var CN_ZERO = "零";
        var CN_ONE = "壹";
        var CN_TWO = "贰";
        var CN_THREE = "叁";
        var CN_FOUR = "肆";
        var CN_FIVE = "伍";
        var CN_SIX = "陆";
        var CN_SEVEN = "柒";
        var CN_EIGHT = "捌";
        var CN_NINE = "玖";
        var CN_TEN = "拾";
        var CN_HUNDRED = "佰";
        var CN_THOUSAND = "仟";
        var CN_TEN_THOUSAND = "万";
        var CN_HUNDRED_MILLION = "亿";
        var CN_SYMBOL = "";
        var CN_DOLLAR = "元";
        var CN_TEN_CENT = "角";
        var CN_CENT = "分";
        var CN_INTEGER = "整";

        var integral; // Represent integral part of digit number.
        var decimal; // Represent decimal part of digit number.
        var outputCharacters; // The output result.
        var parts;
        var digits, radices, bigRadices, decimals;
        var zeroCount;
        var i, p, d;
        var quotient, modulus;

        currencyDigits = currencyDigits.toString();
        if (currencyDigits == "") {
            alert("不能为空 请输入数字金额!如：123.23");
            return "";
        }
        if (currencyDigits.match(/[^,.\d]/) != null) {
            alert("输入字符串中的字符无效!");
            return "";
        }
        if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
            alert("请输入正确的数字金额!");
            return "";
        }

        currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
        currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
        // Assert the number is not greater than the maximum number.
        if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            alert("Too large a number to convert!");
            return "";
        }

        parts = currencyDigits.split(".");
        if (parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
            // Cut down redundant decimal digits that are after the second.
            decimal = decimal.substr(0, 2);
        } else {
            integral = parts[0];
            decimal = "";
        }
        digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
        radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
        bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
        decimals = new Array(CN_TEN_CENT, CN_CENT);
        outputCharacters = "";
        if (Number(integral) > 0) {
            zeroCount = 0;
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1;
                d = integral.substr(i, 1);
                quotient = p / 4;
                modulus = p % 4;
                if (d == "0") {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    outputCharacters += digits[Number(d)] + radices[modulus];
                }
                if (modulus == 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                }
            }
            outputCharacters += CN_DOLLAR;
        }
        if (decimal != "") {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1);
                if (d != "0") {
                    outputCharacters += digits[Number(d)] + decimals[i];
                }
            }
        }
        if (outputCharacters == "") {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        if (decimal == "") {
            outputCharacters += CN_INTEGER;
        }
        outputCharacters = CN_SYMBOL + outputCharacters;
        return outputCharacters;
    },
    openTabEvent: function (dataUrl, menuName, paramObj) {
        /**
         * 从列表或其他地方打开新tab页面
         * dataUrl:打开的页面路径  eg:../house/xxx.html
         * menuName:打开的tab名称
         * paramObj:打开的页面需要传递的参数，type:Object  eg：{param1:1,param2:2}
         *2020-11-03.
         */
        var panelUrl = window.frameElement.getAttribute('data-id'),
            dataIndex = (Math.random().toFixed(2)) * 100,
            flag = true,
            urlStr = dataUrl + '?';
        if (typeof (paramObj) != 'undefined') {
            for (var key in paramObj) {
                urlStr += key + '=' + paramObj[key] + '&';
            }
            urlStr = urlStr.substr(0, urlStr.length - 1);
        }
        if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;
        var topWindow = $(window.parent.document);
        // 选项卡菜单已存在,但是路径参数不一样
        $('.menuTab', topWindow).each(function () {
            if ($(this).data('id') == dataUrl) {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings('.menuTab').removeClass('active');
                    $('.page-tabs-content').animate({
                        marginLeft: ""
                    }, "fast");
                    // 显示tab对应的内容区
                    $('.mainContent .app_iframe', topWindow).each(function () {
                        if ($(this).data('id') == dataUrl) {
                            $(this).attr('src', urlStr).show().siblings('.app_iframe').hide();
                            return false;
                        }
                    });
                }
                flag = false;
                return false;
            }
        });
        // 选项卡菜单不存在
        if (flag) {
            var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '" data-panel="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
            $('.menuTab', topWindow).removeClass('active');

            // 添加选项卡对应的iframe
            var str1 = '<iframe class="app_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + urlStr + '" frameborder="0" data-id="' + dataUrl + '" data-panel="' + panelUrl + '" seamless></iframe>';
            $('.mainContent', topWindow).find('iframe.app_iframe').hide().parents('.mainContent').append(str1);

            window.parent.$.modal.loading("数据加载中，请稍后...");
            $('.mainContent iframe:visible', topWindow).load(function () {
                window.parent.$.modal.closeLoading();
            });

            // 添加选项卡
            $('.menuTabs .page-tabs-content', topWindow).append(str);
        }
        return false;
    },
    openWindowEvent(dataUrl, paramObj) {
        /**
         * 从列表或其他地方打开新页面
         * dataUrl:打开的页面路径  eg:../house/xxx.html
         * paramObj:打开的页面需要传递的参数，type:Object  eg：{param1:1,param2:2}
         * 2020-11-03.
         */
        var urlStr = dataUrl + '?';
        if (typeof (paramObj) != 'undefined') {
            for (var key in paramObj) {
                urlStr += key + '=' + paramObj[key] + '&';
            }
            urlStr = urlStr.substr(0, urlStr.length - 1);
        }
        window.open(urlStr, '_blank');
    },
    closeTabEvent: function (dataid) {
        /**
         * 从列表或其他地方关闭tab
         *2020-11-03.
         */
        var dataId = typeof dataid=='undefined'?window.frameElement.getAttribute('data-id'):dataid;
        var panelUrl = window.frameElement.getAttribute('data-panel');
        var topWindow = $(window.parent.document);
        if (dataId) {
            window.parent.$.modal.closeLoading();
            // 根据dataId关闭指定选项卡
            $('.menuTab[data-id="' + dataId + '"]', topWindow).remove();
            // 移除相应tab对应的内容区
            $('.mainContent .app_iframe[data-id="' + dataId + '"]', topWindow).remove();
        }
        //$('.page-tabs-content .active i', topWindow).click();
        if(typeof dataid=='undefined'){
            if (panelUrl) {
                $('.menuTab[data-id="' + panelUrl + '"]', topWindow).addClass('active').siblings('.menuTab').removeClass('active');
                $('.mainContent .app_iframe', topWindow).each(function () {
                    if ($(this).data('id') == panelUrl) {
                        $(this).show().siblings('.app_iframe').hide();
                        //return false;
                    }
                });
            }
        }
    }
}