package pizzaria.com.laromana.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

import pizzaria.com.laromana.model.Usuario;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private List<Usuario> usuarios = new ArrayList<>();
    public static Usuario usuarioLogado = null;

    @PostMapping("/cadastro")
    public String cadastro(@RequestParam String nome,
                           @RequestParam String email,
                           @RequestParam String senha) {

        Usuario u = new Usuario(
                (long) (usuarios.size() + 1),
                nome,
                email,
                senha
        );

        usuarios.add(u);
        return "Usuário criado!";
    }

    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String senha) {

        for (Usuario u : usuarios) {
            if (u.getEmail().equals(email) && u.getSenha().equals(senha)) {
                usuarioLogado = u;
                return "Login OK: " + u.getNome();
            }
        }

        return "Email ou senha inválidos";
    }

    @GetMapping("/me")
    public String me() {
        if (usuarioLogado == null) {
            return "Nenhum usuário logado";
        }
        return "Logado: " + usuarioLogado.getNome();
    }
}