package view;

import dao.ClienteDAO;
import model.Cliente;

import javax.swing.*;

public class PainelConsulta extends JPanel {

    JTextField txtCpf = new JTextField(10);
    JLabel lbl = new JLabel("Pontos: ");

    public PainelConsulta() {

        add(new JLabel("CPF:"));
        add(txtCpf);

        JButton btn = new JButton("Consultar");
        add(btn);
        add(lbl);

        btn.addActionListener(e -> {
            try {
                Cliente c = new ClienteDAO().buscarPorCpf(txtCpf.getText());

                if (c != null) {
                    lbl.setText("Pontos: " + c.getPontos());
                } else {
                    lbl.setText("Cliente não encontrado");
                }

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(null, ex.getMessage());
            }
        });
    }
}
