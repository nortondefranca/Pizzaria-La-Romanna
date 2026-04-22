package connection;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexao {

    private static final String URL = "jdbc:mysql://localhost:3306/pizzaria";
    private static final String USER = "root";
    private static final String PASS = "1234";

    public static Connection conectar() throws Exception {
        return DriverManager.getConnection(URL, USER, PASS);
    }
}
