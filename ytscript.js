

//===============ajax query=============
var VId = [];
var vidCount =0;
var vidLoad=0;
var totalVidsPerPage =6;


//========================video player==============================
var player;
function onYouTubeIframeAPIReady() {
	
  player =new YT.Player('player'+vidLoad, {
    videoId: VId[vidLoad++],
    height: 300,
    width: 400,
	events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          },
    playerVars: {
      autoplay: 0,
      controls: 0
    }
  });
}

function onPlayerReady(event) {
        //event.target.playVideo();
      }
	
	
function stopVideo() {
	player.stopVideo();
	}
 var done = false;
 
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	}
}

function handleServerFeed(data,status)
{
	parsedData = JSON.parse(data);
	
	for(var i=0;i<totalVidsPerPage;i++)
	{
		var argument = 'VId[vidCount++] = parsedData.videoID'+i;
		eval(argument);
		
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
}

	
$.get('http://127.0.0.1:8800/test','/test', handleServerFeed);

//===========================video highlighting========================
var selectedVideo=0;
var videoPlayers = document.getElementsByClassName('player');
videoPlayers[selectedVideo].style.borderColor = "red";

function highlightNextPlayer(){
	videoPlayers[selectedVideo].style.borderColor = "black";
	selectedVideo = (selectedVideo+1)% totalVidsPerPage;
	videoPlayers[selectedVideo].style.borderColor = "red";
}
function highlightPrevPlayer(){
	videoPlayers[selectedVideo].style.borderColor = "black";
	selectedVideo = (selectedVideo+totalVidsPerPage-1)% totalVidsPerPage;
	videoPlayers[selectedVideo].style.borderColor = "red";
}

//event handlers
document.onkeydown = function(e)
{
	if(e.keyCode == 37)//left arrow
	{
		highlightPrevPlayer();
		
	}
	if(e.keyCode == 39)//right arrow
	{
		highlightNextPlayer();
	}
	if(e.keyCode == 13)// enter key
	{
		
	}
}