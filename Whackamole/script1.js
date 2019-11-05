      // Whack a Mole JS

      var holes;
      var moles;
      var scoreBoard;
      console.log(holes);
      var lastHole;
      var score = 0;
      var timeUp = true;
      var audio = new Audio('smash.mp3')
      
      

      function loadGame() {
        holes = document.querySelectorAll('.hole');
        moles = document.querySelectorAll('.mole')
       scoreBoard = document.querySelectorAll('.score');
       moles.forEach(mole => mole.addEventListener('click', dreun)); //listen for click of moles
      }

      //   var holeId = ['1','2','3','4','5','6','7','8','9'];
      //   console.log(clothing.length);
      // expected output: 4


      function randomTime(min, max) { // Returnt een willekeurige tijdsduur. Math.floor rond af.
        return Math.floor(Math.random() * (max - min) + min);
      }
      //RANDOM HOLE MET LERAAR BESPREKEN

      function randomHole(holes) { //Kiest een willekeurig gat voor de mol om uit te komen.
        //console.log(holes.length);
        var idx = Math.floor(Math.random() * holes.length); //vind random
        var hole = holes[idx];
        /* if (hole === lastHole) { // Zorgt ervoor dat een mol niet twee keer uit hetzelfde gat komt.
          console.log('Doe maar niet, dat is hetzelfde gat.');
          return randomHole(holes);
        }*/
        //console.log(hole);
        lastHole = hole;
        return hole;
      }

      function kiekeboe() { // Willekeurig een tijdsduur en gat kiezen, de mol omhoog en omlaag laten komen.
        var time = randomTime(500, 2000);
        var hole = randomHole(holes);
        //console.log(time, hole);
        hole.classList.add('up');
        setTimeout(() => {
         hole.classList.remove('up');
          if (!timeUp) kiekeboe();
        }, time);
      }

      function startGame() {
        scoreBoard[0].innerHTML = 0;
        timeUp = false;
        score = 0;
        kiekeboe();
        setTimeout(() => timeUp = true, 30000); //run setTimeout na 30 seconden
      }

      function dreun(e) { // Bij slag: Mol gaat omlaag, score omhoog.
        console.log(e.target.parentNode);
        var mole = e.target; //Functie werkte voorheen niet omlaag omdat ik de hole de .up class gaf en naar this.classlist.remove vewees. Nu target ik de parentnode van de class waar ik op klik, waardoor de mol verdwijnt als je erop klikt.
        var hole = mole.parentNode;
        score++;
        //this.classList.remove('up'); // Werkt niet
        //e.srcElement.classList.remove('up');
        hole.classList.remove('up');
        scoreBoard[0].innerHTML = score;
        audio.play();
      }