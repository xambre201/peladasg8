    const modal = document.getElementById('meuModal');
    const btnAbrir = document.getElementById('abrirModal');
    const btnConfirmar = document.getElementById('confirmar');
    const btnLimparModal = document.getElementById('limparModal');
    const btnRemoverGeral = document.getElementById('removerSelecao');
    
    const areaResultado = document.getElementById('areaResultado');
    const textoResultado = document.getElementById('textoResultado');
    const form = document.getElementById('formSelecao');

    // Abre o modal
    btnAbrir.onclick = () => modal.showModal();

    // Lógica para confirmar seleção
    btnConfirmar.onclick = () => {
        const selecionado = document.querySelector('input[name="opcao_unica"]:checked');
        if (selecionado) {
            textoResultado.textContent = selecionado.value;
            areaResultado.style.visibility = "visible";
        }
    };

    // Botão Limpar dentro do Modal (apenas desmarca as opções)
    btnLimparModal.onclick = () => {
        form.reset();
    };

    // Botão Remover (o "X" ao lado do resultado)
    btnRemoverGeral.onclick = () => {
        form.reset(); // Desmarca no formulário
        areaResultado.style.visibility = "hidden"; // Esconde o badge
        textoResultado.textContent = "";
    };
