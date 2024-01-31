window.addEventListener("load", (event) => {
    console.log("La page est complètement chargée");
 
/***************** Intro *****************/
//Ciblage des élements du DOM
// let mainTitle = document.querySelector("h1")
// let list = document.querySelector("ul")
// let listElements = list.querySelectorAll('li')

// //affichage des élements
// console.log('Titre principale', mainTitle)
// console.log("Titre: ", list)
// console.log("Les élements: ", listElements)

// //modfiier le style d'un élement
// listElements.forEach(function(element){
//     console.dir(element)
//     element.style.color = "red"
// })

// //console.dir() permet d'avoir les informations sur un élement du dom
// console.dir(mainTitle)

//function pour mélanger les boîtes
function shuffleChildren(parent){
    let children = parent.children
    let i = children.length, k, temp
    while(--i > 0) {
        k = Math.floor(Math.random() * (i+1))
        temp = children[k]
        children[k] = children[i]
        parent.appendChild(temp)
    }
}

//Function qui remplace alert()
function showReaction(type, clickedBox) { //type est la reaction attendu (le nom de la classe css déjà mis en place) et clickedBox boite sur la quelle l'effet vas etre appliquer
    clickedBox.classList.add(type) //on ajoute la class a la boite voulue pour appliquer le style déjà mis en place
    if(type !== "success") { //si la classe en paramètre correspond pas a succées
        setTimeout(function(){
            clickedBox.classList.remove(type) //on supprime
        }, 800)
    }
}
/*********************** Timer ***************************/
let Timer = document.getElementById("timer-up")
let meilleureScoreElement = document.getElementById("best-Score")


let heures = 0;
let minutes = 0;
let secondes = 0;

let timeout;

let estArrete = true; //variable pour controler on/off du chronometre, par defaut temps arreter vrai 

//fonction demarre qui comporte une autre fonction qui gere l'incrementation des secondes, minutes et heures
const demarrer = () => {
    if(estArrete) { //prend en parametre l'etat de controle arreter du chronometre
        estArrete = false; // met l'etat de controle du temps arreter sur faux
        defilerTemps(); //appelle la fonction qui incremente les variables heures, minutes et secondes
    }
}

const arreter =  () => { 
    if(estArrete = true);
    clearTimeout(timeout);
}

const defilerTemps = () => {
    if(estArrete) return;
    
    secondes = parseInt(secondes);
    minutes = parseInt(minutes);
    heures = parseInt(heures);

    secondes++;

    if(secondes == 60) {
        minutes++;
        secondes = 0;
    }

    if(minutes == 60) {
        heures++;
        minutes = 0;
    }

    //affichage
    if(secondes < 10) {
        secondes = "0" + secondes;
    }

    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    if(heures < 10) {
        heures = "0" + heures;
    }
    
    const temps = Timer.textContent = `${heures}:${minutes}:${secondes}`;
    
    //sauvegarde dans le localStorage du denrier temps
    localStorage.setItem("temps", temps)
    //sauvegarde de la valeur dans la variable score
    const highScore = localStorage.getItem("temps")
    

    timeout = setTimeout(defilerTemps, 1000);
};


//Function Meilleure score
// 1 ere etape Quand jeu finis, je récupère le temps on vérifie avec console.log pour vérificer sa présence
// 2 ème étape setItem dans le localstorage clé et valeur de la variable qu'on récupère le score 3 eme valeur le temps et nombre de case, si nombre de case = temps de local storage et que le temps est meilleure donc j'update

const scoreTime = ()  => {
    
    // if (temps < highScore) {
    
    // }
    //nb case 
    //Nouveau Meilleure temps
    
    //nouveau nb case 
}



//Quand je lance le jeu récuperer nombre de case

const reset = () => {
    chrono.textContent = "00:00:00";
    estArrete = true;
    heures = 0;
    minutes = 0;
    secondes = 0;
    clearTimeout(timeout);
}


/*********************** Timer ***************************/
//creation de la box en div
const box = document.createElement("div")
//Ajout d'une classe pour la styliser
box.classList.add("box")

const board = document.querySelector("#board") //on cible et stocke la div principale board

let nb = 1 //represente le numéro de la boîte attendue
let valuePrompt = parseInt(prompt("Combien de boîte veut tu ?")) //prompt pour pouvoir demander combien de boîte on veut au départ
//boucle pour afficher les boîtes 
for(let i = 1; i <=valuePrompt; i++) {
    let newbox = box.cloneNode() //clone de la boite <div class="box">
    newbox.innerText = i //la variable i d'incrémentation sera afficher dans chaque nouvelle boîte cloner
    board.appendChild(newbox) //on ajoute dans le dom tree chaque nouvelle boîte
    
    //on déclenche le chrono si le joueur entre un nombre de boîte dans le prompt
    if(i == valuePrompt) {
        demarrer();
    }
    
    newbox.addEventListener("click", function(){
        if(i == nb) { //on vérifie que le tour d'incrémentation corrépond au numéro de la boîte
            newbox.classList.add("box-valid") //on ajoute a chaque nouvellle boîte cloner la class "box-valid" pour appliquer le style déjà mis en place
            shuffleChildren(board)
            if(nb == board.children.length) { //si le numéro de la boite cliquer correspond au nombre de boite du parent board
                
                arreter(); //on arrête le chrono une fois toutes les boîtes cliquer
                
                //
                localStorage.setItem("nbCase", valuePrompt) //nbCase cliquer LocalStorage
                
                const nbCase = localStorage.getItem("nbCase")

                board.querySelectorAll(".box").forEach(function(box){ // on fait un foreach sur le parent board pour selectionner tout les enfant
                    showReaction("success", box) //on applique le style déjà mis en place pour l'appliquer au boîte cliquer
                })
            }
            nb++ //on incrèmente le numéro de la boîte si le click est bon
        }

        else if(i > nb) { //si le tour d'incrémentation est supérieur au nombre de la boite
            showReaction("error", newbox) //on applique style mis en place "erreur"
            nb = 1 //on remet le nombre de la boite a 1 
            board.querySelectorAll(".box-valid").forEach(function(validBox){ //on refait un foreach cette fois ci sur les boîtes cliquer valid
                validBox.classList.remove("box-valid") //on supprime pour chacune la classe box valid
                shuffleChildren(board) //On remélange a chaque fois que le joueur se trompe
            })
        }
        else {
            showReaction("notice", newbox) //on applique le style de notice si on clique sur une boîte déjà cliquer
        }
    })
}

shuffleChildren(board) //on mélange les enfants du parent board
});
