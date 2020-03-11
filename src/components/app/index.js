import * as css from './index.css'
import $ from 'jquery';
import { loadJobs } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
var Chart = require('chart.js');

let $root

export default async function (root) {

  $root = $(root);
  drawBasics()
  refreshData()
}

function drawBasics() {

  const $button = $('#findBtn');
  const $input = $('#vacancyInput')

  $input.keypress(async function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      refreshData()
    }
  });

  $button.on('click', async () => {
    refreshData();
  });
}

async function refreshData() {

  const searchedText = $('#vacancyInput').val()
  const jobs = await loadJobs(3, searchedText);

  drawJobsSection(jobs)
  drawChart(jobs);
}

function drawJobsSection(jobs) {

  $('#myTable').remove()
  const $table = $('<table id="myTable" class="table">')
  $root.append($table)
  $table.append('<thead class="thead-dark"><tr><th>Вакансия</th><th>Запрплата</th></tr></thead>');

  jobs.forEach(job => {
    const salaryStr = (job.salaryRange.length == 1) ? job.salaryRange : job.salaryRange[0] + '-' + job.salaryRange[1]
    $table.append('<tr>' + '<td>' + job.position + '</td>' + '<td>' + salaryStr + ' ₽' + '</td>' + '</tr>')
  });
}

function drawChart(jobs) {

  $('#myChart').remove()
  const $chart = $('<canvas id="myChart" width="400" height="200"></canvas>')
  $root.append($chart)

  const salaryArr = [0, 0, 0, 0]
  jobs.forEach(job => {
    let salaryDigits = (job.salaryRange.length == 1) ? job.salaryRange[0] : job.salaryRange[1]
    switch (true) {
      case (salaryDigits < 40000): salaryArr[0] += 1; break;
      case (salaryDigits < 60000): salaryArr[1] += 1; break;
      case (salaryDigits < 80000): salaryArr[2] += 1; break;
      default: salaryArr[3] += 1; break;
    }
  });

  const myChart = new Chart($chart, {
    type: 'bar',
    data: {
      labels: ['до 40K ₽', '40K - 60K ₽', '60K - 80K ₽', 'Более 80K ₽'],
      datasets: [{
        label: 'Уровень зарплат',
        data: salaryArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}


