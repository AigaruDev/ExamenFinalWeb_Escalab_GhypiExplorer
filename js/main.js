'use strict';

const ApiKey='&api_key=LOvkzuDH1bVcpmr2HUKvBZzRbfB2LyF6';
const urlAPI='https://api.giphy.com/v1/gifs/';
const limit = '&limit=30';

const btn = document.getElementById('btn');
const a0 = document.getElementById('a0');
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');

let busqueda='?q=';
let q ='';
let urlFull='';
let historial = [];
let h='';

window.onload = function () {
    ultimasBusquedas();
    trending();
  } 

function history(h){
    let t = historial.indexOf(h);
    if(t === -1 && h!='undefined'){
        historial.unshift(h);
        historial.length > 3 && historial.pop();
        localStorage.removeItem('historial');
        localStorage.setItem('historial', historial);       
    }   
     }

const getImagenes = async () => {
    await fetch(urlFull).then((response)=>{
        return response.json();
    }).then((imagenes)=>{  
        console.log(imagenes);    
        if(imagenes.data.length>0){
    for(let i = 0 ; i<imagenes.data.length; i++){

        const gif = document.createElement('img');
        gif.src = imagenes.data[i].images["original"].url;
        gif.className = "mb-3";
        document.getElementById("listas").appendChild(gif);

    }
    }else{
        alert("No Existen Imagenes");
        return false;
    }
})
}

function trending(){
urlFull = urlAPI +'trending?'+ ApiKey + limit ; 
getImagenes();
}


function ultimasBusquedas(){
 if(window.localStorage.length>0){
    let historial= localStorage.getItem('historial').split(',');
    for(let i=0;i<historial.length;i++){
        let a='a'+i;
         if(historial[i]!='undefined'){
            document.getElementById(a).innerHTML = historial[i];            
         }
    }
    return historial;
 }

}


function ss(l){
    let h=ultimasBusquedas();     
    if(l+1<=h.length){   
    document.getElementById('busqueda').value=h[l];    
    btn.click();
    document.getElementById('busqueda').value='';    
    }
}

a0.onclick = () => {
    ss(0);
}
a1.onclick = () => {
    ss(1);
}
a2.onclick = () => {
    ss(2);
}

btn.onclick = () =>{    
    document.getElementById('listas').innerHTML="";
    q = document.getElementById('busqueda').value;
    urlFull = urlAPI +'search'+ busqueda + q + ApiKey + limit ;     
    if(q!=""){
        getImagenes();
        history(q);        
        ultimasBusquedas();  
         
    }else{
        alert("Ingresa alguna palabra o texto para buscar gifs");
    }    
}

window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        getImagenes();
    }
})


