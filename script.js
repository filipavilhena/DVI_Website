//Constantes
let DVIcontainer = document.getElementById("DVIcontainer");
let dados;
let dados_atuais;
let DVI;
let DVI_info;
let DVI_hovered_info;
let hovered_DVI;
let clicked_DVI

let show_info = [];
let hover_info = [];

let img_width = 200;
let img_height = 200;

let active_filters = [];

//Ir buscar a Informação
function data(){
Papa.parse("assets/data.csv", {
	download: true,
    skipEmptyLines: true,
    
    complete: csv => {
    //console.log(csv.data);
    dados = csv.data; //Variável com os Dados
    dados_atuais = dados;

    display_DVI(dados);
    }
});
}


//Display de DVIs
function display_DVI(d){
    //console.log(d);

    //limpar
    while (DVIcontainer.firstChild) {
        DVIcontainer.removeChild(DVIcontainer.lastChild);
    }
    show_info = [];
    hover_info = [];

    for(let i = 0; i < d.length; i++){
        DVI = document.createElement("div");
        //DVI.innerHTML = "Eu Sou Uma DVI" + " " + i;
        DVI.classList.add("DVI_Display");
        DVI.id = "DVI"+i;

        if(DVI.id != "DVI0"){
            DVIcontainer.appendChild(DVI);
             DVI.innerHTML = "<img src='images/" + d[i][0] + " Img.jpg' width='"+img_width+"' height='"+img_height+"'>"
        }

        let info_container = document.createElement("div");
        info_container.id = "container"+i;
        DVI.appendChild(info_container);
        info_container.classList.add("preview_hidden");

        show_info.length = d.length;
        show_info[i] = false;

        let hover_container = document.createElement("div");
        hover_container.id = "hover"+i;
        DVI.appendChild(hover_container);
        hover_container.classList.add("hover_preview");

        hover_info.length = d.length;
        hover_info[i] = false;
        //console.log(DVI.id);

        //Ver Informação
        DVI.addEventListener('click', () => display_info(i, d));
        DVI.addEventListener('mouseover', () => MouseOver(i, d));
        DVI.addEventListener('mouseout', () => MouseOut(i, d));

        //console.log(DVI.getAttribute('ID-number'));
    }

        //console.log(show_info);

}

//Tamanho das Imagens

function img_increase(){
    if(img_width<1000){
    img_width = img_width + 50;
    img_height = img_height + 50;
    }
    display_DVI(dados_atuais);
}

function img_reduce(){

    console.log("-");

    if(img_width>50){
    img_width = img_width - 50;
    img_height = img_height - 50;
    }
    display_DVI(dados_atuais);
}

//Display de Informação

//On Hover
function MouseOver(IDn, d) {
  //console.log(document.getElementById("DVI"+IDn));
    hovered_DVI = document.getElementById("hover"+IDn)

if(hover_info[IDn] == false){
    hover_info[IDn] = true;

    for(let i = 0; i < 3; i++){
        //console.log(d[i]);

            DVI_hovered_info = document.createElement("div");
            hovered_DVI.appendChild(DVI_hovered_info);

            DVI_hovered_info.innerHTML = d[IDn][i];
            DVI_hovered_info.classList.add("info_preview");
    }

}
}

function MouseOut(IDn, d) {
    while (hovered_DVI.firstChild) {
            hovered_DVI.removeChild(hovered_DVI.lastChild);
        }

        hover_info[IDn] = false;
}

//On Click
function display_info(IDn, d){
    //console.log(document.getElementById("DVI"+IDn));
    clicked_DVI = document.getElementById("container"+IDn);

    //Apagar Hover
    hovered_DVI = document.getElementById("hover"+IDn);
    MouseOut(IDn, d);


if(show_info[IDn] == false){
    show_info[IDn] = true;
    clicked_DVI.classList.add("preview");
    clicked_DVI.classList.remove("preview_hidden");

//Galeria


    for(let i = 0; i < d[0].length; i++){
        //console.log(d[i]);

            DVI_info = document.createElement("div");
            clicked_DVI.appendChild(DVI_info);

            DVI_info.innerHTML = d[IDn][i];
            DVI_info.classList.add("info_preview");
    }

//Fechar a informação
   let DVI_close = document.createElement("div");
    DVI_close.innerHTML = "X";
    DVI_close.classList.add("info_preview");
    DVI_close.id = "close_bttn" + IDn;

    clicked_DVI.appendChild(DVI_close);

    console.log(DVI_close);
    DVI_close.addEventListener('click', () => close_info);

    }else if(show_info[IDn] == true){
        //console.log(clicked_DVI);
        close_info();
    }

    function close_info(){
        while (clicked_DVI.firstChild) {
            clicked_DVI.removeChild(clicked_DVI.lastChild);
        }

        show_info[IDn] = false;
        clicked_DVI.classList.remove("preview");
        clicked_DVI.classList.add("preview_hidden");
    }
    
}

//FILTROS

//Ano
/*function filter_year(y, d){
    //console.log(d.length);
    let filtered_data = []
    
    for(let i = 0; i < d.length; i++){
           //console.log(d[i][1]);
           //console.log(i);

           if(d[i][1] == "year" || d[i][1] == y){
            filtered_data.push(d[i]);
           }
    }

    console.log(filtered_data);
    dados_atuais = filtered_data;
    display_DVI(filtered_data);
}*/


