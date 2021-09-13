var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/eventregistration');
var nodemailer=require('nodemailer');
var coll=db.collection('register');
var coll2=db.collection('logindetails');
var coll3=db.collection('organizerdetails')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/in', function(req, res, next) {
  res.render('indexdemo', { title: 'Express' });
});

router.get('/register',function(req, res,next){
	res.render('register');
})

router.get('/login',function(req, res,next){
	res.render('login');
})

router.get('/codejam',function(req, res,next){
	res.render('codejam');
})

router.get('/presentation',function(req, res,next){
	res.render('presentation');
})

router.get('/ideaexpo',function(req, res,next){
	res.render('ideaexpo');
})

router.get('/debate',function(req, res,next){
	res.render('debate');
})





router.get('/organizer',function(req, res,next){
	if(req.session && req.session.user){
		if(req.session.user.username=="organizer"){
		res.locals.user=req.session.user
	res.render('organizer');
	}
	else{
		res.redirect('/login');
	}
	}
    else{
    	req.session.reset();
    	res.redirect('/login');}
})

router.get('/organizer2',function(req, res,next){
	if(req.session && req.session.user){
		if(req.session.user.username=="organizer2"){
		res.locals.user=req.session.user
	res.render('organizer2');
	}
	else{
		res.redirect('/login');
	}
	}
    else{
    	req.session.reset();
    	res.redirect('/login');}
	//res.render('organizer2');
})

router.get('/organizer3',function(req, res,next){
	if(req.session && req.session.user){
		if(req.session.user.username=="organizer3"){
		res.locals.user=req.session.user
	res.render('organizer3');
	}
	else{
		res.redirect('/login');
	}
	}
    else{
    	req.session.reset();
    	res.redirect('/login');}
	//res.render('organizer3');
})

router.get('/organizer4',function(req, res,next){
	if(req.session && req.session.user){
		if(req.session.user.username=="organizer4"){
		res.locals.user=req.session.user
	res.render('organizer4');
	}
	else{
		res.redirect('/login');
	}
	}
    else{
    	req.session.reset();
    	res.redirect('/login');}
	//res.render('organizer4');
})


//router.get('/*',function(req, res,next){
	//.render('index');
//})




router.post('/postdata',function(req, res){
	console.log(req.body);
	coll.findOne({"email":req.body.email,"event":req.body.event},function(error, docs){
		if(!error && docs){
			console.log("alraedy exists")
			res.sendStatus(500);
		}
		if(!docs){
		coll.insert(req.body,function(error, docs){
		if(error){
			res.sendStatus(500);
		}
		else{
			res.sendStatus(200);
			var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			  user: 'thubdummy@gmail.com',
			  pass: 'dummy@1234'
			}
		  });
		  
		  var mailOptions = {
			from: 'thubdummy@gmail.com',
			to: docs.email,
			subject: 'Send text',
			text: ' Hi! ' + docs.name + ' You have successfully register for ' + docs.event + ' event '
		  };
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
  });
		}

	})
	}
	})
	
})

router.post('/delete', function(req,res){
	coll.remove({"_id":req.body._id}, function(error, docs){
		if(error)
		{
			res.sendStatus(500)
		}else{
			res.sendStatus(200)
		}
	})
})

router.post('/update', function(req,res){
	coll.update({"_id":req.body._id}, {$set:req.body}, function(error, docs){
		if(error){
			res.sendStatus(500)
		}else{
			res.sendStatus(200)
		}
	})
})

router.get('/getdata',function(req,res){
	coll.find({},function (error, docs) {
		if(error)
		{
			res.sendStatus(500)
		}
		else{
			console.log(docs)
			res.send(docs)
		}
	})
})

router.post('/loginmatch',function(req, res){
	coll2.findOne({"username":req.body.username,"password":req.body.password},function(error, docs){
		if(error)
		{
		res.sendStatus(500);
		}
		else{
			console.log(docs)
			req.session.user=docs
			//res.redirect('/admin');
			//if(r.role=="organizer"){
			//res.send(req.body.role)
			res.send(docs);
		//}
		}


	})
})

router.get('/admin',function(req, res){
	if(req.session && req.session.user){
		res.locals.user=req.session.user
		res.render('admin');
    }
    else{
    	req.session.reset();
    	res.redirect('/login');
   }
})

router.get('/logout',function(req, res){
	req.session.reset();
	res.redirect('/login');
})


router.get('/getcount',function(req,res){

	coll.aggregate([{"$group":{_id:{"event":"$event"},count:{$sum:1}}}],function (error, docs) {
		if(error){
			res.sendStatus(500);
		}
		else{
			res.send(docs);
		}


	})

})

router.get('/getcodedata',function(req,res){
	coll.find({"event":"Code Jam"},function (error, docs) {
		if(error)
		{
			res.sendStatus(500)
		}
		else{
			console.log(docs)
			res.send(docs)
		}
	})
})



router.get('/getpredata',function(req,res){
	coll.find({"event":"Presentation"},function (error, docs) {
		if(error)
		{
			res.sendStatus(500)
		}
		else{
			console.log(docs)
			res.send(docs)
		}
	})
})

router.get('/getideadata',function(req,res){
	coll.find({"event":"Idea Expo"},function (error, docs) {
		if(error)
		{
			res.sendStatus(500)
		}
		else{
			console.log(docs)
			res.send(docs)
		}
	})
})

router.get('/getdebdata',function(req,res){
	coll.find({"event":"Debate"},function (error, docs) {
		if(error)
		{
			res.sendStatus(500)
		}
		else{
			console.log(docs)
			res.send(docs)
		}
	})
})





router.post('/data',function(req, res){
	console.log(req.body);
	coll3.insert(req.body,function(error,docs){
		if(error){
			res.sendStatus(500)
		}
		else{
			res.sendStatus(200)
		}
	})
	
	
})




module.exports = router;
