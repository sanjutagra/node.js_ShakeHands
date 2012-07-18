var querystring = require("querystring"),fs = require("fs"),formidable = require("formidable");

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
						'<script type="text/javascript" src="jQuery.js"></script>'+
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
						'<script type="text/javascript" src="jQuery.js"></script>'+
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
						'<script type="text/javascript" src="jQuery.js"></script>'+
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
						'<script type="text/javascript" src="jQuery.js"></script>'+
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
exports.search1=search1;
exports.provideData=provideData;
exports.provideData1=provideData1;
exports.follow=follow;
exports.following=following;
exports.unfollow=unfollow;
exports.people=people;
exports.tweets=tweets;
exports.delete1=delete1;
