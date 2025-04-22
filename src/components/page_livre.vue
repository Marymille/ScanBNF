<template>
    <div id="body" v-if='resultats.titre_manifestation !=""'>
		<meta name="viewport" content="width=device-width, maximum-scale=1"/>
        <div id="header">
    		<b-img align src="./img/livre.png" alt="scan image" id="image3"></b-img>
			</br>
			</br>
			</br>
		</div>
		<div>
			<p align="center">
			<img :src="'http://images-eu.amazon.com/images/P/'+resultats.isbn10+'.08.MZZZZZZZ.jpg'"></p>
			</br>
			</br>
			</br>
		</div>
	
		<div id='pageInfo'>
				<li v-if='resultats.titre_manifestation != ""'>Titre : {{resultats.titre_manifestation}}</li>
				<li v-if='resultats.nom_auteur != ""'><span v-on:click="$parent.page='pageAuteur'">Auteur : {{resultats.nom_auteur}}</span></li>
				<li v-if='resultats.date_manifestation !=""'>Date de parution : {{resultats.date_manifestation}}</li>
				<li v-if='resultats.lieu_publication_manifestation != ""'>Lieu de parution : {{resultats.lieu_publication_manifestation}}</li>
				<li v-if='resultats.editeur_manifestation != ""'>Maison d'édition : {{resultats.editeur_manifestation}}</li>
				<li v-if='resultats.langue_expression != ""'>Langue : {{resultats.langue_expression}}</li>
				<li v-if='resultats.description_manifestation !=""'>Nombre de pages : {{resultats.description_manifestation}}</li>
		</div>

		<div class="clearfix" id="footer">
			<button v-on:click="$parent.page='pageInfo'">RETOUR</button>
		</div>		
	</div>


</template>

<script>

//import recuperationDonnees from '../classes/recuperationDonnees.js';

export default {
    name:"pageLivre",
    props:["resultats"]
}
</script>


<style scoped>
@font-face {
	font-family: "Bookman Old Style";
	src: url('../htmlcss/Bookman_Old_Style.ttf');
}
@font-face {
	font-family: "Bookman Old Style";
	src: url('../htmlcss/Bookman_Old_Style.ttf');
}



#img{
	position: center;
}

h1{
text-align: center;
font-family:"Bookman Old Style";
color:white;
font-size:auto;
}

a{
color:white;
text-decoration: none;
font-family:Andale Mono, monospace;
position: center;
}

#body,footer{
background: linear-gradient(to bottom, rgb(216, 63, 122) , #F68C3C);
height:auto;
width:auto;
background-position: justify;
background-repeat: no-repeat;
background-size: cover;
display:block;
padding-bottom:5%;
color:white;
text-decoration: none;
font-family:"Bookman Old Style", monospace;
position: center;
max-width: 900px;
margin: auto;
min-width: 320px;
}


button{
		background: rgb(250,250,250);
		border-radius: 10%;
		padding: 2% 1% ;
		display: inline-block;
		font-family: "Bookman Old Style", monospace;
		color: rgb(180, 9, 66);
		text-decoration: none;
		text-shadow:0px 1px 0px white;
		border:1px solid rgb(247,37,91);
		width: auto;
		margin-right:5%;
		margin-left: 5%;
		margin-top:5%;
		margin-bottom: 5%;
		box-shadow: 0px 2px 1px white inset, 0px -2px 8px white, 0px 2px 5px rgba(0, 0, 0, 0.1), 0px 8px 10px rgba(0, 0, 0, 0.1);
		font-size: 1 em;
		text-align: center;
	}
	button i{
		float: center;
		margin-top: 1px;
		text-align: center;

	}
	button:hover{
		box-shadow: 0px 2px 1px white inset, 0px -2px 20px white, 0px 2px 5px rgba(0, 0, 0, 0.1), 0px 8px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
		
	}
	button:active{
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5) inset, 0px -2px 20px white, 0px 1px 5px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1);
		background:-webkit-linear-gradient(top, #d1d1d1 0%,#ECECEC 100%);
		text-align: center;
				
	}


</style>