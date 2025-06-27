//Constantes
let DVIcontainer = document.getElementById("DVIcontainer");
let dados = [];
let dados_atuais = [];
let DVI;
let DVI_info;
let DVI_hovered_info;
let hovered_DVI;
//let clicked_DVI
let DVI_close;

let show_info = [];
let hover_info = [];

let img_width = 200;
let img_height = 200;
let name_font_size = 20;
let year_designer_font_size = 16;

let active_filters = [];
let allFilterValues = {
  4: ["art", "media", "design", "commerce", "technology"],
  5: [
    "anyone",
    "members/clients",
    "students",
    "staff/workers",
    "event participants",
    "guest artists"
  ],
  6: ["one person", "multiple people", "one or multiple"],
  7: ["voluntary", "involuntary"],
  8: ["intended", "emergent"],
  9: ["anytime", "in specific moments", "design process"],
  10: [
    "anywhere",
    "street",
    "events",
    "home/private environment",
    "museums/galleries",
    "establishments",
    "work place"
  ],
  11: [
    "free",
    "physical materials",
    "mobile device",
    "computer",
    "installation"
  ],
  12: [
    "text",
    "object manipulation",
    "drawing or writing",
    "data",
    "paramethers/options12",
    "audio or video capture12",
    "image"
  ],
  13: [
    "content variation",
    "shape variation",
    "color variation",
    "position",
    "combination",
    "repetition",
    "rotation",
    "scaling"
  ],
  14: ["logotype", "symbol", "system", "system´s element"],
  15: [
    "element creation",
    "element conjugation",
    "reactivity",
    "paramether/option manipulation"
  ],
  16: [
    "overall usage",
    "product packaging",
    "website/app content",
    "social media content",
    "printed materials",
    "merchandise",
    "installation"
  ],
  17: ["public", "private", "individual"],
  18: ["system", "extension"]
};


let fromInput = document.querySelector('#fromInput');
let toInput = document.querySelector('#toInput');

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
        DVI.addEventListener('mouseout', () => MouseOut(i));

        //console.log(DVI.getAttribute('ID-number'));
    }

        //console.log(show_info);

}

//Tamanho das Imagens

function img_increase(){
    if(img_width<700){
    img_width = img_width + 50;
    img_height = img_height + 50;

    name_font_size = name_font_size + 4;
    year_designer_font_size = year_designer_font_size + 4;
    }
    display_DVI(dados_atuais);
}

function img_reduce(){

    console.log("-");

    if(img_width>150){
    img_width = img_width - 50;
    img_height = img_height - 50;

    name_font_size = name_font_size - 4;
    year_designer_font_size = year_designer_font_size - 4;
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
            DVI_hovered_info.id = "hoverID" + i;

            if(i == 1){
                DVI_hovered_info.innerHTML = d[IDn][i] + ",";
            } else{
                DVI_hovered_info.innerHTML = d[IDn][i];
            }
                DVI_hovered_info.classList.add("info_preview");



            if(i === 0){
                DVI_hovered_info.style.fontSize =  name_font_size+"px";
            } else{
                DVI_hovered_info.style.fontSize =  year_designer_font_size+"px";
            }
    }

}

}

function MouseOut(IDn) {
    hovered_DVI = document.getElementById("hover" + IDn);
    while (hovered_DVI && hovered_DVI.firstChild) {
        hovered_DVI.removeChild(hovered_DVI.lastChild);
    }
    hover_info[IDn] = false;
}


//On Click
// Close info function outside display_info
function close_info(IDn) {
    let clicked_DVI = document.getElementById("container" + IDn);
    if (!clicked_DVI) return;

    // Remove all children safely
    while (clicked_DVI.firstChild) {
        clicked_DVI.removeChild(clicked_DVI.firstChild);
    }

    show_info[IDn] = false;
    clicked_DVI.classList.remove("preview");
    clicked_DVI.classList.add("preview_hidden");
    document.body.classList.remove("no-scroll");

    console.log("triggered", show_info[IDn]);
}

