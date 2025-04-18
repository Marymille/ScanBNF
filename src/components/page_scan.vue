<template>
	<div id="body">
		<div id="header">
			<b-img align src="./img/scan.png" alt="scan image" id="image3"></b-img>
		</div>

			<div class="button">
				<div id='cbreader'>
					<div id='cbreader' v-if="message">{{message}}</div>
				</div>
			</div>
			<div>
				<label>Veuillez taper les chiffres de l'ISBN: </label>
				<input v-model="resultats.ean" placeholder="ISBN" key='ean-input'>
				<button v-on:click="fillData()">CONTINUER</button>
			</div>

		<div id="footer" class="clearfix">
		</div>
	</div>
</template>
<script>

import recuperationDonnees from '../classes/recuperationDonnees.js';
import Quagga from 'quagga';
import Isbn from '../classes/Isbn.js';

export default {
	name:"pageScan",
	props:['resultats'],
	data:function(){
		return{
			message:""
		}
	},
	mounted:function(){
		Quagga.init({
            inputStream : {
              name : "Live",
              type : "LiveStream",
              target: document.getElementById('cbreader'), 
              constraints:{
                width:220,
                height:290,
                facingMode: "environment"
              }
            },
            decoder : {
              readers : ["ean_reader"]
            },
            locator:{
                halfSample:false,
                patchSize: "medium"
            }
          }, (err)=>{
              if (err) {
                  this.message = "Impossible d'utiliser la caméra";
                  return;
              }
              Quagga.start();
          });
        Quagga.onDetected((data)=>{this.cbDetected(data)});
	},
	beforeDestroy:function(){
		Quagga.stop()
	},
	methods:{
		fillData:function(){
			var Donnees = new recuperationDonnees(this.resultats);
			this.$parent.page="pageInfo"
		},
		cbDetected:function(data){
			var isbn = new Isbn(data.codeResult.code);
			if(isbn.isISBN){
				this.resultats.ean = data.codeResult.code;
				this.resultats.isbn10 = isbn.getISBN10();
				this.fillData();
			}
		}
	}
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