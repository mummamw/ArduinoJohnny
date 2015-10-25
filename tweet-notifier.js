var five = require("johnny-five"),
  twitter = require('ntwitter'),
  board, lcd, mentions = 0;

board = new five.Board();

board.on("ready", function() {

  // lcd = new five.LCD({
  //   pins: [ 8, 9, 10, 11, 12, 13 ],
  // });

  lcd.on("ready", function() {
    lcd.print("  @varunkumar");
    displayMentionsCount();
  });

  this.repl.inject({
    lcd: lcd,
    incrementMention: function() {
      mentions++;
      displayMentionsCount();
    },
    markAllAsRead : function() {
      mentions = 0;
      displayMentionsCount();
    }
  });

});

function displayMentionsCount() {
  lcd.setCursor(0, 1);
  var msg = "";
  if (mentions == 0) {
    lcd.print("I am what I am!");
  } else if (mentions == 1) {
    lcd.print("1 new mention!");
  } else {
    lcd.print("" + mentions + " new mentions!");
  }
}

var twit = new twitter({
  consumer_key: '******',
  consumer_secret: '******',
  access_token_key: '******',
  access_token_secret: '******'
});

twit.stream('statuses/filter', {track:'varunkumar'}, function(stream) {
  stream.on('data', function (data) {
    incrementMention();
  });

  stream.on('end', function (response) {});
  stream.on('destroy', function (response) {});
});