// display_info function with gallery and close button
function display_info(IDn, d) {
    let clicked_DVI = document.getElementById("container" + IDn);
    console.log(clicked_DVI);

    if (show_info[IDn] === false) {
        console.log("triggered", show_info[IDn]);
        show_info[IDn] = true;
        clicked_DVI.classList.add("preview");
        clicked_DVI.classList.remove("preview_hidden");
        document.body.classList.add("no-scroll");

        // Header container
        let header = document.createElement("div");
        header.classList.add("header_container");
        clicked_DVI.appendChild(header);

        // Gallery
        let gallery_container = document.createElement("div");
        clicked_DVI.appendChild(gallery_container);
        gallery_container.classList.add("gallery_container");

        let image_wrapper = document.createElement("div");
        image_wrapper.classList.add("image_wrapper");
        gallery_container.appendChild(image_wrapper);

        let dots_container = document.createElement("div");
        dots_container.classList.add("dots_container");
        gallery_container.appendChild(dots_container);

        let currentIndex = 0;
        let totalImages = 0; 
        let maxTry = 20;    

function loadImage(index) {
  if (index >= maxTry) {
    if (totalImages > 0) initCarousel();
    return; 
  }

  let imgSrc = "collections/" + d[IDn][0] + "/" + index + ".jpg";
  let testImg = new Image();

  testImg.onload = () => {
    totalImages++;
    
    // Wrapper
    testImg.classList.add("carousel_image");
    if (totalImages === 1) testImg.classList.add("active");
    image_wrapper.appendChild(testImg);

    // Dot
    let dot = document.createElement("span");
    dot.classList.add("dot");
    if (totalImages === 1) dot.classList.add("active");
    dot.dataset.index = totalImages - 1;
    dot.addEventListener("click", (e) => {
      let newIndex = parseInt(e.target.dataset.index);
      updateCarousel(newIndex);
    });
    dots_container.appendChild(dot);

    loadImage(index + 1); // Try next image
  };

  testImg.onerror = () => {
    // No more images found, initialize carousel if we have any images
    if (totalImages > 0) initCarousel();
  };

  testImg.src = imgSrc;
}

function updateCarousel(newIndex) {
  let images = image_wrapper.querySelectorAll(".carousel_image");
  let dots = dots_container.querySelectorAll(".dot");

  images[currentIndex].classList.remove("active");
  dots[currentIndex].classList.remove("active");

  currentIndex = newIndex;

  images[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active");
}

let prevBtn = document.createElement("button");
prevBtn.innerText = "<";
prevBtn.addEventListener("click", () => {
  updateCarousel((currentIndex - 1 + totalImages) % totalImages);
});
gallery_container.insertBefore(prevBtn, image_wrapper);

let nextBtn = document.createElement("button");
nextBtn.innerText = ">";
nextBtn.addEventListener("click", () => {
  updateCarousel((currentIndex + 1) % totalImages);
});
gallery_container.appendChild(nextBtn);

function initCarousel() {
  if (totalImages === 0) return; // no images found, do nothing
  currentIndex = 0;
}

loadImage(0);  // start loading images from index 0


         // Container do Resto da informação
        let info_body = document.createElement("div");
        info_body.classList.add("body_container");
        clicked_DVI.appendChild(info_body);

        // Display info text
        for (let i = 0; i < d[0].length; i++) {
            let DVI_info = document.createElement("div");
            DVI_info.id = "info" + i;

            if (i < 3) {
                header.appendChild(DVI_info);
                if (i === 1) {
                    DVI_info.innerHTML = d[IDn][i] + ",";
                } else {
                    DVI_info.innerHTML = d[IDn][i];
                }
            } else {
                DVI_info.innerHTML = d[IDn][i];
                info_body.appendChild(DVI_info);
                DVI_info.classList.add("info_preview");
            }
        }

        // Close button
        let DVI_close = document.createElement("div");
        DVI_close.innerHTML = "X";
        DVI_close.classList.add("info_preview");
        DVI_close.id = "close_bttn" + IDn;
        clicked_DVI.appendChild(DVI_close);

        // Close button event listener
        //DVI_close.addEventListener('click', () => close_info(IDn));

        DVI_close.addEventListener("click", (event) => {
            event.stopPropagation();  // <-- key fix here
            close_info(IDn);

             // Hide hover info if any
            MouseOut(IDn);
        });


    }
}


//FILTROS
function filters(filterID, filter_value) {
    let found = false;

    for (let i = 0; i < active_filters.length; i++) {
        if (filterID === active_filters[i][0]) {
            let values = active_filters[i][1];
            let index = values.indexOf(filter_value);

            if (index === -1) {
                // Adicionar valor (opção)
                values.push(filter_value);
                document.getElementById(filter_value+filterID).classList.add("active");
            } else {
                // Remover valor
                values.splice(index, 1);
                document.getElementById(filter_value+filterID).classList.remove("active");

                // Remover o filtro (0 opções escolhidas)
                if (values.length === 0) {
                    active_filters.splice(i, 1);
                }
            }
            found = true;
            break;
        }
    }

    if (!found) {
        active_filters.push([filterID, [filter_value]]);
        document.getElementById(filter_value+filterID).classList.add("active");
    }

    f_data(dados);
}

// Filter and display data
function f_data(d) {
    if (!d || d.length === 0) return;

    const header = d[0];
    let filtered_data = d.slice(1); // remove header

    // Categorias
    for (let i = 0; i < active_filters.length; i++) {
        let [filterType, filterValues] = active_filters[i];

        filtered_data = filtered_data.filter(row => {
            const cellValue = row[filterType];

            if (!cellValue) return false;

            // Vários valores por coluna
            const values = cellValue.split(',').map(v => v.trim());

            // Interseção de filtros ativos
            return filterValues.every(fv => values.includes(fv));
        });
    }

    // Espetro de anos
    const from = parseInt(fromInput.value);
    const to = parseInt(toInput.value);

    if (!isNaN(from) && !isNaN(to)) {
        filtered_data = filtered_data.filter(row => {
            const year = parseInt(row[1]);
            return !isNaN(year) && year >= from && year <= to;
        });
    }

    // Add header back
    filtered_data.unshift(header);
    dados_atuais = filtered_data;

    console.log("Filtered data:", dados_atuais);
    display_DVI(dados_atuais);

    updateFilterStates(filtered_data);
}

function updateFilterStates(currentFilteredData) {
    // exclui cabeçalho
    const data = currentFilteredData.slice(1);

    // Quando não há nenhum filtro ativo
    if (active_filters.length === 0) {
        for (let filterID in allFilterValues) {
            for (let value of allFilterValues[filterID]) {
                const element = document.getElementById(value + filterID);
                if (element) {
                    element.classList.remove("locked");
                    element.disabled = false;
                }
            }
        }
        return; 
    }

    for (let filterID in allFilterValues) {
        for (let value of allFilterValues[filterID]) {
            const element = document.getElementById(value + filterID);
            if (!element) continue;

            const isActive = active_filters.some(
                ([fID, values]) => {
                    return fID.toString().trim() === filterID.toString().trim() && values.includes(value);
                 }
            );



            if (isActive) {
                console.log(element);
                element.classList.remove("locked");
                element.classList.add("active");
                element.disabled = false;
                continue;
            }

            // verifica se aparece nos dados filtrados
            const found = data.some(row => {
                const cellValue = row[filterID];
                if (!cellValue) return false;
                const values = cellValue.split(',').map(v => v.trim());
                return values.includes(value);
            });

            if (found) {
                element.classList.remove("locked");
                element.disabled = false;
            } else {
                element.classList.add("locked");
                element.disabled = true;
            }
        }
    }
}




// Trigger filtering when range inputs change
fromInput.oninput = () => f_data(dados);
toInput.oninput = () => f_data(dados);


























/* CÓDIGO ANTIGO QUE FOI MELHORADO PELO CHATGPT


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
        dados_atuais = d;
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
    dados_atuais = filtered_data;
    display_DVI(filtered_data);
}


/*Slider*/
/*function controlFromInput(fromInput, toInput) {
console.log(fromInput.value, toInput.value);
}
    
function controlToInput(fromInput, toInput) {
   console.log(fromInput.value, toInput.value);
}*/

/*let fromInput = document.querySelector('#fromInput');
let toInput = document.querySelector('#toInput');

fromInput.oninput = () => filter_year(fromInput, toInput, dados);
toInput.oninput = () => filter_year(fromInput, toInput, dados);

function filter_year(fromInput, toInput, d){
    let filtered_data = [];
    
    for(let i = 0; i < d.length; i++){
           if(d[i][1] == "year" || d[i][1]>=fromInput.value && d[i][1]<=toInput.value){
            filtered_data.push(d[i]);
           }
    }

    console.log(fromInput.value, toInput.value);
    dados_atuais = filtered_data;
    display_DVI(dados_atuais);
    console.log(dados_atuais);
}







CÓDIGO AINDA MAIS ANTIGO

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