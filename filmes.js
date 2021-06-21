const TMDB_ENDPOINT = "https://api.themoviedb.org/3";
const APIKEY = "087d40cd76f8efab563b10d15f9a6ae2";
const IMG_PREFIX = "https://image.tmdb.org/t/p/w500";
let xhr;
let pesquisaPag = localStorage.getItem("pesquisa");

carregaFilmes();
pesquisaPagInicial();

function carregaFilmes() {
  xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    TMDB_ENDPOINT + "/movie/popular" + "?api_key=" + APIKEY + "&language=pt-br",
    true
  );
  xhr.onload = exibeFilmes;
  xhr.send();
}

function pesquisaFilmes() {
  xhr = new XMLHttpRequest();

  query = document.getElementById("pesquisa").value;

  xhr.open(
    "GET",
    TMDB_ENDPOINT +
      "/search/movie" +
      "?api_key=" +
      APIKEY +
      "&query=" +
      query +
      "&language=pt-BR",
    true
  );
  xhr.onload = exibeFilmes;
  xhr.send();
}

function exibeFilmes() {
  let data = JSON.parse(xhr.responseText);
  let textoHTML = "";

  for (let i = 0; i < data.results.length; i++) {
    let nomeFilme = data.results[i].title;
    let sinopse = data.results[i].overview;
    let imagem = IMG_PREFIX + data.results[i].poster_path;
    let id = data.results[i].id;
    let estreia = data.results[i].release_date;
    let nota = data.results[i].vote_average;

    textoHTML += `
    <div id="cartao2" class="card col-md-4">
      <img src="${imagem}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${nomeFilme}</h5>
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

  document.getElementById("tela").innerHTML = textoHTML;
}

function pesquisaPagInicial() {
  if (localStorage.getItem("pesquisa")) {
    xhr = new XMLHttpRequest();

    query = pesquisaPag;

    xhr.open(
      "GET",
      TMDB_ENDPOINT +
        "/search/movie" +
        "?api_key=" +
        APIKEY +
        "&query=" +
        query +
        "&language=pt-BR",
      true
    );
    xhr.onload = exibeFilmes;
    xhr.send();
    localStorage.removeItem("pesquisa");
  } else {
    xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      TMDB_ENDPOINT +
        "/movie/popular" +
        "?api_key=" +
        APIKEY +
        "&language=pt-br",
      true
    );
    xhr.onload = exibeFilmes;
    xhr.send();
  }
}