// Theme toggle (remembered in this browser) and page filters/search.
(function () {
  var root = document.documentElement;
  try { var saved = localStorage.getItem('theme'); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}
  var t = document.getElementById('theme-toggle');
  if (t) t.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  var chips = document.querySelectorAll('.chip[data-filter]');
  var items = document.querySelectorAll('[data-cat]');
  var search = document.querySelector('.search');
  var current = 'all';
  function apply() {
    var q = search ? search.value.trim().toLowerCase() : '';
    items.forEach(function (el) {
      var okCat = current === 'all' || el.getAttribute('data-cat').split('|').indexOf(current) > -1;
      var okText = !q || el.textContent.toLowerCase().indexOf(q) > -1;
      el.hidden = !(okCat && okText);
    });
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      current = c.getAttribute('data-filter');
      chips.forEach(function (o) { o.setAttribute('aria-pressed', o === c ? 'true' : 'false'); });
      apply();
    });
  });
  if (search) search.addEventListener('input', apply);
})();
