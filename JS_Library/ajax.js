
function ajax(options){
    var _default={
        url:null,
        type:'GET',
        dataType:'json',//预设服务器返回时json
        async:true,
        cache:true,//get请求的时候是否使用缓存，默认是true，使用缓存，想要不走缓存的话设置为false
        data:null,//设置请求主体的内容，默认是null,如果当前的请求是post请求，我们需要设置对应的值
        success:null//当服务器把内容返回成功之后，我们执行这个回调函数
};
    for(var key in options){
        if(options.hasOwnProperty(key)){
            _default[key]=options[key];
        }
    }
    //send ajax
    var xhr=new XMLHttpRequest();
    if(_default.type.toUpperCase()==='GET' && _default.cache===false){
        _default.url.indexOf('?')>-1?_default.url+='&':_default.url+='?';
        _default.url+="_="+Math.random();
    }
    xhr.open(_default.type,_default.url,_default.async);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
            var dataType=_default.dataType.toUpperCase(),
                value=xhr.responseText;
            switch(dataType){
                case 'JSON':
                    value='JSON' in window?JSON.parse(value):eval('('+value+')');
                    break;
                case 'TXT':
                    break;
                case 'XML':
                    value=xhr.responseXML;
                    break;
            }
            _default.success && _default.success.call(xhr,value);
        }
    }
    xhr.send(_default.data);
}
