  function getArtistTrack(Artist){
    // Run an initial search to identify the artist unique Spotify ID
    var queryURL = "https://api.spotify.com/v1/search?q=" + Artist + "&type=artist";
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
      // Prints the entire object to console
      console.log(response);
      // Prints the Artist ID from the Spotify Object to console.
      var artistID = response.artists.items[0].id;
      var arName = response.artists.items[0].name
      var artistPic = response.artists.items[0].images[2].url
      var pic = ' <img src="'+artistPic+'">'
      console.log(pic)
      $("#picDiv").html(pic);
       $("#aName").text(arName);
      //gets a pic of the artist
      // Then we build a SECOND URL to query another Spotify endpoint (this one for the tracks)
      var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID +"/top-tracks?country=US";
      // We then run a second AJAX call to get the tracks associated with that Spotify ID
      $.ajax({url: queryURLTracks, method: 'GET'}).done(function(trackResponse) {
        // Gets the tracks
        console.log(trackResponse);
        // Builds a Spotify player playing the top song associated with the artist. (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
        var player = '<iframe src="https://embed.spotify.com/?uri=spotify:track:'+trackResponse.tracks[0].id+'" frameborder="0" allowtransparency="true"></iframe>&nbsp&nbsp&nbsp&nbsp&nbsp';
        var player1 = '<iframe src="https://embed.spotify.com/?uri=spotify:track:'+trackResponse.tracks[1].id+'" frameborder="0" allowtransparency="true"></iframe>&nbsp&nbsp&nbsp&nbsp&nbsp';
        var player2 = '<iframe src="https://embed.spotify.com/?uri=spotify:track:'+trackResponse.tracks[2].id+'" frameborder="0" allowtransparency="true"></iframe>';
        // Appends the new player into the HTML
        $("#playerDiv").append(player);
        $("#playerDiv").append(player1);
        $("#playerDiv").append(player2);
        $("#playerDiv").css("padding-bottom", '30px');
        $("#playerDiv").css("padding-top", '30px');

      })
    });   
  }
  // On Button Click for Artist Selection
//  $('#selectArtist').on('click', function(){
    // Grab the Artist Name
//    var Artist = $('#artist-input').val().trim();
    // Run the Artist Player Function (Passing in the Artist as an Argument)
//    getArtistTrack(artist);
    // Prevents moving to the next page
//    return false;
//  });