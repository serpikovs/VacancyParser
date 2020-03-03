import * as css from './index.css'
import $ from 'jquery';
import { loadJobs } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
var Chart = require('chart.js');

let $root

export default async function (root) {
  $root = $(root);

  drawBasics()
  refreshDataOnPage()
}

function drawBasics($root){


  const $button = $('#findBtn');
  const $input = $('#vacancyInput')
  
  $input.keypress(async function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){

    console.log('Ok')
      const searchedText = $('#vacancyInput').val()
      let jobs = await loadJobs(3,searchedText);
  
      drawJobsSection(jobs)
      drawChart(jobs);
    }
  });

  $button.on('click', async () => {
    
    const searchedText = $('#vacancyInput').val()
    let jobs = await loadJobs(3,searchedText);
    console.log('Ok')
    drawJobsSection(jobs)
    drawChart(jobs);
  });
}

async function refreshDataOnPage(){

  const searchedText = $('#vacancyInput').val()
  let jobs = await loadJobs(3,searchedText);

  drawJobsSection(jobs)
  drawChart(jobs);
}

function drawJobsSection(jobs){

  $('#myTable').remove()
  const $table = $('<table id="myTable" class="table">')
  $root.append($table)
  $table.append('<thead class="thead-dark"><tr><th>Вакансия</th><th>Запрплата</th></tr></thead>');

  jobs.forEach(element => {
    if (element.salary.length==1)
    $table.append('<tr>'+'<td>'+element.position+'</td>'+'<td>' + element.salary +' ₽'+'</td>'+'</tr>')
    else
    $table.append('<tr>'+'<td>'+element.position+'</td>'+'<td>' +element.salary[0]+'-'+element.salary[1]+' ₽'+'</td>'+'</tr>')
  });

}

function drawChart(jobs)
{
  $('#myChart').remove()
  const $chart = $('<canvas id="myChart" width="400" height="200"></canvas>')
  $root.append($chart)

  let salaryArr = [0,0,0,0]
  jobs.forEach(element => {
    let salaryDigits = (element.salary.length==1) ? element.salary[0] : element.salary[1]
    salaryDigits=salaryDigits.replace(/\s+/g,'')
    switch (true){
      case (salaryDigits<40000) :  salaryArr[0]+=1; break
      case (salaryDigits<60000) :  salaryArr[1]+=1; break
      case (salaryDigits<80000) :  salaryArr[2]+=1;; break
      case (salaryDigits>60000) :  salaryArr[3]+=1;; break
    }
  }); 

  var ctx = $('#myChart');
  var myChart = new Chart($chart , {
      type: 'bar',
      data: {
          labels: ['до 40K ₽', '40K - 60K ₽', '60K - 80K ₽', ',более 80K ₽'],
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

