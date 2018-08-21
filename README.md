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
2.jsp页面的放置，使用ifream的方式加载需要单点的系统页面，一般jsp页面（示例中为index.jsp、indexPC.jsp）放置在tomcat/webapps/ROOT目录下，因钉钉免登区分pc端以及移动端故需要两个jsp页面，在任意页面中加入如下代码区分跳转pc端或手机端
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
    
3.编写获取登录用户id的js, 此处为pc端，手机端将DingTalkPC替换为dd即可
<p>pc端js：https://g.alicdn.com/dingding/dingtalk-pc-api/2.7.0/index.js  http://g.alicdn.com/ilw/cdnjs/zepto/1.1.6/zepto.min.js</p>
<p>手机端js: http://g.alicdn.com/dingding/open-develop/1.6.9/dingtalk.js  http://g.alicdn.com/ilw/cdnjs/zepto/1.1.6/zepto.min.js</p>

```
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

调用DingDingUserAndGroup类中的方法即可
```
getDepartments(String departmentId); //获取指定部门id下的子部门信息

getDepartments(); //获取所有部门信息

getUserByDepartment(String departmentId); //获取指定部门id下的用户信息

getUsers(); //获取所有的用户信息

getDepartmentParentId(String departmentId); //获取指定部门id的完整路径id

getDepartmentById(String departmentId); //获取指定部门id的部门详细信息
```