function filters(filterID, filter_value, d){
//console.log(filterID);

//Array de Filtros Ativos
if(active_filters.length != 0){
let found = false;

 for (let i = 0; i < active_filters.length; i++) {
    if (filterID === active_filters[i][0]) {
    
    if(filter_value != active_filters[i][1]){
    document.getElementById(active_filters[i][1]).classList.remove("active");
      document.getElementById(filter_value).classList.add("active");
      //console.log("ID Present", active_filters[i][0]);
      active_filters[i].splice(1, 1, filter_value);
      
      } else if (filter_value === active_filters[i][1]){
         document.getElementById(filter_value).classList.remove("active");
        active_filters.splice(i, 1);
      }
      found = true;
      break;
    }
  }

  if (!found) {
    //console.log("ID Not Present");
    active_filters.push([filterID, filter_value]);
    document.getElementById(filter_value).classList.add("active");
  }


} else {
 active_filters.push([filterID, filter_value]);
 document.getElementById(filter_value).classList.add("active");
}

//active_filters.push([filterID, filter_value]);

//console.log(filter_value, active_filters);
//console.log(active_filters[0][1])

//Filtragem dos dados

f_data(d);

}


function f_data(d) {
    let header = d[0];
    let filtered_data = d;

    if (active_filters.length === 0) {
        display_DVI(d);
        console.log("0 filtros ativos");
        return;
    }

    

    for (let i = 0; i < active_filters.length; i++) {
        const [filterType, filterValue] = active_filters[i];

        filtered_data = filtered_data.filter(row => {
            if (filterType === 0) return row[0] === filterValue;       // Name
            if (filterType === 1) return row[1] === filterValue;       // Year
            if (filterType === 2) return row[2] === filterValue;       // Designer
            return true;
        });
    }

    // Add header back
    filtered_data.unshift(header);

    console.log(filtered_data);
    display_DVI(filtered_data);
}


/* CÓDIGO ANTIGO QUE FOI MELHORADO PELO CHATGPT

function f_data(d){
//console.log(active_filters);
let filtered_data = []

    if(active_filters.length === 0){
        filtered_data = d;
    } else {
        filtered_data.push(d[0]);
        
        for(let i = 0; i < active_filters.length; i++){
            //console.log(active_filters[i][0]);

            //Nome
            if(active_filters[i][0] === 0){
                console.log("Temos Nome");
                console.log(filtered_data.length)

                if(filtered_data.length < 2){

                for(let j = 0; j < d.length; j++){
                    //console.log(d[j][0], active_filters[i][1]);

                    if(d[j][0] === active_filters[i][1]){
                        console.log("+ DVI");
                        filtered_data.push(d[j]);
                    }
                }

                } else {

                     for(let j = filtered_data.length - 1; j >= 0; j--){
                    console.log("Corri o array");

                        if(filtered_data[j][0] !== active_filters[i][1] && filtered_data[j][0] != "name"){
                        console.log("NÃO CONTEM O VALOR", filtered_data[j]);
                        filtered_data.splice(j, 1)
                    }
                }

                }

            }

            //Ano
            if(active_filters[i][0] === 1){
                console.log("Temos Ano");

                if(filtered_data.length < 2){

                for(let j = 0; j < d.length; j++){
                    //console.log(d[j][0], active_filters[i][1]);

                    if(d[j][1] === active_filters[i][1]){
                        filtered_data.push(d[j]);
                    }
                }

                } else {

                     for(let j = filtered_data.length - 1; j >= 0; j--){

                        if(filtered_data[j][1] !== active_filters[i][1] && filtered_data[j][1] != "year"){
                        console.log("NÃO CONTEM O VALOR", filtered_data[j]);
                        filtered_data.splice(j, 1)
                    }
                }

                }



                
            }

            //Designer
            if(active_filters[i][0] === 2){
                console.log("Temos Designer");


                 if(filtered_data.length < 2){

                for(let j = 0; j < d.length; j++){
                    //console.log(d[j][0], active_filters[i][1]);

                    if(d[j][2] === active_filters[i][1]){
                        filtered_data.push(d[j]);
                    }
                }

                } else {

                     for(let j = filtered_data.length - 1; j >= 0; j--){

                        if(filtered_data[j][2] !== active_filters[i][1] && filtered_data[j][2] != "designer"){
                        console.log("NÃO CONTEM O VALOR", filtered_data[j]);
                        filtered_data.splice(j, 1)
                    }
                }

                }

            }

        }
    }

   //display_DVI(filtered_data);
    console.log(filtered_data);
}*/

/*Slider*/
/*function controlFromInput(fromInput, toInput) {
console.log(fromInput.value, toInput.value);
}
    
function controlToInput(fromInput, toInput) {
   console.log(fromInput.value, toInput.value);
}

let fromInput = document.querySelector('#fromInput');
let toInput = document.querySelector('#toInput');

fromInput.oninput = () => controlFromInput(fromInput, toInput);
toInput.oninput = () => controlToInput(fromInput, toInput);*/
