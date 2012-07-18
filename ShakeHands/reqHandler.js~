var querystring = require("querystring"),fs = require("fs"),formidable = require("formidable");

function start(response,request,db) {
	if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
				response.end();
			}
		}
	else 
		{
	response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0,post-check=0, pre-check=0", proxy-revalidate');
	response.setHeader('expires','-1');
	response.setHeader('pragma','no-cache');

  console.log("Request handler 'start' was called.");

  fs.readFile("./login.html", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(file);
      response.end();
    }
  });
}
}
function upload(response,request,db) {
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
			if(!request.session.valid)
			{
				var form='<!DOCTYPE html>'+
							'<html>'+
							'<script>'+
							'alert("You cannot post blank data!")'+
							'</script>'+
							'</html>';						
							response.writeHead(302, {'Location':"http://localhost:8888/home"});
							response.end();
			}
			else if(request.session.valid==1) {
			uname=request.session.user_id;
			console.log(uname);
			
			console.log("Request handler 'upload' was called.");
			var form = new formidable.IncomingForm();
 			console.log("about to parse");
  			form.parse(request, function(error, fields, files) {
    				console.log("parsing done");
				if((files.upload.type=="image/jpeg")||(files.upload.type=="image/png"))
				{
				fs.rename(files.upload.path, "/tmp/"+uname+".jpg", function(err,file) {
      					if (err) {
        						fs.unlink("/tmp/"+uname+".jpg");
        						fs.rename(files.upload.path,"/tmp/"+uname+".jpg");
							fs.readFile("/tmp/"+uname+".jpg", "base64", function(error, file) {
								db.tweets1.update({email:uname},{$set:{image:file}},{multi:true});
							
							});
      						 }
					else {
						 fs.readFile("/tmp/"+uname+".jpg", "base64", function(error, file) {
							db.tweets1.update({email:uname},{$set:{image:file}},{multi:true});
						});
   				 	     }
				delete request.session.valid;
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
				response.end();
				});
				}
				else
				{
					var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("Only image type files may be uploaded!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/home");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
				}
			
			});
			}
		}	
}
function upload_html(response,request,db) {
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{

	request.session.valid=1;
  console.log("Request handler 'upload_html' was called.");

  fs.readFile("./upload.html", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(file);
      response.end();
    }
  });
}
}

