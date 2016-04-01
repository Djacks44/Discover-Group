function youtubeApiCall(Artist){
     var query2URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+Artist+"&key=AIzaSyAurral5cdWfGOJ5XDuC5ywpIubfM7eQPo";
    $.ajax({url: query2URL, method: 'GET'}).done(function(response2){
      // Prints the entire object to console
      console.log(response2);
    vID = response2.items[2].id.videoId
    console.log(vID)
    var vid = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+vID+'" frameborder="0" allowfullscreen></iframe>'
    $('#youtube').html(vid)
       return false;
       })


 } 