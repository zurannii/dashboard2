
fetch('https://parseapi.back4app.com/parse/classes/DadosEscolares', {
    headers: {
        'X-Parse-Application-Id': 'Tt6MdVmxrzFbGaZghaamPyARNAekoCRRyPtyNX5v', 
        'X-Parse-REST-API-Key': 'C15PqeztDAugVqSm1dOCSm8Lp4ZYfJh3lppbKObM'  
    }
})
.then(response => response.json()) 
.then(data => {
    const labels = [];  
    const data_chart = [];  

    console.log("Data from API:", data);  

   
    const resultados = data.results || data;
    for (let i = 0; i < resultados.length; i++) {
        labels.push(resultados[i].ano_escolar);  
        data_chart.push(parseInt(resultados[i].data_ano, 10));  
    }

    console.log("Labels:", labels); 
    console.log("Data Chart:", data_chart);  

   
    var ctx4 = document.getElementById("chart1").getContext("2d");
    var chart4 = new Chart(ctx4, {
        type: "pie",  
        data: {
            labels: labels,  
            datasets: [{
                label: "Gráfico de Rosca",
                data: data_chart,  
                backgroundColor: ["#6C48C5", "#E4B1F0", "#7E60BF", "#433878", "#AD49E1"],  
                borderColor: "#FFFFFF",  
                borderWidth: 2  
            }]
        }
    });
})
.catch(error => {
    console.error('Erro:', error);  
});


document.getElementById('dadosForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const anoEscolar = document.getElementById('ano_escolar').value;
    const dataAno = document.getElementById('data_ano').value;

    
    const dados = {
        ano_escolar: anoEscolar,
        data_ano: dataAno
    };

   
    function adicionarDados(dados) {
        fetch('https://parseapi.back4app.com/parse/classes/DadosEscolares', {
            method: 'POST', 
            headers: {
                'X-Parse-Application-Id': 'Tt6MdVmxrzFbGaZghaamPyARNAekoCRRyPtyNX5v', // ID da aplicação
                'X-Parse-REST-API-Key': 'C15PqeztDAugVqSm1dOCSm8Lp4ZYfJh3lppbKObM',  // Chave da API
                'Content-Type': 'application/json'  // Tipo de conteúdo JSON
            },
            body: JSON.stringify(dados)  // Corpo da requisição com os dados em formato JSON
        })
        .then(response => response.json())  // Converte a resposta para JSON
        .then(data => {
            console.log('Success:', data);  // Log de sucesso
            alert('Dados adicionados com sucesso!');  // Alerta de sucesso
        })
        .catch((error) => {
            console.error('Error:', error);  // Log de erro
            alert('Erro ao adicionar dados.');  // Alerta de erro
        });
    }

    // Chama a função para adicionar os dados
    adicionarDados(dados);
});

// Função para editar os dados existentes no Back4App ao enviar o formulário de edição
document.getElementById('editarForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Previne o envio padrão do formulário

    // Captura os valores dos inputs
    const objectId = document.getElementById('editObjectId').value;
    const anoEscolar = document.getElementById('editAnoEscolar').value;
    const dataAno = document.getElementById('editDataAno').value;

    // Cria um objeto com os dados atualizados
    const dadosAtualizados = {};
    if (anoEscolar) {
        dadosAtualizados.ano_escolar = anoEscolar;
    }
    if (dataAno) {
        dadosAtualizados.data_ano = dataAno;
    }
    console.log(dadosAtualizados);  // Log dos dados atualizados

    // Faz a requisição para atualizar os dados no Back4App
    fetch(`https://parseapi.back4app.com/parse/classes/DadosEscolares/${objectId}`, {
        method: 'PUT',  // Método PUT para atualizar dados
        headers: {
            'X-Parse-Application-Id': 'Tt6MdVmxrzFbGaZghaamPyARNAekoCRRyPtyNX5v', // ID da aplicação
            'X-Parse-REST-API-Key': 'C15PqeztDAugVqSm1dOCSm8Lp4ZYfJh3lppbKObM',  // Chave da API
            'Content-Type': 'application/json'  // Tipo de conteúdo JSON
        },
        body: JSON.stringify(dadosAtualizados)  // Corpo da requisição com os dados atualizados em formato JSON
    })
    .then(response => response.json())  // Converte a resposta para JSON
    .then(data => {
        console.log('Success:', data);  // Log de sucesso
        alert('Dados atualizados com sucesso!');  // Alerta de sucesso
    })
    .catch((error) => {
        console.error('Error:', error);  // Log de erro
        alert('Erro ao atualizar dados.');  // Alerta de erro
    });
});

// Função para deletar dados existentes no Back4App ao enviar o formulário de deleção
document.getElementById('deletarForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Previne o envio padrão do formulário

    // Captura o ID do objeto a ser deletado
    const objectId = document.getElementById('deleteObjectId').value;

    // Faz a requisição para deletar os dados no Back4App
    fetch(`https://parseapi.back4app.com/parse/classes/DadosEscolares/${objectId}`, {
        method: 'DELETE',  // Método DELETE para remover dados
        headers: {
            'X-Parse-Application-Id': 'Tt6MdVmxrzFbGaZghaamPyARNAekoCRRyPtyNX5v', // ID da aplicação
            'X-Parse-REST-API-Key': 'C15PqeztDAugVqSm1dOCSm8Lp4ZYfJh3lppbKObM',  // Chave da API
            'Content-Type': 'application/json'  // Tipo de conteúdo JSON
        }
    })
    .then(response => {
        if (response.ok) {  // Verifica se a resposta está OK
            return response.json();  // Converte a resposta para JSON
        } else {
            throw new Error('Erro ao deletar dados.');  // Lança um erro se a resposta não estiver OK
        }
    })
    .then(data => {
        console.log('Success:', data);  // Log de sucesso
        alert('Dados deletados com sucesso!');  // Alerta de sucesso
    })
    .catch((error) => {
        console.error('Error:', error);  // Log de erro
        alert('Erro ao deletar dados.');  // Alerta de erro
    });
});