function signup_html(response,request,db)
{
	if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
			}
		}
	else 
		{
	console.log("signup.html");
  fs.readFile("./signup.html", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(file);
      response.end();
    }
  });
}
}
function login_html(response,request,db)
{
if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
			}
		}
	else 
		{
	console.log("login.html");
  fs.readFile("./login.html", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(file);
      response.end();
    }
  });
}
}
function Home(response,request,db)
{
	response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0,post-check=0, pre-check=0", proxy-revalidate');
	response.setHeader('expires','-1');
	response.setHeader('pragma','no-cache');
	console.log("Home");
	if(request.session.user_id && request.session.pwd)
		{
			/*(var form='<!DOCTYPE html>'+
							'<html>'+
							'<script>'+
							'location.replace("http://localhost:8888/home");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();*/
			response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
		}

	else   
		{
	request.on('data',function(chunk)
		{	
			if(!chunk || chunk.length==0)
			{
				var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
			}
      			console.log("Received body data:");
			str=chunk.toString();
			str=querystring.parse(str);
			console.log(str);
			uname=str.uname.replace(/</g,"<.");
			pwd=str.pwd.replace(/</g,"<.");
                	console.log(uname+' '+pwd);
			db.users1.find({email: uname}, function(err, users1) {
				if(users1.length==0)
					{
						var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("Wrong USERNAME/PASSWORD!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
					}	
		
				else users1.forEach(function(users1){ 
  					if(( err || !users1)||(users1.password!=pwd))
						{
							var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("Wrong USERNAME/PASSWORD!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
						}
  					else if((users1.email==uname)&&(users1.password==pwd))
						{
							request.session.user_id=uname;
							request.session.pwd=pwd;
							request.session.logged=1;
							response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
						}
							
				});
			});
	});
}
}
function change(response,request,db)
{
	console.log("in change!");
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}
	else 
		{
					request.on('data',function(chunk)
					{	
					console.log("Received body data:");
					str=chunk.toString();
      					str=querystring.parse(str);
					newpass=str.new1;
					oldpass=str.curr1;
					console.log(oldpass);
					uname=request.session.user_id;
					db.users1.find({email:uname},function(err,users){
						if(users.length>0)
							{	console.log(users[0].password);
								if(users[0].password==oldpass){
								db.users1.update({email:uname},{$set:{password:newpass}});
								var form='<!DOCTYPE html>'+
								'<html>'+
								'<head>'+
								'</head>'+
								'<script>'+
								'alert("Password changed!")'+
								'</script>'+
								'<body background="bg.jpg">'+
								'<script>'+
								'location.replace("http://localhost:8888/profile");'+
								'</script>'+
								'</body>'+
								'</html>';
								response.writeHead(200, {"Content-Type": "text/html"});
    								response.write(form);
    								response.end();}
								else {
										var form='<!DOCTYPE html>'+
								'<html>'+
								'<head>'+
								'</head>'+
								'<script>'+
								'alert("Wrong Password!")'+
								'</script>'+
								'<body background="bg.jpg">'+
								'<script>'+
								'location.replace("http://localhost:8888/profile");'+
								'</script>'+
								'</body>'+
								'</html>';
								response.writeHead(200, {"Content-Type": "text/html"});
    								response.write(form);

    								response.end();
								     }
							}
						else
							{
								var form='<!DOCTYPE html>'+
								'<html>'+
								'<head>'+
								'</head>'+
								'<script>'+
								'alert("Error while changing!")'+
								'</script>'+
								'<body background="bg.jpg">'+
								'<script>'+
								'location.replace("http://localhost:8888/profile");'+
								'</script>'+
								'</body>'+
								'</html>';
								response.writeHead(200, {"Content-Type": "text/html"});
    								response.write(form);
    								response.end()
							}
					}).limit(1);	
				});
		}
}



function home(response,request,db)
{
	if(request.session.vialogout)
{
	delete request.session.vialogout;
	response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
}
else	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}
	else 
		{
	delete request.session.insearch;
response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0,post-check=0, pre-check=0", proxy-revalidate');
	response.setHeader('expires','-1');
	response.setHeader('pragma','no-cache');
console.log("Request handler 'home' was called.");
	var str="";
	var str1="";
	var fname="";
	if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0,post-check=0, pre-check=0", proxy-revalidate');
				response.setHeader('expires','-1');
				response.setHeader('pragma','no-cache');
				uname=request.session.user_id;
				delete request.session.pattern;
				pwd=request.session.pwd;
				console.log(uname+' '+pwd);
				fs.readFile("/tmp/"+uname+".jpg", "base64", function(error, file) {
    				if(error){
      					db.tweets1.find({"email": uname},function(err,tw1){
					if(tw1==null)
					{
					}
					else if(tw1.length>0 && !tw1[0].image);
					else if(tw1.length>0 && tw1[0].image)
					{
						fname=tw1[0].image;
					}
				}).limit(1);
    				} else {
      					fname=file;
    				}
				});
				db.followers.find({uemail: uname}, function(err, followers) {
					if( err || !followers) console.log("No followers found");
					else
						{
							var fmail=[];
							var query = {};
							query["$or"]=[];
							query["$or"].push({"email":uname});
							followers.forEach(function(follower){
								fmail=follower.femail;
								fmail.forEach(function(f){
									console.log(f.email);
									query["$or"].push({"email":f.email});
									//console.log(cursor);
								});
							});
							db.tweets1.find(query,function(err, tweets) {				
  								if( err || !tweets) console.log("No male users found");
  								else tweets.forEach( function(maleUser)
									{
    										str1+='<div class="twdiv"><button 											id="twrem">Remove</button><button 											id="hide">Hide</button><p><img src="data:image/gif;base64,'+maleUser.image+'" width="75" height="70" onerror=this.src="default.jpg" align="left"> '+maleUser.date+"<br/>E-mail: "+maleUser.email+"<br/>Tweet: "+maleUser.tweet+"</p></div>";
						
									});
								var page=1;
var form='<!DOCTYPE html>'+
'<html>'+
'<head>'+
'<META HTTP-EQUIV="Pragma" CONTENT="no-cache">'+
'<link rel="stylesheet" type="text/css" href="newHome.css" />'+
'<script type="text/javascript" src=http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js></script>'+
'<script type="text/javascript">'+
'var a="";'+
	'$(document).ready(function(){'+
		'$(".twdiv #twrem").live("click",function(){'+
			'var v=$(this).parents(".twdiv").text()+"uname="+document.getElementById("uname").textContent;'+
			'$(this).parents(".twdiv").load("/delete1",{data: v});'+
		'});'+
		'$(".twdiv #hide").live("click",function(){'+
			'$(this).parents(".twdiv").hide("slow");'+
		'});'+
	'});'+
	'function check()'+
	'{'+
		'if(document.getElementById("pattern").value=="")'+
		'{'+
			'alert("text field is empty");'+
			'return false;'+
		'}'+
		'if((document.getElementById("1").checked)||(document.getElementById("2").checked)||(document.getElementById("3").checked))'+
			'return true;'+
		'else'+
		'{'+
			'alert("no search type selected");'+
			'return false;'+
		'}'+
	'}'+
	'function func()'+
	'{'+
		'if(document.getElementById("tweet").value=="")'+
		'{'+
			'alert("you can not post blank tweet");'+
			'return false;'+
		'}'+
		'else'+
		'{'+
			'var str =document.getElementById("uname").textContent;'+
			'document.getElementById("tweet").value+="uname="+str;'+
			'return true;'+
		'}'+
	'}'+  							
	'$(document).ready(function(){'+
		'$(window).scroll(function(){'+
		'if(a==document.getElementById("myDiv").textContent) return;'+
		'if ($(window).scrollTop() == $(document).height() - $(window).height()){'+
		'var str="uname="+document.getElementById("uname").textContent+"page="+document.getElementById("page").textContent;'+
		'$("#myDiv").append($("<div>").load("/provideData",{data: "next"+str}));'+
		'a=document.getElementById("myDiv").textContent;'+
		'func1("next");}'+
		'});'+
		'$("#pst").click(function(){'+
		'if(document.getElementById("tweet").value=="")'+
		'{'+
		'alert("you can not post blank tweet");'+
		'}'+
		'else{'+
		'$("#counter").text(160);'+
		'document.getElementById("page").textContent="Page: 1";'+
		'var str =document.getElementById("uname").textContent;'+
		'var str1=document.getElementById("tweet").value+"uname="+str;'+
		'document.getElementById("tweet").value="";'+
		'$("#myDiv").load("/direct",{data: str1});'+
		'}'+
		'});'+
	'});'+
	'function func1(str){'+
	'$("#page").load("/provideData1",{data: document.getElementById("page").textContent+"task="+str});}'+
						'var x=160;'+
						'$(document).ready(function(){'+
  						'$("#tweet").keypress(function(){'+
    						'x=160-$("#tweet").val().length;'+
    						'$("#counter").text(x);'+
  						'});'+
						'});'+
	'</script>'+
'</head>'+
'<body>'+

'<div class="header">'+
		'<ul>	<li>ShakeHands'+
			'<li><a href="home.html">Home</a>'+
			'<li><a href="following.html">Following</a>'+
			'<li><a href="profile.html">Profile</a>'+
			'<li><form method="POST" action="/search1" onSubmit="return check()" id="inline">'+
						'<input type="hidden" name="uname" value='+uname+' id="hid1">'+
						'<input type="text" id="pattern" name="pattern"  value="search">'+
						'<input type="submit" value="Search" id="submit1"></form>'+
			'<li><img src="sh.jpg" height="45" width="70"/>'+
			'<li><a href="logout.html">Logout</a>'+
		'</ul>'+
'</div>'+
'<div class="container">'+
	'<div class="left">'+
		'<img src="data:image/gif;base64,'+fname+'" width="190" height="200" onerror=this.src="default.jpg" >'+
		'<p id ="uname">'+uname+'</p>'+
		'<div class="post">'+
			'<input type="text area" id="tweet" name="tweet" maxlength="160">'+
			'<button id="pst">tw@@t</button>'+
			'<p>Limit: <span id="counter">160</span></p>'+
		'</div>'+
	'</div>'+
	
	'<div class="content">'+
	'<div id="page">Page: '+page+'</div>'+
	'<div id="myDiv"><p>'+str1+'</p></div>'+
	'</div>'+
	'<div class="footer">Welcome to ShakeHands...</div>'+
	
'</div>'+
'</body>'+
'<head>'+
'<META HTTP-EQUIV="Pragma" CONTENT="no-cache"></head>'+
'</html>';
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write(form);
    						response.end();

				}).sort({date:-1}).limit(5);
		}

	});
				
			}
}
}
}
function delete1(response,request,db)
	{
		if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
		if(!request.session.logged)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}	
		var str=" ";
		console.log("Request handler 'unfollow' was called.");
		request.on('data',function(chunk) {
			str=chunk.toString();
			str=querystring.parse(str);
			console.log(str);
			console.log(str.data);
			var n=str.data.indexOf("E-mail: ");
			var n1=str.data.indexOf("Tweet: ");
			var n2=str.data.indexOf("uname=");
			var email=str.data.substring(n+8,n1);
			console.log(email);
			var tw=str.data.substring(n1+7,n2);
			var uname=str.data.substring(n2+6);
			console.log(uname+'   '+tw+'   '+email);
			if(uname!=email)
			{
				response.writeHead(200, {"Content-Type": "text/plain"});
    				response.write("You dont have the permission to delete this tweet");
    				response.end();
			}
			else
			{		
			db.tweets1.remove({tweet: tw});
			response.writeHead(200, {"Content-Type": "text/plain"});
    			response.write("Tweet Deleted");
    			response.end();
			}	
		});
}
}
function show(response,request,db) {
  console.log("Request handler 'show' was called.");
	var str="";
	//db.open();
	db.followers.find(
	function(err, followers)
	{
  		if( err || !followers) console.log("No followers found");
  		else followers.forEach( function(follower)
		{
			str+=follower.uemail+','+JSON.stringify(follower.femail);

  		})
		response.writeHead(200, {"Content-Type": "text/html"});
    		response.write(str);
    		response.end();

	});

  /*fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });*/
}
function provideData(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
		if(!request.session.logged)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}
	var str="";
	console.log("Haan Bhi");
	var str="";
	request.on('data', function(chunk)
	{
      		console.log("Received body data:");
		str=chunk.toString();
		str1=querystring.parse(str);
		str1=str1.data;		
		console.log(str+' '+str1);
		var n=str1.indexOf("uname=");
		var n1=str1.indexOf("page=Page: ");
		var task=str1.substring(0,n);
		var uname=request.session.user_id;
		var pagno=str1.substring(n1+11);
		console.log(task+'   '+uname+'   '+pagno);
		if(task=="next")
		{
				var str1="";
			db.followers.find({uemail: uname}, function(err, followers) {
			if( err || !followers) console.log("No followers found");
			else
			{
					var fmail=[];
					var query = {};
					query["$or"]=[];
					query["$or"].push({"email":uname});

						followers.forEach(function(follower){
							//console.log(cursor);
							fmail=follower.femail;
							fmail.forEach(function(f){
								console.log(f.email);
								query["$or"].push({"email":f.email});
								//console.log(cursor);
							});
						});
				db.tweets1.find(query,function(err, tweets) {
					if(tweets.length==0)
					{
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write("");
    						response.end();
					}

  					if( err || !tweets) console.log("No male users found");
  					else tweets.forEach( function(maleUser)
						{
    						//console.log(maleUser);
						str1+='<div class="twdiv"><button 											id="twrem">Remove</button><button 											id="hide">Hide</button><p><img src="data:image/gif;base64,'+maleUser.image+'" width="75" height="70" onerror=this.src="default.jpg" align="left"> '+maleUser.date+"<br/>E-mail: "+maleUser.email+"<br/>Tweet: "+maleUser.tweet+"</p></div>";
						
						});
								
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write(str1);
    						response.end();

				}).sort({date:-1}).skip(pagno*5).limit(5);
			}
			});
		}
		if(task=="previous")
		{
				var str1="";
			db.followers.find({uemail: uname}, function(err, followers) {
			if( err || !followers) console.log("No followers found");
			else
			{
					var fmail=[];
					var query = {};
					query["$or"]=[];
					query["$or"].push({"email":uname});

						followers.forEach(function(follower){
							//console.log(cursor);
							fmail=follower.femail;
							fmail.forEach(function(f){
								console.log(f.email);
								query["$or"].push({"email":f.email});
								//console.log(cursor);
							});
						});
				db.tweets1.find(query,function(err, tweets) {				
  					if( err || !tweets) console.log("No male users found");
  					else tweets.forEach( function(maleUser)
						{
    						//console.log(maleUser);
						str1+='<div class="twdiv"><button 											id="twrem">Remove</button><button 											id="hide">Hide</button><p><img src="data:image/gif;base64,'+maleUser.image+'" width="75" height="70" onerror=this.src="default.jpg" align="left"> '+maleUser.date+"<br/>E-mail: "+maleUser.email+"<br/>Tweet: "+maleUser.tweet+"</p></div>";
						
						});
								
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write(str1);
    						response.end();

				}).sort({date:-1}).skip((pagno-2)*5).limit(5);
			}
			});
		}
			
	});
}
}
function provideData1(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
		if(!request.session.logged)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}
	var str="";
	console.log("Haan Bhi");
	var str="";
	request.on('data', function(chunk)
	{
      		console.log("Received body data:");
		str=chunk.toString();
		console.log(str);
		var p=str.indexOf("task%3D");
		var p1=str.indexOf("Page%3A+");
		var page=str.substring(p1+8,p);
		var act=str.substring(p+7);
		console.log(page+'   '+act);
		if(act=="next")
		{
		page=parseInt(page)+1;
		response.writeHead(200, {"Content-Type": "text/html"});
    		response.write("Page: "+page);
    		response.end();
		}
		else if(act="previous")
		{
		page=parseInt(page)-1;
		response.writeHead(200, {"Content-Type": "text/html"});
    		response.write("Page: "+page);
    		response.end();
		}
			
	});
}
	

}
function direct(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
	if(!request.session.logged)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}	
	var str="";
	var str1="<p>";
	request.on('data', function(chunk)
	{
      		console.log("Received body data:");
		str=chunk.toString();
		str=querystring.parse(str);
		console.log(str);
		var n=str.data.indexOf("uname=");
		var tw=str.data.substring(0,n);
		
		tw=tw.replace(/</g,"<.");
		var uname=str.data.substring(n+6);
		console.log(tw+'    '+uname);
		fs.readFile("/tmp/"+uname+".jpg", "base64", function(error, file) {
		
			if(file)
			{
				db.tweets1.save({email: uname, tweet: tw ,date:new Date(),image:file});
			}
			else
			{
				db.tweets1.find({"email": uname},function(err,tw1){
				if(tw1.length==0)
				{
					db.tweets1.save({email: uname, tweet: tw ,date:new Date()});
				}
				else
				{
				db.tweets1.save({email: uname, tweet: tw ,date:new Date(),image:tw1[0].image});
				}
				}).limit(1);			
			}
			db.users1.find({email: uname}, function(err, users1) {	
			users1.forEach(function(users1){ 		 
			if(users1.email==uname)
			{
			console.log("1");
			db.followers.find({uemail: uname}, function(err, followers) {
			if( err || !followers) console.log("No followers found");
			else
			{
					var fmail=[];
					var query = {};
					query["$or"]=[];
					query["$or"].push({"email":uname});

						followers.forEach(function(follower){
							//console.log(cursor);
							fmail=follower.femail;
							fmail.forEach(function(f){
								console.log(f.email);
								query["$or"].push({"email":f.email});
								//console.log(cursor);
							});
						});
				db.tweets1.find(query,function(err, tweets) {				
  					if( err || !tweets) console.log("No male users found");
  					else tweets.forEach( function(maleUser)
						{
    						//console.log(maleUser);
						str1+='<div class="twdiv"><button 											id="twrem">Remove</button><button 											id="hide">Hide</button><p><img src="data:image/gif;base64,'+maleUser.image+'" width="75" height="70" onerror=this.src="default.jpg" align="left"> '+maleUser.date+"<br/>E-mail: "+maleUser.email+"<br/>Tweet: "+maleUser.tweet+"</p></div>";
						
						});
						str+="</p>";
								
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write(str1);
    						response.end();

				}).sort({date:-1}).limit(5);
			}
			});
			}
			});
			});
			
    		});
		
});
}
}

