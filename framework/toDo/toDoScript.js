var last, diff;

$(document).ready(function () {
    $('input').focus(function () {
        $(this).css('outline-color', '#893168');
    });
    $('#button').click(function () {
        var toAdd = $('input[name=checkListItem]').val();
        $('.list').append('<div class="item"><li>' + toAdd + '</li></div>');
        $('.list').append( new Date());
    });
    $(document).on('dblclick', '.item', function () {
        $(this).remove();
    });
    $(document).on('click', '.item', function () {
        $(this).css("background-color", "#228b22");
        $(this).css("margin-left", "325px");
    });
    $('.item').click(function () {
        (this).removeClass('.item');
        (this).addClass('.done');
    });
    $('.pull-me').click(function () {
        $('.panel').slideToggle('slow');
    });
});