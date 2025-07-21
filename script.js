// Variáveis
let DVIcontainer = document.getElementById("DVIcontainer");
let dados = [];
let dados_atuais = [];
let hovered_DVI;

let show_info = [];
let hover_info = [];

let DVIcounter = 0;
let img_width = 200;
let img_height = 200;
let name_font_size = 20;
let year_designer_font_size = 16;

let active_filters = [];
let allFilterValues = {
  4: ["art", "media", "design", "commerce", "technology"],
  5: ["Anyone", "Members/Clients", "Students", "Staff", "Attendees", "Guest Artists"],
  6: ["One person", "Multiple people"],
  7: ["Voluntary", "Involuntary", "Mixed"],
  8: ["Intended", "Emergent"],
  9: ["During the Design Process", "After the Design Process"],
  10: ["Anywhere", "Outside", "Events", "Home", "Museums/Galleries", "Workshops", "Entity Location"],
  11: ["Physical", "Mobile", "Computer", "Installation"],
  12: ["Text", "Object Manipulation", "Drawing or Writing", "Data", "Parameters/Options", "Audio or Video Capture", "Image"],
  13: ["Content", "Shape", "Color", "Positioning", "Combination", "Repetition", "Rotation", "Scaling"],
  14: ["Logotype", "Symbol", "System's Element", "System"],
  15: ["Element Creation", "Element Manipulation", "Element Combination", "Element Reactivity"],
  16: ["Overall Usage", "Product Packaging", "Digital Content", "social Media Content", "Printed Materials", "Merchandise", "Installation"],
  17: ["The Public", "A Group of People", "Just the Individual"],
  18: ["System", "Extension"]
};

let fromInput = document.querySelector('#fromInput');
let toInput = document.querySelector('#toInput');
let searchInput = document.querySelector('#searchInput'); // your search box


// Processamento de dados
function data() {
  Papa.parse("assets/data3.csv", {
    download: true,
    skipEmptyLines: true,
    complete: csv => {
      dados = csv.data;
      dados_atuais = dados;
      console.log(dados);
      display_DVI(dados);
    }
  });
}

// Display de Identidades
function display_DVI(d) {
  while (DVIcontainer.firstChild) {
    DVIcontainer.removeChild(DVIcontainer.lastChild);
  }
  show_info = [];
  hover_info = [];
  DVIcounter = d.length-1;

  let counter = document.createElement("div");
  counter.innerHTML = "<span> Available DVI's:" + " " + DVIcounter + "</span>";
  counter.classList.add("DVI_counter");
  DVIcontainer.appendChild(counter);

  for (let i = 0; i < d.length; i++) {
    let DVI = document.createElement("div");
    DVI.classList.add("DVI_Display");
    DVI.id = "DVI" + i;

    if (DVI.id !== "DVI0") {
      DVIcontainer.appendChild(DVI);
      DVI.innerHTML = `<img src='images/${d[i][0]} Img.jpg' width='${img_width}' height='${img_height}'>`;
    }

    let info_container = document.createElement("div");
    info_container.id = "container" + i;
    info_container.classList.add("preview_hidden");
    DVI.appendChild(info_container);

    show_info[i] = false;

    let hover_container = document.createElement("div");
    hover_container.id = "hover" + i;
    hover_container.classList.add("hover_preview");
    DVI.appendChild(hover_container);

    hover_info[i] = false;

    DVI.addEventListener('click', () => display_info(i, d));
    DVI.addEventListener('mouseover', () => MouseOver(i, d));
    DVI.addEventListener('mouseout', () => MouseOut(i));
  }
}

// Redimensionar Identidades
function img_increase() {
  if (img_width < 700) {
    img_width += 50;
    img_height += 50;
    name_font_size += 4;
    year_designer_font_size += 4;
  }
  display_DVI(dados_atuais);
}

function img_reduce() {
  if (img_width > 150) {
    img_width -= 50;
    img_height -= 50;
    name_font_size -= 4;
    year_designer_font_size -= 4;
  }
  display_DVI(dados_atuais);
}

