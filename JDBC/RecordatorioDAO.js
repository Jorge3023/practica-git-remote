import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class RecordatorioDAO {

    private static final String URL = "jdbc:mysql://localhost:3306/recordatorios";
    private static final String USER = "root"; // Reemplaza con tu usuario de MySQL
    private static final String PASSWORD = ""; // Reemplaza con tu contraseña de MySQL

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    // Método para crear un recordatorio
    public void crearRecordatorio(Recordatorio r) throws SQLException {
        String sql = "INSERT INTO lista_recordatorios (titulo, descripcion, fecha_limite, fecha_creacion) VALUES (?, ?, ?, ?)";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, r.getTitulo());
            stmt.setString(2, r.getDescripcion());
            stmt.setTimestamp(3, Timestamp.valueOf(r.getFechaLimite()));
            stmt.setTimestamp(4, Timestamp.valueOf(LocalDateTime.now()));
            stmt.executeUpdate();
        }
    }

    // Método para obtener todos los recordatorios
    public List<Recordatorio> obtenerTodosRecordatorios() throws SQLException {
        List<Recordatorio> recordatorios = new ArrayList<>();
        String sql = "SELECT * FROM lista_recordatorios ORDER BY fecha_limite DESC";
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                Recordatorio r = new Recordatorio();
                r.setId(rs.getInt("id"));
                r.setTitulo(rs.getString("titulo"));
                r.setDescripcion(rs.getString("descripcion"));
                r.setFechaLimite(rs.getTimestamp("fecha_limite").toLocalDateTime());
                r.setEstado(rs.getString("estado"));
                r.setFechaCreacion(rs.getTimestamp("fecha_creacion").toLocalDateTime());
                recordatorios.add(r);
            }
        }
        return recordatorios;
    }

    // Método para obtener un recordatorio por ID
    public Recordatorio obtenerRecordatorioPorId(int id) throws SQLException {
        String sql = "SELECT * FROM lista_recordatorios WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Recordatorio r = new Recordatorio();
                    r.setId(rs.getInt("id"));
                    r.setTitulo(rs.getString("titulo"));
                    r.setDescripcion(rs.getString("descripcion"));
                    r.setFechaLimite(rs.getTimestamp("fecha_limite").toLocalDateTime());
                    r.setEstado(rs.getString("estado"));
                    r.setFechaCreacion(rs.getTimestamp("fecha_creacion").toLocalDateTime());
                    return r;
                }
            }
        }
        return null;
    }

    // Método para actualizar un recordatorio
    public void actualizarRecordatorio(Recordatorio r) throws SQLException {
        String sql = "UPDATE lista_recordatorios SET titulo = ?, descripcion = ?, fecha_limite = ?, estado = ? WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, r.getTitulo());
            stmt.setString(2, r.getDescripcion());
            stmt.setTimestamp(3, Timestamp.valueOf(r.getFechaLimite()));
            stmt.setString(4, r.getEstado());
            stmt.setInt(5, r.getId());
            stmt.executeUpdate();
        }
    }

    // Método para eliminar un recordatorio
    public void eliminarRecordatorio(int id) throws SQLException {
        String sql = "DELETE FROM lista_recordatorios WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}