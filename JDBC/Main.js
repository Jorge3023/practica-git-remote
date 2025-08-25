import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        RecordatorioDAO dao = new RecordatorioDAO();
        Scanner scanner = new Scanner(System.in);
        int opcion;

        do {
            System.out.println("\n--- Menú de Gestión de Recordatorios ---");
            System.out.println("1. Crear Recordatorio");
            System.out.println("2. Ver Recordatorios");
            System.out.println("3. Actualizar Recordatorio");
            System.out.println("4. Eliminar Recordatorio");
            System.out.println("5. Salir");
            System.out.print("Seleccione una opción: ");
            opcion = scanner.nextInt();
            scanner.nextLine(); // Consumir el salto de línea

            try {
                switch (opcion) {
                    case 1:
                        System.out.println("\n--- Crear Nuevo Recordatorio ---");
                        System.out.print("Título: ");
                        String titulo = scanner.nextLine();
                        System.out.print("Descripción: ");
                        String descripcion = scanner.nextLine();
                        System.out.print("Fecha Límite (YYYY-MM-DDTHH:MM): ");
                        String fechaLimiteStr = scanner.nextLine();
                        Recordatorio nuevoRecordatorio = new Recordatorio();
                        nuevoRecordatorio.setTitulo(titulo);
                        nuevoRecordatorio.setDescripcion(descripcion);
                        nuevoRecordatorio.setFechaLimite(LocalDateTime.parse(fechaLimiteStr));
                        dao.crearRecordatorio(nuevoRecordatorio);
                        System.out.println("Recordatorio creado exitosamente.");
                        break;
                    case 2:
                        System.out.println("\n--- Lista de Recordatorios ---");
                        List<Recordatorio> recordatorios = dao.obtenerTodosRecordatorios();
                        if (recordatorios.isEmpty()) {
                            System.out.println("No hay recordatorios registrados.");
                        } else {
                            for (Recordatorio r : recordatorios) {
                                System.out.println(r);
                            }
                        }
                        break;
                    case 3:
                        System.out.println("\n--- Actualizar Recordatorio ---");
                        System.out.print("ID del recordatorio a actualizar: ");
                        int idActualizar = scanner.nextInt();
                        scanner.nextLine();
                        Recordatorio recordatorioExistente = dao.obtenerRecordatorioPorId(idActualizar);
                        if (recordatorioExistente != null) {
                            System.out.print("Nuevo Título (actual: " + recordatorioExistente.getTitulo() + "): ");
                            String nuevoTitulo = scanner.nextLine();
                            System.out.print("Nueva Descripción (actual: " + recordatorioExistente.getDescripcion() + "): ");
                            String nuevaDescripcion = scanner.nextLine();
                            System.out.print("Nueva Fecha Límite (actual: " + recordatorioExistente.getFechaLimite() + "): ");
                            String nuevaFechaStr = scanner.nextLine();
                            System.out.print("Nuevo Estado (pendiente/completado): ");
                            String nuevoEstado = scanner.nextLine();

                            recordatorioExistente.setTitulo(nuevoTitulo);
                            recordatorioExistente.setDescripcion(nuevaDescripcion);
                            recordatorioExistente.setFechaLimite(LocalDateTime.parse(nuevaFechaStr));
                            recordatorioExistente.setEstado(nuevoEstado);
                            dao.actualizarRecordatorio(recordatorioExistente);
                            System.out.println("Recordatorio actualizado exitosamente.");
                        } else {
                            System.out.println("Recordatorio no encontrado.");
                        }
                        break;
                    case 4:
                        System.out.println("\n--- Eliminar Recordatorio ---");
                        System.out.print("ID del recordatorio a eliminar: ");
                        int idEliminar = scanner.nextInt();
                        scanner.nextLine();
                        dao.eliminarRecordatorio(idEliminar);
                        System.out.println("Recordatorio eliminado exitosamente.");
                        break;
                    case 5:
                        System.out.println("Saliendo de la aplicación. ¡Adiós!");
                        break;
                    default:
                        System.out.println("Opción no válida. Inténtelo de nuevo.");
                }
            } catch (SQLException e) {
                System.out.println("Error en la base de datos: " + e.getMessage());
            } catch (Exception e) {
                System.out.println("Error inesperado: " + e.getMessage());
            }
        } while (opcion != 5);

        scanner.close();
    }
}