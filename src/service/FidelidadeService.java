package service;

import dao.ClienteDAO;
import dao.PedidoDAO;
import model.Cliente;

public class FidelidadeService {

    public void registrarCompra(String cpf, double valor) throws Exception {

        ClienteDAO clienteDAO = new ClienteDAO();
        PedidoDAO pedidoDAO = new PedidoDAO();

        Cliente cliente = clienteDAO.buscarPorCpf(cpf);

        if (cliente == null) {
            throw new Exception("Cliente não encontrado");
        }

        int pontos = (int) valor;

        int novoTotal = cliente.getPontos() + pontos;

        clienteDAO.atualizarPontos(cliente.getId(), novoTotal);

        pedidoDAO.salvar(cliente.getId(), valor, pontos);
    }

    public void resgatarPontos(String cpf, int pontosResgate) throws Exception {

        ClienteDAO dao = new ClienteDAO();
        Cliente c = dao.buscarPorCpf(cpf);

        if (c == null) {
            throw new Exception("Cliente não encontrado");
        }

        if (c.getPontos() >= pontosResgate) {
            dao.atualizarPontos(c.getId(), c.getPontos() - pontosResgate);
        } else {
            throw new Exception("Pontos insuficientes");
        }
    }
}
