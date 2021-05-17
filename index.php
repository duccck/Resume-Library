<?php
	session_start();
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset='UTF-8'>
		<meta name='description' content='Resumes Library'>
		<meta name='keywords' content='resume'>
		<meta name='author' content='Allen Ng'>
		<meta name='viewport' content='width=device-width,initial-scale=1.0'>
		<title>Resumes Library</title>
		<link rel='icon' type='image/x-icon' href='icon/favicon.ico'>
		<link rel='stylesheet' type='text/css' href='index.css'>
		<link rel='stylesheet' type='text/css' href='fontawesome/css/all.css'>
		<script src='jquery-3.5.1.min.js'></script>
		<script src='index.js'></script>
	</head>

	<body>
		<div class='header'>
			<!-- logo and navbar -->
			<div class='navbar'>
				<div class='logo'>
					<div class='icon' style='padding-right: 0.5em;'>
						<a href='http://localhost' target='_self'><img src='icon/logo.svg'></a>
					</div>
					<div style='text-align: left;'>
						<h1><a href='http://localhost' target='_self'>Resumes</a><h1>
						<h3 style='font-size: 1.8em; font-weight: normal;'><a href='http://localhost' target='_self'>Library</a><h3>
					</div>
				</div>
				<ul>
					<li id='login'>Log in</li
					><li id='sign-up' style='background-color: #73082f;'>Sign up</li>
				</ul>
			</div>

			<!-- form: login and sign up -->
			<div class='login'>
				<!-- <div class='user_icon'>
					<p></p>
					<p style='width: 3em; padding: 3em; margin-bottom: -3.5em'></p>
				</div> -->
				<form id='login-form'>
					<div>
						<input type='text' name='username' placeholder='Username'>
						<i class="far fa-times-circle"></i>
						<p></p>
					</div>
					<div>
						<input type='password' name='password' placeholder='Password'>
						<i class="far fa-times-circle"></i>
						<p id='login-error'>Invalid username or email</p>
					</div>
					<button id='login-button' type='submit' style='opacity: 0.5;' disabled>Log in</button>
				</form>
				<p class='fold-icon'><i class="fas fa-chevron-up"></i></p>
			</div>
			<div class='sign-up' style='padding-top: 3em;'>
				<!-- <div class='user_icon'>
					<p></p>
					<p style='width: 3em; padding: 3em; margin-bottom: -3.5em'></p>
				</div> -->
				<form id='sign-up-form'>
					<div>
						<input id='username' type='text' name='username' placeholder='Username'>
						<i class="far fa-times-circle"></i>
						<p>Only contains letters, numbers and _ (maximum 16 charactors)</p>
					</div>
					<div>
						<input id='email' type='text' name='email' placeholder='E-mail'>
						<i class="far fa-times-circle"></i>
						<p>example@example.example (maximum 32 characters)</p>
					</div>
					<div>
						<input id='password' type='password' name='password' placeholder='Password'>
						<i class="far fa-times-circle"></i>
						<p>At least one letter, one number and one special character (6-32 characters)</p>
					</div>
					<div>
						<input id='password-confirm' type='password' name='password' placeholder='Confirm password'>
						<i class="far fa-times-circle"></i>
						<p>Two inputs must be consistent</p>
					</div>
					<button id='sign-up-button' type='submit' style='opacity: 0.5;' disabled>Sign Up</button>
				</form>
				<p class='fold-icon'><i class="fas fa-chevron-up"></i></p>
			</div>
		</div>

		<div class='main'>

		</div>

		<div class='footer'>

		</div>
		
	</body>
</html>