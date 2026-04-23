package pizzaria.com.laromana.service;

import java.util.*;
import pizzaria.com.laromana.model.Produto;

public class Carrinho {

    private List<Produto> produtos = new ArrayList<>();

    public void adicionar(Produto p) {
        produtos.add(p);
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void limpar() {
        produtos.clear();
    }

    public double total() {
        return produtos.stream()
                .mapToDouble(Produto::getPreco)
                .sum();
    }
}