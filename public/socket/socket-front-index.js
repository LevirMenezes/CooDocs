const socket = io()

// Detecta desconexão
socket.on('disconnect', () => {
  alert("Você foi desconectado. Por favor, faça login novamente.");
  window.location.href = "/login"; // Redireciona para o login
});

// Evento para mostrar o número de usuários conectados
socket.on("usuarios_conectados", (usuariosOuNumero) => {
  const total = usuariosOuNumero.length;
  document.getElementById("usuarios-conectados").textContent = `Usuários online: ${total}`;
});

// Função para emitir o nome do novo documento
function emitirAdicionarDocumento(nome) {
  socket.emit("adicionar_documento", nome);
}

// Exibe um alerta se o documento já existir
socket.on("documento_existente", (nome) => {
  alert(`O documento ${nome} já existe!`);
});

export { socket, emitirAdicionarDocumento };
