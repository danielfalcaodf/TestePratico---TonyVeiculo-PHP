<?php
    // ultizar a varivel $conn para fazer a conexao
    include_once("conexao.php");
    //  todos os if com isset e para verificar se foi inicializada 
    // fazer os cadastro no banco
        if((isset($_GET["txtDadosCadastro"])))
        {
            // sepera os dados em um array 
            $dados = preg_split("/[|]+/", $_GET["txtDadosCadastro"]);
            $nome  = $dados[0];
            $telefones = $dados[1];
            $horario = $dados[2];
             // sql com mysqli_query para fazer o consulta se exite o nome no banco
            $sql_select = "SELECT * FROM clientes where nomeCompleto = '$nome'";
             // para deixa a query com utf-8
            mysqli_query($conn,"SET NAMES 'utf8'");
            mysqli_query($conn,'SET character_set_connection=utf8');
            mysqli_query($conn,'SET character_set_client=utf8');
            mysqli_query($conn, 'SET character_set_results=utf8');  
            // executa ordem de consulta
           $result_select=mysqli_query($conn, $sql_select);
              // conta quantos registro foram retornados após a execução de ordem da consulta
           $cont = mysqli_affected_rows($conn);
           $return = '<button type="button" class="btn" id="btn-enviar">ENVIAR</button>';
           if($cont > 0)
           {   $return.='<div class="alert alert-danger" role="alert">Este Nome já esta cadastrado no nosso sistema</div>';
                 echo $return;
           }
            else
            {
                // define sql de inserção
                $sql_insert = "insert into clientes (nomeCompleto,horarioAtendimento) values ('$nome', '$horario')";
                mysqli_query($conn,"SET NAMES 'utf8'");
                mysqli_query($conn,'SET character_set_connection=utf8');
                mysqli_query($conn,'SET character_set_client=utf8');
                mysqli_query($conn, 'SET character_set_results=utf8');
                // verifica se executou a ordem no servidor sql
                if(!$result=mysqli_query($conn, $sql_insert))
                {
                    $return.='<div class="alert alert-danger" role="alert">Erro ao cadastrar, algum erro no sistema</div>';
                  echo $return;
                }
                else 
                {
                     // sql com mysqli_query para fazer o consulta para pegar o id
                    $sql_select2 = "SELECT * FROM clientes where nomeCompleto = '$nome' and horarioAtendimento = '$horario'";

                    mysqli_query($conn,"SET NAMES 'utf8'");
                    mysqli_query($conn,'SET character_set_connection=utf8');
                    mysqli_query($conn,'SET character_set_client=utf8');
                    mysqli_query($conn, 'SET character_set_results=utf8');  
                   $result_select2=mysqli_query($conn, $sql_select2);  
                //    conta quantos registro foram retornados após a execução de ordem da consulta
                   $contT = mysqli_affected_rows($conn);
                   if($contT > 0)
                   {
                       // pega todos os registros 	
                    $array  = mysqli_fetch_assoc($result_select2);

                        $idCliente = $array['idcliente'];
                        // define sql de inserção
                        $sql_insert2 = "insert into telefonesClientes (telefones,FK_idcliente) values ('$telefones', $idCliente)";
                        mysqli_query($conn,"SET NAMES 'utf8'");
                        mysqli_query($conn,'SET character_set_connection=utf8');
                        mysqli_query($conn,'SET character_set_client=utf8');
                        mysqli_query($conn, 'SET character_set_results=utf8');
                        if(!$result2=mysqli_query($conn, $sql_insert2))
                        {
                            $return.='<div class="alert alert-danger" role="alert">  Fez o cadastro, mas teve algum probrema no banco</div>';
                            echo  $return;
                        }
                        else 
                        {
                            $return.='<div class="alert alert-success" role="alert">Sucesso!! Seus dados estão cadastrado obrigado pela preferência! </div>';
                            echo $return;
                        }
                   }
                   else
                   {
                    $return.='<div class="alert alert-danger" role="alert">  Fez o cadastro , mas teve algum probrema no banco</div>';
                    echo  $return;
                    }
                }
           
                        
            }
               // fechar a conexão
            mysqli_close($conn);
    }
    // consulta no banco
        if((isset($_GET["txtList"])))
    {
        	// define ordem de consulta usando inner join
        $sql_select = "SELECT clientes.*,telefonesClientes.* from clientes inner join telefonesClientes on clientes.idcliente = telefonesClientes.FK_idcliente;";

        mysqli_query($conn,"SET NAMES 'utf8'");
        mysqli_query($conn,'SET character_set_connection=utf8');
        mysqli_query($conn,'SET character_set_client=utf8');
        mysqli_query($conn, 'SET character_set_results=utf8');  
       $result_select=mysqli_query($conn, $sql_select);
    //    conta quantos registro foram retornados após a execução de ordem da consulta
       $cont = mysqli_affected_rows($conn);
    
       if($cont > 0)
       {
        $return = '';
        	// percorrer os registros através do while	
        while ($array  = mysqli_fetch_assoc($result_select))
        {
            $idcliete = $array['idcliente'];
            $nome = $array['nomeCompleto'];
            $horario = $array['horarioAtendimento'];
            $telefones = $array['telefones'];
            $return.='<tr class="cliente"id="'.$idcliete.'">
            <th scope="row">'.$idcliete.'</th>
            <td class="nomes-clientes">'.$nome.'</td>
            <td>'.$telefones.'</td>
            <td>'.$horario.'</td>
            <td><button class="btn" type="button" onclick=modalPergunta("abrir","'.$idcliete.'")><ion-icon class="icon-update" name="md-sync"></ion-icon> </button></td>
            <td><button class="btn" type="button" onclick=modalPergunta("open","'.$idcliete.'")><ion-icon class="icon-delete" name="md-trash"></ion-icon></button></td>
          </tr>';
        }
        echo $return;
       }
       else
       {
           echo 'Não tem cliente no banco de dados';
       }
          // fechar a conexão
       mysqli_close($conn);
    }
    // deletar no banco
    if((isset($_GET["txtDelete"])))
    {
        $id = $_GET["txtDelete"];
        // define ordem de delete
        $sql="delete from clientes where idcliente = $id";

             $registro=mysqli_query($conn,$sql);

    
        // verificando resultado da ordem
        if (!$registro) echo "Erro no banco";
             else
        echo "Sucesso Cliente apagado!!";
          // fechar a conexão
            mysqli_close($conn);
    }    
    // fazer alteração no banco
    if((isset($_GET["txtAlterar"])))
    {
        // sepera o dados em um array
        $arrDados = preg_split("/[|]+/", $_GET["txtAlterar"]);
        $id = $arrDados[0];
        $nome  = $arrDados[1];
        $telefones = $arrDados[2];
        $horario = $arrDados[3];
        // define sql de updade
        $sql="UPDATE clientes inner join telefonesClientes on clientes.idcliente = telefonesClientes.FK_idcliente SET clientes.nomeCompleto = '$nome', clientes.horarioAtendimento = '$horario', telefonesClientes.telefones  = '$telefones'  WHERE clientes.idcliente= $id;";
        mysqli_query($conn,"SET NAMES 'utf8'");
        mysqli_query($conn,'SET character_set_connection=utf8');
        mysqli_query($conn,'SET character_set_client=utf8');
        mysqli_query($conn, 'SET character_set_results=utf8'); 
        	// executar ordem no servidor sql
             $registro=mysqli_query($conn,$sql);

    
// verificando resultado da ordem
        if (!$registro) echo "Erro no banco";
             else
        echo "Sucesso Cliente alterado!!";
    // fechar a conexão
            mysqli_close($conn);
    }   
        


?>