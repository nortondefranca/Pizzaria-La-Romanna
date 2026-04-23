package pizzaria.com.laromana.model;

import java.util.List;

public class Pedido {

    private Long id;
    private Cliente cliente;
    private List<Produto> produtos;
    private double total;

    public Pedido(Long id, Cliente cliente, List<Produto> produtos) {
        this.id = id;
        this.cliente = cliente;
        this.produtos = produtos;
        this.total = calcularTotal();
    }

    private double calcularTotal() {
        return produtos.stream()
                .mapToDouble(Produto::getPreco)
                .sum();
    }

    public Long getId() {
        return id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public double getTotal() {
        return total;
    }
}