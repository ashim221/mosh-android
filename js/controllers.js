angular.module('starter.controllers', [])

// Authentication controller
// Put your login, register functions here
.controller('AuthCtrl', function($scope, $ionicHistory, $ionicSideMenuDelegate, $q, UserService, $ionicLoading, AuthService, $state, $cookies, $rootScope, $location, $cordovaFacebook, $http) {
	
  $scope.login = function(user){
    $ionicLoading.show({
      template: 'Logging in ...'
    }),

    AuthService.doLogin(user)
    .then(function(user){
      // success
	 window.localStorage.setItem('count', 1);
      $state.go('home',{}, {reload:true});
		
	  
      $ionicLoading.hide();
    },function(err){
      // error
	  console.log(err);
      $scope.errors = err;
      $ionicLoading.hide();
    });
  };
  
  
  $scope.logout = function(){
    $ionicLoading.show({
      template: 'Logging out ...'
    }),
	tok = window.localStorage.getItem('token');
	tok = $rootScope.me['0'].token;
	console.log(tok);
	//alert('c');
    AuthService.doLogout(tok);
	   
	    $ionicLoading.hide();
       window.localStorage.user = {};
      $state.go('login',{}, {reload:true});
    };
  
  $scope.signup = function(user){
    $ionicLoading.show({
      template: 'Signing up ...'
    });

    AuthService.doSignup(user)
    .then(function(user){
      // success
		window.localStorage.setItem('count', 1);
      $state.go('home');
      $ionicLoading.hide();
    },function(err){
      // error
      $scope.errors = err;
      $ionicLoading.hide();
    });
  };
  
 
	  
   

	    
		//$state.go('home',{}, {reload:true});
		


})
// Home controller
.controller('HomeCtrl', function($scope, $state, UserService, AuthService, $ionicActionSheet, $ionicLoading, $http, $ionicScrollDelegate, $timeout, $rootScope, $cordovaFacebook) {
	$scope.calendar = {};
        
	
		$scope.getEvents =function()
	{
			$rootScope.me =  JSON.parse(window.localStorage.user || '{}');
			//console.log($rootScope.me);
		var token = $rootScope.me['0'].token;
		console.log(token);
			console.log("http://moshfitness.london/diary/getuserevent.php?token="+token);
		$http.get("http://moshfitness.london/diary/getuserevent.php?token="+token)
    .then(function (response) {
			$scope.event = response.data.event;
			for (var ki=0;ki<$scope.event.length;ki++)
				{
					console.log($scope.event[ki]);
					$scope.d = new Date($scope.event[ki].startTime);
			$scope.event[ki].startTime = new Date($scope.d.getTime() - ($scope.d.getTimezoneOffset() * 60000));
					$scope.e = new Date($scope.event[ki].endTime);
			$scope.event[ki].endTime = new Date($scope.e.getTime() - ($scope.e.getTimezoneOffset() * 60000));
				}
			$scope.calendar.eventSource = $scope.event; 
			console.log($scope.calendar.eventSource);
		});
	};
	
	$scope.chosen = new Date();
	$scope.calendar.eventSource = $scope.getEvents();
$scope.changeMode = function (mode) {
            $scope.calendar.mode = mode;
        };
	$scope.loadEvents = function () {
            $scope.calendar.eventSource = createRandomEvents();
        };

        $scope.onEventSelected = function (event) {
            console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
        };

        $scope.onViewTitleChanged = function (title) {
            $scope.viewTitle = title;
			console.log(title);
        };

        $scope.today = function () {
            $scope.calendar.currentDate = new Date();
        };

        $scope.isToday = function () {
            var today = new Date(),
                currentCalendarDate = new Date($scope.calendar.currentDate);

            today.setHours(0, 0, 0, 0);
            currentCalendarDate.setHours(0, 0, 0, 0);
            return today.getTime() === currentCalendarDate.getTime();
        };

        $scope.onTimeSelected = function (selectedTime, events, disabled) {
            console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0) + ', disabled: ' + disabled);
			$scope.chosen = selectedTime;
        };
	$scope.addevent = function(selectedTime){
		console.log(selectedTime);
		if(!selectedTime)
			{
				selectedTime = new Date($scope.calendar.currentDate);
			}
		$state.go('addevent', {obj:selectedTime});
	};
	 function createRandomEvents() {
            var events = [];
            for (var i = 0; i < 50; i += 1) {
                var date = new Date();
                var eventType = Math.floor(Math.random() * 2);
                var startDay = Math.floor(Math.random() * 90) - 45;
                var endDay = Math.floor(Math.random() * 2) + startDay;
                var startTime;
                var endTime;
                if (eventType === 0) {
                    startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                    if (endDay === startDay) {
                        endDay += 1;
                    }
                    endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                    events.push({
                        title: 'All Day - ' + i,
                        startTime: startTime,
                        endTime: endTime,
                        allDay: true
                    });
                } else {
                    var startMinute = Math.floor(Math.random() * 24 * 60);
                    var endMinute = Math.floor(Math.random() * 180) + startMinute;
                    startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                    endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                    events.push({
                        title: 'Event - ' + i,
                        startTime: startTime,
                        endTime: endTime,
                        allDay: false
                    });
                }
            }
		 console.log(events);
            return events;
        }
	/*
	$scope.$on('$stateChangeSuccess', 
function(event, toState, toParams, fromState, fromParams){ 
		
	 $scope.count = window.localStorage.getItem('count');
	 console.log($scope.count);
	 if (!$scope.count===2)
	 {
		 $scope.count = 1;
	 }
	 if ($scope.count<=1)
	 {
		 window.localStorage.removeItem('count');
		 window.localStorage.setItem('count',2);
		 window.location.reload(true);
	 }
	  
})
$scope.$on('$stateChangeSuccess', 
function(event, toState, toParams, fromState, fromParams){ 
		
	 $scope.count = window.localStorage.getItem('count');
	 $scope.count1 = 1;
	 console.log($scope.count1);
	 if ($scope.count1<=$scope.count)
	 {
		 $scope.count1 = $scope.count1 +1;
	 }
	  AuthService.userIsLoggedIn().then(function(response)
	  {
		  if (response === true)
		  {
		  console.log(response);
          // success 
      $ionicLoading.hide();
		  }
		  else
		  {
	  $state.go('login');
      $ionicLoading.hide();  
		  }
	  });
});
 

  // view user
  $scope.viewUser = function(userId) {
    $state.go('user', {userId: userId});
  }
	
	//$http.get("https://fanbaseapp.com/featured_category_with_users.php")
   // .then(function (response) {$scope.names = response.data.records;});
	//	console.log($scope.names);
	
  // get list posts froms service
 
  $rootScope.me =  JSON.parse(window.localStorage.user || '{}');
  $scope.m = window.localStorage.user;
  console.log($rootScope.me);
  //$scope.user1 = AuthService.getUser();
	//console.log($scope.user1);
	 $scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
				  template: 'Logging out...'
				});

        // Facebook logout
       
			}
		}); 
	 };
 setTimeout(function(){
       $ionicLoading.show({
      template: 'Loading...'
    });
  },100);
 setTimeout(function(){
	 $ionicLoading.hide();
  },1500);
  
  */
})


