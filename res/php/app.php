
<!-- L'écran d'accueil -->
<div class="welcome">
	<img src="res/img/white-flat-logo.png" style="height:100px;" />
	<h1>Bienvenue</h1>
	<p>Bienvenue dans Doochronos !<br>Pour commencer, cliquez le bouton en bas de l'écran.</p>
	<input type="button" onclick="showMenu(true);" value="Afficher le menu"/>
</div>

<div class="listCards"></div> <!-- L'écran où sera placé les "cartes" -->

<?php include("res/php/toolbar.php"); ?> <!-- La barre d'outils -->

<?php include("res/php/popup.php"); ?> <!-- Les popups -->