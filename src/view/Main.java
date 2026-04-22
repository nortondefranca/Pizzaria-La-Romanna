package br.com.pizzaria.view;

import model.Cliente;
import dao.ClienteDAO;
import service.FidelidadeService;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) throws Exception {

        Scanner sc = new Scanner(System.in);
        ClienteDAO dao = new ClienteDAO();
        FidelidadeService service = new FidelidadeService();

        while (true) {
            System.out.println("\n1 - Cadastrar");
            System.out.println("2 - Comprar");
            System.out.println("3 - Consultar pontos");
            System.out.println("4 - Resgatar");
            System.out.println("0 - Sair");

            int op = sc.nextInt();
            sc.nextLine();

            switch (op) {
                case 1:
                    Cliente c = new Cliente();
                    System.out.print("Nome: ");
                    c.setNome(sc.nextLine());
                    System.out.print("CPF: ");
                    c.setCpf(sc.nextLine());
                    System.out.print("Telefone: ");
                    c.setTelefone(sc.nextLine());

                    dao.salvar(c);
                    break;

                case 2:
                    System.out.print("CPF: ");
                    String cpf = sc.nextLine();
                    System.out.print("Valor: ");
                    double valor = sc.nextDouble();

                    service.registrarCompra(cpf, valor);
                    break;

                case 3:
                    System.out.print("CPF: ");
                    Cliente cliente = dao.buscarPorCpf(sc.nextLine());
                    System.out.println("Pontos: " + cliente.getPontos());
                    break;

                case 4:
                    System.out.print("CPF: ");
                    String cpf2 = sc.nextLine();
                    System.out.print("Pontos para resgatar: ");
                    int p = sc.nextInt();

                    service.resgatarPontos(cpf2, p);
                    break;
            }
        }
    }
}