.controller('AddEventCtrl', function($scope, $rootScope, $http, $stateParams,$ionicLoading, AuthService, $state) {
	console.log($stateParams.obj);
	console.log($rootScope.me);
	$scope.data=[];
	$scope.data.token = $rootScope.me['0'].token;
	$scope.data.userId = $rootScope.me['0'].userId;
	console.log($scope.tok);
	console.log($scope.userID);
	$scope.error = false;
	$scope.event = '';
	$scope.data.chosendate = new Date($stateParams.obj);
	
	$scope.addtask= function(data)
	{
		console.log(data);
		if ($scope.data.chosendate.getMonth()<10)
					{
						$scope.month = '0'+ ($scope.data.chosendate.getMonth()+1);
					}
				else
					{
						$scope.month = ($scope.data.chosendate.getMonth()+1);
					}
				if ($scope.data.chosendate.getDate()<10)
					{
						$scope.date = '0'+$scope.data.chosendate.getDate();
					}
				else
					
					{
						$scope.date = $scope.data.chosendate.getDate();
					}
		if (!data.all)
			{
				
				
				if ($scope.data.starttime.getHours()<10)
					{
						$scope.starthour = '0'+ $scope.data.starttime.getHours();
					}
				else
					{
						$scope.starthour = $scope.data.starttime.getHours();
					}
				if ($scope.data.starttime.getMinutes()<10)
					{
						$scope.startmin = '0'+$scope.data.starttime.getMinutes();
					}
				else
					
					{
						$scope.startmin = $scope.data.starttime.getMinutes();
					}
				
				if ($scope.data.endtime.getHours()<10)
					{
						$scope.endhour = '0'+ $scope.data.endtime.getHours();
					}
				else
					{
						$scope.endhour = $scope.data.endtime.getHours();
					}
				if ($scope.data.endtime.getMinutes()<10)
					{
						$scope.endmin = '0'+$scope.data.endtime.getMinutes();
					}
				else
					
					{
						$scope.endmin = $scope.data.endtime.getMinutes();
					}
					
				$scope.startDate1 = $scope.data.chosendate.getFullYear()+'-'+($scope.month)+'-'+$scope.date;
				console.log($scope.startDate1);
				$scope.startTime1 =   $scope.starthour+":"+$scope.startmin;
				$scope.endTime1 =   $scope.endhour+":"+$scope.endmin;
				$scope.startTime = $scope.startDate1+'T'+$scope.startTime1;
				console.log($scope.startTime);
		        $scope.endTime = $scope.startDate1+'T'+$scope.endTime1;
				console.log($scope.endTime);
				$scope.data.endTime = new Date($scope.endTime);
				$scope.data.startTime = new Date($scope.startTime);
			
			}
		else
			{
				$scope.startDate1 = $scope.data.chosendate.getFullYear()+'-'+($scope.month)+'-'+$scope.date;
				$scope.startTime1 =   "01:00:00";
				$scope.dat = new Date($scope.startDate1+'T'+$scope.startTime1);
				var nextDay = new Date($scope.dat);
				nextDay.setDate($scope.dat.getDate()+1);
				console.log(nextDay);
				$scope.endDate = nextDay;
				$scope.data.endTime = new Date($scope.endDate);
				$scope.data.startTime = new Date($scope.dat);
			}
		if ($scope.data.chosendate< new Date())
			{
				$scope.error = true;
				setTimeout(function(){
       $ionicLoading.show({
      template: 'Date cannot be in past'
    });
  },100);
 setTimeout(function(){
	 $ionicLoading.hide();
  },1500);
				console.log();
			}
		if ($scope.data.startTime> $scope.data.endTime)
			{
				$scope.error = true;
				setTimeout(function(){
       $ionicLoading.show({
      template: 'Time allocation is not correct'
    });
  },100);
 setTimeout(function(){
	 $ionicLoading.hide();
  },1500);
			
			}
		if ($scope.error===false)
			{
				 AuthService.addEventUser(data)
    .then(function(data){
					
					
    },function(err){
      // error
	  //console.log(err);
      //$scope.errors = err;
      //$ionicLoading.hide();
    });
  }
			};
})


