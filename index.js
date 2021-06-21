const TMDB_ENDPOINT = "https://api.themoviedb.org/3";
const APIKEY = "087d40cd76f8efab563b10d15f9a6ae2";
const IMG_PREFIX = "https://image.tmdb.org/t/p/w500";
let xhr;
let xhr2;

carregaFilmesLancamentos();
carregaFilmesPopulares();

// filmes - Populares - Início //

function carregaFilmesPopulares() {
    xhr = new XMLHttpRequest();

    xhr.open( 
    "GET", TMDB_ENDPOINT + "/movie/popular" + "?api_key=" + APIKEY + "&language=pt-BR",
    true
    );
    xhr.onload = exibeFilmesPopulares;
    xhr.send();
}

function exibeFilmesPopulares() {
    let data = JSON.parse(xhr.responseText);
    let textoHTML = "";

    for (let i = 0; i < 3; i++) {
        let nomeFilme = data.results[i].title;
        let sinopse = data.results[i].overview;
        let imagem = IMG_PREFIX + data.results[i].poster_path;
        let id = data.results[i].id;
        let estreia = data.results[i].release_date;
        let nota = data.results[i].vote_average;
    
        textoHTML += `
        <div id="cartao" class="card col-md-4 ">
          <img src="${imagem}" class="card-img-top" alt="...">
          <div class="card-body">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${id}">Visualizar mais</button>
          </div>
        </div>
        <div class="modal fade" id="exampleModal${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${nomeFilme}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            <div class="modal-body">
              <strong>Resumo: </strong>${sinopse}<br>
              <strong>Estreia: </strong>${estreia}<br>
              <strong>Nota: </strong>${nota}<br>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
      </div>
    </div>
            `;
      }

    document.getElementById("popular").innerHTML = textoHTML;
}   



// filmes - Populares - Fim //

// filmes - Pesquisa - Início //

function pesquisa1 (){
    query = document.getElementById('pesquisaF').value;
    localStorage.setItem('pesquisa',JSON.stringify(query))
}

// filmes - Pesquisa - Fim //

// filmes - Lançamentos - Início //


function carregaFilmesLancamentos() {
    
    xhr2 = new XMLHttpRequest();

    xhr2.open("GET", TMDB_ENDPOINT + "/movie/upcoming" + "?api_key=" + APIKEY + "&language=pt-BR", true);
    xhr2.onload = exibeFilmesLancamentos;
    xhr2.send();
}

function exibeFilmesLancamentos() {
    console.log(this.responseText)
    let data = JSON.parse(xhr2.responseText);
    let textoHTML = "";
    for (let i = 0; i < 3; i++) {
    let imagem = IMG_PREFIX + data.results[i].poster_path;
    let titulo = data.results[i].title;
    let resumo = data.results[i].overview;
    let estreia = data.results[i].release_date;
    let nota = data.results[i].vote_average;

    textoHTML = `
        
            <div class="row">
                <div class="col-xs-12 col-md-6 col-lg-6 imagem_lancamentos">
                <img src="${imagem}" id="ftc" alt="...">
            </div>
            <div class="col-xs-12 col-md-6 col-lg-6 texto_lancamentos">
                <h2>${titulo}</h2>
                <p>${resumo}</p>
                <strong><h4>Estreia</h4></strong>
                <p>${estreia}</p>
                <strong><h4>Avaliação</h4></strong>
                <p>${nota}</p>
            </div>
        
        `
        let elemento = document.getElementById(`car${i}`)
        elemento.innerHTML = textoHTML;
        console.log(elemento)
    }
    
}   

// filmes - Lançamentos - Fim //