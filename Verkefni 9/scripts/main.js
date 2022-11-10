import { createSearchInput, fetchAndRenderBook, renderFrontpage, searchAndRender } from "./lib/ui.js";
const header = document.querySelector(".layout__header");
const main = document.querySelector(".layout__main");



async function onSearch(e) {
  e.preventDefault();

  const formData = new FormData(e.target)
  const bookString = formData.get('book')

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("query", bookString);
  const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
  history.pushState(null, '', newRelativePathQuery);


  searchAndRender(main, searchForm, bookString)


}

const searchForm = createSearchInput(onSearch);

header.appendChild(searchForm);



/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir viðeigandi
 * gögn. Ef `id` er gefið er bók birt, ef `query` er gefið er leitarniðurstaða
 * birt, annars er forsíða birt.
 */
async function route() {
  const queryString = window.location.search;

  if (queryString.substring(0,4) === '?id=') {
    await fetchAndRenderBook(main,searchForm, queryString.substring(4))
  }
  else if (queryString.substring(0,7) === '?query=') {
    await searchAndRender(main, searchForm, queryString.substring(7))
  }
  else {
    renderFrontpage(main)
  }
}

/**
 * Bregst við því þegar við notum vafra til að fara til baka eða áfram.
 */
window.onpopstate = () => {
  /* TODO útfæra */
  route()
};

// Athugum í byrjun hvað eigi að birta.
route();