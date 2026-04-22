package dao;

import connection.Conexao;
import model.Cliente;
import java.sql.*;

public class ClienteDAO {

    public void salvar(Cliente c) throws Exception {
        String sql = "INSERT INTO cliente (nome, telefone, cpf) VALUES (?, ?, ?)";

        Connection conn = Conexao.conectar();
        PreparedStatement ps = conn.prepareStatement(sql);

        ps.setString(1, c.getNome());
        ps.setString(2, c.getTelefone());
        ps.setString(3, c.getCpf());

        ps.execute();
        conn.close();
    }

    public Cliente buscarPorCpf(String cpf) throws Exception {
        String sql = "SELECT * FROM cliente WHERE cpf=?";

        Connection conn = Conexao.conectar();
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, cpf);

        ResultSet rs = ps.executeQuery();

        if (rs.next()) {
            Cliente c = new Cliente();
            c.setId(rs.getInt("id"));
            c.setNome(rs.getString("nome"));
            c.setTelefone(rs.getString("telefone"));
            c.setCpf(rs.getString("cpf"));
            c.setPontos(rs.getInt("pontos"));
            return c;
        }

        return null;
    }

    public void atualizarPontos(int id, int pontos) throws Exception {
        String sql = "UPDATE cliente SET pontos=? WHERE id=?";

        Connection conn = Conexao.conectar();
        PreparedStatement ps = conn.prepareStatement(sql);

        ps.setInt(1, pontos);
        ps.setInt(2, id);

        ps.execute();
        conn.close();
    }
}
