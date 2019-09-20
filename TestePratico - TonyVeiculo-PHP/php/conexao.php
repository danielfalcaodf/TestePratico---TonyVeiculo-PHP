<?php
	$servidor = "localhost";
	$usuario = "root";
	$senha = "";
	$dbname = "tony";

	//Criar a conexao

	$conn = mysqli_connect($servidor, $usuario, $senha, $dbname);
		// verifica se faz comexao
	if(!$conn){
		die("Falha na conexao: " . mysqli_connect_error());
	}else{
		//Conexao realizada com sucesso
	}

?>
