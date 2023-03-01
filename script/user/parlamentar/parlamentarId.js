$(document).ready(function () {
  pagination()
});

function pagination(){
  if($('#pagination').data("twbs-pagination"))
    $('#pagination').twbsPagination('destroy');
    
  $('#pagination').twbsPagination({
      totalPages: parseInt($("#totalPage").val()),
      visiblePages: 4,
      onPageClick: function (event, page) {
          event.preventDefault();
          
          var formData = { 'page': page };

          const parlamentarId = $("#parlamentarId").val()
          $.ajax({
              type: 'GET',
              url: `/user/parlamentarMateriaInfo/${parlamentarId}`,
              data: formData,
              headers: { 'page-header': page },
              error: function (error) {
                  loadPageAnimation(false)
                  loadToastNotification("Não foi possível carregar a lista de matéria, tente novamente mais tarde", "danger")
              },
              success: function (result) { 
                  if(result.status === 'success') {
                      $('.materiaItem').remove()

                      result.materias.forEach(materia => {
                        $("#materiaItems").append(`
                        <div class="materiaItem container-fluid">
                            <div class="card text mb-1 mt-0 d-flex justify-content-center" style="border-style: solid; border-color: var(--secondary-color)">
                            <div class="card">
                              <div class="card-header">
                                <span class="fw-bold">N°: </span>${materia.Numero} - 
                                <span class="fw-bold">Tipo: </span>${materia.Tipo}
                              </div>
                              <div class="card-body">
                                <p class="card-text">
                                    ${materia.Resumo}
                                    <a href="/materia/${materia.id}"> Ver matéria</a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>`);
                      });

                      loadCharts(result.materias)

                      $(window).scrollTop(0);
                  }else{
                      loadToastNotification(result.message, "danger")
                  }

                  loadPageAnimation(false)                    
              }
          });
      }
  });
}

function loadCharts(materias){
  const ctx1 = document.getElementById('chart1');
  
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ["INDICATIVO DE QUANTIDADE PROPOSIÇÕES E MATÉRIAS"],
      datasets: [
          {
              label: 'Emendas',
              data: [materias.filter(materia => materia.Tipo == 'Emendas').length],
              borderWidth: 1,
              backgroundColor: ['#fca63d'],
          },
          {
              label: 'Pedido de Providências',
              data: [materias.filter(materia => materia.Tipo == 'Pedido de Providências').length],
              borderWidth: 1,
              backgroundColor: ['#e11157'],
          },
          {
              label: 'Indicação',
              data: [materias.filter(materia => materia.Tipo == 'EIndicaçãomendas').length],
              borderWidth: 1,
              backgroundColor: ['#1b3e49'],
          },
          {
              label: 'Projeto de Lei - Legislativo',
              data: [materias.filter(materia => materia.Tipo == 'Projeto de Lei - Legislativo').length],
              borderWidth: 1,
              backgroundColor: ['#0b8121'],
          },
          {
              label: 'Moções',
              data: [materias.filter(materia => materia.Tipo == 'Moções').length],
              borderWidth: 1,
              backgroundColor: ['#59adcb'],
          },
          {
              label: 'Requerimentos',
              data: [materias.filter(materia => materia.Tipo == 'Requerimentos').length],
              borderWidth: 1,
              backgroundColor: ['#622bf7'],
          },
          {
              label: 'Resolução',
              data: [materias.filter(materia => materia.Tipo == 'Resolução').length],
              borderWidth: 1,
              backgroundColor: ['#b641f9'],
          },
          {
              label: 'Projeto de Decreto Legislativo',
              data: [materias.filter(materia => materia.Tipo == 'Projeto de Decreto Legislativo').length],
              borderWidth: 1,
              backgroundColor: ['#3445c6'],
          },
          {
              label: 'Projeto de Indicativo',
              data: [materias.filter(materia => materia.Tipo == 'Projeto de Indicativo').length],
              borderWidth: 1,
              backgroundColor: ['#884EA0'],
          },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true
    }
  });
  
  const ctx2 = document.getElementById('chart2');
  
  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Emendas', 'Pedido de Providências', 'Indicação', 'Projeto de Lei - Legislativo', 'Moções', 'Requerimentos', 'Resolução', 'Projeto de Decreto Legislativo', 'Projeto de Indicativo'],
      datasets: [
        {
          label: 'INDICATIVO DE PREPOSIÇÕES E MATÉRIAS (PERCENTUAL)',
          data: [
            materias.filter(materia => materia.Tipo == 'Emendas').length,
            materias.filter(materia => materia.Tipo == 'Pedido de Providências').length, 
            materias.filter(materia => materia.Tipo == 'Indicação').length, 
            materias.filter(materia => materia.Tipo == 'Projeto de Lei - Legislativo').length, 
            materias.filter(materia => materia.Tipo == 'Moções').length, 
            materias.filter(materia => materia.Tipo == 'Requerimentos').length, 
            materias.filter(materia => materia.Tipo == 'Resolução').length, 
            materias.filter(materia => materia.Tipo == 'Projeto de Decreto Legislativo').length, 
            materias.filter(materia => materia.Tipo == 'Projeto de Indicativo').length, 
          ],
          backgroundColor: ['#fca63d', '#e11157', '#1b3e49', '#0b8121', '#59adcb', '#622bf7','#622bf7', '#b641f9', '#3445c6', '#884EA0']
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      }
    },
  });
}
