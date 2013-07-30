// Lancement de l'application au chargement complet
window.addEventListener('load', function () {
    // On récupère l'objet canvas
    var elem = document.getElementById('main');
    var ctx = elem.getContext('2d');

    //compteur
    var cpt = 0;

    // variable temps
    var date = Math.round(new Date().getTime()/1000);
    var newdate = Math.round(new Date().getTime()/1000);

    // chargement image
    var terre = new Image();
    terre.src = "img/sprite_terre.png";

    var tonneau = new Image();
    tonneau.src = "img/sprite_tonneau.png";
    var tonneauX=-25;
    var tonneauY=325;
    var tonneauEtat=11;
    var stoptonneau = false;
    var vitesseTonneau = 1;

    var perso = new Image();
    perso.src = "img/sprite_perso.png";
    var persoX = 400;
    var persoY = 320;
    var sprite_persoX = 0;
    var persoL = false;
    var persoU = false;
    var persoR = false;
    var persoD = false;
    var persoTombe = false;
    var stopGame = false;

    var collision = false;
    var etat_sol = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var score = 0;

    window.onkeydown = function(e){
        switch  (e.keyCode){
            // A gauche toute !
            case 37:
                persoL = true;
                break;
            // On saute !
            case 38:
                sprite_persoX=0;
                persoU = true;
                break;
            // A droite toute !
            case 39:
                persoR = true;
                break;
            // on s'acroupie !
            case 40:
                persoD = true;
                sprite_persoX=150;
                break;
        }
    }

    window.onkeyup = function(e){
        switch  (e.keyCode){
            // A gauche toute !
            case 37:
                persoL = false;
                break;
            // On saute !
            case 38:
                sprite_persoX=0;
                persoU = false;
                break;
            // A droite toute !
            case 39:
                persoR = false;
                break;
            // on s'acroupie !
            case 40:
                persoD = false;
                sprite_persoX=150;
                break;
        }
    }

    var testCollision = function(){

        var diffX = tonneauX-12-persoX+15;
        var diffX2 = tonneauX+12-persoX-15;
        
        if ( (Math.abs(diffX2) < 30 || Math.abs(diffX2) < 30) && sprite_persoX!==150 && collision===false ){
            collision = true;
            // degradation du sol
            var num_sol = Math.floor(persoX/50);
            if ( etat_sol[num_sol] < 9 ){
            etat_sol[num_sol]+=1;
            // descente de vitesse du bidon
            var moins = Math.floor(Math.random()*10);
            ( vitesseTonneau-moins<1 ) ? vitesseTonneau=1:vitesseTonneau-=moins;  
            }
        } else if ( (Math.abs(diffX2) > 30 && Math.abs(diffX2) > 30) || sprite_persoX===150 ){
            collision = false;
        }
    }

    function testVide(){
        var posX = Math.floor(persoX/50);
        if ( etat_sol[posX] > 8 ){
            stoptonneau = true;
            persoTombe = true;
        }
    }

    function calculScore(){
        if ( sprite_persoX != 150 ){
            score+= 1*vitesseTonneau;
        }
        document.getElementById('score').innerHTML='Score : '+score;
    }

    // Chargement effectué on lance
    function animloop(){

        ctx.clearRect(0,0,800,400);

        // Horloge
        if ( newdate != Math.round(new Date().getTime()/1000) ){
            log(newdate-date+' => '+cpt+' fps');
            newdate = Math.round(new Date().getTime()/1000);
            cpt=0;
            calculScore();
        }

        // le sol
        for ( var i=0; i< 16; i++){
            ctx.drawImage(terre, etat_sol[i]*50, 0, 50, 50, i*50, 350, 50, 50);
        }

        // collision
        testCollision();

        // test tombe dans le vide
        testVide();

        // déplacement du perso
        if ( persoTombe === false ){
            if ( persoL === true && persoX > 0 ){
                persoX-=5;
                sprite_persoX+=30; if ( sprite_persoX > 120 ){ sprite_persoX=0; }
            }
            if ( persoR === true && persoX < 770 ){
                persoX+=5;
                sprite_persoX+=30;if ( sprite_persoX > 120 ){ sprite_persoX=0; }
            }
        // si le perso tombe, animation + stop boucle
        } else {
            if ( persoY < 430 ){
                sprite_persoX+=30; if ( sprite_persoX > 120 ){ sprite_persoX=0; }
                persoY++;
            } else {
                stopGame = true;
            }
        }
        // affichage personnage
        ctx.drawImage(perso, sprite_persoX, 0, 30, 30, persoX, persoY, 30, 30);

        // le tonneau
        if ( stoptonneau === false ){
            // déplacement à droite
            tonneauX+=vitesseTonneau;
            if ( tonneauX > 825 ){ 
                tonneauX=-25;
                vitesseTonneau++;
                if ( vitesseTonneau 10 ){ vitesseTonneau = 10; }
            }
            // changement d'état pour donner l'impression de tourner
            tonneauEtat--;if ( tonneauEtat < 0 ){ tonneauEtat=10;}
            // le tonneau
            ctx.drawImage(tonneau, tonneauEtat*30, 0, 25, 25, tonneauX, tonneauY, 25, 25);
        }


        // fps
        cpt++
        if (stopGame === false ){
            window.requestAnimFrame(animloop);
        } else {

        }
    };
    animloop();
     
}, false);