// On Hover
function MouseOver(IDn, d) {
  hovered_DVI = document.getElementById("hover" + IDn);

  if (!hover_info[IDn]) {
    hover_info[IDn] = true;
    for (let i = 0; i < 3; i++) {
      let DVI_hovered_info = document.createElement("div");
      DVI_hovered_info.id = "hoverID" + i;
      DVI_hovered_info.classList.add("info_preview");

      DVI_hovered_info.innerHTML = (i === 1 ? d[IDn][i] + "," : d[IDn][i]);
      DVI_hovered_info.style.fontSize = (i === 0) ? name_font_size + "px" : year_designer_font_size + "px";
      hovered_DVI.appendChild(DVI_hovered_info);
    }
  }
}

function MouseOut(IDn) {
  hovered_DVI = document.getElementById("hover" + IDn);
  while (hovered_DVI.firstChild) {
    hovered_DVI.removeChild(hovered_DVI.lastChild);
  }
  hover_info[IDn] = false;
}

// Vista detalhada da Identidade
function close_info(IDn) {
  let clicked_DVI = document.getElementById("container" + IDn);
  if (!clicked_DVI) return;
  while (clicked_DVI.firstChild) {
    clicked_DVI.removeChild(clicked_DVI.lastChild);
  }
  show_info[IDn] = false;
  clicked_DVI.classList.remove("preview");
  clicked_DVI.classList.add("preview_hidden");
  document.body.classList.remove("no-scroll");
}

