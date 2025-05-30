//Constantes
let DVIcontainer = document.getElementById("DVIcontainer");
let dados;
let DVI;
let DVI_info;

//let show_info = [];

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


function display_DVI(d){
    console.log(d);
for(let i = 0; i < d.length; i++){
        DVI = document.createElement("div");
        DVI.innerHTML = "Eu Sou Uma DVI" + " " + i;
        DVI.classList.add("DVI_Display");
        DVI.id = "DVI"+i;

        if(DVI.id != "DVI0"){
        DVIcontainer.appendChild(DVI);
        }
        

        //console.log(DVI.id);

        //Ver Informação
        DVI.addEventListener('click', () => display_info(i, d));

        //console.log(DVI.getAttribute('ID-number'));
    }
}

function display_info(IDn, d){
    
    //console.log(document.getElementById("DVI"+IDn));

    for(let i = 0; i < d[0].length; i++){
        console.log(d[0][i]);

         DVI_info = document.createElement("div");

            let clicked_DVI = document.getElementById("DVI"+IDn)
            clicked_DVI.appendChild(DVI_info);

            DVI_info.innerHTML = d[IDn][i];
            DVI_info.classList.add("preview");
    }
}

function filter_year(y, d){
    //console.log(d.length);
    
    for(let i = 0; i < d.length; i++){
           //console.log(d[i][1]);
           //console.log(i);

           if(d[i][1] == y){
            //console.log(d[i]);
            let filtered_data = d[i]
            console.log(filtered_data);
           }
    }
}

/*function main(d){

    //Inserir numa Tabela
    let table = document.getElementById("container");
    table.innerHTML = "";

    //Indice da linha e celula
    let l_index = 0;

//Desenhar Linhas
        for(let row of d){
        l_index ++;

            let tr = table.insertRow();
            //console.log(tr);
            tr.classList.add("row");
            tr.innerHTML = "Cell";
            tr.setAttribute("row-number", l_index);

            //console.log(l_index);

           //Popular o Array de "Booleans"
           show_info.length = row.length;
            for(let i = 0; i < show_info.length; i++){
                show_info[i] = 0;
            }
            
            tr.addEventListener('click', () => info(tr.getAttribute('row-number')));

            //console.log(row);

            function info(rn){
            
            for(let cell of row){

               let td = tr.insertCell();
                td.innerHTML = cell;

                td.classList.add("preview");
                td.classList.remove("preview_hide");
            }
            }




        }


}*/




