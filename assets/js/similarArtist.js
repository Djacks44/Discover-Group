var similarName = '';

function getSimilarArtist () {
  console.log('in getSimilarArtist')
  queryURL = "http://api.musicgraph.com/api/v2/artist/" + artistID + "/similar?api_key=" + apiKey + "&genre=Pop&limit=5";
  console.log("similar" + queryURL)
  $.ajax({url: queryURL,
   method: 'GET'
 	})
 	.done(function(responseSimilar) {
    var similarData = responseSimilar.data;
    console.log(similarData);
  for (var i = 0; i < similarData.length; i++) {
    similarName = similarData[i].name;
//	  var nameURI = encodeURI(similarData[i].name);
//      console.log(nameURI);
//     console.log(similarData[i].main_genre);
		console.log('similarName' + similarName);
    displaySimilarInfo(similarName);
  } 
 });
}

function displaySimilarInfo(similarName){
  $('#similarView').empty();
  var similarNameURI = similarName.replace(/\s+/g, "+"); 
  debugger;
  var baseURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=1&";
  var queryURL = baseURL + 'q=' + similarNameURI;
  console.log(queryURL);

  $.ajax({
    url: queryURL, 
    method: 'GET'
        })
  .done(function(gifData) {
  var results = gifData.data;
  console.log('results in');
  console.log(results);
  var similarP = $('<p>').text("Name: " + similarName);

	for (var i = 0; i < results.length; i++) {    
		var similarDiv = $('<div>');
		similarDiv.css('display', 'inline-block');
		similarDiv.css('padding', '20px');
//    var similarP = $('<p>').text("Name: " + similarName);

    var similarImage = $('<img>');
    similarImage.attr('src', results[i].images.fixed_height_still.url);
    similarImage.attr('data-state', 'still');
    similarImage.attr('data-still',results[i].images.fixed_height_still.url);
    similarImage.attr('data-animate',results[i].images.fixed_height.url);
    similarImage.addClass('similarImage');
    console.log('similarP');
    console.log(similarP );
    similarDiv.append(similarP);
    similarDiv.append(similarImage);
    $('#similarView').append(similarDiv);
  }
  });
 }

function stillAnimateGif() {
//    console.log(this);
    var state = $(this).attr('data-state'); 
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
}

 $(document).on('click', '.similarImage', stillAnimateGif);

