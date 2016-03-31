$(document).on('click', '#show-widget', function() {
  console.log("in eventTickets")
//  console.log('here artist= ' + Artist);
  new BIT.Widget({ 
    "artist":Artist,
    "display_limit":"3", 
    "width":"50%",
    "force_narrow_layout":"true", 
    "div_id":"tour-dates",
    "text_color": "#000000",
    "bg_color": "#FFFFFF"
  }).insert_events();
});
