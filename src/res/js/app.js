/*
    Fichier JS pour :
    
    o Les fonctions principales de Doochronos (la page d'accueil uniquement)
        + Les évènements (clics, déplacements, chargements, ...)
        + Affichage de certains éléments de l'interface
        + Gestion des cartes (les carrés colorés des minuteurs, chronos, ...)
*/

// Ce fichier contient les fonctions principales nécéssaire au fonctionnement de Doochronos (la page d'accueil uniquement)

// On initialise les variables
var listCards = [], cardId = 0; // listCards sert à retenir les cartes créés; cardId sert a obtenir un identifiant pour une nouvelle carte
var listColors = ['rgb(255,100,0)', 'rgb(85,170,0)', 'rgb(0,120,200)', 'rgb(150,0,100)']; // Une liste de couleurs par défaut pour les cartes crée

$('html').click(function(e) // Lorsqu'on clique sur la page
{
	if($('.menu').css('width')=='350px') // Si le menu est visible
		showMenu(false); // Cacher le menu
	
	return true; // Pour que le clic ait un effet
});

$('body').mousemove(function(e) // Si la souris se déplace sur la page
{
	var percent = ((e.pageX / parseInt($('body').css('width').split("px").join("")))*100); // On récupère la position du curseur et on calcul sa position en % sur l'axe X
	var percentString = '' + percent + '%'; // On le met en chaine de caractère et on ajoute le caractère "%"
	$('.listCards').scrollTo(percentString,0); // On scroll vers la position (percentString,0px)
	
	return true; // Pour le scroll ait un effet
});

function loadFinished() // Cette fonction est appelé au chargement de la page
{
	$('body').css('background','rgb(255,0,100)'); // Changer le fond
	$('.redirect').css('display','none'); // Cacher le message de chargement
	$('.app,.app .toolBar').css('display','inline-block'); // Afficher la barre d'outils
	$('.app .toolBar').addClass('animated slideInUp'); // // Animer l'apparition de la barre d'outils
	
	updateTime(); // Lancer "l'horloge"
}

function showMenu(showRequested) // Pour afficher ou cacher le menu
{
	if(showRequested) // Si l'utilisateur veut afficher le menu
	{
		$('.menu').css('width','350px');
	}
	else // Si l'utilisateur veut fermer le menu
	{
		$('.menu').css('width','0px');
	}
}

function showPopup(popupName) // Pour afficher ou cacher le popup demandé
{
	if($('#popupNew' + popupName).css('display')=='block') // Si l'utilisateur veut fermer un popup
		$('#popupNew' + popupName).css('display','none'); // Cacher le popup
	else // Si l'utilisateur veut afficher un popup
	{
		$('#popupNew' + popupName).css('display','block'); // Afficher le popup
		$('.popupNew' + popupName + ' .form').animateCss('fadeInUp'); // Animer l'apparition du formulaire
	}
}

function showTooltip(text) // Pour afficher les bulles d'infos
{
	if(text=='') // Si le texte à afficher est vide
		$('.toolBar p').css('display','none'); // Ne pas afficher la bulle d'info
	else // Si le texte à afficher n'est pas vide
	{
		$('.toolBar p').css('display','inline-block'); // Afficher la bulle
		$('.toolBar p').html(text); // Remplacer le texte par le message demandé
	}
}

// Pour ce bout de code, voir sur cette page : https://github.com/daneden/animate.css
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

function addNewTimer() // Pour ajouter un minuteur
{
    // On récupère tous les informations saisies par l'utilisateur
	var name = $('#popupNewTimer input[type=text]').val(); // Le nom de la carte
	
	var hours = $('#popupNewTimer #hh').val(); // Le nombre d'heures
	var minutes = $('#popupNewTimer #mm').val(); // Le nombre de minutes
	var seconds = $('#popupNewTimer #ss').val(); // Le nombre de secondes
	
	var alarm = true; // S'il faut sonner l'alarme (son/notification)
	
	var card = new Timer(name,hours,minutes,seconds,alarm); // Création de la carte
	card.startTimer(); // Activation de la carte
	
	updateView(); // Mise à jour de l'affichage
	showPopup('Timer'); // Cacher le popup
}

