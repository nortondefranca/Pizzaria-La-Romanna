package pizzaria.com.laromana.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import pizzaria.com.laromana.model.Produto;

@RestController
public class ProdutoController {

    @GetMapping("/produtos")
    public List<Produto> listarProdutos() {
        return List.of(
                new Produto(1L, "Pizza Calabresa", 29.90),
                new Produto(2L, "Pizza Mussarela", 25.00),
                new Produto(3L, "Coca-Cola", 7.00)
        );
    }
}