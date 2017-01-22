$(document).ready(function () {



    $( '.dropdown').click(
        function(){
            $(this).children('.dropdown-content').slideToggle();
        }
    );
    $('.mute').click(
        function(){
            
        }
    );
    $('input').focus(function () {
        $(this).css('outline-color', '#893168');
    });
    $('ul li').click(function () {
        $(this).css("color", "#008000"); 
    });
    $(document).on('dblclick', 'ul li', function() {
        $(this).css("color", "#ff0000");
    });
    $('.drive').click(function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/warnings.html', true);
        xhr.responseType = 'document';
        xhr.onload = function(e) {
          var doc = e.target.response;

          var container = document.querySelector('ol');
          container.innerHTML = ''; // clear out.

          var warn = doc.querySelector('body');

          container.appendChild(warn);
        };
        xhr.send();
    });
    $('.arm').click(function() {
        var xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'http://localhost:8080/mission-control-2016/Captain/autonomous.html', true);
        xhr2.responseType = 'document';
        xhr2.onload = function(e) {
          var doc2 = e.target.response;

          var container = document.querySelector('ol');
          container.innerHTML = ' ';

          var bod = doc2.querySelector('body');
          container.appendChild(bod);
        };
        xhr2.send();
    });
});