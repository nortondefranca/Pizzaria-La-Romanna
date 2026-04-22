package pizzaria.com.laromana;

import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @GetMapping("/pizza")
    public String pizza() {
        return "API funcionando 🚀";
    }
}
