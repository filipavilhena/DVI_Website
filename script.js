//Constantes
let dados;
let show_info = [];

//Ir buscar a Informação
function data(){
Papa.parse("assets/data.csv", {
	download: true,
    skipEmptyLines: true,
    
    complete: csv => {
    //console.log(csv.data);
    dados = csv.data;
    main(dados);
    }
});
}

function main(d){

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


}




