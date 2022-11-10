import { getBook, searchBooks } from "./books.js";
import { empty, el } from "./helpers.js";

/**
 * Setur „loading state“ skilabað meðan gögn eru sótt.
 * @param {element} main Element sem á að birta skilbaoð í.
 * @param {element} searchForm Leitarform sem á að gera óvirkt.
 */
function setLoading(main, searchForm) {
  /* TODO útfæra */

  const tag = document.createElement("p");
  const text = document.createTextNode("Sæki gögn...");
  tag.appendChild(text);
  main.appendChild(tag);

  const elements = searchForm.elements;
  for (let i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
  }
}

/**
 * Fjarlægir „loading state“.
 * @param {element} main Element sem á að tæma.
 * @param {element} searchForm Leitarform sem á að gera virkt.
 */
function setNotLoading(main, searchForm) {
  /* TODO útfæra */

  const elements = searchForm.elements;
  for (let i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = false;
  }

  empty(main);
}

/**
 * Útbýr leitarform og skilar elementi.
 * @param {function} searchHandler Event handler fyrir leit.
 * @returns Element fyrir leitarform.
 */
export function createSearchInput(searchHandler) {
  const formEl = document.createElement("form");

  formEl.appendChild(
    el("input", {
      name: "book",
      type: "search",
      placeholder: "Leitaðu að höfundi eða bók",
      style: "width: 200px",
    })
  );
  formEl.appendChild(el("button", {}, "Leita"));

  formEl.addEventListener("submit", searchHandler);

  return formEl;
}

/**
 * Útbýr leitarniðurstöðu með titli, höfundum og ártali þegar bók var fyrst
 * útgefin. Titill er hlekkur yfir á nánari upplýsingar um bókina.
 * @param {object} book Bók sem á að birta leitarniðurstöðu fyrir.
 * @returns Elementi fyrir leitarniðurstöðu.
 */
export function createSearchResult(book) {
  /* TODO útfæra */

  const href = `?id=${book?.key}`;
  const link = el("a", { href: href }, book.title);
  const h2 = el("h2", {}, link);

  let authorString = "";

  book?.author_name?.forEach((author, index) => {
    index === book.author_name.length - 1
      ? (authorString += author)
      : (authorString += `${author}, `);
  });

  const publishDate = book?.first_publish_year
  const authorP = el("p", {}, "Eftir " + authorString);
  const utgefinP = el("p", {}, "Fyrst útgefin " + publishDate);

  const div = el("div", {}, h2);

  div.appendChild(authorP);
  div.appendChild(utgefinP);

  return div;
}

/**
 * Útbýr leitarniðurstöður fyrir leit, birtir eftir hverju var leitað, hvort
 * ekkert hafi fundist, annars listi af niðurstöðum.
 * @param {Array<object>} books Fylki af bókum sem á að birta, gæti verið tómt.
 * @param {string} query Strengur sem leitað var eftir.
 * @returns Elementi með leitarniðurstöðum.
 */
export function createSearchResults(books, query) {
  /* TODO útfæra */
  if (books === null || books?.length === 0) {
    return null;
  }

  let bookElements = [];

  books.forEach((book) => {
    bookElements.push(createSearchResult(book, query));
  });

  return bookElements;
}

/**
 * Útbýr element fyrir öll gögn um bók. Birtir titil fyrir þau gögn sem eru til
 * staðar (ekki tóm fylki) og birtir þau.
 * @param {object} book Gögn fyrir bók sem á að birta.
 * @returns Element sem inniheldur öll gögn um bók.
 */
export function createBook(book) {
  const h1 = el("h1", {}, book?.title);

  // Tekur smá tíma fyrir mynd að hlaðast
  const imgUrl = book?.covers[0];
  const img = el(
    "img",
    { src: `https://covers.openlibrary.org/b/id/${imgUrl}.jpg` },
    ""
  );

  // Fólk section
  const folkH2 = el("h2", {}, "Fólk");
  const folkUl = el("ul", {}, "");

  book?.subject_people?.forEach((person) => {
    folkUl.appendChild(el("li", {}, person));
  });

  // Subject section
  const aboutH2 = el("h2", {}, "Umfjöllunarefni");
  const aboutUl = el("ul", {}, "");

  book?.subjects?.forEach((subject) => {
    aboutUl.appendChild(el("li", {}, subject));
  });

  // Staðir

  const stadirH2 = el("h2", {}, "Staðir");
  const stadirUl = el("ul", {}, "");
  book?.subject_places.forEach((place) => {
    stadirUl.appendChild(el("li", {}, place));
  });

  const div = el("div", {}, "");

  const elList = [
    h1,
    img,
    folkH2,
    folkUl,
    aboutH2,
    aboutUl,
    stadirH2,
    stadirUl,
  ];
  elList.forEach((item) => div.appendChild(item));

  return div;
}

/**
 * Sækir gögn um bók og birtir þau.
 * @param {element} main Element sem á að birta bók í.
 * @param {element} button Leitarform sem á að gera óvirkt meðan bók er sótt.
 * @param {string} id Auðkenni á bók.
 */
export async function fetchAndRenderBook(main, searchForm, id) {
  empty(main);
  setLoading(main, searchForm);
  /* TODO útfæra */
  const book = await getBook(id);

  setNotLoading(main, searchForm);

  const bookComp = createBook(book);

  main.appendChild(bookComp);
}

/**
 * Sækir leitarniðurstöður og birtir þær.
 * @param {element} main Element sem á að birta leitarniðurstöður í.
 * @param {element} button Leitarform sem á að gera óvirkt meðan gögn eru sótt.
 * @param {string} query Leitarstrengur.
 */
export async function searchAndRender(main, searchForm, query) {
  /* TODO útfæra */
  empty(main);
  setLoading(main, searchForm);

  const books = await searchBooks(query);


  setNotLoading(main, searchForm);

  empty(main);
  main.appendChild(el("h2", {}, "Leitarniðurstöður fyrir " + query));

  if (books.length === 0) {
    main.appendChild(el("p", {}, 'Ekkert fannst'))
  }

  else {
    const bookElements = createSearchResults(books, query);

    bookElements.forEach((el) => main.appendChild(el));
  }
}

/**
 * Birtir upplýsingar á forsíðu.
 * @param {element} main Element sem á að birta upplýsingar í.
 */
export function renderFrontpage(main) {
  /* TODO útfæra */

  empty(main);

  main.appendChild(el("p", {}, "Þessi bók notar gögn frá Open Library API"));
}
