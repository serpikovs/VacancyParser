import $ from 'jquery';

export async function loadJobs(pagesQty, searchedPosition) {
    let pos = (searchedPosition==undefined) ? '' : searchedPosition 
    let arr = []
    for (let i=1;i<pagesQty;i++)
    {
        const url = 'https://ru.jooble.org/работа-'+pos+'/?salary=50000&p='+i
        const response = await fetch(url);
        const result = await response.text();
        const $page = $(result);
        const $results = $page.find(".result")
        const jobs = $results.map((index, element) => {
            const $element = $(element); 
            const position = $element.find('.position').text();
            let salaryRange = $element.find('.salary').text();
            salaryRange = salaryRange.split(' ').join('');
            salaryRange = salaryRange.match(/\d+/g).map(salary => parseInt(salary, 10));
            if (salaryRange==null) salaryRange = [0]
            return { position, salary: salaryRange };
        })
        arr = arr.concat(jobs.toArray())
    }
    return arr;
}