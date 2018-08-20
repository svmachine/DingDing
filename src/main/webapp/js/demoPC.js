DingTalkPC.config({
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


DingTalkPC.ready(function() {
    DingTalkPC.runtime.permission.requestAuthCode({
        corpId : _config.corpId,
        onSuccess : function(info) {
//			alert('authcode: ' + info.code);
            $.ajax({
                url : 'userInfo?code=' + info.code + '&corpid='
                + _config.corpId,
                type : 'GET',
                success : function(data, status, xhr) {
                    var info = JSON.parse(data);
                    var height = window.innerHeight;
                    var html = "<iframe src=\"/bi/Viewe?token=" + info.unionid + "\" id=\"mainFrame\" height=\"" + height + "\" width=\"100%\"></iframe>";

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

DingTalkPC.error(function(err) {
    alert('dd error: ' + JSON.stringify(err));
});