function search1(response,request,db) {
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}
	else 
		{
	if(!request.session.logged)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}
	request.session.insearch=1;
	console.log("Request handler 'search' was called.");
	request.on('data',function(chunk){
		str=chunk.toString();
		console.log(str);
		str=querystring.parse(str);
		pattern=str.pattern;
		pattern=pattern.replace(/</g,"<.");
		var str="";
							var query={};
							query["$or"]=[];
							query["$or"].push({"email":pattern});
							query["$or"].push({"firstname":pattern});
							query["$or"].push({"lastname":pattern});
							request.session.pattern=pattern;
			db.users1.find(query,function(err,users1) {
				console.log(users1);
				if(users1.length>0)
					{
		  				users1.forEach(function(users1){ 
							if(request.session.user_id!=users1.email){ str1=users1.firstname;var n=str1.replace(pattern,"<b>"+pattern+"</b>");str1=users1.lastname;var n1=str1.replace(pattern,"<b>"+pattern+"</b>");str1=users1.email;var n2=str1.replace(pattern,"<b>"+pattern+"</b>");
							str+='<div class="ex"><button class="hide">Follow</button><p>E-mail:'+n2+"<br/>First name:"+n+"<br/>Lastname:"+n1+"</div>";		}				
						});
						var form1='<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
						'<link rel="stylesheet" type="text/css" href="newHome.css" />'+
						'<script type="text/javascript" src=http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js></script>'+
						'<script type="text/javascript">'+
						'$(document).ready(function(){'+
  							'$(".ex .hide").live("click",function(){'+
								'var str23="uname="+document.getElementById("uname1").textContent	+"fol="+$(this).parents(".ex").text();'+
    								'$(this).parents(".ex").load("/follow",{data: str23});'+
  							'});'+
							'$("#people").click(function(){'+
							'var str="pattern="+document.getElementById("pattern").textContent;'+
							'$("#result").load("/people",{data:str});'+
							'});'+
							'$("#tweetresult").click(function(){'+
							'var str="pattern="+document.getElementById("pattern").textContent;'+
							'$("#result").load("/tweets",{data:str});'+
							'});'+
				
						'});'+
						'function check()'+
	'{'+
		'if(document.getElementById("pattern12").value=="")'+
		'{'+
			'alert("text field is empty");'+
			'return false;'+
		'}'+
		'if((document.getElementById("1").checked)||(document.getElementById("2").checked)||(document.getElementById("3").checked))'+
			'return true;'+
		'else'+
		'{'+
			'alert("no search type selected");'+
			'return false;'+
		'}'+
	'}'+
						'</script>'+

						'<style type="text/css">'+ 
						'div.ex'+
						'{'+
						'background-color:#e5eecc;'+
						'padding:7px;'+
						'border:solid 1px #c3c3c3;'+
						'}'+
						'</style>'+

						'</head>'+
						'<body>'+
						'<p id="pattern">'+pattern+'</p>'+
						'<p id="uname1">'+uname+'</p>'+
						'<div class="header">'+
						'<ul>	<li>ShakeHands'+
							'<li><a href="home.html">Home</a>'+
							'<li><a href="following.html">Following</a>'+
							'<li><a href="profile.html">Profile</a>'+
							'<li><form method="POST" action="/search1" onSubmit="return check()" id="inline">'+
								'<input type="hidden" name="uname" value='+uname+' id="hid1">'+
								'<input type="text" id="pattern12" name="pattern"  value="search">'+
								'<input type="submit" value="Search" id="submit1"></form>'+
							'<li><img src="sh.jpg" height="45" width="70"/>'+
							'<li><a href="logout.html">Logout</a>'+
						'</ul>'+
						'</div>'+
						'<div class="container">'+
						'<div class="left"><button id="people">User Results</button><br><button id="tweetresult">Tweet Results</button></div>'+
						'<div class="content">'+
						'<h1>Search Results</h1>'+
						'<div id="result"><p>'+str+'<br/></p></div>'+
						'</div>'+
						'</div>'+
						'</body>'+
						'</html>';
					console.log(str);
					response.writeHead(200, {"Content-Type": "text/html"});
      					response.write(form1);
      					response.end();
					
				}
			else
				{
					      var form='<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
						'<link rel="stylesheet" type="text/css" href="newHome.css" />'+
						'<script type="text/javascript" src=http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js></script>'+
						'<script type="text/javascript">'+
						'function check()'+
						'{'+
							'if(document.getElementById("pattern12").value=="")'+
							'{'+
								'alert("text field is empty");'+
								'return false;'+
							'}'+
							'if((document.getElementById("1").checked)||(document.getElementById("2").checked)||(document.getElementById("3").checked))'+
								'return true;'+
							'else'+
							'{'+
								'alert("no search type selected");'+
								'return false;'+
							'}'+
						'}'+
						'$(document).ready(function(){'+
  							'$(".ex .hide").live("click",function(){'+
								'var str23="uname="+document.getElementById("uname1").textContent	+"fol="+$(this).parents(".ex").text();'+
    								'$(this).parents(".ex").load("/follow",{data: str23});'+
  							'});'+
							'$("#people").click(function(){'+
							'var str="pattern="+document.getElementById("pattern").textContent;'+
							'$("#result").load("/people",{data:str});'+
							'});'+
							'$("#tweetresult").click(function(){'+
							'var str="pattern="+document.getElementById("pattern").textContent;'+
							'$("#result").load("/tweets",{data:str});'+
							'});'+
				
						'});'+
						'</script>'+
						'</head>'+
						'<body>'+
						'<p id="pattern">'+pattern+'</p>'+
						'<p id="uname1">'+uname+'</p>'+
						'<div class="header">'+
						'<ul>	<li>ShakeHands'+
							'<li><a href="home.html">Home</a>'+
							'<li><a href="following.html">Following</a>'+
							'<li><a href="profile.html">Profile</a>'+
							'<li><form method="POST" action="/search1" onSubmit="return check()" id="inline">'+
								'<input type="hidden" name="uname" value='+uname+' id="hid1">'+
								'<input type="text" id="pattern12" name="pattern"  value="search">'+
								'<input type="submit" value="Search" id="submit1"></form>'+
							'<li><img src="sh.jpg" height="45" width="70"/>'+
							'<li><a href="logout.html">Logout</a>'+
						'</ul>'+
						'</div>'+
						'<div class="container">'+
						'<div class="left"><button id="people">User Results</button><br><button id="tweetresult">Tweet Results</button></div>'+
						'<div class="content">'+
						'<h1>Search Results</h1>'+
						'<div id="result" ><p>No such records exist!<br/></p></div>'+
						'</div>'+
						'</div>'+
						'</body>'+
						'</html>';
					      response.writeHead(200, {"Content-Type": "text/html"});
      					      response.write(form);
      					      response.end();
				}			
			});
		
	});	
}
}


