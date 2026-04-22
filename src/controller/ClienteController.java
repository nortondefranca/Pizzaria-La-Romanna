package controller;

import model.Cliente;
import dao.ClienteDAO;
import service.FidelidadeService;

public class ClienteController {

    private ClienteDAO clienteDAO = new ClienteDAO();
    private FidelidadeService service = new FidelidadeService();

    public String cadastrar(String nome, String cpf, String telefone) {
        try {
            Cliente c = new Cliente();
            c.setNome(nome);
            c.setCpf(cpf);
            c.setTelefone(telefone);

            clienteDAO.salvar(c);

            return "Cliente cadastrado com sucesso";

        } catch (Exception e) {
            return "Erro: " + e.getMessage();
        }
    }

    public String comprar(String cpf, double valor) {
        try {
            service.registrarCompra(cpf, valor);
            return "Compra registrada";
        } catch (Exception e) {
            return "Erro: " + e.getMessage();
        }
    }

    public String consultar(String cpf) {
        try {
            Cliente c = clienteDAO.buscarPorCpf(cpf);

            if (c == null) {
                return "Cliente não encontrado";
            }

            return "Pontos: " + c.getPontos();

        } catch (Exception e) {
            return "Erro: " + e.getMessage();
        }
    }

    public String resgatar(String cpf, int pontos) {
        try {
            service.resgatarPontos(cpf, pontos);
            return "Resgate realizado";
        } catch (Exception e) {
            return "Erro: " + e.getMessage();
        }
    }
}
