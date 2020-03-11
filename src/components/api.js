import $ from 'jquery';

export async function loadJobs(pagesQty, searchedPosition) {
    let pos = (searchedPosition == undefined) ? '' : searchedPosition
    let arr = []
    for (let i = 1; i < pagesQty; i++) {
        const url = 'https://ru.jooble.org/работа-' + pos + '/?salary=50000&p=' + i
        const response = await fetch(url);
        const html = await response.text();
        const $html = $(html);
        const $results = $html.find(".result")
        const jobs = $results.map((index, element) => {
            const $element = $(element);
            const position = $element.find('.position').text();
            const salaryText = $element.find('.salary').text();
            return { position, salaryRange: parseSalaryRange(salaryText) };
        })
        arr = arr.concat(jobs.toArray())
    }
    return arr;
}

function parseSalaryRange(salaryText) {
    if (salaryText == '') return [0]
    return salaryText.split(' ').join('')
    .match(/\d+/g)
    .map(salary => parseInt(salary, 10))
}