function profile(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}

	else 
		{	
	delete request.session.insearch;
	response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0,post-check=0, pre-check=0", proxy-revalidate');
	response.setHeader('expires','-1');
	response.setHeader('pragma','no-cache');
			request.session.valid=1;		
				var uname=request.session.user_id;
				var filename="";
			fs.readFile("/tmp/"+uname+".jpg", "base64", function(error, file) {
    			if(error){
      					db.tweets1.find({"email": uname},function(err,tw1){
					if(tw1==null)
					{
					}
					else if(tw1.length>0 && !tw1[0].image);
					else if(tw1.length>0 && tw1[0].image)
					{
						filename=tw1[0].image;
					}
				}).limit(1);
    				} else {
      					filename=file;
    				}

				db.users1.find({email:uname},function(err,usr){
			var fname=usr[0].firstname;
			var lname=usr[0].lastname;
db.followers.find({uemail:uname},function(err,users1){	
db.tweets1.find({email:uname},function(err,users){
y=users.length;
if(users1.length>0)
x=users1[0].femail.length;
else x=0;		
var file='<!DOCTYPE html>'+
'<html>'+
'<head>'+

'<link rel="stylesheet" type="text/css" href="newHome.css" />'+
'<script type="text/javascript" src=http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js></script>'+
'<script type="text/javascript">'+
'function check12(){'+
	'if(document.getElementById("12").value=="")'+
	'{alert("Select the file first"); return false; }'+
	'return true; }'+	
'function check1(){'+
	'if((document.getElementById("new1").value=="")||(document.getElementById("new2").value=="")||(document.getElementById("curr1").value=="")){'+
		'alert("You can not leave fields blank");'+
		'return false; }'+
	'if(document.getElementById("new2").value!=document.getElementById("new1").value)'+
		'{ alert("Passwords do not match");'+
		'return false; }'+
	'return true;'+
'}'+
'function check()'+
	'{'+
		'if(document.getElementById("pattern").value=="")'+
		'{'+
			'alert("text field is empty");'+
			'return false;'+
		'}'+
		'if((document.getElementById("1").checked)||(document.getElementById("2").checked)||(document.getElementById("3").checked))'+
			'return true;'+
		'else'+
		'{'+
			'alert("no search type selected");'+
			'return false;'+
		'}'+
	'}'+
'$(document).ready(function(){'+
  			'$("#upload").click(function(){'+
			'$("#form2").hide();'+
			'$("#form1").show();'+
			'});'+
			'$("#chng").click(function(){'+
			'$("#form1").hide();'+
			'$("#form2").show();'+
  			'});'+
			
'});'+
'</script>'+
'</head>'+
'<body>'+
	'<div class="header">'+
		'<ul>	<li>ShakeHands'+
			'<li><a href="home.html">Home</a>'+
			'<li><a href="following.html">Following</a>'+
			'<li><a href="profile.html">Profile</a>'+
			'<li><form method="POST" action="/search1" onSubmit="return check()" id="inline">'+
								'<input type="hidden" name="uname" value='+uname+' id="hid1">'+
								'<input type="text" id="pattern" name="pattern"  value="search">'+
								'<input type="submit" value="Search" id="submit1"></form>'+
			'<li><img src="sh.jpg" height="45" width="70"/>'+
			'<li><a href="logout.html">Logout</a>'+
		'</ul>'+
	'</div>'+
'<div class="container">'+
	'<div class="left">'+
		'<img src="data:image/gif;base64,'+filename+'" width="190" height="200" onerror=this.src="default.jpg" >'+
		'<p id ="uname">'+uname+'</p>'+
		'<button id="upload">Upload/change photo.</button>'+
		'<button id="chng">....Change Password....</button>'+
		'<p>Following: '+x+'</p>'+
		'<p>Tweets: '+y+'</p>'+
	'</div>'+
	'<div class="content">'+
	'<p>First Name: '+fname+'</p>'+
	'<p>Last Name: '+lname+'</p>'+
	'<p>Id: '+uname+'</p><hr>'+
	'<div id="myDiv1">'+
	'<div id="form1"><form action="/upload" enctype="multipart/form-data" method="post" onSubmit="return check12()" ><input id="12" type="file" name="upload" multiple="multiple"><input type="submit" value="Upload file" /></form></div>'+
	'<div id="form2"><form action="/change" method="POST" onSubmit="return check1()">Current Password: <input type="password" id="curr1" name="curr1" ><br>New Password: <input type="password" id="new1" name="new1"><br>Confirm Password: <input type="password" id="new2" name="new2"><br><input type="submit" value="Change" /></form></div>'+
	'</div>'+
	'<div id="res"></div>'+	
	'</div>'+
	
'</div>'+
'<div class="footer">Welcome to ShakeHands...</div>'+
'<script>'+
'$("#form1").hide();'+
'$("#form2").hide();'+
'</script>'+
'</body>'+
'</html>';
		response.writeHead(200, {"Content-Type": "text/html"});
      		response.write(file);
      		response.end();
});
});
	});

			});
			
			
			
	}
}
function follow(response,request,db) {
	var str=" ";
	console.log("Request handler 'follow' was called.");
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
	request.on('data',function(chunk) {
		str=chunk.toString();
		uname=request.session.user_id;
		str=querystring.parse(str);
		console.log(str);
		var i=str.data.indexOf("fol=FollowE-mail:");
		var j=str.data.indexOf("First name:");
		if(j==(-1))
		j=str.data.indexOf("Tweet:");
		fname=str.data.substring(i+17,j);
		console.log(uname+' '+fname);
		str="You are now a follower of ";
		db.users1.find({email:fname},function(err,us) {
			if(us)
				{		
					db.followers.find({uemail:uname},function(err,users1) {
						if(users1.length==0)
							{
								db.followers.save({"uemail":uname,femail:[{"email":fname}],nof:1});
							}						
						else if(users1)
							{
								var x=0;
								users1.forEach( function(follower) {
									console.log(follower.femail);
									var fmail=[];
									fmail=follower.femail;
									fmail.forEach(function(f){
										if(f.email==fname)
										{console.log(f.email);
										x=1;
										response.writeHead(200, {"Content-Type": "text/plain"});
      										response.write("you are already a follower of "+fname);
      										response.end();
										}
									});
									if(x==0)
											{
							'if((document.getElementById("new").value=="")||(document.getElementById("new1").value=="")||(document.getElementById("curr1").value=="")'+					fmail.push({email:fname});
												db.followers.update( { uemail:uname }, { $set: 													{ femail : fmail } } );
												db.followers.update( { uemail:uname }, { $set: 													{ nof : follower.femail.length } } );
														response.writeHead(200, {"Content-Type": "text/plain"});
      		response.write(str+fname);
      		response.end();
											}							
								});
							}
					});
				}
			else
				{
					response.writeHead(200, {"Content-Type": "text/plain"});
      					response.write("No such user exists!");
      					response.end();							
				}
		});
	});
}
}
function signup(response,request,db) {
   var str=" ";
if(request.session.user_id)
		{
			if(request.session.user_id.length>0)
			{
				response.writeHead(302, {'Location':"http://localhost:8888/home"});
				response.end();
			}
		}
	else 
		{
console.log("Request handler 'signup' was called.");
request.on('data',function(chunk)
{
str=chunk.toString();
console.log(str);
str1=querystring.parse(str);
var n=str.indexOf("fname=");
var n1=str.indexOf("lname=");
var n2=str.indexOf("uname=");
var n3=str.indexOf("pwd=");
var n4=str.indexOf("pwd1=");
var fname=str.substring(n+6,n1-1);
fname=fname.replace(/</g,"<.");
var lname=str.substring(n1+6,n2-1);
lname=lname.replace(/</g,"<.");
var uname=str.substring(n2+6,n3-1);
var pwd=str.substring(n3+4,n4-1);
pwd=pwd.replace(/</g,"<.");
var pwd1=str.substring(n4+5);
pwd1=pwd1.replace(/</g,"<.");
var a=uname.indexOf("%40");
var abc=uname.substring(a+3);
uname=str1.uname;
uanme=uname.replace(/</g,"<.");
if(pwd != pwd1)
{
var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("Passwords do not match!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/signup.html");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
}
db.users1.find({email:uname},function(err,users1) {
	if(users1.length>0)
	{
		 var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("Username already taken!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/signup.html");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
	}	
	else	db.users1.save({email: uname, firstname: fname, lastname: lname, password: pwd}, function(err, saved)
			{
  				if( err || !saved )
					{
						var form='<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
						'</head>'+
						'<body>'+
						'<form method="POST" action="/signup_html"/>'+
						'<p>'+"Encountered an error!"+'<br/></p>'+
						'<input type="submit" value="TRY AGAIN">'+
						'</form>'+
						'</body>'+
						'</html>';
						
						console.log("User not saved");
						response.writeHead(200,{"Content Type":"text/html"});
						response.write(form);
						response.end();
					}
  				else
					{
						request.session.user_id=uname;
						request.session.pwd=pwd;						
						response.writeHead(302, {'Location':"http://localhost:8888/home"});
			response.end();
					}
			});
});
/*
else
		{
			console.log("Username alread exists!");
			response.writeHead(200,{"Content Type":"text/plain"});
			response.write("Username alread exists!");
			response.end();
		}*/
}); 
}
}

