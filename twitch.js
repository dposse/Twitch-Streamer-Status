// streamers that we will be checking through twitch API - change as necessary
var streamers = ["brunofin",
				 "onenationofgamers",
				 "riotgames",
				 "freecodecamp",
				 "storbeck",
				 "terakilobyte",
				 "habathcx",
				 "RobotCaleb",
				 "thomasballinger",
				 "noobs2ninjas",
				 "beohoff",
				 "TSM_Dyrus"];

// function that calls getJSON on given channel name
function getStreamInformation(streamName) {
	$.getJSON("https://api.twitch.tv/kraken/streams/" + streamName + "?callback=?", function(data) {
		parseData(data, streamName);
	}); // close getJSON()
} // close getStreamInformation()

// function that uses data from API call to edit html
function parseData(data, name) {
	// check if channel exists
	if (data.error) {
		$("#offline-streamers").append("<li><a target='_blank' href='https://www.twitch.tv/" + name + "'>" + name + "</a> is offline; account closed</li>");
	} // close if

	// check if channel is streaming
	else if (data.stream === null) {
		$("#offline-streamers").append("<li><a target='_blank' href='https://www.twitch.tv/" + name + "'>" + name + "</a> is offline</li>");
	} // close else if

	// channel exists and is streaming
	else {
		$("#online-streamers").append("<li>" +
										"<img src='" + data.stream.channel.logo + "'>" +
										"<h4><a target='_blank' href='https://www.twitch.tv/" + name + "'>" + name + "</a> playing " + data.stream.game + "</h4>" +
										"<p>" + data.stream.viewers + " viewers are watching " + data.stream.channel.status + "</p>" +
									  "</li>"); // close append
	} // close else
} // close parseData()

// iterate through streamers array
for (var streamer in streamers) {
	getStreamInformation(streamers[streamer]);
}