package pizzaria.com.laromana.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import pizzaria.com.laromana.model.Produto;
import pizzaria.com.laromana.model.Pedido;
import pizzaria.com.laromana.model.Cliente;
import pizzaria.com.laromana.model.Usuario;
import pizzaria.com.laromana.service.Carrinho;

@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    private Carrinho carrinho = new Carrinho();

    private List<Produto> cardapio = List.of(
            new Produto(1L, "Pizza Calabresa", 29.90),
            new Produto(2L, "Pizza Mussarela", 25.00),
            new Produto(3L, "Coca-Cola", 7.00)
    );

    @PostMapping("/add/{id}")
    public String add(@PathVariable Long id) {

        cardapio.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .ifPresent(carrinho::adicionar);

        return "Adicionado ao carrinho";
    }

    @GetMapping
    public Carrinho ver() {
        return carrinho;
    }

    @GetMapping("/total")
    public double total() {
        return carrinho.total();
    }

    @PostMapping("/finalizar")
    public Pedido finalizar() {

        Usuario u = UsuarioController.usuarioLogado;

        if (u == null) {
            return null;
        }

        Cliente cliente = new Cliente(
                u.getId(),
                u.getNome()
        );

        Pedido pedido = new Pedido(
                System.currentTimeMillis(),
                cliente,
                List.copyOf(carrinho.getProdutos())
        );

        cliente.adicionarPontos((int) pedido.getTotal());

        carrinho.limpar();

        return pedido;
    }

    @GetMapping("/pontos")
    public String pontos() {

        Usuario u = UsuarioController.usuarioLogado;

        if (u == null) {
            return "Nenhum usuário logado";
        }

        return "Usuário: " + u.getNome();
    }
}