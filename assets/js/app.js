var vID = ""
var Artist =""
    $(".btn").on('click', function(){ 
    var searchstring = $(".searchField");
    searchstring.focus();
    Artist = searchstring.val().trim()
    alert(Artist);
        getArtistTrack(Artist);
        youtubeApiCall(Artist);
    // Prevents moving to the next page
    return false;
});
  function getArtistTrack(Artist){
    // Run an initial search to identify the artist unique Spotify ID
    var queryURL = "https://api.spotify.com/v1/search?q=" + Artist + "&type=artist";
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
      // Prints the entire object to console
      console.log(response);
      // Prints the Artist ID from the Spotify Object to console.
      var artistID = response.artists.items[0].id;
      // Then we build a SECOND URL to query another Spotify endpoint (this one for the tracks)
      var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID +"/top-tracks?country=US";
      // We then run a second AJAX call to get the tracks associated with that Spotify ID
      $.ajax({url: queryURLTracks, method: 'GET'}).done(function(trackResponse) {
        // Gets the tracks
        console.log(trackResponse);
        // Builds a Spotify player playing the top song associated with the artist. (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
        var player = '<iframe src="https://embed.spotify.com/?uri=spotify:track:'+trackResponse.tracks[0].id+'" frameborder="0" allowtransparency="true"></iframe>';
        // Appends the new player into the HTML
                $("#playerDiv").append(player)
      })
    });   
  }
function youtubeApiCall(Artist){
     var query2URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+Artist+"&key=AIzaSyAurral5cdWfGOJ5XDuC5ywpIubfM7eQPo";
    $.ajax({url: query2URL, method: 'GET'}).done(function(response2){
      // Prints the entire object to console
      console.log(response2);
      // Prints the Artist ID from Youtube to console.
    vID = response2.items[0].id.videoId
    //sets id from most popular video with that artists name in Youtube
    console.log(vID)
    var vid = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+vID+'" frameborder="0" allowfullscreen></iframe>'
    $('#youtube').append(vid)
    //displays said video in youtube
       return false;
       })


 } 

    
    
        return false;

});