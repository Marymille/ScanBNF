import Sparql from './sparql.js';
import Isbn from './Isbn.js';

export default class recuperationDonnees{
    constructor(resultats){
        this.resultats = resultats;
        this.isbn = new Isbn(resultats.ean);
        this.requete_donnees_de_base(this.isbn);
        this.requete_donnees_auteur(this.isbn);
        this.requete_donnes_complementaires(this.isbn);
        this.fillISBN10(this.isbn)
    }
    requete_donnees_de_base(isbn){
        {
            console.log(isbn.getFormatedISBN())
            console.log(isbn.getFormatedISBN10())
            var sparql= new Sparql('https://data.bnf.fr/sparql');
            sparql.query(`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX frbr-rda: <http://rdvocab.info/uri/schema/FRBRentitiesRDA/>
            PREFIX bnf-onto: <http://data.bnf.fr/ontology/bnf-onto/>
            PREFIX dcterms: <http://purl.org/dc/terms/>
            PREFIX rdarelationships: <http://rdvocab.info/RDARelationshipsWEMI/>
            PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            PREFIX rdagroup1elements: <http://rdvocab.info/Elements/>
            Select ?titre_manifestation ?date_manifestation ?lieu_publication_manifestation ?langue_expression ?description_manifestation ?editeur_manifestation ?nom_auteur ?sujet_oeuvre where {
                ?manif dcterms:title ?titre_manifestation;
                    dcterms:date ?date_manifestation;
                    dcterms:description ?description_manifestation;
                    dcterms:publisher ?editeur_manifestation;
                    rdagroup1elements:placeOfPublication ?lieu_publication_manifestation;
                    rdarelationships:expressionManifested ?expression.
                ?expression <http://data.bnf.fr/vocabulary/roles/r70> ?auteur.
                optional{
                    ?expression dcterms:language ?langue_expression.
                }
                optional{
                    ?oeuvre rdarelationships:expressionOfWork ?expression;
                        bnf-onto:subject ?sujet_oeuvre.
                }
                ?auteur foaf:name ?nom_auteur.
                {
                    ?manif bnf-onto:isbn "${isbn.getFormatedISBN()}"
                } UNION {
                    ?manif bnf-onto:isbn "${isbn.getFormatedISBN10()}"
                }
                }`).then(result=>{
                    this.fillInfos(result,isbn);
                }).catch(error=>{
                    console.log(error);
                });
        }
    }
    requete_donnees_auteur(isbn){
        {
            var sparql= new Sparql('https://data.bnf.fr/sparql');
            sparql.query(`PREFIX bnf-onto: <http://data.bnf.fr/ontology/bnf-onto/>
            PREFIX rdarelationships: <http://rdvocab.info/RDARelationshipsWEMI/>
            PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            PREFIX rdagroup2elements: <http://rdvocab.info/ElementsGr2/>
            PREFIX dcterms: <http://purl.org/dc/terms/>
			PREFIX bnfroles: <http://data.bnf.fr/vocabulary/roles/>

            select ?nom_auteur ?pays_auteur ?image_auteur ?informations_auteur ?page_auteur ?date_naissance_auteur ?lieu_naissance_auteur ?date_mort_auteur ?lieu_mort_auteur where{
                ?manifestation rdarelationships:expressionManifested ?expression.
                ?expression bnfroles:r70 ?auteur.
                ?auteur foaf:name ?nom_auteur.
  				optional{
    				?auteur foaf:page ?page_auteur.
  				}
                optional{
                    ?auteur bnf-onto:firstYear ?date_naissance_auteur.
                    optional{
                        ?auteur bnf-onto:lastYear ?date_mort_auteur.
                    }
                }
                optional{
                    ?auteur rdagroup2elements:placeOfBirth ?lieu_naissance_auteur.
                    optional{
                        ?auteur rdagroup2elements:placeOfDeath ?lieu_mort_auteur.
                    }
                }
                optional{
                    ?auteur rdagroup2elements:countryAssociatedWithThePerson ?pays_auteur.
                }
                optional{
                    ?auteur foaf:depiction ?image_auteur.
                    filter(regex(?image_auteur, "http://commons.wikimedia.org/wiki/Special:FilePath/"))
                }
                optional{
                    ?auteur rdagroup2elements:biographicalInformation ?informations_auteur.
                }
  				 {
                    ?manifestation bnf-onto:isbn "${isbn.getFormatedISBN()}"
                } UNION {
                    ?manifestation bnf-onto:isbn "${isbn.getFormatedISBN10()}"
                }
            }
            limit 1`).then(result_auteur=>{
                this.fillInfosAuteur(result_auteur,isbn);
            }).catch(error=>{
                console.log(error);
            });
        }

    }
    requete_donnes_complementaires(isbn){
        {
            var sparql= new Sparql('https://data.bnf.fr/sparql');
            sparql.query(`PREFIX bnf-onto: <http://data.bnf.fr/ontology/bnf-onto/>
            PREFIX rdarelationships: <http://rdvocab.info/RDARelationshipsWEMI/>
            PREFIX dcterms: <http://purl.org/dc/terms/>
            PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
            PREFIX bnfroles: <http://data.bnf.fr/vocabulary/roles/>
            
            select ?isbn ?extrait_manifestation ?titre_manifestations_auteur ?pub ?date_manifestations_auteur ?sujet_auteur where{
                ?manifestation rdarelationships:expressionManifested ?expression.
                ?expression bnfroles:r70 ?auteur.
                ?expressions_auteur bnfroles:r70 ?auteur.
                #dcterms:language <http://id.loc.gov/vocabulary/iso639-2/fre>.
                ?manifestations_auteur rdarelationships:expressionManifested ?expressions_auteur;
                    dcterms:title ?titre_manifestations_auteur;
                    dcterms:date ?date_manifestations_auteur;
                    bnf-onto:isbn ?isbn;
                    dcterms:publisher ?pub.
                optional{
                    ?manifestations_auteur dcterms:abstract ?extrait_manifestation.
                }
                optional{
                    ?manifestations_auteur dcterms:subject ?sujet_auteur.
                }
  				{
                    ?manifestation bnf-onto:isbn "${isbn.getFormatedISBN()}"
                } UNION {
                    ?manifestation bnf-onto:isbn "${isbn.getFormatedISBN10()}"
                }
            }
            
            group by ?titre_manifestations_auteur
            limit 100`).then(result_complementaires=>{
                this.fillInfosComplementaires(result_complementaires,isbn);
            }).catch(error=>{
                console.log(error);
            });
        }
    }
    getValue($objet,$l) {
        return ($objet[$l]?$objet[$l].value:"");
    }

