function refresh_display(){

	update_user_info(Cookies.get('token'));

	if (Cookies.get('token') == null){
		$('.logged_in_display').hide();
		$('.logged_out_display').show();
	}else{
		$('.logged_in_display').show();
		$('.logged_out_display').hide();		
	}

}

function clean_user_outputs_inputs(){
	$('.text_entry').val("");
	$('.reject_text').text("");
}	

function update_posts(){

	$('#post_table').html( '<tr><th>Username</th><th>Message</th><th>Creation Date</th></tr>' ); 

    $.ajax({
		method: "GET",
		url: "/posts/all",
		success: function(data) {
			for(var i = 0; i < data.length; i++){
				var new_row = ''; 
				new_row += '<tr>';
				new_row += '<td>' + data[i].created_by + '</td>';
				new_row += '<td>' + data[i].text + '</td>';
				new_row += '<td>' + data[i].creation_time + '</td>';
				new_row += '</tr>';
				$('#post_table').html( $('#post_table').html() + new_row );
			}

			if((user_info != null)&&(user_info!="")){
				var submit_row = '';
				submit_row += '<tr>'
				submit_row += '<td>' + user_info + '</td>';
				submit_row += '<td><input id="new_post_text" class="text_entry" type="text"></td>'; 
				submit_row += '<td><button id="create_post" class="logged_in_display">Create Post</button></td>';
				submit_row += '</tr>';
			}

			$('#post_table').html( $('#post_table').html() + submit_row );

		}
    });

}

function update_user_info(token){
    $.ajax({
		method: "GET",
		url: "/users/" + token,
		success: function(data) {
			if(data == null){
				//if token is bad, log user out
				Cookies.remove('token');
				refresh_display();
			}else{
				user_info = data;
				$('#user_display').text('Hello, ' + user_info);
			}	
			update_posts();
		}
    });
}


var user_info = ""; //this will be filled with user's data from db

$(document).ready(function() {
	refresh_display();
	clean_user_outputs_inputs();
});

//Universal Popup Close 
$('.popupCloseButton').click(function(){
	$('.hover_bkgr_fricc').hide();
	clean_user_outputs_inputs();
});

//Create User Popup
$("#new_user").click(function(){
	$('.hover_bkgr_fricc').hide(); //Hiding any open popups
	$('#new_user_popup').show();
	clean_user_outputs_inputs();
});

//New User Submission
$("#new_user_submit").click(function(){

    $.ajax({
		method: "POST",
		url: "/users/create/",
		data: { username: $('#new_user_username').val(), password: $('#new_user_password').val(), user_creation:"1" },
		success: function(data) {

			if(data.substring(0,1) == '~'){
				$('.reject_text').text(data.substring(1));
			}else{
				Cookies.set('token', data, { expires: 1 });
				$('#new_user_popup').hide();
				refresh_display();
				clean_user_outputs_inputs();
			}

		}
    });

});

//Login Popup
$("#login").click(function(){
	$('.hover_bkgr_fricc').hide(); //Hiding any open popups
	$('#login_popup').show();
	clean_user_outputs_inputs();
});


$('.popupCloseButton').click(function(){
	$('#login_popup').hide();
	clean_user_outputs_inputs();
});

//Login Submission
$(document).on('click', '#login_submit', function() {
    $.ajax({
		method: "POST",
		url: "/users/create/",
		data: { username: $('#login_username').val(), password: $('#login_password').val(), user_creation:"0" },
		success: function(data) {

			if(data.substring(0,1) == '~'){
				$('.reject_text').text(data.substring(1));
			}else{
				Cookies.set('token', data, { expires: 1 });
				$('#login_popup').hide();
				refresh_display();
				clean_user_outputs_inputs();
			}

		}
    });

});


$(document).on('click', '#create_post', function() {
    $.ajax({
		method: "POST",
		url: "/posts/create/",
		data: { text: $('#new_post_text').val(), token: Cookies.get('token') },
		success: function(data) {

			refresh_display();
			clean_user_outputs_inputs();

		}
    });

});

//Logout Button
$(document).on('click', '#logout', function() {	Cookies.remove('token');
	refresh_display();
});