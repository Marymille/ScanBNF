<template>

  <div id="app">

    <accueil v-if="page=='accueil'"></accueil>
    <pageScan v-if="page=='pageScan'" :resultats='resultats'></pageScan>
    <pageLivre v-if="page=='pageLivre'" :resultats='resultats'></pageLivre>
    <pageAuteur v-if="page=='pageAuteur'" :resultats='resultats'></pageAuteur>
    <pageInfo v-if="page=='pageInfo'" :resultats='resultats'></pageInfo>

  </div>

</template>

<script>
import accueil from "./components/accueil.vue"
import pageScan from "./components/page_scan.vue"
import pageLivre from "./components/page_livre.vue"
import pageAuteur from "./components/page_auteur.vue"
import pageInfo from "./components/page_info.vue"

export default {

  name: 'app',
  components : {accueil,pageScan,pageLivre,pageAuteur,pageInfo},
  data:function(){
    return{
      resultats:{
        ean:"",
        isbn10:"",
        titre_manifestation:"",
        date_manifestation:"",
        lieu_publication_manifestation:"",
        langue_expression:"",
        description_manifestation:"",
        editeur_manifestation:"",
        nom_auteur:"",
        sujet_oeuvre:"",
        auteur:{
          pays_auteur:"",
          image_auteur:"",
          informations_auteur:"",
          page_auteur:"",
          date_naissance_auteur:"",
          lieu_naissance_auteur:"",
          date_mort_auteur:"",
          lieu_mort_auteur:""
        },
        
      },
      page:"accueil"
    }
  }
}

</script>

<style scoped>


</style>