<?php
include 'conexao.php';

$nome = $_POST['nome'];
$senha = $_POST['senha'];

// Valida usuário
$sql = "SELECT * FROM usuarios WHERE nome = '$nome'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    if (password_verify($senha, $usuario['senha'])) { // Comparação com senha criptografada
        // Login bem-sucedido
        session_start();
        $_SESSION['usuario'] = $usuario['nome'];
        header("Location: ../index.html"); // Redireciona para index.html
        exit;
    } else {
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}

$conn->close();
?>
