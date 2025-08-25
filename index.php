<?php
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    try {
        if ($action === 'create') {
            $titulo = $_POST['titulo'];
            $descripcion = $_POST['descripcion'];
            // Combina los campos de fecha y hora
            $fecha_limite = $_POST['fecha_limite_date'] . ' ' . $_POST['fecha_limite_time'] . ':00';
            $stmt = $pdo->prepare("INSERT INTO recordatorios (titulo, descripcion, fecha_limite, fecha_creacion) VALUES (?, ?, ?, NOW())");
            $stmt->execute([$titulo, $descripcion, $fecha_limite]);
            header('Location: lista_recordatorios.php?status=success&action=create');
            exit();
        } elseif ($action === 'update') {
            $id = $_POST['id'];
            $titulo = $_POST['titulo'];
            $descripcion = $_POST['descripcion'];
            // Combina los campos de fecha y hora para la actualización
            $fecha_limite = $_POST['fecha_limite_date'] . ' ' . $_POST['fecha_limite_time'] . ':00';
            $stmt = $pdo->prepare("UPDATE recordatorios SET titulo = ?, descripcion = ?, fecha_limite = ? WHERE id = ?");
            $stmt->execute([$titulo, $descripcion, $fecha_limite, $id]);
            header('Location: lista_recordatorios.php?status=success&action=update');
            exit();
        }
    } catch (PDOException $e) {
        header('Location: lista_recordatorios.php?status=error&message=' . urlencode($e->getMessage()));
        exit();
    }
}

$recordatorio_a_editar = null;
if (isset($_GET['action']) && $_GET['action'] === 'edit' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM recordatorios WHERE id = ?");
    $stmt->execute([$id]);
    $recordatorio_a_editar = $stmt->fetch(PDO::FETCH_ASSOC);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarea 3 - Gestión de Recordatorios - Formulario</title>
    <link rel="stylesheet" href="menu.css">
</head>
<body>
<div class="container">
    <h1>Tarea 3 - Gestión de Recordatorios</h1>
    <div class="form-section">
        <h2><?php echo $recordatorio_a_editar ? 'Actualizar Recordatorio' : 'Crear Nuevo Recordatorio'; ?></h2>
        <form action="index.php" method="POST">
            <input type="hidden" name="action" value="<?php echo $recordatorio_a_editar ? 'update' : 'create'; ?>">
            <?php if ($recordatorio_a_editar): ?>
                <input type="hidden" name="id" value="<?php echo $recordatorio_a_editar['id']; ?>">
            <?php endif; ?>

            <label for="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" required 
                   value="<?php echo $recordatorio_a_editar ? htmlspecialchars($recordatorio_a_editar['titulo']) : ''; ?>">
            
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" rows="4"><?php echo $recordatorio_a_editar ? htmlspecialchars($recordatorio_a_editar['descripcion']) : ''; ?></textarea>

            <label>Fecha y Hora Límite:</label>
            <div class="datetime-inputs">
                <input type="date" name="fecha_limite_date" required 
                       value="<?php echo $recordatorio_a_editar ? date('Y-m-d', strtotime($recordatorio_a_editar['fecha_limite'])) : ''; ?>">
                <input type="time" name="fecha_limite_time" required
                       value="<?php echo $recordatorio_a_editar ? date('H:i', strtotime($recordatorio_a_editar['fecha_limite'])) : ''; ?>">
            </div>

            <button type="submit"><?php echo $recordatorio_a_editar ? 'Actualizar' : 'Crear'; ?> Recordatorio</button>
            <?php if ($recordatorio_a_editar): ?>
                <a href="lista_recordatorios.php" class="cancel-button">Cancelar</a>
            <?php endif; ?>
        </form>
    </div>
    <div style="text-align: center; margin-top: 20px;">
        <a href="lista_recordatorios.php" class="go-to-list-button">Ir a la lista de recordatorios</a>
    </div>
</div>
</body>
</html>