//Js 数据容量单位转换(kb,mb,gb,tb)
function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
 
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
 /*
      上传参数设定
      */
    
var upurl = "./uploadAll.php?author=koreyoshi";//上传图片地址
var duotu = true;//是否为多图上传true false


//多文件列表示例

 layui.use('upload', function(){
  var $ = layui.jquery
  ,upload = layui.upload;

  
  var load = '';
	var type = 'video';
  //多文件列表示例
  var demoListView = $('#demoList');
  uploadListIns = upload.render({
    elem: '#testList'
    ,url: upurl
    ,accept: type  
    ,multiple: duotu
    ,auto: false
    ,bindAction: '#testListAction'
    ,size: 512000
    ,processData: false
    ,contentType: false
    ,before: function(obj) {
      load =  top.layer.load(2, {content:'正在上传...',shade: [0.001, '#393D49'],success: function(layero){
                  layero.find('.layui-layer-content').css({'padding-left':'40px','width':'100px','padding-top':'5px'});
                  layero.css({'border-radius':'0','background':'white','box-shadow':'1px 1px 37px rgb0.value = ""'});

        /*文件上传判断，多选：文件不能重复，单选：只能选择一个*/
        /*if(duotu){
            var trUpload = demoListView.find('tr.'+file.lastModified).html();  //判断文件上传是否重复
            if(trUpload){
               layer.msg('该选中文件,列表中已存在', {icon:2 , time: 2000 });
            }else{
              demoListView.append(tr);
            }
        }else{
           demoListView.html(tr);
        }*/
      }});
    }
    ,done: function(res, index, upload){
      // layer.close(layer.msg());//关闭上传提示窗口
      if(res.code == 0){ //上传成功
        console.log(res.progress);
        var tr = demoListView.find('tr#upload-'+ index)
        ,tds = tr.children();
        if(res.progress == '100'){
          top.layer.close(load);//关闭上传提示窗口
          tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>'); 
          tds.eq(3).html('<a href="'+res.tolink+'" target="_blank" class="layui-btn layui-btn-mini layui-btn-normal">查看</a>');
          if (duotu == true) {//调用多图上传方法,其中res.imgid为后台返回的一个随机数字
            $('#upload_img_list').append('<input type="hidden" name="file_info[]" value="' + res.tolink + '" />');
          }else{//调用单图上传方法,其中res.imgid为后台返回的一个随机数字
            
            $('#upload_img_list').html('<input type="hidden" name="file_info" value="' + res.tolink + '" />');
            
          }
        }else{
          tds.eq(2).html('<div class="layui-progress layui-progress-big" lay-showpercent="true"><div class="layui-progress-bar"  lay-percent="'+res.progress+'%" style=" width: '+res.progress+'%;"><span class="layui-progress-text">'+res.progress+'%</span></div></div>');
          tds.eq(3).html(''); //清空操作
        }
		return delete this.files[index]; //删除文件队列已经上传成功的文件
      }
      this.error(index, upload,res.info);
    }
    ,error: function(index, upload,info){
      // layer.close(layer.msg());//关闭上传提示窗口
      top.layer.close(load);//关闭上传提示窗口
      var tr = demoListView.find('tr#upload-'+ index)
      ,tds = tr.children();
      tds.eq(2).html('<span style="color: #FF5722;">上传失败.'+info+'</span>');
      tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
    }
  });
});