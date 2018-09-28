angular.module('starter.services', [])


.service('UserService', function($http, $httpParamSerializerJQLike, $q) {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  /* this.pushChat = function(sentBy, text, chatId, request){
	  
	  var deferred = $q.defer();
	$http({
    method: 'POST',
    url: 'http://moshfitness.london/diary/chat-insert.php',
    data: $httpParamSerializerJQLike({
	  "sentBy":sentBy,
      "text":text,
	  "chatId":chatId,
	  "request":request 
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
	if (!response.errors)
	{
		console.log(response);
		deferred.resolve(response);
	}
});
    return deferred.promise;
       }
	   
	   this.pushChat1 = function(sentBy, text, image, video, chatId, request){
	  
	  var deferred = $q.defer();
	$http({
    method: 'POST',
    url: 'http://moshfitness.london/diary/chat-insert-celeb.php',
    data: $httpParamSerializerJQLike({
	  "sentBy":sentBy,
      "text":text,
	  "image":image,
	  "video":video,
	  "chatId":chatId,
	  "request":request 
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
	if (!response.errors)
	{
		console.log(response);
		deferred.resolve(response);
	}
});
    return deferred.promise;
       };
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
	$http({
  method: 'POST',
  url: 'http://moshfitness.london/diary/fbuser.php',
  data: $httpParamSerializerJQLike({
      "authResponse":user_data.authResponse,
      "userId":user_data.userID, 
	  "userName":user_data.name,
	  "userEmail":user_data.email,
	  "userPicture":user_data.picture
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
  
  
}
})
  .service('Chats', function ($http, $httpParamSerializerJQLike, $q) {
    // Might use a resource here that returns a JSON array
chat = function(userId){
	  
	  var deferred = $q.defer();
	$http({
    method: 'POST',
    url: 'http://moshfitness.london/diary/chat-list.php',
    data: $httpParamSerializerJQLike({
	  "userId":userId
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
	if (!response.errors)
	{
		console.log(response);
		deferred.resolve(response);
	}
});
    return deferred.promise;
       }
    // Some fake testing data
    var chats = [
      {
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png',
        messages: [
          {
            type: 'received',
            text: 'Hey, How are you? wanna hang out this friday?',
            image: '',
            time: 'Thursday 05:55 PM'
          },
          {
            type: 'sent',
            text: 'Good, Yes sure why not :D',
            image: '',
            time: 'Thursday 05:56 PM'
          },
          {
            type: 'received',
            text: 'Check out this view from my last trip',
            image: '/img/thumb/canada.jpg',
            time: 'Thursday 05:57 PM'
          },
          {
            type: 'sent',
            text: 'Looks Great is that view in Canada?',
            image: '',
            time: 'Thursday 05:58 PM'
          },
          {
            type: 'received',
            text: 'Yes, it\'s in Canada',
            image: '',
            time: 'Thursday 05:57 PM'
          }
        ]
      },
      {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png'
      },
      {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/thumb/adam.jpg'
      },
      {

        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/thumb/perry.png'
      },
      {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/thumb/mike.png'
      },
      {
        id: 5,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png'
      },
      {
        id: 6,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png'
      }
    ];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })
  
  .factory('Base64', function(){
    var self = this;
    self.encode = function (input) {
        // Converts each character in the input to its Unicode number, then writes
        // out the Unicode numbers in binary, one after another, into a string.
        // This string is then split up at every 6th character, these substrings
        // are then converted back into binary integers and are used to subscript
        // the "swaps" array.
        // Since this would create HUGE strings of 1s and 0s, the distinct steps
        // above are actually interleaved in the code below (ie. the long binary
        // string, called "input_binary", gets processed while it is still being
        // created, so that it never gets too big (in fact, it stays under 13
        // characters long no matter what).

        // The indices of this array provide the map from numbers to base 64
        var swaps = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
        var input_binary = "";      // The input string, converted to Unicode numbers and written out in binary
        var output = "";        // The base 64 output
        var temp_binary;        // Used to ensure the binary numbers have 8 bits
        var index;      // Loop variable, for looping through input
        for (index=0; index < input.length; index++){
            // Turn the next character of input into astring of 8-bit binary
            temp_binary = input.charCodeAt(index).toString(2);
            while (temp_binary.length < 8){
                temp_binary = "0"+temp_binary;
            }
            // Stick this string on the end of the previous 8-bit binary strings to
            // get one big concatenated binary representation
            input_binary = input_binary + temp_binary;
            // Remove all 6-bit sequences from the start of the concatenated binary
            // string, convert them to a base 64 character and append to output.
            // Doing this here prevents input_binary from getting massive
            while (input_binary.length >= 6){
                output = output + swaps[parseInt(input_binary.substring(0,6),2)];
                input_binary = input_binary.substring(6);
            }
        }
        // Handle any necessary padding
        if (input_binary.length == 4){
            temp_binary = input_binary + "00";
            output = output + swaps[parseInt(temp_binary,2)];
            output = output + "=";
        }
        if (input_binary.length == 2){
            temp_binary = input_binary + "0000";
            output = output + swaps[parseInt(temp_binary,2)];
            output = output + "==";
        }
        // Output now contains the input in base 64
        return output;
    };

    self.decode = function (input) {
        // Takes a base 64 encoded string "input", strips any "=" or "==" padding
        // off it and converts its base 64 numerals into regular integers (using a
        // string as a lookup table). These are then written out as 6-bit binary
        // numbers and concatenated together. The result is split into 8-bit
        // sequences and these are converted to string characters, which are
        // concatenated and output.
        input = input.replace("=","");      // Padding characters are redundant
        // The index/character relationship in the following string acts as a
        // lookup table to convert from base 64 numerals to Javascript integers
        var swaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output_binary = "";
        var output = "";
        var temp_bin = "";
        var index;
        for (index=0; index < input.length; index++) {
            temp_bin = swaps.indexOf(input.charAt(index)).toString(2);
            while (temp_bin.length < 6) {
                // Add significant zeroes
                temp_bin = "0"+temp_bin;
            }
            while (temp_bin.length > 6) {
                // Remove significant bits
                temp_bin = temp_bin.substring(1);
            }
            output_binary = output_binary + temp_bin;
            while (output_binary.length >= 8) {
                output = output + String.fromCharCode(parseInt(output_binary.substring(0,8),2));
                output_binary = output_binary.substring(8);
            }
        }
        return output;
    };
    
    return self;
})

.service('TwitterREST', function($http, $q, Base64){

    var self = this;
    var authorization = null;
        var consumerKey = "WeuLs2fM7rG26Uztnl82vZCeg";
        var consumerSecret = "ftCl7CypOtBbpx6sZ1MhawvFhLoQx5YDI5U1jOXoaPe6NHTwD6";
    var twitterTokenURL = "https://api.twitter.com/oauth2/token";
    var twitterStreamURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?user_id="; //url query, this one is for hash tags
	
	var qValue = "ashim221";
	//hash tag %23 is for #
    var numberOfTweets = "&count=10";
	//alert(qValue);
    self.sync = function (twitter) {
		//alert(twitter);
        var def = $q.defer();
        //get authorization token
		console.log(twitterStreamURL+twitter+numberOfTweets);
        self.getAuthorization().then(function(){
            var req1 = {
                method: 'GET',
                url: twitterStreamURL+twitter+numberOfTweets,
                headers: {
                    'Authorization': 'Bearer '+authorization.access_token,
                    'Content-Type': 'application/json'
                },
                cache:true
            };
			
            // make request with the token
            $http(req1).
                success(function(data, status, headers, config) {
                    def.resolve(data);
                }).
                error(function(data, status, headers, config) {

                    def.resolve(false);
                });
        });
        return def.promise;
    };

    self.getAuthorization = function () {
      var def = $q.defer();
      var base64Encoded;

      var combined = encodeURIComponent(consumerKey) + ":" + encodeURIComponent(consumerSecret);

      base64Encoded = Base64.encode(combined);
		
      // Get the token
      $http.post(twitterTokenURL,"grant_type=client_credentials", {headers: {'Authorization': 'Basic ' + base64Encoded, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}).
          success(function(data, status, headers, config) {
			//  alert('12');
            authorization = data;
            if (data && data.token_type && data.token_type === "bearer") {
				//alert('22');
                def.resolve(true);
            }
          }).
          error(function(data, status, headers, config) {
            def.resolve(false);
          });
      return def.promise;
    };

    return self;
	
	*/
})
  
  
.service('AuthService', function($q, $http, $httpParamSerializerJQLike, $cookies, $rootScope, $cookieStore, $cordovaFacebook, $ionicLoading, $state){
	
	var auth={
		data:{
			username:null,
			password:null,
			token:null,
			header:{},
			accessObj:{},
			user:{}
		}
	};
	
	
  /*this.userIsLoggedIn = function(){
	  
    var deferred = $q.defer(),
        authService = this,
        isLoggedIn = (authService.getUser() !== null);

    deferred.resolve(isLoggedIn);

    return deferred.promise;
  };

  /*this.getUser = function(){
    var deferred = $q.defer();
	$http({
  method: 'GET',
  url: 'http://moshfitness.london/diary/auth.php',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}),(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
})
      };*/
	  
  this.getUser1=function(){
    return JSON.parse(window.localStorage.user1 || '{}');
  };
  
   
  
  
/*,function(errors, data) {
      if (errors) {
		   console.log("failed");
        var errors_list = [],
            error = {
              code: errors.code,
              msg: errors.message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
      } else {
		  console.log("success");
        deferred.resolve(data);
      }
    };*/

  
  this.doSignup = function(user){
    var deferred = $q.defer();
	$http({
  method: 'POST',
  url: 'http://moshfitness.london/diary/register_users.php',
  data: $httpParamSerializerJQLike({
	  "name":user.name,
      "email":user.email,
      "password":user.password
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
	if (!response.errors)
	{
		auth.data.header = {headers: {'token': response.data.token}};
		$cookies.put("token", response.data.token, 365);
		auth.data.user = response.data;
		//alert(response.data);
		window.localStorage.setItem('token', response.data.token);
		window.localStorage.user = '';
		window.localStorage.user = JSON.stringify(auth.data.user);
		console.log (auth.data.user);
		deferred.resolve(response.data);
	}
	else
	{
		var errors_list = [],
            error = {
              code: response.errors['0'].code,
              msg: response.errors['0'].message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
	}
});
    return deferred.promise;
  };
  
   
  this.findUser= function(result){
    var deferred = $q.defer();
	var tok = window.localStorage.getItem('token');
	$http({
  method: 'GET',
  url: 'http://moshfitness.london/diary/user_profile.php?userId='+result,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
	if (!response.errors)
	{
		window.localStorage.user2_twitter=JSON.stringify(response.record['0'].twitterId);
		console.log (auth.data.user);
		deferred.resolve(response.data);
	}
	else
	{
		var errors_list = [],
            error = {
              code: response.errors['0'].code,
              msg: response.errors['0'].message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
	}
});
    return deferred.promise;
  };
  
  
  this.userIsLoggedIn = function(){
	  
    var deferred = $q.defer(),
        authService = this,
		tok = window.localStorage.getItem('token');
	  console.log(tok);
		if (!tok)
		{
			isLoggedIn = false;
		}
		else
		{
        isLoggedIn = (authService.getUser(tok) !== null);
		}
    deferred.resolve(isLoggedIn);

    return deferred.promise;
  };
this.getUser = function(token){
    var deferred = $q.defer();
	console.log(token);
	if (token===null)
	{
	}
	else
	{
	$http({
  method: 'POST',
  url: 'http://moshfitness.london/diary/auth.php',
  data: $httpParamSerializerJQLike({
	  "token":token
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
	if (!response.errors)
	{
		auth.data.header = {headers: {'token': response.data.token}};
		$cookies.put("token", response.data.token, 365);
		auth.data.user = response.data;
		console.log (auth.data.user);
		deferred.resolve(response.data);
	}
	else
	{
		var errors_list = [],
            error = {
              code: response.errors['0'].code,
              msg: response.errors['0'].message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
	}
});
    return deferred.promise;
	}
  };
    
this.doLogin = function(user){
	console.log(user);
    var deferred = $q.defer();
	$http({
  method: 'POST',
  url: 'http://moshfitness.london/diary/authorise_users.php',
  data: $httpParamSerializerJQLike({
      "email":user.email,
      "password":user.password
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
		console.log(response);
	if (!response.errors)
	{
		auth.data.header = {headers: {'token': response.data.token}};
		$cookies.put("token", response.data.token, 365);
		auth.data.user = response.data;
		window.localStorage.setItem('token', response.data.token);
		window.localStorage.user = JSON.stringify(auth.data.user);
		console.log (auth.data.user);
		deferred.resolve(response.data);
	}
	else
	{
		console.log(response);
		var errors_list = [],
            error = {
              code: response.errors['0'].code,
              msg: response.errors['0'].message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
	}
});
    return deferred.promise;
  };
	
	
this.addEventUser = function(data){
	console.log(data);
	var q = data;
    var deferred = $q.defer();
	$http({
  method: 'POST',
  url: 'http://moshfitness.london/diary/addeventsuser.php',
  data: $httpParamSerializerJQLike({
      "token":q.token,
      "chosendate":q.chosendate,
	  "starttime":q.startTime,
	  "endtime":q.endTime,
	  "eventname":q.eventname,
	  "allDay":q.all
	  
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
		console.log(response);
	if (!response.errors)
	{
		setTimeout(function(){
       $ionicLoading.show({
      template: 'Task Added successfully'
    });
  },100);
 setTimeout(function(){
	 $ionicLoading.hide();
  },1500);
		$state.go('home',{}, {reload:true});
      // success
	// window.localStorage.setItem('count', 1);
    
      
	}
	else
	{
		console.log(response);
		var errors_list = [],
            error = {
              code: response.errors['0'].code,
              msg: response.errors['0'].message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
	}
});
    return deferred.promise;
  };
	

this.getEvents = function(token){
	console.log(token);
    var deferred = $q.defer();
	$http({
  method: 'POST',
  url: 'http://moshfitness.london/diary/getuserevent.php',
  data: $httpParamSerializerJQLike({
      "token":token
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
		
	if (!response.errors)
	{
		console.log(response.data);
		return response.data;
	}
	else
	{
		console.log(response);
		var errors_list = [],
            error = {
              code: response.errors['0'].code,
              msg: response.errors['0'].message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
	}
});
    return deferred.promise;
  };	
	
	
   
	this.doLogout = function(token){
    var deferred = $q.defer();
	$http({
  method: 'POST',
  url: 'http://moshfitness.london/diary/logout.php',
  data: $httpParamSerializerJQLike({
      "token": token
  }),
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function (response) {
	if (!response.errors)
	{
		window.localStorage.clear();
		window.localStorage.user = JSON.stringify();
		deferred.resolve(response.data);
	}
	else
	{
		var errors_list = [],
            error = {
              code: response.errors['0'].code,
              msg: response.errors['0'].message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
	}
});
    return deferred.promise;
  };
})
/*
  .factory('Posts', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var posts = [
      {
        id: 0,
        user_id: 2,
        name: 'Ben Sparrow',
        content: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so...',
        image: 'img/pizza.jpg',
        face: 'img/thumb/ben.png',
        time: 'Thursday 05:57 PM',
        liked: false,
        likeCount: 2,
        commentCount: 5,
        comments: [
          {
            id: 0,
            user_id: 2,
            name: 'Max Lynx',
            face: 'img/thumb/max.png',
            liked: false,
            likeCount: 2,
            time: 'Thursday 05:57 PM',
            content: 'A wonderful serenity has taken possession'
          },
          {
            id: 1,
            user_id: 2,
            name: 'Adam Bradleyson',
            face: 'img/thumb/adam.jpg',
            liked: true,
            likeCount: 1,
            time: 'Thursday 05:57 PM',
            content: 'I should buy a boat'
          },
          {
            id: 2,
            user_id: 2,
            name: 'Perry Governor',
            face: 'img/thumb/perry.png',
            liked: true,
            likeCount: 3,
            time: 'Thursday 05:57 PM',
            content: 'Look at my mukluks!'
          },
          {
            id: 3,
            user_id: 2,
            name: 'Ben Sparrow',
            face: 'img/thumb/ben.png',
            liked: true,
            likeCount: 1,
            time: 'Thursday 05:57 PM',
            content: 'You on your way?'
          }
        ]
      },
      {
        id: 1,
        user_id: 2,
        name: 'Max Lynx',
        content: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
        image: '',
        face: 'img/thumb/max.png',
        time: 'Thursday 05:59 PM',
        liked: true,
        likeCount: 2,
        commentCount: 7,
        comments: []
      },
      {
        id: 2,
        user_id: 2,
        name: 'Adam Bradleyson',
        content: 'Far far away, behind the word mountains.',
        image: 'img/burger.jpg',
        face: 'img/thumb/adam.jpg',
        time: 'Thursday 06:06 PM',
        liked: false,
        likeCount: 2,
        commentCount: 2,
        comments: []
      },
      {
        id: 3,
        user_id: 2,
        name: 'Perry Governor',
        content: 'There live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
        image: '',
        face: 'img/thumb/perry.png',
        time: 'Thursday 06:50 PM',
        liked: false,
        likeCount: 2,
        commentCount: 7,
        comments: []
      }
    ];

    return {
      all: function () {
        return posts;
      },
      remove: function (post) {
        posts.splice(posts.indexOf(post), 1);
      },
      get: function (postId) {
        for (var i = 0; i < posts.length; i++) {
          if (posts[i].id === parseInt(postId)) {
            return posts[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Notifications', function() {
    // fake data
    var notifications = [
      {
        id: 1,
        type: 'liked',
        user_id: 2,
        name: 'Max Lynx',
        face: 'img/thumb/max.png',
        read: false,
        time: 'Just now'
      },
      {
        id: 2,
        type: 'commented',
        user_id: 2,
        name: 'Adam Bradleyson',
        face: 'img/thumb/adam.jpg',
        read: true,
        time: '3 minutes ago'
      },
      {
        id: 3,
        type: 'friend_request',
        user_id: 2,
        name: 'Perry Governor',
        face: 'img/thumb/perry.png',
        read: true,
        time: '5 minutes ago'
      },
      {
        id: 4,
        type: 'liked',
        user_id: 2,
        name: 'Ben Sparrow',
        face: 'img/thumb/ben.png',
        read: false,
        time: '6 minutes ago'
      },
      {
        id: 5,
        type: 'friend_request',
        user_id: 2,
        name: 'Perry Governor',
        face: 'img/thumb/perry.png',
        read: true,
        time: '5 minutes ago'
      },
      {
        id: 6,
        type: 'liked',
        user_id: 2,
        name: 'Ben Sparrow',
        face: 'img/thumb/ben.png',
        read: false,
        time: '6 minutes ago'
      }
    ];

    return {
      all: function() {
        return notifications
      }
    };

  })
  
  .factory('Contacts', function() {
    // Some fake testing data
    var contacts = [
      {
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png',
        group: 'Friend'
      },
      {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png',
        group: 'Family'
      },
      {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/thumb/adam.jpg',
        group: 'Friend'
      },
      {

        d: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/thumb/perry.png',
        group: 'Friend'
      },
      {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/thumb/mike.png',
        group: 'Family'
      },
      {
        id: 5,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/thumb/ben.png',
        group: 'Friend'
      },
      {
        id: 6,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/thumb/max.png',
        group: 'Family'
      }
    ];

    return {
      all: function() {
        return contacts
      },
      get: function(contactId) {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i].id === parseInt(contactId)) {
            return contacts[i];
          }
        }
        return null;
      }
    }
  });
  */
