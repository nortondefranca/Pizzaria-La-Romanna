package pizzaria.com.laromana.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @GetMapping("/pizza")
    public String pizza() {
        return "API funcionando 🚀";
    }
}
