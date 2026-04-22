package pizzaria.com.laromana;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
