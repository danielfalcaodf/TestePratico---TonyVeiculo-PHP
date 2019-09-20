// fazer um filtro na tabela de clientes com nome
var campoFiltro = document.querySelector("#busca");

campoFiltro.addEventListener("input", function() {
    var clientes = document.querySelectorAll(".cliente");

    if (this.value.length > 0) {
        for (var i = 0; i < clientes.length; i++) {
            
            var nome = clientes[i].querySelector(".nomes-clientes").textContent;
            var expressao = new RegExp(this.value, "i");

            if (!expressao.test(nome)) {
                clientes[i].classList.add("off");
            } else {
                clientes[i].classList.remove("off");
            }
        }
    } else {
        for (var i = 0; i < clientes.length; i++) {
            var cliente = clientes[i];
            cliente.classList.remove("off");
        }
    }
});
