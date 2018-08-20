dd.config({
    agentId : _config.agentid,
    corpId : _config.corpId,
    timeStamp : _config.timeStamp,
    nonceStr : _config.nonceStr,
    signature : _config.signature,
    jsApiList : [ 'runtime.info', 'biz.contact.choose',
        'device.notification.confirm', 'device.notification.alert',
        'device.notification.prompt', 'biz.ding.post',
        'biz.util.openLink' ]
});


dd.ready(function() {
    dd.runtime.permission.requestAuthCode({
        corpId : _config.corpId,
        onSuccess : function(info) {
//			alert('authcode: ' + info.code);
            $.ajax({
                url : 'bi/userinfo?code=' + info.code + '&corpid='
                + _config.corpId,
                type : 'GET',
                success : function(data, status, xhr) {
                    var info = JSON.parse(data);

                    var height = document.body.scrollHeight;

                   /* var frame = document.getElementById('mainFrame');

                    frame.src = "/bi/Viewer?proc=0&action=viewerManager&token=" + info.unionid + "&isAir=true";*/
                    var html = "<iframe src=\"bi/Viewe?proc=0&action=viewerManager&token=" + info.unionid + "&isAir=true\" id=\"mainFrame\" height=\"" + height + "\" width=\"100%\"></iframe>";

                    $("#ifream").append(html)
                },
                error : function(xhr, errorType, error) {
                    logger.e("yinyien:" + _config.corpId);
                    alert(errorType + ', ' + error);
                }
            });

        },
        onFail : function(err) {
            alert('fail: ' + JSON.stringify(err));
        }
    });
});

dd.error(function(err) {
    alert('dd error: ' + JSON.stringify(err));
});
