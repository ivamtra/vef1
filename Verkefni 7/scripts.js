t MIN_NUM_OF_CUPS = 2;

/** Hámark bolla sem má velja. */
const MAX_NUM_OF_CUPS = 10;

/** Fjöldi spilaðra leikja. */
let played = 0;

/** Fjöldi unnra leikja. */
let won = 0;

/** Fjöldi stiga. */
let points = 0;

/**
 * Athugar hvort gefin tala sé á bilinu [min, max].
 * Prentar út villumeldingu ef talan er ekki
 * lögleg.
 * @param {string | number} numAsString Tala sem á að athuga.
 * @param {number} min Lágmark sem tala má vera.
 * @param {number} max Hámark sem tala má vera.
 * @returns `true` ef tala er innan bils, annars `false`.
 */
function isValidNum(numAsString, min, max) {
  //Óþarfi að converta út af type coercion
  const returnValue = numAsString >= min && numAsString <= max;
  if (!returnValue) console.error(numAsString + " er ekki löglegt gildi.");
  return returnValue;
}

/**
 * Nær í gisk frá notanda.
 *
 * @param {number} numOfCups Heildar fjöldi bolla.
 * @returns `null` ef notandi hætti við, annars vali notanda sem tölu.
 */
function getChoice(numOfCups) {
  /* TODO útfæra */
  return numOfCups;
}

/**
 * Skilar tölu af handahófi á bilinu [min, max].
 *
 * @param {number} min Lágmark bils.
 * @param {number} max Hámark bils.
 * @returns Tala af handahófi á bili [min, max].
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Spilum leik.
 */
function play() {
  do {
    const numOfCups = prompt(`Hve marga bolla?
Verður að vera gildi á bilinu [${MIN_NUM_OF_CUPS}, ${MAX_NUM_OF_CUPS}].
Þú færð N-1 fyrir að finna bolta í N bollum.
Ýttu á cancel eða ESC til að hætta.`);
    if (!isValidNum(numOfCups, MIN_NUM_OF_CUPS, MAX_NUM_OF_CUPS)) return;

    // Ýtt á ESC/Cancel
    if (numOfCups === null) {
      return;
    }
    const cupChosen = prompt(`Hvaða bolta velurðu af ${numOfCups}?`);
    const winnerCup = randomNumber(1, numOfCups);

    if (!isValidNum(cupChosen, 1, numOfCups)) return;

    if (winnerCup == cupChosen) {
      alert("Rétt! þú færð 1 stig.");
      won++;
    } else {
      alert("Rangt boltinn var í bolla númer " + winnerCup);
      console.log(winnerCup);
      console.log(cupChosen);
    }
    const wantsToPlayAgain = confirm("Spila aftur?");
    played++;
    if (!wantsToPlayAgain) return;
  } while (true);
}

/**
 * Birtir stöðu spilara.
 */
function games() {
  /* TODO útfæra */
  played === 0
    ? console.log("Þú hefur ekki spilað neina leiki.")
    : console.log(
        `Leikir spilaðir: ${played}. Unnir leikir: ${won}. Stig: ${won} `
      );
}
 

