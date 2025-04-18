export default class Sparql {
    constructor(endpoint) {
            this.endpoint=endpoint;
    }
    
    query(query) {

        let queryPromise=new Promise((resolve,reject)=>{
  
                let http=new XMLHttpRequest();
   
                http.onreadystatechange=(e)=>{
       
                    if (http.readyState === XMLHttpRequest.DONE) {
                
                        if (http.status === 200) {
                
                            var response=http.responseText;
                        } else {
             
                            var response=false;
                        }
           
                    } else var response=null;
 
                    if (response===false) reject(http.status);
     
                    else if (response!==null) {
                        try {
              
                            var jsonResponse=JSON.parse(response);
                        } catch(e) {
                   
                            reject("Can't parse response !");
                        }
         
                        resolve(jsonResponse);
                    }
                }
             
                http.open('POST',this.endpoint);
   
                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
                http.send("query="+encodeURIComponent(query)+"&format="+encodeURIComponent("application/sparql-results+json"));
            });
  
        return queryPromise;
    }
}