    fillISBN10(isbn){
        var isbn = this.isbn.getISBN10();
        this.resultats.isbn10 = isbn;
    }

    fillInfos(result,isbn){
        if(result.results.bindings.length){
            let resultats=result.results.bindings[0];
            this.resultats.titre_manifestation = this.getValue(resultats, 'titre_manifestation');
            this.resultats.date_manifestation = this.getValue(resultats, 'date_manifestation');
            this.resultats.lieu_publication_manifestation = this.getValue(resultats, 'lieu_publication_manifestation');
            this.resultats.langue_expression = this.getValue(resultats, 'langue_expression');
            this.resultats.description_manifestation = this.getValue(resultats, 'description_manifestation');
            this.resultats.editeur_manifestation = this.getValue(resultats,'editeur_manifestation');
            this.resultats.nom_auteur = this.getValue(resultats, 'nom_auteur');
            this.resultats.sujet_oeuvre = this.getValue(resultats, 'sujet_oeuvre')
        }
    }
    fillInfosAuteur(result_auteur,isbn){
        if(result_auteur.results.bindings.length){
            let resultats = result_auteur.results.bindings[0];
            this.resultats.auteur.pays_auteur = this.getValue(resultats, 'pays_auteur');
            this.resultats.auteur.image_auteur = this.getValue(resultats,"image_auteur");
            this.resultats.auteur.informations_auteur = this.getValue(resultats, 'informations_auteur');
            this.resultats.auteur.page_auteur = this.getValue(resultats, 'page_auteur');
            this.resultats.auteur.date_naissance_auteur = this.getValue(resultats, 'date_naissance_auteur');
            this.resultats.auteur.lieu_naissance_auteur = this.getValue(resultats, 'lieu_naissance_auteur');
            this.resultats.auteur.date_mort_auteur = this.getValue(resultats, 'date_mort_auteur');
            this.resultats.auteur.lieu_mort_auteur = this.getValue(resultats, 'lieu_mort_auteur')
        }
    }
    fillInfosComplementaires(result_complementaires, isbn){
        if(result_complementaires.results.bindings.length){ 
            this.resultats.donnees_complementaires=[];
            let resultats = result_complementaires.results.bindings;
            for (let i in resultats){
                let donnees={
                    isbn:this.getValue(resultats[i],"isbn"),
                    extrait_manifestation:this.getValue(resultats[i], "extrait_manifestation"),
                    titre_manifestations_auteur:this.getValue(resultats[i],'titre_manifestations_auteur'),
                    pub:this.getValue(resultats[i],'pub.value'),
                    date_manifestations_auteur:this.getValue(resultats[i],'date_manifestations_auteur'),
                    sujet_auteur:this.getValue(resultats[i],'sujet_auteur')
                };
                this.resultats.donnees_complementaires.push(donnees);
            }
            
        }
    }
}