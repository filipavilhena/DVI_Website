//Constantes
let DVIcontainer = document.getElementById("DVIcontainer");
let dados;
let DVI;
let DVI_info;

let show_info = [];

//Ir buscar a Informação
function data(){
Papa.parse("assets/data.csv", {
	download: true,
    skipEmptyLines: true,
    
    complete: csv => {
    //console.log(csv.data);
    dados = csv.data; //Variável com os Dados

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

    for(let i = 0; i < d.length; i++){
        DVI = document.createElement("div");
        DVI.innerHTML = "Eu Sou Uma DVI" + " " + i;
        DVI.classList.add("DVI_Display");
        DVI.id = "DVI"+i;

        if(DVI.id != "DVI0"){
            DVIcontainer.appendChild(DVI);
        }

        let info_container = document.createElement("div");
        info_container.id = "container"+i;
        DVI.appendChild(info_container);

        show_info.length = d.length;
        show_info[i] = false;
        //console.log(DVI.id);

        //Ver Informação
        DVI.addEventListener('click', () => display_info(i, d));

        //console.log(DVI.getAttribute('ID-number'));
    }

        //console.log(show_info);

}

//Display de Informação
function display_info(IDn, d){
    //console.log(document.getElementById("DVI"+IDn));
    let clicked_DVI = document.getElementById("container"+IDn)

if(show_info[IDn] == false){
    show_info[IDn] = true;

    for(let i = 0; i < d[0].length; i++){
        //console.log(d[i]);

            DVI_info = document.createElement("div");
            clicked_DVI.appendChild(DVI_info);

            DVI_info.innerHTML = d[IDn][i];
            DVI_info.classList.add("preview");
    }

//Fechar a informação
   let DVI_close = document.createElement("div");
    DVI_close.innerHTML = "X";
    DVI_close.classList.add("preview");
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
    }
    
}

//FILTROS

//Ano
function filter_year(y, d){
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
    display_DVI(filtered_data);
}




