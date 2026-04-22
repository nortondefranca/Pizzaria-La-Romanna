package view;

import dao.ClienteDAO;
import model.Cliente;

import javax.swing.*;

public class PainelCadastro extends JPanel {

    JTextField txtNome = new JTextField(15);
    JTextField txtCpf = new JTextField(15);
    JTextField txtTelefone = new JTextField(15);

    public PainelCadastro() {

        add(new JLabel("Nome:"));
        add(txtNome);

        add(new JLabel("CPF:"));
        add(txtCpf);

        add(new JLabel("Telefone:"));
        add(txtTelefone);

        JButton btn = new JButton("Cadastrar");
        add(btn);

        btn.addActionListener(e -> {
            try {
                Cliente c = new Cliente();
                c.setNome(txtNome.getText());
                c.setCpf(txtCpf.getText());
                c.setTelefone(txtTelefone.getText());

                new ClienteDAO().salvar(c);

                JOptionPane.showMessageDialog(null, "Cadastrado!");

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(null, ex.getMessage());
            }
        });
    }
}