/*
// Chat controller, view list chats and chat detail
.controller('ChatCelebCtrl', function($scope, Chats, $rootScope, $http) {
	console.log("https://fanbaseapp.com/chat-list-celeb.php?influencerId="+$rootScope.me['0'].userId);
 $http.get("https://fanbaseapp.com/chat-list-celeb.php?influencerId="+$rootScope.me['0'].userId)
    .then(function (response) {$scope.chats = response.data.records; console.log($scope.chats);});
		

  // remove a conversation
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  // mute a conversation
  $scope.mute = function(chat) {
    // write your code here
  }
})

.controller('ChatCtrl', function($scope, Chats, $rootScope, $http) {
	console.log("https://fanbaseapp.com/chat-list.php?userId="+$rootScope.me['0'].userId);
 $http.get("https://fanbaseapp.com/chat-list.php?userId="+$rootScope.me['0'].userId)
    .then(function (response) {$scope.chats = response.data.records; console.log($scope.chats);});
		

  // remove a conversation
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  // mute a conversation
  $scope.mute = function(chat) {
    // write your code here
  }
})



.controller('CategoriesCtrl', function($scope, Posts, $state, UserService, $ionicLoading, $http, $ionicSlideBoxDelegate) {
	$state.reload();
	
  // view user
  $scope.viewUser = function(userId) {
    $state.go('user', {userId: userId});
  }
	
	$http.get("https://fanbaseapp.com/all_category_with_users.php")
    .then(function (response) {$scope.names = response.data.records;});
		console.log($scope.names);
	
  // get list posts froms service
  $scope.posts = Posts.all();
$scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
  // toggle like button
  $scope.toggleLike = function (post) {
    // if user liked
    if(post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }
    post.liked = !post.liked;
  };

  // view post
  $scope.viewPost = function(postId) {
    $state.go('post', {postId: postId});
  }
  setTimeout(function(){
       $ionicLoading.show({
      template: 'Loading...'
    });
  },100);
 setTimeout(function(){
	 $ionicLoading.hide();
      $ionicSlideBoxDelegate.update();
  },2500);

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicScrollDelegate, $ionicActionSheet, $timeout, $http, UserService, $rootScope, $state) {
  //$scope.chat = Chats.get($stateParams.chatId);
  
  if(!$scope.pp)
  {
  $scope.pp = 1;
  }
  $scope.chat = Chats.get(0);
   
 if($scope.pp === 1)
 {
	 console.log($scope.pp);
	 setTimeout(function(){
 //document.getElementById('laster').scrollTop = document.getElementById('laster').scrollHeight;
},500);
$scope.pp = 2;
   }

  $scope.url = "https://fanbaseapp.com/chat-details.php?chatId="+$stateParams.chatId;
  $http.get($scope.url)
    .then(function (response) {$scope.names = response.data.records; console.log($scope.names);
	});
$scope.choice='text';
 
  $scope.sendMessage = function() {
    var message = {
      //type: $rootScope.me['0'].userType,
      time: 'Just now',
      text: $scope.input.message
    };
	var alternate;
   	var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
	$scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };
  
 
    
	UserService.pushChat('user', $scope.input.message, $stateParams.chatId, $scope.choice).then(function (response) {
		console.log(response);
		$scope.input.message = '';
		 $scope.names = response.records;
		// document.getElementById('laster').reset();
	});
	
    // push to massages list
    $scope.chat.messages.push(message);

    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
  };

  // hover menu
  $scope.onMessageHold = function(e, itemIndex, message) {
    // show hover menu
    $ionicActionSheet.show({
      buttons: [
        {
          text: 'Copy Text'
        }, {
          text: 'Delete Message'
        }
      ],
      buttonClicked: function(index) {
        switch (index) {
          case 0: // Copy Text
            //cordova.plugins.clipboard.copy(message.text);

            break;
          case 1: // Delete
            // no server side secrets here :~)
            $scope.chat.messages.splice(itemIndex, 1);
            break;
        }

        return true;
      }
    });
  };
})

.controller('ChatDetailCelebCtrl', function($scope, $stateParams, Chats, $ionicScrollDelegate, $ionicActionSheet, $timeout, $http, UserService, $rootScope, $state, $cordovaCamera) {
  //$scope.chat = Chats.get($stateParams.chatId);
  document.addEventListener("deviceready", function () {

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
	  correctOrientation:true
    };


    $cordovaCamera.getPicture(options).then(function(imageURI) {
     //var image = document.getElementById('myImage');
      //image.src = imageURI;
	  alert(imageURI);
	  UserService.pushChat1('celebrity', '', imageURI, '', $stateParams.chatId, $scope.choice).then(function (response) {
		  alert(123);
		console.log(response);
		$scope.input.message = '';
		 $scope.names = response.records;
		// document.getElementById('laster').reset();
	});
    }, function(err) {
      // error
    });

  }, false);

  if(!$scope.pp)
  {
  $scope.pp = 1;
  }
  $scope.chat = Chats.get(0);
   
 if($scope.pp === 1)
 {
	 console.log($scope.pp);
	 setTimeout(function(){
 //document.getElementById('laster').scrollTop = document.getElementById('laster').scrollHeight;
},500);
$scope.pp = 2;
   }

  $scope.url = "https://fanbaseapp.com/chat-details-celeb.php?chatId="+$stateParams.chatId;
  $http.get($scope.url)
    .then(function (response) {$scope.names = response.data.records; console.log($scope.names);
	});
$scope.choice='text';
 
  $scope.sendMessage = function() {
    var message = {
      //type: $rootScope.me['0'].userType,
      time: 'Just now',
      text: $scope.input.message
    };
	var alternate;
   	var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
	$scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };
  
 
    
	UserService.pushChat1('celebrity', $scope.input.message, '', '', $stateParams.chatId, $scope.choice).then(function (response) {
		console.log(response);
		$scope.input.message = '';
		 $scope.names = response.records;
		// document.getElementById('laster').reset();
	});
	
    // push to massages list
    $scope.chat.messages.push(message);

    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
  };

  // hover menu
  $scope.onMessageHold = function(e, itemIndex, message) {
    // show hover menu
    $ionicActionSheet.show({
      buttons: [
        {
          text: 'Copy Text'
        }, {
          text: 'Delete Message'
        }
      ],
      buttonClicked: function(index) {
        switch (index) {
          case 0: // Copy Text
            //cordova.plugins.clipboard.copy(message.text);

            break;
          case 1: // Delete
            // no server side secrets here :~)
            $scope.chat.messages.splice(itemIndex, 1);
            break;
        }

        return true;
      }
    });
  };
})

.controller('PostCtrl', function($scope, Posts, $state) {
  // get list posts froms service
  $scope.post = Posts.get(0);

  // toggle like button
  $scope.toggleLike = function (post) {
    // if user liked
    if(post.liked) {
      post.likeCount--;
    } else {
      post.likeCount++;
    }
    post.liked = !post.liked;
  };

  // view user function
  $scope.viewUser = function(userId) {
    $state.go('user', {userId: userId});
  }
})

// Notifications controller
.controller('NotificationsCtrl', function($scope, Notifications) {
  // get list posts from service
  $scope.notifications = Notifications.all();
})

// ContactsCtrl controller
.controller('ContactsCtrl', function($scope, Contacts, $state) {
  // get list posts froms service
  $scope.contacts = Contacts.all();

  // view contact function
  $scope.viewContact = function(contactId) {
    $state.go('user', {userId: contactId});
  }
})
*/
// UserCtrl controller
.controller('UserCtrl', function($scope, Contacts, Posts, $stateParams, $http, $state, TwitterREST, AuthService, UserService, $rootScope) {
  // get contact from Contacts service
  // set the userId here
  $scope.myProfile = false;
  $scope.userId = $stateParams.userId;
  if($scope.userId === $rootScope.me['0'].userId)
  {
	  $scope.myProfile = true;
  }
  console.log($scope.myProfile);
 $scope.linkw = "http://moshfitness.london/user_profile.php?userId="+$scope.userId;
  console.log($scope.linkw);
 
$http.get($scope.linkw).then(function (response) {
	  $scope.userCeleb = response.data.record;
	  console.log($scope.userCeleb);
	 // $scope.twitterId = response.data.record['0'].twitterId;
	  });
		
		AuthService.findUser($stateParams.userId).then(function(response){
			/* var twitt = JSON.parse(window.localStorage.user2_twitter);
			console.log(twitt);
			if(twitt === "")
			{
				$scope.twitter = "No Twitter Attached";
			}else
			{
				console.log(twitt);
		 TwitterREST.sync(twitt).then(function(tweets){
        console.log(tweets);
        $scope.tweets = tweets;
		$scope.twitter = "";
		 })
			}
			*/
    });

        $scope.innapBrowser = function (value) {
            window.open(value, '_blank');
        };
/*
  $scope.user = Contacts.get(0);
  // attach post to this contact
  angular.extend($scope.user, {
    'followers': 199,
    'following': 48,
    'favorites': 14,
    'posts': Posts.all()
  });
  console.log($scope.userCeleb);
  $scope.tweetSelect = '123';
  $scope.askquestion = function(tweet, medium){
	  //window.localStorage.setItem('message',tweet);
	  AuthService.chatInitialise(tweet, $scope.userId, $rootScope.me['0'].userId, medium).then(function(user){
      // success
	  $scope.chatI = JSON.parse(window.localStorage.chatStart || '{}');
	  console.log($scope.chatI);
      $state.go('chat-detail', {chatId: $scope.chatI['0'].chatId});
    },function(err){
      // error
      $scope.errors = err;
      $ionicLoading.hide();
    });
  			}
			
$scope.openCity = function (evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  //evt.currentTarget.firstElementChild.className += " w3-border-red";
}
    */    	
  
});

