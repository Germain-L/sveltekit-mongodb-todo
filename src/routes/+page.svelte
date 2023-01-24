<script lang="ts">
  import AddTodo from "$lib/components/AddTodo.svelte";
  import ViewTodo from "$lib/components/ViewTodo.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div class="flex justify-center">
  <div class="flex bg-red-50 space">
    <div class="w-6/12 mp-2 space-y-5">
      <h1 class="text-lg">Todo List</h1>
      {#if data.todos.length}
        {#each data.todos as todo}
          <ViewTodo {todo} />
        {/each}
      {:else}
        <p>Nothing to do</p>
      {/if}
    </div>
    <div class="w-1 bg-gray-500 border rounded border-gray-500" />
    <div class="w-6/12 px-4">
      <AddTodo />
    </div>
  </div>
</div>
