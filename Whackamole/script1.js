      // Whack a Mole JS

      var holes;
      var moles;
      var scoreBoard;
      console.log(holes);
      let lastHole;
      let score = 0;
      let timeUp;

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
        var hole = holes[idx]; //of array?
        /* if (hole === lastHole) { // Zorgt ervoor dat een mol niet twee keer uit hetzelfde gat komt.
          console.log('Doe maar niet, dat is hetzelfde gat.');
          return randomHole(holes);
        }*/
        console.log(hole);
        lastHole = hole;
        return hole;
      }

      function kiekeboe() { // Willekeurig een tijdsduur en gat kiezen, de mol omhoog en omlaag laten komen.
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        console.log(time, hole);
        hole.classList.add('up');
        setTimeout(() => {
          hole.classList.remove('up');
          if (timeUp) kiekeboe();
        }, time);
      }

      function startGame() {
        scoreBoard[0].textContent = 0;
        timeUp = false;
        score = 0;
        kiekeboe();
        setTimeout(() => timeUp = true, 10000);
      }

      function dreun(e) { // Bij slag: Mol omlaag, score omhoog.
        console.log(e);
        score++;
       // console.log(score);
        this.classList.remove('up');
        //scoreBoard.textContent = score;
        scoreBoard[0].innerHTML = score;
      }
