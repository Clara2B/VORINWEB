document.getElementById("formContato").addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = e.target.nome.value;
    const email = e.target.email.value;

    alert(`Obrigado, ${nome}! Entraremos em contato pelo email: ${email}.`);

    e.target.reset();
});
