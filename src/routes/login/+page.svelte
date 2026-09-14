<script>
    let { form } = $props();
</script>

<h1>Login</h1>

{#if form?.error}
    <p>{form.error}</p>
{/if}

<form method="POST">

    <label>
        E-Mail
        <input
            type="email"
            name="email"
            required
        />
    </label>

    <br />

    <label>
        Passwort
        <input
            type="password"
            name="password"
            required
        />
    </label>

    <br />

    <button type="submit">
        Einloggen
    </button>

</form>