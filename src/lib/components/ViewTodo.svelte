<script lang="ts">
  import type { Todo } from "$lib/types";

  export let todo: Todo;
</script>

<form method="POST" action="?/changeState">
  <h1>{todo.title}</h1>
  <input type="hidden" name="id" value={todo._id} />
  <input type="hidden" name="completed" value={todo.completed} />
  <button type="submit">
    {todo.completed ? "âŠī¸" : "â"}
  </button>
  <button formaction="?/delete">đī¸</button>
</form>
