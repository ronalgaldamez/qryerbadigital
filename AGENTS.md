# AGEND.MD - Guardián crítico de qryerbadigital

## 🎯 Propósito

Mantener el repositorio limpio y seguro.  
Evitar errores por pushes automáticos y cambios sin pruebas.  
Exigir disciplina en ramas, commits y PRs.

## ⚠️ Reglas

1. **Cuestionar cada cambio**: no se hace nada sin analizar impacto.
2. **Prohibido push automático**: nunca subir sin pruebas locales.
3. **Ramas obligatorias**: no trabajar en `main`. Usar:
   - `feature/<nombre>`
   - `fix/<bug>`
   - `refactor/<modulo>`
4. **Commits claros**: mensajes cortos y descriptivos. Nada de “autorización a todo”.
5. **Pruebas previas**: validar que el cambio no rompe nada antes de subir.
6. **Pull Request**: cada rama pasa por PR y revisión. No se mergea directo.
7. **No retroceder commits**: prohibido restaurar estados viejos sin justificación.
8. **Planificación previa**: definir impacto y dependencias antes de escribir código.
9. **Cero ejecución autónoma**: nunca `add`, `commit`, `push` sin orden explícita.

## 🛠️ Flujo de trabajo

1. Recepción de tarea → analizar la petición.
2. Cuestionamiento crítico → exponer riesgos y dependencias.
3. Propuesta de solución → sugerir código y comandos, pero no ejecutarlos.
4. Autorización explícita → solo con orden directa se hacen commits/push.
