(function() {
 // Deklaracje zmiennych
 // contener, button ktorego uzywamy, poczatkowa pozycja
 var $container = $('.users-list ul'),
     $btn = $('.users-load'),
     position = 135;

 // Pobranie userow i zwrocenie requesta, jako parametr funkcja przyjmuje aktualna pozycje
 function getUsers(position) {
   return $.ajax({url: 'https://api.github.com/users?since=' + position});
 }
 // Funkcja renderowania userow, jako parametr przyjmuje liste userow
 function renderUsers(users) {
   users.forEach(function(user) {
     $container.append('<li class="list-group-item"><p>' + user.login + 
     '</p><span class="badge details">Details</span><div><img src=' + user.avatar_url +
     '</div><a href="'+user.html_url+'"class="btn btn-primary">Go to Github profile</a></li>')
   });
 }
 // Pobranie userow a nastepnie wyswietlenie ich
 function renderNextUsers() {
   // Wykonanie requestu
   getUsers(position)
     // W momencie kiedy request jest successem wykonuje sie funkcja wewnatrz .then()
     .then(function (response) {
       // Wyrenderowanie userow - przekazujemy parametr response, ktory wiemy z dokumentacji,
       // ze jest tablica userow
       renderUsers(response);
     });
   // Zmiana pozycji na ktorej jestesmy
   position = position + 30;
 };

renderNextUsers();

function removeChild() {
  $container.children().remove()
}
 // Na event 'click', wykonanie funkcji ktora pobierze i wyrenderuje userow
 $btn.on('click', function () {
   renderNextUsers();
   removeChild();
 });

 var row = $('.list-group-item p');
 var input = $('.form-control');

 $container.on('click', '.details', function () {
   $(this).parent().find('div').slideToggle(1500);
 });

 input.on('keyup', function () {
    var wprowdzane = input.val();
    row.each(function () {
      if ($(this).text().indexOf(wprowdzane, 0) == -1) {
        $(this).hide();
      }
      else {
        $(this).show();
      }
    });
  });

})();