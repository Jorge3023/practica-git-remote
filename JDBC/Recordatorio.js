import java.time.LocalDateTime;

public class Recordatorio {
    private int id;
    private String titulo;
    private String descripcion;
    private LocalDateTime fechaLimite;
    private String estado;
    private LocalDateTime fechaCreacion;

    // Constructor vacío
    public Recordatorio() {}

    // Constructor con parámetros
    public Recordatorio(int id, String titulo, String descripcion, LocalDateTime fechaLimite, String estado, LocalDateTime fechaCreacion) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaLimite = fechaLimite;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public LocalDateTime getFechaLimite() { return fechaLimite; }
    public void setFechaLimite(LocalDateTime fechaLimite) { this.fechaLimite = fechaLimite; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    @Override
    public String toString() {
        return "ID: " + id + ", Título: " + titulo + ", Descripción: " + descripcion +
               ", Fecha Límite: " + fechaLimite + ", Estado: " + estado;
    }
}