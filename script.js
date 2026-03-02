async function buscarCEP() {
    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const divResultado = document.getElementById('resultado');

    // Validação básica: a API exige pelo menos 3 caracteres na cidade e na rua
    if (uf.length !== 2 || cidade.length < 3 || rua.length < 3) {
        alert("Preencha todos os campos corretamente! (Cidade e Rua precisam de 3+ letras)");
        return;
    }

    divResultado.innerHTML = "Buscando...";

    try {
        const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;
        const response = await fetch(url);
        const dados = await response.json();

        if (dados.erro || dados.length === 0) {
            divResultado.innerHTML = "Nenhum CEP encontrado para este endereço.";
            return;
        }

        // Limpa e exibe os resultados (pode vir mais de um CEP)
        divResultado.innerHTML = "<h3>Resultados:</h3>";
        dados.forEach(item => {
            divResultado.innerHTML += `
                <div class="item-resultado">
                    <strong>CEP:</strong> ${item.cep}<br>
                    <strong>Bairro:</strong> ${item.bairro}<br>
                    <strong>Complemento:</strong> ${item.complemento || 'N/A'}
                </div>
            `;
        });

    } catch (error) {
        divResultado.innerHTML = "Erro ao conectar com o serviço.";
    }
}