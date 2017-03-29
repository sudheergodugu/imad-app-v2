console.log (loaded);
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});
// submit username and password
var submit = document.getElementById('submit_btn');

submit.onclick = function() {
    
    // create a request object
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
          // take some action
          if (request.status === 200) {
              // capture a list of names and render it
              console.log('success');
              alert('success');
          } else if (request.status === 403) {
              alert('failed');
          } else if (request.status === 500) {
              alert('failed2');
          }
      }  
      // not done yet
    };
    
    // make the request
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    request.open('POST', 'http://sudheergodugu.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};
$(document).ready(function () {
  // Initialize the PubNub API connection.
  var pubnub = PUBNUB.init({
    publish_key: 'PUBNUB PUBLISH KEY HERE',
    subscribe_key: 'PUBNUB SUBSCRIBE KEY HERE'
  });
 
  // Grab references for all of our elements.
  var messageContent = $('#messageContent'),
      sendMessageButton = $('#sendMessageButton'),
      messageList = $('#messageList');
 
  // Handles all the messages coming in from pubnub.subscribe.
  function handleMessage(message) {
    var messageEl = $("<li class='message'>"
        + "<span class='username'>" + message.username + ": </span>"
        + message.text
        + "</li>");
    messageList.append(messageEl);
    messageList.listview('refresh');
 
    // Scroll to bottom of page
    $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 'slow');
  };
 
  // Compose and send a message when the user clicks our send message button.
  sendMessageButton.click(function (event) {
    var message = messageContent.val();
 
    if (message != '') {
      pubnub.publish({
        channel: 'chat',
        message: {
          username: 'test',
          text: message
        }
      });
 
      messageContent.val("");
    }
  });
 
  // Also send a message when the user hits the enter button in the text area.
  messageContent.bind('keydown', function (event) {
    if((event.keyCode || event.charCode) !== 13) return true;
    sendMessageButton.click();
    return false;
  });
 
  // Subscribe to messages coming in from the channel.
  pubnub.subscribe({
    channel: 'chat',
    message: handleMessage
  });
});