/*
.controller('CreditCtrl', function($scope, $ionicPlatform, $ionicLoading, $ionicPopup) {

  var productIds = ['com.fanbaseapp.www.credit50']; // <- Add your product Ids here

  var spinner = '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';

  $scope.loadProducts = function () {
    $ionicLoading.show({ template: spinner + 'Loading Products...' });
    inAppPurchase
      .getProducts(productIds)
      .then(function (products) {
        $ionicLoading.hide();
        $scope.products = products;
      })
      .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
  };

  $scope.buy = function (productId) {

    $ionicLoading.show({ template: spinner + 'Purchasing...' });
    inAppPurchase
      .buy(productId)
      .then(function (data) {
        console.log(JSON.stringify(data));
        console.log('consuming transactionId: ' + data.transactionId);
        return inAppPurchase.consume(data.type, data.receipt, data.signature);
      })
      .then(function () {
        var alertPopup = $ionicPopup.alert({
          title: 'Purchase was successful!',
          template: 'Check your console log for the transaction data'
        });
        console.log('consume done!');
        $ionicLoading.hide();
      })
      .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: 'Something went wrong',
          template: 'Check your console log for the error details'
        });
      });

  };

  $scope.restore = function () {
    $ionicLoading.show({ template: spinner + 'Restoring Purchases...' });
    inAppPurchase
      .restorePurchases()
      .then(function (purchases) {
        $ionicLoading.hide();
        console.log(JSON.stringify(purchases));
        $ionicPopup.alert({
          title: 'Restore was successful!',
          template: 'Check your console log for the restored purchases data'
        });
      })
      .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: 'Something went wrong',
          template: 'Check your console log for the error details'
        });
      });
  };

})

// SettingCtrl controller
.controller('SettingCtrl', function($scope, $cordovaOauth, $state, AuthService, $rootScope){
	$scope.twitterAdd = function(){
	$cordovaOauth.twitter("WeuLs2fM7rG26Uztnl82vZCeg", "ftCl7CypOtBbpx6sZ1MhawvFhLoQx5YDI5U1jOXoaPe6NHTwD6", {redirect_uri: "http://localhost/callback"}).then(function(result){
        window.localStorage.twitteruser = JSON.stringify(result);
		$scope.data1 = JSON.stringify(result);
		$scope.data = result;
		$scope.tok = $rootScope.me['0'].token;
		
		AuthService.addTwitter($scope.data1, $scope.tok).then(function(res){
			
		})
		//$state.go('home');
    },  function(error){
            alert("Error: " + error);
    });
	}
	$scope.instagramAdd = function(){
	$cordovaOauth.instagram("01224cec215a4b70a9f163004dbfd719", ["basic", "public_content"], {redirect_uri: "http://localhost/callback"}).then(function(result){
        window.localStorage.instagramuser = JSON.stringify(result);
		$scope.data3 = JSON.stringify(result);
		$scope.data2 = result;
		$scope.tok = $rootScope.me['0'].token;
		
		AuthService.addInstagram($scope.data3, $scope.tok).then(function(res){
			
		})
		//$state.go('home');
    },  function(error){
            alert("Error: " + error);
    });
	}

});
*/


