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

//creation de la box en div
const box = document.createElement("div")
//Ajout d'une classe pour la styliser
box.classList.add("box")

const board = document.querySelector("#board") //on cible et stocke la div principale board

let nb = 1 //represente le numéro de la boîte attendue

//boucle pour afficher les boîtes 
for(let i = 1; i <=10; i++) {
    let newbox = box.cloneNode() //clone de la boite <div class="box">
    newbox.innerText = i //la variable i d'incrémentation sera afficher dans chaque nouvelle boîte cloner
    board.appendChild(newbox) //on ajoute dans le dom tree chaque nouvelle boîte

    newbox.addEventListener("click", function(){
        if(i == nb) { //on vérifie que le tour d'incrémentation corrépond au numéro de la boîte
            newbox.classList.add("box-valid") //on ajoute a chaque nouvellle boîte cloner la class "box-valid" pour appliquer le style déjà mis en place
            if(nb == board.children.length) { //si le numéro de la boite cliquer correspond au nombre de boite du parent board
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
            })
        }
        else {
            showReaction("notice", newbox) //on applique le style de notice si on clique sur une boîte déjà cliquer
        }
    })
}

shuffleChildren(board) //on mélange les enfants du parent board