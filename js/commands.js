$(document).ready(function() {
  $('.btn').click(function() {
    initGame();
    console.log('init');
  });

  $('.level').text;

  $('.score').text(score);
  function foundMatchingBlocks(event, params) {
    params.elements.remove();
    score += 100;
    $('.score').text(score);
  }
});