function shakehands_png(response,request,db)
{
	console.log("shakehands_png");
	fs.readFile("./shakehands.png", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}

function signup_jpg(response,request,db)
{
	console.log("signup_jpg");
	fs.readFile("./signup.jpg", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}
function default_jpg(response,request,db)
{
	console.log("default_jpg");
	fs.readFile("./default.jpg", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}
function sh_jpg(response,request,db)
{
	console.log("sh_jpg");
	fs.readFile("./sh.jpg", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}

function logo_png(response,request,db)
{
	console.log("logo_png");
	fs.readFile("./logo.png", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}
function newHome_css(response,request,db)
{
	console.log("newHome_css");
	fs.readFile("./newHome.css", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "text/css"});
      response.write(file);
      response.end();
    }
  });

}


function newlogin_css(response,request,db)
{
	console.log("newHome_css");
	fs.readFile("./newlogin.css", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "text/css"});
      response.write(file);
      response.end();
    }
  });

}


function newSignup_css(response,request,db)
{
	console.log("newHome_css");
	fs.readFile("./newSignup.css", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "text/css"});
      response.write(file);
      response.end();
    }
  });

}



function bg_jpg(response,request,db)
{
	console.log("bg_jpg");
	fs.readFile("./bg.jpg", "binary", function(error, file) {
    if(error) {
	console.log("file error");
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
	console.log("file returned");
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}


function uploadform(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
			request.session.valid=1;
			var str='<form action="/upload" enctype="multipart/form-data" method="post"><input type="file" name="upload" multiple="multiple"><input type="submit" value="Upload file" /></form>';
			response.writeHead(200, {"Content-Type": "text/html"});
    			response.write(str);
    			response.end();	
		}
}

function changeform(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
			request.session.valid=1;
			var str='<form action="/change" method="POST" onsubmit="return check()" >Current Password: <input type="password" id="curr1" ><br>New Password: <input type="password" id="new" ><br>Confirm Password: <input type="password" id="new1" ><br><input type="submit" value="Change" /></form>';
			response.writeHead(200, {"Content-Type": "text/html"});
    			response.write(str);
    			response.end();	
		}
}


function following(response,request,db)
{
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}
	else 
		{
	delete request.session.insearch;
	response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0,post-check=0, pre-check=0", proxy-revalidate');
	response.setHeader('expires','-1');
	response.setHeader('pragma','no-cache');
	console.log("Request handler 'following' was called.");
	var str="";
	var str1="";
		uname=request.session.user_id;
		console.log(uname);
		var str="";
		db.followers.find({uemail: uname}, function(err, followers) {
			if( err || !followers) console.log("No followers found");
			else
				{
					var fmail=[];
					followers.forEach(function(follower){
						fmail=follower.femail;
						fmail.forEach(function(f){
							str+='<div class="ex"><button class="unfollow">Unfollow</button><p>E-mail:'+f.email+'</p></div>';
						});
						console.log(str);
					}); 
				     if(str=="")
					str="You currently do not follow anyone!";
				      var form1='<!DOCTYPE html>'+
						'<html>'+
						'<head>'+
						'<link rel="stylesheet" type="text/css" href="newHome.css" />'+
						'<script type="text/javascript" src=http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js></script>'+
						'<script type="text/javascript">'+
						'$(document).ready(function(){'+
  							'$(".ex .unfollow").click(function(){'+
								'var str23="uname="+document.getElementById("uname1").textContent	+"fol="+$(this).parents(".ex").text();'+
    								'$(this).parents(".ex").load("/unfollow",{data: str23});'+
  							'});'+
						'});'+
						'function check()'+
						'{'+
							'if(document.getElementById("pattern").value=="")'+
							'{'+
								'alert("text field is empty");'+
								'return false;'+
							'}'+
							'if((document.getElementById("1").checked)||(document.getElementById("2").checked)||(document.getElementById("3").checked))'+
								'return true;'+
							'else'+
							'{'+
								'alert("no search type selected");'+
								'return false;'+
							'}'+
						'}'+
						
						'</script>'+
						'<style type="text/css">'+ 
						'div.ex'+
						'{'+
						'background-color:#e5eecc;'+
						'padding:7px;'+
						'border:solid 1px #c3c3c3;'+
						'}'+
						'</style>'+
						'</head>'+
						'<body>'+
						'<p id="uname1">'+uname+'</p>'+
						'<div class="header">'+
						'<ul>	<li>ShakeHands'+
							'<li><a href="home.html">Home</a>'+
							'<li><a href="following.html">Following</a>'+
							'<li><a href="profile.html">Profile</a>'+
							'<li><form method="POST" action="/search1" onSubmit="return check()" id="inline">'+
								'<input type="hidden" name="uname" value='+uname+' id="hid1">'+
								'<input type="text" id="pattern" name="pattern"  value="search">'+
								'<input type="submit" value="Search" id="submit1"></form>'+
							'<li><img src="sh.jpg" height="45" width="70"/>'+
							'<li><a href="logout.html">Logout</a>'+
						'</ul>'+
						'</div>'+
						'<div class="container">'+
						'<h1>You are following:</h1>'+
						'<p>'+str+'<br/></p>'+
						'</div>'+
						'</body>'+
						'</html>';
				}	
			response.writeHead(200, {"Content-Type": "text/html"});
    			response.write(form1);
    			response.end();			
		});

}
}

