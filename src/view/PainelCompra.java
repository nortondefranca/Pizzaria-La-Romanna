package view;

import service.FidelidadeService;

import javax.swing.*;

public class PainelCompra extends JPanel {

    JTextField txtCpf = new JTextField(10);
    JTextField txtValor = new JTextField(10);

    public PainelCompra() {

        add(new JLabel("CPF:"));
        add(txtCpf);

        add(new JLabel("Valor:"));
        add(txtValor);

        JButton btn = new JButton("Comprar");
        add(btn);

        btn.addActionListener(e -> {
            try {
                new FidelidadeService().registrarCompra(
                        txtCpf.getText(),
                        Double.parseDouble(txtValor.getText())
                );

                JOptionPane.showMessageDialog(null, "Compra registrada!");

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(null, ex.getMessage());
            }
        });
    }
}