function display_info(IDn, d) {
  let clicked_DVI = document.getElementById("container" + IDn);
  if (!show_info[IDn]) {
    show_info[IDn] = true;
    clicked_DVI.classList.add("preview");
    clicked_DVI.classList.remove("preview_hidden");
    document.body.classList.add("no-scroll");

    let header = document.createElement("div");
    header.classList.add("header_container");
    clicked_DVI.appendChild(header);

    let gallery_container = document.createElement("div");
    gallery_container.classList.add("gallery_container");
    clicked_DVI.appendChild(gallery_container);

    let image_wrapper = document.createElement("div");
    image_wrapper.classList.add("image_wrapper");
    gallery_container.appendChild(image_wrapper);

    let currentIndex = 0;
    let totalImages = 0;
    let maxTry = 20;

    let dots_container = document.createElement("div");
    dots_container.classList.add("dots_container");

    let controls_container = document.createElement("div");
    controls_container.classList.add("controls_container");

    let prevBtn = document.createElement("button");
    prevBtn.innerText = "<";
    prevBtn.classList.add("carousel_arrow");
    prevBtn.addEventListener("click", () => {
      updateCarousel((currentIndex - 1 + totalImages) % totalImages);
    });

    let nextBtn = document.createElement("button");
    nextBtn.innerText = ">";
    nextBtn.classList.add("carousel_arrow");
    nextBtn.addEventListener("click", () => {
      updateCarousel((currentIndex + 1) % totalImages);
    });

    controls_container.appendChild(prevBtn);
    controls_container.appendChild(dots_container);
    controls_container.appendChild(nextBtn);

    gallery_container.appendChild(controls_container);

    function loadImage(index) {
      if (index >= maxTry) {
        if (totalImages > 0) initCarousel();
        return;
      }
      let imgSrc = `collections/${d[IDn][0]}/${index}.jpg`;
      let testImg = new Image();
      testImg.onload = () => {
        totalImages++;
        testImg.classList.add("carousel_image");
        if (totalImages === 1) testImg.classList.add("active");
        image_wrapper.appendChild(testImg);

        let dot = document.createElement("span");
        dot.classList.add("dot");
        if (totalImages === 1) dot.classList.add("active");
        dot.dataset.index = totalImages - 1;
        dot.addEventListener("click", e => {
          updateCarousel(parseInt(e.target.dataset.index));
        });
        dots_container.appendChild(dot);

        loadImage(index + 1);
      };
      testImg.onerror = () => { if (totalImages > 0) initCarousel(); };
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

    function initCarousel() { currentIndex = 0; }
    loadImage(0);

    let info_background = document.createElement("div");
    info_background.classList.add("body_container");
    let info_container = document.createElement("div");
    info_container.classList.add("info_container");
    clicked_DVI.appendChild(info_background);
    info_background.appendChild(info_container);

    for (let i = 0; i < d[0].length; i++) {
      let DVI_info = document.createElement("div");
      DVI_info.id = "info" + i;
      if (i < 3) {
        header.appendChild(DVI_info);
        DVI_info.innerHTML = (i === 1 ? d[IDn][i] + "," : d[IDn][i]);
      } else {
        DVI_info.innerHTML = d[IDn][i];
        info_container.appendChild(DVI_info);
        DVI_info.classList.add("info_preview");
      }
    }

    let DVI_close = document.createElement("div");
    DVI_close.innerHTML = "X";
    DVI_close.classList.add("info_preview");
    DVI_close.id = "close_bttn" + IDn;
    clicked_DVI.appendChild(DVI_close);

    DVI_close.addEventListener("click", e => {
      e.stopPropagation();
      close_info(IDn);
      MouseOut(IDn);
    });
  }
}

// Sistema de Filtros
function filters(filterID, filter_value) {
  let found = false;
  for (let i = 0; i < active_filters.length; i++) {
    if (filterID === active_filters[i][0]) {
      let values = active_filters[i][1];
      let index = values.indexOf(filter_value);
      if (index === -1) {
        values.push(filter_value);
        document.getElementById(filter_value + filterID).classList.add("active");
      } else {
        values.splice(index, 1);
        document.getElementById(filter_value + filterID).classList.remove("active");
        if (values.length === 0) active_filters.splice(i, 1);
      }
      found = true;
      break;
    }
  }
  if (!found) {
    active_filters.push([filterID, [filter_value]]);
    document.getElementById(filter_value + filterID).classList.add("active");
  }
  f_data(dados);
}

function f_data(d) {
  if (!d || d.length === 0) return;

  let header = d[0];
  let filtered_data = d.slice(1);

  // Categoria
  for (let [filterType, filterValues] of active_filters) {
    filtered_data = filtered_data.filter(row => {
      let cell = row[filterType];
      if (!cell) return false;
      let values = cell.split(",").map(x => x.trim());
      return filterValues.every(fv => values.includes(fv));
    });
  }

  // Intervalo de anos
  let from = parseInt(fromInput.value);
  let to = parseInt(toInput.value);
  if (!isNaN(from) && !isNaN(to)) {
    filtered_data = filtered_data.filter(row => {
      let year = parseInt(row[1]);
      return !isNaN(year) && year >= from && year <= to;
    });
  }

  // Pesquisa (topnav)
  let searchValue = searchInput.value.toLowerCase();
  if (searchValue) {
    filtered_data = filtered_data.filter(row => {
      let name = row[0]?.toLowerCase() ?? "";
      let designer = row[2]?.toLowerCase() ?? "";
      return name.includes(searchValue) || designer.includes(searchValue);
    });
  }

  filtered_data.unshift(header);
  dados_atuais = filtered_data;
  display_DVI(dados_atuais);
  updateFilterStates(filtered_data);
}

//Update do Estado de cada filtro
function updateFilterStates(currentFilteredData) {
  let data = currentFilteredData.slice(1);
  if (active_filters.length === 0) {
    for (let filterID in allFilterValues) {
      for (let value of allFilterValues[filterID]) {
        let el = document.getElementById(value + filterID);
        if (el) { el.classList.remove("locked"); el.disabled = false; }
      }
    }
    return;
  }
  for (let filterID in allFilterValues) {
    for (let value of allFilterValues[filterID]) {
      let el = document.getElementById(value + filterID);
      if (!el) continue;
      let isActive = active_filters.some(([fID, values]) => fID == filterID && values.includes(value));
      if (isActive) {
        el.classList.add("active");
        el.classList.remove("locked");
        el.disabled = false;
        continue;
      }
      let found = data.some(row => {
        let cell = row[filterID];
        if (!cell) return false;
        let values = cell.split(",").map(v => v.trim());
        return values.includes(value);
      });
      if (found) {
        el.classList.remove("locked");
        el.disabled = false;
      } else {
        el.classList.add("locked");
        el.disabled = true;
      }
    }
  }
}

// Input Triggers
fromInput.oninput = () => f_data(dados);
toInput.oninput = () => f_data(dados);
searchInput.oninput = () => f_data(dados);

data();



























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