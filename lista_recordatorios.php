<?php
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
    $id = $_POST['id'];
    try {
        $stmt = $pdo->prepare("DELETE FROM recordatorios WHERE id = ?");
        $stmt->execute([$id]);
        header('Location: lista_recordatorios.php?status=success&action=delete');
        exit();
    } catch (PDOException $e) {
        header('Location: lista_recordatorios.php?status=error&message=' . urlencode($e->getMessage()));
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarea 3 - Lista de Recordatorios</title>
    <link rel="stylesheet" href="lista.css">
</head>
<body>
<div class="container">
    <h1>Tarea 3 - Lista de Recordatorios</h1>

    <?php
    if (isset($_GET['status']) && $_GET['status'] === 'success') {
        $accion = $_GET['action'];
        $mensaje = "";
        if ($accion === 'create') {
            $mensaje = "✅ Recordatorio creado exitosamente.";
        } elseif ($accion === 'update') {
            $mensaje = "✏️ Recordatorio actualizado con éxito.";
        } elseif ($accion === 'delete') {
            $mensaje = "🗑️ Recordatorio eliminado con éxito.";
        }
        echo "<p class='mensaje-exito'>$mensaje</p>";
    } elseif (isset($_GET['status']) && $_GET['status'] === 'error') {
        echo "<p class='mensaje-error'>❌ Error: " . htmlspecialchars($_GET['message']) . "</p>";
    }
    ?>

    <div style="text-align: center; margin-bottom: 20px;">
        <a href="index.php" class="go-to-form-button">Crear un nuevo recordatorio</a>
    </div>

    <div class="table-section">
        <h2>Recordatorios registrados</h2>
        <?php
        $stmt = $pdo->query("SELECT * FROM recordatorios ORDER BY fecha_limite DESC");
        $recordatorios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($recordatorios)): ?>
            <p>🚫 No hay recordatorios registrados.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Fecha Límite</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recordatorios as $recordatorio): ?>
                        <tr>
                            <td><?php echo $recordatorio['id']; ?></td>
                            <td>
                                <strong><?php echo htmlspecialchars($recordatorio['titulo']); ?></strong>
                                <br>
                                <small><?php echo nl2br(htmlspecialchars($recordatorio['descripcion'])); ?></small>
                            </td>
                            <td><?php echo date('d/m/Y H:i', strtotime($recordatorio['fecha_limite'])); ?></td>
                            <td class="<?php echo ($recordatorio['estado'] === 'completado') ? 'estado-completado' : 'estado-pendiente'; ?>">
                                <?php echo ucfirst($recordatorio['estado']); ?>
                            </td>
                            <td>
                                <a href="index.php?action=edit&id=<?php echo $recordatorio['id']; ?>" class="edit-button">Editar</a>
                                <form action="lista_recordatorios.php" method="POST" style="display:inline-block;">
                                    <input type="hidden" name="action" value="delete">
                                    <input type="hidden" name="id" value="<?php echo $recordatorio['id']; ?>">
                                    <button type="submit" class="delete-button" onclick="return confirm('¿Estás seguro de que quieres eliminar este recordatorio?');">Completada</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</div>
</body>
</html>