$(document).ready(function() {

  var notes = load("mynotes");
  if (notes) {

    $.each(notes, function() {
      $('<li class="col-md-4 col-md-offset-4 col-xs-12">')
          .text(this)
          .appendTo('#notecontainer>ul')
    });
    $('section').animate({scrollTop : $(window).height()}, 900);
  }

  $('#search').focus(function() {
    $(this).keypress(function(e) {
      if (e.keyCode === 13) {
        if ($('textarea#search').val().trim().length > 1) {
          console.log("you pressed enter")

              var val = $('textarea#search').val().trim();
          console.log(val)

          $('<li class="col-md-4 col-md-offset-4 col">')
              .text(val)
              .appendTo('section#notecontainer>ul');
          notes = query();
          save('mynotes', notes, true);
          $('html,section').animate({scrollTop : $(document).height()}, 1100);
          console.log(localStorage);
            $('#search').val(null);

        } else {
          $('#search').attr('placeholder','Please input values before pressing enter')
          console.warn("please input value");
        }
      } else {
        $('span').toggle().fadeIn(1000);
        console.log($('#search').val().trim().length);
      }
    })
  })

      function
      query() {

        return $.map($('section#notecontainer>ul:first-of-type').children(),
                     function(li) { return $(li).text(); });
      };
  function load(key) {

    var loaded;

    checkForStorage(function() {

      if (localStorage[key]) {
        loaded = JSON.parse(localStorage[key]);
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
  $('#clear').click(function() {
    localStorage.clear();
    location.reload();

  })
})
    // var result = $('#search').val();
    // console.log(result);
    // $('#search').val('');
    //
    // })
    // });
