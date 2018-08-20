# DingDing
部署使用说明

1.初始化

需要自定义listener，在contextInitialized方法中初始化钉钉的api执行的必要条件环境，

```
@Override
public void contextInitialized(ServletContextEvent sce) {
    DefaultContext.init(String random, String corpSecret, String corpId, String agentId);
}
```
2.jsp页面的放置，使用ifream的方式加载需要单点的系统页面，因钉钉免登区分pc端以及移动端故需要两个jsp页面，在任意页面中加入如下代码区分跳转pc端或手机端
```
<script>
    var ua = navigator.userAgent;
    var US = {
        Android:function () {   //安卓
            return ua.match(/Android/i)?true:false;
        },
        BlackBerry:function() {  //黑莓
            return ua.match(/BlackBerry/i)?true:false;
        },
        IOS:function(){  //IOS
            return ua.match(/iPhone|iPad|iPod/i)?true:false;
        },
        Windows:function() {
            return ua.match(/IEMobile/i)?true:false;
        },
        isMobile:function() {  //移动设备
            return US.Android()||US.BlackBerry()||US.IOS()||US.Windows();
        }
    }
    if(US.isMobile()==false){
        window.location = "/indexPC.jsp";     //如果是电脑访问 ,则跳入指定网址。实例中为indexPC.jsp
    }
</script>
```
    
3.编写获取登录用户id的js

```DingTalkPC.ready(function() {
    DingTalkPC.runtime.permission.requestAuthCode({
        corpId : _config.corpId,
        onSuccess : function(info) {
            $.ajax({
                url : 'userInfo?code=' + info.code + '&corpid='
                + _config.corpId,  //前端鉴权后获取的code,以及前期返回的conf配置信息，此处url对应示例中的UserInfoServlet类
                type : 'GET',
                success : function(data, status, xhr) {
                    var info = JSON.parse(data);   //获取的用户详细信息
                    var height = window.innerHeight;
                    var html = "<iframe src=\"url?username=" + info.name + "\" id=\"mainFrame\" height=\"" + height + "\" width=\"100%\"></iframe>";
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
```
4.获取url中的username参数，在第三方系统中实现免登陆即可。

5.获取钉钉部门，用户信息

调用DingDingUserAndGroup类中的方法即可。
