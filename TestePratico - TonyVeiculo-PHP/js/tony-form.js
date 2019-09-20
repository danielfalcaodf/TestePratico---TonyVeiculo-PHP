
// inicia o Função para colocar mascara no input telefone
mask();
var numero_id = 1;

// funçao que coloca mascara
function mask() {
    $(document).ready(function () {
        $(".inputs").mask("(00) 0000-00009");

    });
}

// funçao que add um novo input quando clicar no botão '+'
$(function () {
    var scntDiv = $('#form-group');
    $(document).on('click', '.addInput', function () {


        $(' <div id="input' + numero_id + '"> <label for="Telefone">Telefone: </label>' +
            '<div class="input-group mb-2">' +
            '<input type="tel" class="form-control inputs" name="telefones" id="Telefone/' + numero_id + '">' +
            '<div class="input-group-append">' +
            '<button class="btn" onclick=remove("input' + numero_id + '") type="button" id="b' + numero_id + '">' +
            '<ion-icon name="close"></ion-icon>' +
            '</button>' +

            '</div>' +
            ' </div> </div>'


        ).appendTo(scntDiv);
        mask();
        numero_id++;
  
    });

});
// funçao que remove o input quando clicar no botao 'x'
function remove(este) {

    $('#' + este).remove();
}
// funçao que valida os campos e organiza para enviar para ajax quando apentar o botao 'enviar' do index.html
$(function () {
    $(document).on('click', '#btn-enviar', function () {
        var btnResult = document.getElementById("cadastro-php");
        btnResult.innerHTML = ' <div class="d-flex justify-content-center">' +
            '<div class="spinner-border" role="status">' +
            ' <span class="sr-only">Loading...</span>' +
            ' </div>' +
            ' </div>';
        setTimeout(() => {
            var nome_form = $('#nome').val();
            var nome = true;
            var Telefone = true;
            var telefonesInputs = $('input[type=tel][name=telefones]');
            var telefones = [];
            var horario = $('#horario').val();
            for (let index = 0; index < telefonesInputs.length; index++) {

                telefones.push(telefonesInputs[index].value);

            }

            if (nome_form == '' || nome_form.length < 8 || parseInt(nome_form) == nome_form) {
                btnResult.innerHTML = '<button type="button" class="btn" id="btn-enviar">ENVIAR</button>'
                btnResult.innerHTML += '<div class="alert alert-danger" role="alert">Prencher o campo <b>Nome Completo</b> com 8 caracteres ou so letra!</div>';
                nome = false;

            }
            else {
                for (let index = 0; index < telefones.length; index++) {
                    if (telefones[index] == '' || telefones[index].length < 14) {
                        btnResult.innerHTML = '<button type="button" class="btn" id="btn-enviar">ENVIAR</button>'
                        btnResult.innerHTML += '<div class="alert alert-danger" role="alert">Tem algum campo do <b>Telefone</b> vazio ou esta incompleto, prenche ou remove</div>';
                        Telefone = false;
                    }

                }
            }


            if (nome == true && Telefone == true) {

                var dados = nome_form.toUpperCase() + '|' + telefones + '|' + horario;
                // manda para o ajax chamar o php
                PostCadastro(dados)



            }
        }, 1500);




    });
});
// funçao que add um novo campo de telefone quando ja esta definido quantos campos são , esta sendo pelo tonydados.html 
function addCampo(quat) {

    for (let index = 0; index < quat; index++) {

        var scntDiv = $('#form-group');



        $(' <div id="input' + numero_id + '"> <label for="Telefone">Telefone: </label>' +
            '<div class="input-group mb-2">' +
            '<input type="tel" class="form-control inputs" name="telefones" id="Telefone/' + numero_id + '">' +
            '<div class="input-group-append">' +
            '<button class="btn" onclick=remove("input' + numero_id + '") type="button" id="b' + numero_id + '">' +
            '<ion-icon name="close"></ion-icon>' +
            '</button>' +

            '</div>' +
            ' </div> </div>'


        ).appendTo(scntDiv);
        mask();
       
        numero_id++;

    }
}
// funçao que remove todos os campos criado pelo função addCampo(quat), esta sendo pelo tonydados.html 
function removeCampo() {
    var telefonesInputs = document.querySelectorAll('input[type=tel][name=telefones]');
    $('#Alterar').modal('hide');
    for (let index = 1; index < telefonesInputs.length; index++) {
        var id = telefonesInputs[index].id.split('/')
        remove("input" + id[1]);

    }
}
// funçao que organiza e valida os dados alterados e manda para ajax, esta sendo pelo tonydados.html 
function AlterarForm(id) {
    var btnResult = document.getElementById("cadastro-php");

    setTimeout(() => {
        var nome_form = $('#nome').val();
        var nome = true;
        var Telefone = true;
        var telefonesInputs = $('input[type=tel][name=telefones]');
        var telefones = [];
        var horario = $('#horario').val();
        for (let index = 0; index < telefonesInputs.length; index++) {

            telefones.push(telefonesInputs[index].value);

        }

        if (nome_form == '' || nome_form.length < 8 || parseInt(nome_form) == nome_form) {

            btnResult.innerHTML = '<div class="alert alert-danger" role="alert">Prencher o campo <b>Nome Completo</b> com 8 caracteres ou so letra!</div>';
            nome = false;

        }
        else {
            for (let index = 0; index < telefones.length; index++) {
                if (telefones[index] == '' || telefones[index].length < 14) {

                    btnResult.innerHTML = '<div class="alert alert-danger" role="alert">Tem algum campo do <b>Telefone</b> vazio ou esta incompleto, prenche ou remove</div>';
                    Telefone = false;
                }

            }
        }


        if (nome == true && Telefone == true) {
            btnResult.innerHTML = '';
            var dados = id + '|' + nome_form.toUpperCase() + '|' + telefones + '|' + horario;
            // manda para ajax
            PostAlterar(dados);
            removeCampo();
            // fecha o modal
            $('#Alterar').modal('hide');

        }
    }, 1000);
}