function people(response,request,db) {
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else{request.on('data', function(chunk)
	{
	if(!request.session.logged)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}
			console.log("Received body data:");
			str=chunk.toString();str=querystring.parse(str);
			console.log(str.data);
			pattern=str.data.substring(8);
			console.log(pattern);
		var str="";
							var query={};
							query["$or"]=[];
							query["$or"].push({"email":pattern});
							query["$or"].push({"firstname":pattern});
							query["$or"].push({"lastname":pattern});
							request.session.pattern=pattern;
			db.users1.find(query,function(err,users1) {
				console.log(users1);
				if(users1.length>0)
					{
		  				users1.forEach(function(users1){ 
							if(request.session.user_id!=users1.email){ str1=users1.firstname;var n=str1.replace(pattern,"<b>"+pattern+"</b>");str1=users1.lastname;var n1=str1.replace(pattern,"<b>"+pattern+"</b>");str1=users1.email;var n2=str1.replace(pattern,"<b>"+pattern+"</b>");
							str+='<div class="ex"><button class="hide">Follow</button><p>E-mail:'+n2+"<br/>First name:"+n+"<br/>Lastname:"+n1+"</p></div>";		}		
						});
					if(str=="")
					str="No such record!";
					response.writeHead(200, {"Content-Type": "text/html"});
      					response.write(str);
      					response.end();
					
				}
			else
				{

					      response.writeHead(200, {"Content-Type": "text/html"});
      					      response.write("No such record!");
      					      response.end();
				}			
			});	
});
}
		}
