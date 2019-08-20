<?php
	error_reporting(0);
	$file = $_FILES['file'];  //上传文件file
	$totalPieces = $_POST['totalPieces'];  //上传文件切片总数
	$index = $_POST['index'];  //上传文件当前切片
	$progress = round(($index/$totalPieces),2)*100;
	if($index == ($totalPieces - 1)){
		$progress = 100;  //进度条
	}
	$filename_arr = explode('.', $file['name']);  //获取上传文件名称
	$ext = end($filename_arr);
	$date = date("Ymd");
	$savePathName = md5($date.$file['name']).'.'.$ext;  //上传文件名称加密
	$path = "./images/".$date; // 根目录下的 public/upload/images/当前日期
	$savePath = "./images/".$date.'/'.$savePathName;
	$tolink = "./upload/images/".$date.'/'.$savePathName;  //返回根目录下的图片名称
	if (!file_exists($path)){
		mkdir($path); 
	}
	$return = [
				'info' => '上传失败!',
				'tolink' =>  $tolink,
				'imgid' => $savePathName,
				'code'      => 1,
				'error' =>$file['error'],
				];
	if($file['error']==0){
		if(!file_exists($savePath)){
			if(move_uploaded_file($file['tmp_name'],$savePath)){
				$return = [
						'info' => '上传成功!',
						'tolink' =>  $tolink,
						'imgid' => $savePathName,
						'code'      => 0,
						'progress' => $progress,
				];
			}
		}else{
			$content=file_get_contents($file['tmp_name']);
			if (file_put_contents($savePath, $content,FILE_APPEND)) {
			   $return = [
						'info' => '上传成功!',
						'tolink' =>  $tolink,
						'imgid' => $savePathName,
						'code'      => 0,
						'progress' => $progress,
				];
			}
		}
	}
	echo  json_encode($return); // 這里 您可以换成  echo  json_encode(value);