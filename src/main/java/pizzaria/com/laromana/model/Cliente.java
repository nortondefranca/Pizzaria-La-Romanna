package pizzaria.com.laromana;

public class Cliente {

    private Long id;
    private String nome;
    private int pontos;

    public Cliente(Long id, String nome) {
        this.id = id;
        this.nome = nome;
        this.pontos = 0;
    }

    public void adicionarPontos(int pontos) {
        this.pontos += pontos;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public int getPontos() {
        return pontos;
    }
}