function tweets(response,request,db) {
	if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body background="bg.jpg">'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
else{request.on('data', function(chunk)
	{
	if(!request.session.logged)
		{
			response.writeHead(302, {'Location':"http://localhost:8888/start"});
			response.end();
		}
	console.log("Request handler 'tweets' was called.");
		console.log("Received body data:");
			str=chunk.toString();str=querystring.parse(str);
			console.log(str.data);
			pattern=str.data.substring(8);
			console.log(pattern);
		var str=""; uname=request.session.user_id;
			db.tweets1.find(function(err,users1) {
				if(users1.length>0)
					{
		  				users1.forEach(function(users1){ if(users1.tweet.search(pattern)!=(-1)&&(users1.email!=uname)){
					str1=users1.tweet;var n=str1.replace(pattern,"<b>"+pattern+"</b>");str1=users1.email;var n1=str1.replace(pattern,"<b>"+pattern+"</b>");							
		str+='<div class="ex"><button class="hide">Follow</button><p>E-mail:'+n1+"<br/>Tweet:"+n+"</div>";	}			
						});
					if(str=="")
					str="No such record!"	
					response.writeHead(200, {"Content-Type": "text/html"});
      					response.write(str);
      					response.end();
					
				}
			else
				{
					      response.writeHead(200, {"Content-Type": "text/html"});
      					      response.write("No such record!");
      					      response.end();
				}			
			});
});
		
}
}



