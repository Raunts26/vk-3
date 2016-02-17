(function(){
  "use strict";

  var Moosipurk = function() {

    // SINGLETON PATTERN
    if(Moosipurk.instance) {
      return Moosipurk.instance;
    }

    Moosipurk.instance = this; // this viitab moosipurgile

    this.routes = Moosipurk.routes;

    console.log(this);
    //console.log('moosipurgi sees');
    //Kõik muutujad, mis on üldised ja muudetavad
    this.currentRoute = null; // Hoian meeles, mis lehel olen
    this.interval = null;

    // Panen rakenduse tööle
    this.init();
    };

    // Kirjeldatud kõik lehed
    Moosipurk.routes = {
      "home-view": {
        render: function() {
          //Käivitan siis kui jõuan lehele
          console.log('JS avalehel');

          var seconds = 0;

          if(this.interval) {
            clearInterval(this.interval);
          }

          this.interval = window.setInterval(function() {
            seconds++;
            document.getElementById('counter').innerHTML = seconds;

          }, 1000);

          // Kui jõuan avalehele, käivitub timer, mis hakkab trükkima kulunud sekundeid
          // divi sisse #counter
          // hakkab 0st


        }
      },
      "list-view": {
        render: function() {
          console.log('JS loend');
        }
      },
      "manage-view": {
        render: function() {
          console.log('JS haldus');
        }
      }
    };

    //Kõik moosipurgi fn tulevad siia sisse
    Moosipurk.prototype = {
      init: function() {
        console.log('Rakendus OK');
        //Siia tuleb esialgne loogika

        //Vaatan, mis lehel olen, kui ei ole hashi lisan avalehe

        window.addEventListener('hashchange', this.routeChange.bind(this));

        console.log(window.location.hash);
        if(!window.location.hash) {
          window.location.hash = '#home-view';
        } else {
          //hash oli, käivitan routeChange function
          this.routeChange();
        }

        //Hakka kuulama hiireklõpse
        this.bindMouseEvents();
      },
      bindMouseEvents: function() {
        document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this));
      },
      addNewClick: function(event) {
        //Lisa uus purk
        var title = document.querySelector('.title').value;
        var ingredients = document.querySelector('.ingredients').value;
        console.log(title + ' ' + ingredients);
        var new_jar = new Jar(title, ingredients);
        document.querySelector("#list-view").innerHTML += new_jar.createHtmlElement();
      },
      routeChange: function(event) {
        this.currentRoute = window.location.hash.slice(1);

        // kas leht on olemas
        if(this.routes[this.currentRoute]) {

          this.updateMenu();

          console.log('>>> ' + this.currentRoute);
          //Käivitan selle lehe jaoks ettenähtud js
          this.routes[this.currentRoute].render();
        } else {
          // 404
          console.log("404");
          window.location.hash = "#home-view";
        }
      },
      updateMenu: function() {
        // Kui on mingil menüül klass active-menu siis võtame ära
        document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', "");

        // Käesolevale lehele lisan juurde
        document.querySelector('.' + this.currentRoute).className += " active-menu";


      }



    };

    var Jar = function(title, ingredients) {
      this.title = title;
      this.ingredients = ingredients;
    };

    Jar.prototype = {
      createHtmlElement: function() {
        // Anda tagasi ilus html
        return this.title + "<br>";
      }
    };

    window.onload = function() {
      var app = new Moosipurk();

    };



}) ();
