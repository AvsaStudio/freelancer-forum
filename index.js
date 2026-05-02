/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// Constants
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// State

/** @returns {Freelancer} a freelancer with random data */
function makeFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];

  const rate =
    PRICE_RANGE.min +
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min));

  return { name, occupation, rate };
}

const freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);

/**
 * @param {Freelancer[]} freelancers
 * @returns {number} average hourly rate
 */
function getAverageRate(freelancers) {
  const total = freelancers.reduce(
    (sum, freelancer) => sum + freelancer.rate,
    0
  );

  return total / freelancers.length;
}

const averageRate = getAverageRate(freelancers);

// Components

/**
 * A single freelancer row
 * @param {Freelancer} freelancer
 * @returns {HTMLTableRowElement}
 */
function FreelancerRow(freelancer) {
  const $row = document.createElement("tr");

  $row.innerHTML = `
    <td>${freelancer.name}</td>
    <td>${freelancer.occupation}</td>
    <td>$${freelancer.rate}</td>
  `;

  return $row;
}

/**
 * Many freelancer rows
 * @param {Freelancer[]} freelancers
 * @returns {HTMLTableSectionElement}
 */
function FreelancerRows(freelancers) {
  const $tbody = document.createElement("tbody");

  const $rows = freelancers.map(FreelancerRow);

  $tbody.replaceChildren(...$rows);

  return $tbody;
}

/**
 * Average rate message
 * @param {number} average
 * @returns {HTMLParagraphElement}
 */
function AverageRate(average) {
  const $p = document.createElement("p");

  $p.textContent = `The average hourly rate is $${average.toFixed(2)}.`;

  return $p;
}

// === Render ===

function render() {
  const $app = document.querySelector("#app");
  $app.querySelector("#AverageRate").replaceWith(AverageRate(averageRate));
  $app
    .querySelector("#FreelancerRows")
    .replaceWith(FreelancerRows(freelancers));
}

render();
