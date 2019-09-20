var idlinaLocal = '';
// função que abre o modal e organiza inputs e texto de pergunta
function modalPergunta(opcao, idLinha)
 {
  
     var modal_body = document.getElementById('modal-body');
    
    if(opcao == 'open')
    {
        // fazer perguntas e recuperar valores
        idlinaLocal= idLinha;
        var linha = document.getElementById(idLinha);
        var nome = linha.querySelectorAll('td')[0].textContent;
                modal_body.textContent = 'Deseja apagar o Cliente ' +nome+'?';
                // abre o modal
        $('#apagar').modal('show');
    }
    else if(opcao =='close')
    {
    // fecha o modal
        $('#apagar').modal('hide');
         //  chama o ajax para chamar o php para deletar
        PostRemove(idlinaLocal);
    }
    else if(opcao == 'abrir')
    {
        // fazer limpeza de campos e recuperar valores
        var btnResult = document.getElementById("cadastro-php") ;
        btnResult.innerHTML = '';
        idlinaLocal= idLinha;
        
        removeCampo();
        var linha = document.getElementById(idLinha);


        
        
        var nome = document.getElementById('nome');
        nome.value = linha.querySelectorAll('td')[0].textContent;
        var horario = document.getElementById('horario');
        horario.value = linha.querySelectorAll('td')[2].textContent;
        var telefonesTd = linha.querySelectorAll('td')[1].textContent;
        var arrTele  = telefonesTd.split(',')
        // add varios campos de acordo com quatidade de telefones que tem no banco
        addCampo(arrTele.length - 1);
        var telefonesInputs = document.querySelectorAll('input[type=tel][name=telefones]');

        for (let index = 0; index < arrTele.length; index++) 
        {
            telefonesInputs[index].value = arrTele[index];
            
        }
        
         // abre o modal
        $('#Alterar').modal('show');
    }
    else if(opcao == 'fechar')
    {
      
       // chama a função para organizar os dados e valida
        AlterarForm(idlinaLocal);
       
        
    }
    


}