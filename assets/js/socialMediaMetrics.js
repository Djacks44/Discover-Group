console.log("you are here");

var apiKey = "c6bc89ccd447451cf6f0774c1e1aee23";
var queryURL = '';
var artistID = '';
var artistURI = '';
var Artist = '';
var vID = '';

function getArtistID(Artist) {
   // Run an initial search to identify the artist unique Spotify ID
   artistURI = encodeURI(Artist);
   console.log(artistURI);
      queryURL = "https://api.musicgraph.com/api/v2/artist/search?api_key=" + apiKey + "&name=" + artistURI;
        console.log("queryURL " + queryURL);
    $('#socialMediaBody').empty();
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
        console.log(response);
      artistID = response.data[0].id;
      queryURL = "https://api.musicgraph.com/api/v2/artist/" + artistID + "/metrics?api_key=" + apiKey;

      $.ajax({url: queryURL, method: 'GET'}).done(function(metricsResponse) {
        console.log(metricsResponse);
        // get twitter metrics
        var twitFols = metricsResponse.data.twitter.followers.data.value;
        var twitFolsStr = numeral(twitFols).format('0,0');
        var twitTwts = metricsResponse.data.twitter.tweets.data.value;
        var twitTwtsStr = numeral(twitTwts).format('0,0');
        var twitURL = metricsResponse.data.twitter.url;

        if (!metricsResponse.data.twitter.hasOwnProperty('url')) {
            var aTag = '<p>Twitter</p>' 
        } else {
            var aTag = '<a href=' + '"' + twitURL + '" ' + 'target="_blank">Twitter</a>' 
        }      

          $("#socialMediaTable > tbody").append("<tr><td>" + aTag + "</td><td>" + twitFolsStr + "</td><td>" + twitTwtsStr + "</td></tr>");

        // get facebook metrics
        var fbLikes = metricsResponse.data.facebook.likes.data.value;
        var fbLikesStr = numeral(fbLikes).format('0,0');
        var fbPTAbt = metricsResponse.data.facebook.people_talking_about.data.value;
        var fbPTAbtStr = numeral(fbPTAbt).format('0,0');
        var fbURL = metricsResponse.data.facebook.url;

        if (!metricsResponse.data.facebook.hasOwnProperty('url')) {
            var aTag = '<p>Facebook</p>' 
        } else {
            var aTag = '<a href=' + '"' + fbURL + '" ' + 'target="_blank">Facebook</a>' 
        }      

           $("#socialMediaTable > tbody").append("<tr><td>" + aTag + "</td><td>" + fbLikesStr + "</td><td>" + fbPTAbtStr + "</td></tr>");

        // get instagram metrics
        var instFolrs = metricsResponse.data.instagram.followers.data.value;
        var instFolrsStr = numeral(instFolrs).format('0,0');
        var instPosts = metricsResponse.data.instagram.media_count.data.value;
        var instPostsStr = numeral(instPosts).format('0,0');
        var instURL = metricsResponse.data.instagram.url;
        console.log('instURL= ' + metricsResponse.data.instagram.hasOwnProperty('url'));

        if (!metricsResponse.data.instagram.hasOwnProperty('url')) {
            var aTag = '<p>Instagram</p>' 
        } else {
            var aTag = '<a href=' + '"' + instURL + '" ' + 'target="_blank">Instagram</a>' 
        }      
        
        $("#socialMediaTable > tbody").append("<tr><td>" + aTag + "</td><td>" + instFolrsStr + "</td><td>" + instPostsStr + "</td></tr>");

        // get lastfm metrics
        var lastPlayCnt = metricsResponse.data.lastfm.playcount.data.value;
        var lastPlayCntStr = numeral(lastPlayCnt).format('0,0');
        var lastListrs = metricsResponse.data.lastfm.listeners.data.value;
        var lastListrsStr = numeral(lastListrs).format('0,0');
        var lastURL = metricsResponse.data.lastfm.url;

        if (!metricsResponse.data.lastfm.hasOwnProperty('url')) {
            var aTag = '<p>lastFM</p>' 
        } else {
            var aTag = '<a href=' + '"' + fbURL + '" ' + 'target="_blank">lastFM</a>' 
        }      

           $("#socialMediaTable > tbody").append("<tr><td>" + aTag + "</td><td>" + lastPlayCntStr + "</td><td>" + lastListrsStr + "</td></tr>");

        // get vevo metrics
        console.log('vevo');
        console.log(metricsResponse.data.hasOwnProperty('vevo'));
        var vevoViewsTot = metricsResponse.data.vevo.viewsTotal.data.value;
        var vevoViewsTotStr = numeral(vevoViewsTot).format('0,0');
        var vevoViewsMth = metricsResponse.data.vevo.viewsLastMonth.data.value;
        var vevoViewsMthStr = numeral(vevoViewsMth).format('0,0');
        var vevoURL = metricsResponse.data.vevo.url;

        if (!metricsResponse.data.vevo.hasOwnProperty('url')) {
            var aTag = '<p>Vevo</p>' 
        } else {
            var aTag = '<a href=' + '"' + vevoURL + '" ' + 'target="_blank">Vevo</a>' 
        }      

        $("#socialMediaTable > tbody").append("<tr><td>" + aTag + "</td><td>" + vevoViewsTotStr + "</td><td>" + vevoViewsMthStr + "</td></tr>");

        // get spotify metrics
        var spotFols = metricsResponse.data.spotify.followers.data.value;
        var spotFolsStr = numeral(spotFols).format('0,0');
        var spotPop = metricsResponse.data.spotify.popularity.data.value;
        var spotPopStr = numeral(spotPop).format('0,0');
        var spotURL = metricsResponse.data.spotify.url;

        if (!metricsResponse.data.spotify.hasOwnProperty('url')) {
            var aTag = '<p>Spotify</p>' 
        } else {
            var aTag = '<a href=' + '"' + spotURL + '" ' + 'target="_blank">Spotify</a>' 
        }      

        $("#socialMediaTable > tbody").append("<tr><td>" + aTag + "</td><td>" + spotFolsStr + "</td><td>" + spotPopStr + "</td></tr>");

      });
        getSimilarArtist ();
        });     
        
    }

// On Button Click for Artist Selection
$('#selectArtist').on('click', function(){
    // Grab the Artist Name
    Artist = $('#artist-input').val().trim();
    console.log(Artist);
//    alphanumeric(Artist);
// Run the Artist Player Function (Passing in the Artist as an Argument)
    getArtistID(Artist);
// <a href="javascript:;" id="show-widget">Click to see Rihanna events</a>
    $('#ticketWidget').empty();
    $('#tour-dates').empty();
    var eventTicketsText = 'click to see ' + Artist + ' events';
    var eventTickets = $('<a>');
    eventTickets.attr('href', 'javascript:;');
    eventTickets.attr('id', 'show-widget');
    eventTickets.text(eventTicketsText);
    $("#ticketWidget").append(eventTickets);
    $("#ticketWidget").css("padding-bottom", '30px');
    $("#ticketWidget").css("padding-top", '30px');


    $('#playerDiv').empty();
    getArtistTrack(Artist);
    console.log("before youtube");
    $('#youtube').empty();
    youtubeApiCall(Artist);
    console.log("after youtube");

    // Prevents moving to the next page
    return false;
});
