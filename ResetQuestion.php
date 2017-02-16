<?php
if(isset($_POST["submit"])&&$_POST["submit"]=="重置")
{
	$con=new mysqli("59.110.139.81","root","Pypy0101","shuclass");
	mysqli_query($con,"set names UTF8");
	$result=mysqli_query($con,"select xm,qusid from student where xm like $row[0]");

if(!$result){
	printf("Error:%s\n",mysqli_error($con));
	exit();
}
//默认每个登录用户只能选定一道题
$n=mysqli_num_rows($result);
if($n){
	$Row=mysqli_fetch_array($result);
//判断是否有重置权限。在进行选题时，选择题目后将qusid更改为相应题号。
	if($Row[1]!=0){
		if($Row[1]=="题号"){//有重置权限
			mysqli_query($con,"Update student set qusid=0 where xm like $Row[0]");
			//我没有找到前端重置模块怎么写的，这里只需要将重置页面显示题目前进行一个判断，qusid值为0则不显示。
			echo"<script>alert('重置成功');location.href='重置题目页面';</script>"
		}
		else{
			echo "<script>alert('当前用户无重置该题目权限');history.go(-1);</script>";
		}
	}
	else{
		echo "<script>alert('当前用户还未选择题目');history.go(-1);</script>"
	}
}
}
?>