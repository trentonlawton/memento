$(document).ready(function() {
  var notearray = [];
  var notes = load("mynotes");

  var time = new Date();

  var hour = time.getHours()
  console.log(hour);
  function nightmode() {
    var nightmode;
    if (hour >= 0 && hour < 17) {
      $('body').css({
        'background-color' : '#fff'

      })
      $('<span id="type">.</span>').appendTo('h1')
    }

    else {
      $('body').css({
        'background-color' : '#222',

      });
      $('h1').css({'color' : '#fff'})
      $('textarea').css({'background-color' : '#222', 'color' : '#fff'})
      $('<span id="nightmode">☾</span>').appendTo('h1')
    }
  }
  nightmode();
  if (notes) {

    $.each(notes, function() {

      var notecontainer =
          $('<div class="notecontainer">').appendTo('section#notecontainer>ul');
      var newnote = $('<li class="note col-md-4 col-md-offset-4 col">')
                        .text(this)
                        .appendTo(notecontainer);
      $('<button id="delete">⊗</button>').prependTo(notecontainer);
      clickdelete(notecontainer);
    });
    $('section').animate({scrollTop : $(window).height()}, 900);
  }

  $('#search').focus(function() {
    $(this).keypress(function(e) {
      if (e.keyCode === 13) {
        if ($('textarea#search').val().trim().length > 1) {
          console.log("you pressed enter")

              var val = $('textarea#search').val().trim();
          console.log(val);
          notearray.push(val)
          save('mynotes', notearray, true);
          var notecontainer = $('<div class="notecontainer">')
                                  .appendTo('section#notecontainer>ul');
          var newnote = $('<li class="note col-md-4 col-md-offset-4 col">')
                            .text(val)
                            .appendTo(notecontainer);
          $('<button id="delete">⊗</button>').prependTo(notecontainer);

          $('html,section').animate({scrollTop : $(document).height()}, 1100);
          console.log(localStorage);
          $('#search').val(null);
          clickdelete(notecontainer)
        } else {
          $('#search').attr('placeholder',
                            'Please input values before pressing enter')
          console.warn("please input value");
        }
      } else {
        $('#type').toggle().fadeIn(1000);
        console.log($('#search').val().trim().length);
      };

    });
  });

  function load(key) {

    var loaded;

    checkForStorage(function() {

      if (localStorage[key]) {

        loaded = JSON.parse(localStorage[key]);

        console.log(loaded);
        notearray = loaded;
        console.log(notearray);

      } else if (sessionStorage[key]) {

        loaded = JSON.parse(sessionStorage[key]);

      } else {
        console.warn("no storage data found for" + [ key ]);
      }
    });
    return loaded;
  }

  function save(key, obj, perm) {
    checkForStorage(function() {

      window[(perm) ? "localStorage" : "sessionStorage"][key] =
          JSON.stringify(obj);

    })
  }
  function checkForStorage(fn) {

    if (localStorage && sessionStorage) {

      fn();
    } else {

      throw new Error(
          'It appears as though this is either your first time here or you cleared. Welcome to memento i.O  v0.2');
    }
  }

  function deletenote(obj) {
    var x = notearray.indexOf(obj);
    notearray.splice(x, 1);
    console.log(notearray);
  }

  function clickdelete(click) {
    $(click).click(function() {

      $(this).children('button').slideToggle('slow').click(function() {

        var val = $(this).children('li').text();
        deletenote(val);

        save('mynotes', notearray, true);
        $(this).parent().animate({left : 3000}, 2000);

      });

    });
  };
});

// var result = $('#search').val();
// console.log(result);
// $('#search').val('');
//
// })
// });
