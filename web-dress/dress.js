var scrollingImage = document.getElementById('scrollingImage');

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;
  scrollingImage.style.transform = 'translateY(' + scrollPosition * 0.5+ 'px)';
});
