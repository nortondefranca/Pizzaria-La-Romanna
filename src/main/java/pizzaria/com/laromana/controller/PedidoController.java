package pizzaria.com.laromana;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PedidoController {

    // 🍕 cardápio fixo
    private List<Produto> cardapio = List.of(
            new Produto(1L, "Pizza Calabresa", 29.90),
            new Produto(2L, "Pizza Mussarela", 25.00),
            new Produto(3L, "Coca-Cola", 7.00)
    );

    // 📦 "banco em memória"
    private List<Pedido> pedidos = new ArrayList<>();

    // 🟢 CRIAR PEDIDO
    @GetMapping("/pedido")
    public Pedido criarPedido(
            @RequestParam List<Long> itens,
            @RequestParam String nome
    ) {

        List<Produto> produtosDoPedido = new ArrayList<>();

        for (Long id : itens) {
            cardapio.stream()
                    .filter(p -> p.getId().equals(id))
                    .findFirst()
                    .ifPresent(produtosDoPedido::add);
        }

        Cliente cliente = new Cliente(
                (long) (pedidos.size() + 1),
                nome
        );

        Pedido pedido = new Pedido(
                (long) (pedidos.size() + 1),
                cliente,
                produtosDoPedido
        );

        pedidos.add(pedido);

        return pedido;
    }

    // 📦 LISTAR PEDIDOS (HISTÓRICO)
    @GetMapping("/pedidos")
    public List<Pedido> listarPedidos() {
        return pedidos;
    }
}