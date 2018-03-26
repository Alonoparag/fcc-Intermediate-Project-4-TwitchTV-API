const channels = ['ESL_SC2', 'FreeCodeCamp', 'summitbc', 'areox27'];
channels.forEach(function(channel) {
	$.ajax({
		url: 'https://wind-bow.glitch.me/twitch-api/streams/' + channel + '?callback=?',
		type: 'GET',
		dataType: 'json',
		success(data) {
			if(data.stream === null) {
				//GET AND SET URL, USER NAME  AND LOGO REFERENCE FOR OFFLINE CHANNELS
				$.ajax({
					url: 'https://wind-bow.glitch.me/twitch-api/channels/' + channel + '',
					type: 'GET',
					dataType: 'json',
					success(offline) {
						$('#' + offline.name + '>div.col-lg-2.logo')
							.append('<img src = "' + offline.logo + '" alt = "' + offline.name + ' logo">');
						$('#' + offline.name + '>div.col-lg-4.name')
							.append('<a href = "' + offline.url + '" class = "link" target = "_blank"><p>' + offline.display_name + '</p></a>');
					}
				});
				//SET STATUS TO 'OFFLINE'
				$('#' + channel.toLocaleLowerCase() + '>div.col-lg-4.status')
					.append('<p><em>offline</em></p>');
			}
			else {
				//ADDS LOGO
				$('#' + data.stream.channel.name + '>div.col-lg-2.logo')
					.append('<img src = "' + data.stream.channel.logo + '" alt = "' + data.stream.channel.name + ' logo">');
				//ADDS NAME AND LINK
				$('#' + data.stream.channel.name + '>div.col-lg-4.name')
					.append('<a href = "' + data.stream.channel.url + '" class = "link" target = "_blank"><p>' + data.stream.channel.display_name + '</p></a>');
				//ADDS STATUS
				$('#' + data.stream.channel.name + '>div.col-lg-4.status')
					.append('<p>' + data.stream.channel.status + '</p>');
			}
		}
	});
});
