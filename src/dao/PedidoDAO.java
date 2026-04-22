package dao;

import connection.Conexao;
import java.sql.*;

public class PedidoDAO {

    public void salvar(int clienteId, double valor, int pontos) throws Exception {

        String sql = "INSERT INTO pedido (cliente_id, valor, pontos_ganhos) VALUES (?, ?, ?)";

        Connection conn = Conexao.conectar();
        PreparedStatement ps = conn.prepareStatement(sql);

        ps.setInt(1, clienteId);
        ps.setDouble(2, valor);
        ps.setInt(3, pontos);

        ps.execute();
        conn.close();
    }
}
