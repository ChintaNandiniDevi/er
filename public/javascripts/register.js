var app=angular.module('myapp',[]);
app.controller('mycontroller',function($scope, $http){
	$scope.info={};
	$scope.userinfo=[]
	$scope.usercount=[]
	$scope.pre=[]
	$scope.idea=[]
	$scope.debate=[]
	$scope.logininfo=[]
	$scope.hide=false;

	

	$scope.postdata=function(val){
		if(val.name==undefined || val.rollno==undefined || val.branch==undefined|| val.college==undefined|| val.event==undefined || val.email==undefined )
		{
			alert("Empty fields are not accepted");
		}
		else{
		$http({
			method:'post',
			url:'/postdata',
			data:val
		}).then(function(success){
			//console.log(success)
			window.alert("sucessfully registered")
			$scope.info={};
			$scope.userinfo.push(val);
			//$scope.user={};
		},function(error){
			alert("email already exists");
		})
	}
}


$scope.getdata= function(){
		$http({
			method:'get',
			url:'/getdata'
		}).then(function(success){
			console.log(success.data)
			$scope.userinfo=success.data;
		},function(error){
			console.log(error)
		})
	}	

	$scope.delete = function(value, index){
		$scope.userinfo.splice(index, 1)
		$http({
			method:'post',
			url:'/delete',
			data:value
		}).then(function(success){
			alert('Deleted succesfully');
		},function(error){
			alert('something went wrong');
		})
	}


		$scope.editData={}

		$scope.edit=function(value){
				$scope.editData=value
		}
		$scope.update=function(value,index){
			$http({
				method:'post',
				url:'/update',
				data:value
			}).then(function(success){
				console.log(success)
			},function(error){
				console.log(error)
			})
		}

		$scope.login={};

	$scope.loginma=function(value){
		$http({
			method:'post',
			url:'/loginmatch',
			data:value
		}).then(function(success){
			if(success.data.role=="admin"){
			window.location.href='/admin';
			}
			else if(success.data.username=="organizer"){
				window.location.href='/organizer';
			}
			else if(success.data.username=="organizer2"){
				window.location.href='/organizer2';
			}
			else if(success.data.username=="organizer3"){
				window.location.href='/organizer3';
			}
			else {
				window.location.href='/organizer4';
			}
			console.log(success)
		},function(error){
			alert('something went wrong');
		})
	}

	/*$scope.logout=function(){
		$http({
			method:'get',
			url:'/logout'
		}).then(function(success){
			console.log('logged out');
		},function(error){
			console('logout failed');
		})
	}*/

	


	$scope.getcount= function(){
		$http({
			method:'get',
			url:'/getcount'
		}).then(function(success){
			console.log(success.data)
			$scope.usercount=success.data;
		},function(error){
			console.log(error)
		})
	}



$scope.getcodedata= function(){
		$http({
			method:'get',
			url:'/getcodedata'
		}).then(function(success){
			console.log(success.data)
			$scope.userinfo=success.data;
		},function(error){
			console.log(error)
		})
	}	

	$scope.getpredata= function(){
		$http({
			method:'get',
			url:'/getpredata'
		}).then(function(success){
			console.log(success.data)
			$scope.pre=success.data;
		},function(error){
			console.log(error)
		})
	}
	

	$scope.getideadata= function(){
		$http({
			method:'get',
			url:'/getideadata'
		}).then(function(success){
			console.log(success.data)
			$scope.idea=success.data;
		},function(error){
			console.log(error)
		})
	}

	$scope.getdebdata= function(){
		$http({
			method:'get',
			url:'/getdebdata'
		}).then(function(success){
			console.log(success.data)
			$scope.debate=success.data;
		},function(error){
			console.log(error)
		})
	}


	$scope.organizer={};  
	  $scope.data=function(val){
		  if(val.name==undefined || val.rollno==undefined || val.branch==undefined|| val.college==undefined|| val.event==undefined ||
			   val.email==undefined  )
		  {
			  alert("empty fields are not accepted");
		  }
		  else{
		  $http({
			  method:'post',
			  url:'/data',
			  data:val
		  }).then(function(success){
			  console.log(success)
			  alert("successfully submitted");
		  
		  },function(error){
			  alert("email already exists");
		  })
	  }
  } 



})