function unfollow(response,request,db)
	{
		if(!request.session.user_id ||request.session.user_id.length==0)
		{
			var form='<!DOCTYPE html>'+
							'<html>'+
							'<head>'+
							'</head>'+
							'<script>'+
							'alert("You are not logged in!")'+
							'</script>'+
							'<body>'+
							'<script>'+
							'location.replace("http://localhost:8888/start");'+
							'</script>'+
							'</body>'+
							'</html>';						
							response.writeHead(200,{"Content Type":"text/html"});
							response.write(form);
							response.end();
		}
	else 
		{
		var str=" ";
		console.log("Request handler 'unfollow' was called.");
		request.on('data',function(chunk) {
			str=chunk.toString();
			str=querystring.parse(str);
			console.log(str);
			uname=request.session.user_id;
			var i=str.data.indexOf("fol=UnfollowE-mail:");
			fname=str.data.substring(i+19);
			
			db.followers.find({uemail:uname},function(err,follo) {
				if( err || !follo) console.log("No followers found");
				else if(follo.length>0)
					{
						var str=fname;
						var fmail=[];
						var fmail1=[];
						console.log(JSON.stringify(follo));
						follo.forEach( function(follower) {
								console.log(follower.femail);
								fmail=follower.femail;	
								fmail.forEach(function(unfollo){ 
									if(unfollo.email!=fname)
									fmail1.push({email:unfollo.email});
								});	
						db.followers.update( { uemail:uname }, { $set: { femail : fmail1 } } );
						db.followers.update( { uemail:uname }, { $set: { nof : follower.femail.length } } );
						});					
						response.writeHead(200, {"Content-Type": "text/html"});
    						response.write("User Unfollowed");
    						response.end();							
					}
			});		
		});		
	}
}
function logout(response,request,db)
{
	
	delete request.session.user_id;
	delete request.session.pwd;
	delete request.session.logged;
	if(request.session.insearch)
	{
		delete request.session.insearch;
		request.session.vialogout=1;
		home(response,request,db);
	}
	else{
	response.writeHead(302, {'Location': 'http://localhost:8888/start'});
      	response.end();}
						
}
exports.people=people;
exports.tweets=tweets;
exports.change=change;
exports.profile=profile;
exports.upload_html=upload_html;
exports.upload=upload;
exports.uploadform=uploadform;
exports.changeform=changeform;
exports.home=home;
exports.Home=Home;
exports.delete1=delete1;
exports.direct=direct;
exports.logo_png=logo_png;
exports.newHome_css=newHome_css;
exports.newlogin_css=newlogin_css;
exports.newSignup_css=newSignup_css;
exports.bg_jpg=bg_jpg;
exports.sh_jpg=sh_jpg;
exports.default_jpg=default_jpg;
exports.signup_jpg=signup_jpg;
exports.shakehands_png=shakehands_png;
exports.signup_html=signup_html;
exports.login_html=login_html;
exports.start = start;
exports.home = home;
exports.show = show;
exports.signup=signup;
exports.search1=search1;
exports.provideData=provideData;
exports.provideData1=provideData1;
exports.follow=follow;
exports.following=following;
exports.unfollow=unfollow;
exports.logout=logout;