function addNewChrono() // Pour ajouter un chronomètre
{
    // On récupère tous les informations saisies par l'utilisateur
	var name = $('#popupNewChrono input[type=text]').val(); // Le nom de la carte
	
	var card = new Chrono(name,false); // Création de la carte
	card.startChrono(); // Activation de la carte
	
	updateView(); // Mise à jour de l'affichage
	showPopup('Chrono'); // Cacher le popup
}

function addNewConvert() // Pour ajouter un convertisseur de temps
{
    // On récupère tous les informations saisies par l'utilisateur
	var millennials = $('#popupNewConvert #millennials').val(); // Le nombre de millénaires
	var centuries = $('#popupNewConvert #centuries').val(); // Le nombre de siècles
	var years = $('#popupNewConvert #years').val(); // Le nombre d'années
	var months = $('#popupNewConvert #months').val(); // Le nombre de mois
	var weeks = $('#popupNewConvert #weeks').val(); // Le nombre de semaines
	var days = $('#popupNewConvert #days').val(); // Le nombre de jours
	var hours = $('#popupNewConvert #hh').val(); // Le nombre d'heures
	var minutes = $('#popupNewConvert #mm').val(); // Le nombre de minutes
	var seconds = $('#popupNewConvert #ss').val(); // Le nombre de secondes
	
	var card = new Convert(millennials,centuries,years,months,weeks,days,hours,minutes,seconds); // Création de la carte
	card.startConvert(); // Activation de la carte
	
	updateView(); // Mise à jour de l'affichage
	showPopup('Convert'); // Cacher le popup
}

function updateView() // Pour mettre à  jour l'affichage
{
	if($('.card').length == 0) // S'il n'y pas de carte à afficher
	{
		$('.toolBar .little').fadeOut(); // Cacher en fondu les petits boutons
		$('.listCards').css('display','none'); // Cacher la liste des cartes
		$('.welcome').fadeIn(); // Afficher en fondu le message d'accueil
	}
	else // S'il y a au moins une carte à afficher
	{
		$('.toolBar .little').fadeIn(); // Afficher en fondu les petits boutons
		$('.listCards').fadeIn(); // Afficher en fondu la liste des cartes
		$('.welcome').css('display','none'); // Cacher le message d'accueil
	}
}

/* Fonctions pour une seul carte */

function repriseTimer(idCard) // Pour mettre réactiver un minuteur/chrono
{
	listCards[parseInt(idCard)-1].reprise();
}

function pauseCard(idCard) // Pour mettre en pause une carte avec l'aide de son ID
{
	listCards[parseInt(idCard)-1].pause(); // On cherche dans listCards la carte et on le met en pause
}

function removeCard(idCard) // Pour supprimer une carte avec l'aide de son ID
{
	if(listCards[parseInt(idCard)-1].type() == 'timer' || listCards[parseInt(idCard)-1].type() == 'chrono') // S'il s'agit d'un chronomètre ou d'un minuteur
	{
		pauseCard(idCard); // Stopper le processus de raffraichissement
	}
	
	$('#'+idCard).remove(); // On supprime le code HTML de la carte
	updateView(); // Mise à jour de l'affichage
}

/* Fonctions pour plusieurs cartes */

function repriseAllCards() // Pour réactiver tous les cartes
{
    for(var i=1;i<=listCards.length;i++) // On va parcourir la liste des cartes
    {
        if(listCards[i-1].type() == 'timer' || listCards[i-1].type() == 'chrono') // S'il s'agit d'un chronomètre ou d'un minuteur
            repriseTimer(i); // Relancer le processus de raffraichissement
    }
}

function pauseAllCards() // Pour mettre en pause tous les cartes
{
    for(var i=1;i<=listCards.length;i++) // On va parcourir la liste des cartes
    {
        if(listCards[i-1].type() == 'timer' || listCards[i-1].type() == 'chrono') // S'il s'agit d'un chronomètre ou d'un minuteur
            pauseCard(i); // Stopper le processus de raffraichissement
    }
}

function removeAllCards() // Pour supprimer tous les cartes
{
    if(confirm('Voulez-vous vraiment tout supprimer ?'))
    {
        for(var i=1;i<=listCards.length;i++) // On va parcourir la liste des cartes
            removeCard(i); // Supprimer chaque carte
    }
}