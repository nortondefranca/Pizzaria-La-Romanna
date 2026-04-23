package pizzaria.com.laromana.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

import pizzaria.com.laromana.model.*;

@RestController
public class PedidoController {

    private List<Produto> cardapio = List.of(
            new Produto(1L, "Pizza Calabresa", 29.90),
            new Produto(2L, "Pizza Mussarela", 25.00),
            new Produto(3L, "Coca-Cola", 7.00)
    );

    private List<Pedido> pedidos = new ArrayList<>();

    @GetMapping("/pedido")
    public Pedido criarPedido(@RequestParam List<Long> itens,
                              @RequestParam String nome) {

        List<Produto> produtos = new ArrayList<>();

        for (Long id : itens) {
            cardapio.stream()
                    .filter(p -> p.getId().equals(id))
                    .findFirst()
                    .ifPresent(produtos::add);
        }

        Cliente cliente = new Cliente(
                (long) (pedidos.size() + 1),
                nome
        );

        Pedido pedido = new Pedido(
                (long) (pedidos.size() + 1),
                cliente,
                produtos
        );

        pedidos.add(pedido);

        return pedido;
    }

    @GetMapping("/pedidos")
    public List<Pedido> listar() {
        return pedidos;
    }
}