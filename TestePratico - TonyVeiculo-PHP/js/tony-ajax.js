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
  * Função para cadastrar 
  */
function PostCadastro(dados) {



    // pego um elemento para mandar respota do php
    var result = document.getElementById("cadastro-php");

    var xmlreq = crarRequest();




    // Iniciar uma requisição
    xmlreq.open("GET", "./php/tony.php?txtDadosCadastro="+dados);

    // Atribui uma função para ser executada sempre que houver uma mudança de ado
    xmlreq.onreadystatechange = function () {

        // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
        if (xmlreq.readyState == 4) {

            // Verifica se o arquivo foi encontrado com sucesso
            if (xmlreq.status == 200) {

                // manda resposta do php para html
                result.innerHTML = xmlreq.responseText;


            } else {
                 // manda resposta do php para html
                result.innerHTML = "Erro: " + xmlreq.statusText;
            }
        }
    };
    xmlreq.send(null);
}