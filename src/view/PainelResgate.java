package view;

import service.FidelidadeService;

import javax.swing.*;

public class PainelResgate extends JPanel {

    JTextField txtCpf = new JTextField(10);
    JTextField txtPontos = new JTextField(10);

    public PainelResgate() {

        add(new JLabel("CPF:"));
        add(txtCpf);

        add(new JLabel("Pontos:"));
        add(txtPontos);

        JButton btn = new JButton("Resgatar");
        add(btn);

        btn.addActionListener(e -> {
            try {
                new FidelidadeService().resgatarPontos(
                        txtCpf.getText(),
                        Integer.parseInt(txtPontos.getText())
                );

                JOptionPane.showMessageDialog(null, "Resgatado!");

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(null, ex.getMessage());
            }
        });
    }
}
