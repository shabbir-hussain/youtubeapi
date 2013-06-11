

//===============ajax query=============
var VId = '';


//========================video player==============================
var player;
function onYouTubeIframeAPIReady() {
	
  player =new YT.Player('player', {
    videoId: VId,
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
	VId = parsedData.videoID;
	
	
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

	
$.get('http://127.0.0.1:8800/test','/test', handleServerFeed);
