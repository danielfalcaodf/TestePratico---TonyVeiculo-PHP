/**
  * Função para criar um objeto XMLHTTPRequest
  */
function crarRequest() {
    try {
        request = new XMLHttpRequest();
    } catch (IEAtual) {

        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (IEAntigo) {

            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (falha) {
                request = false;
            }
        }
    }

    if (!request)
        alert("Seu Navegador não suporta Ajax!");
    else
        return request;
}
/**
  * Função para iniciar a outra função quando  inicia a pagina
  */
window.onload = function () {

    GetCliete();
}
/**
  * Função para pegar todos cliente e colocar na tabela
  */
function GetCliete() 
{


 // Declaração de Variáveis para mandar resposta para html que veio do php
    var result = document.getElementById("list-php");   
    var load = document.getElementById('load');
    var xmlreq = crarRequest();
    load.innerHTML = ' <div class="d-flex justify-content-center">'+
    '<div class="spinner-border" role="status">'+
     ' <span class="sr-only">Loading...</span>'+
   ' </div>'+
 ' </div>';



    // Iniciar uma requisição
    xmlreq.open("GET", "./php/tony.php?txtList=true");

    // Atribui uma função para ser executada sempre que houver uma mudança de ado
    xmlreq.onreadystatechange = function () {

        // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
        if (xmlreq.readyState == 4) {

            // Verifica se o arquivo foi encontrado com sucesso
            if (xmlreq.status == 200) {


              
                
                if(xmlreq.responseText == 'Não tem cliente no banco de dados')
                {
                    result.innerHTML= '';
                    load.innerHTML = '<div class="alert alert-danger" role="alert"> Não tem cliente no banco de dados</div>';
                }
                else
                {
                    result.innerHTML = xmlreq.responseText;
                
                    load.innerHTML='';
                }

            } else {

                result.innerHTML = "Erro: " + xmlreq.statusText;
                load.innerHTML = '<div class="alert alert-danger" role="alert"> Não tem cliente no banco de dados</div>';
            }
        }
    };
    xmlreq.send(null);
}
// Função que chama o php para deletar no banco o campo escolhido 
function PostRemove(params) 
{
   // Declaração de Variáveis para mandar resposta para html que veio do php
    var result = document.getElementById("msg");   
   
    var xmlreq = crarRequest();
    result.innerHTML = ' <div class="d-flex justify-content-center">'+
    '<div class="spinner-border" role="status">'+
     ' <span class="sr-only">Loading...</span>'+
   ' </div>'+
 ' </div>';




    // Iniciar uma requisição
    xmlreq.open("GET", "./php/tony.php?txtDelete="+params);

    // Atribui uma função para ser executada sempre que houver uma mudança de ado
    xmlreq.onreadystatechange = function () {

        // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
        if (xmlreq.readyState == 4) {

            // Verifica se o arquivo foi encontrado com sucesso
            if (xmlreq.status == 200) {


               
                if (xmlreq.responseText == 'Sucesso Cliente apagado!!') {
                    result.innerHTML ='<div class="alert alert-success" role="alert">'+xmlreq.responseText+' </div>' ;
                    // chamar lista de cliente denovo para atulizar a tabela
                    GetCliete();
                } 
                else if(xmlreq.responseText == 'Erro no banco' ) 
                {
                    result.innerHTML = '<div class="alert alert-danger" role="alert"> '+xmlreq.responseText+'</div>'; 
                }


            } else {

                result.innerHTML = '<div class="alert alert-danger" role="alert"> '+"Erro: "+ xmlreq.statusText+'</div>';
            }
        }
    };
    xmlreq.send(null);
    
}
// Função que chama o php para alterar no banco o campo escolhido 
function PostAlterar(dados) 
{
    var result = document.getElementById("msg");   
    
    var xmlreq = crarRequest();
    result.innerHTML = ' <div class="d-flex justify-content-center">'+
    '<div class="spinner-border" role="status">'+
     ' <span class="sr-only">Loading...</span>'+
   ' </div>'+
 ' </div>';




    // Iniciar uma requisição
    xmlreq.open("GET", "./php/tony.php?txtAlterar="+dados);

    // Atribui uma função para ser executada sempre que houver uma mudança de ado
    xmlreq.onreadystatechange = function () {

        // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
        if (xmlreq.readyState == 4) {

            // Verifica se o arquivo foi encontrado com sucesso
            if (xmlreq.status == 200) {


               
                if (xmlreq.responseText == 'Sucesso Cliente alterado!!') {
                    result.innerHTML ='<div class="alert alert-success" role="alert">'+xmlreq.responseText+' </div>' ;
                      // chamar lista de cliente denovo para atulizar a tabela
                    GetCliete();
                } 
                else if(xmlreq.responseText == 'Erro no banco' ) 
                {
                    result.innerHTML = '<div class="alert alert-danger" role="alert"> '+xmlreq.responseText+'</div>'; 
                }


            } else {

                result.innerHTML = '<div class="alert alert-danger" role="alert"> '+"Erro: "+ xmlreq.statusText+'</div>';
            }
        }
    };
    xmlreq.send(null);
    
}