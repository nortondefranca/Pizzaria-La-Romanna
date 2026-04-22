package view;

import javax.swing.*;

public class TelaPrincipal extends JFrame {

    public TelaPrincipal() {

        setTitle("Pizzaria - Sistema de Fidelidade");
        setSize(500, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JTabbedPane abas = new JTabbedPane();

        abas.add("Cadastro", new PainelCadastro());
        abas.add("Compra", new PainelCompra());
        abas.add("Consulta", new PainelConsulta());
        abas.add("Resgate", new PainelResgate());

        add(abas);
    }

    public static void main(String[] args) {
        new TelaPrincipal().setVisible(true);
    }
}
