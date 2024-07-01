// Seleciona todos os elementos com a classe "column__cards" e os armazena na variável "columns".
const columns = document.querySelectorAll(".column__cards");

// Declara uma variável "draggedCard" que será usada para armazenar o cartão que está sendo arrastado.
let draggedCard;

// Define a função "dragStart" que será chamada quando o arrasto de um cartão começar.
const dragStart = (event) => {
    // Armazena o cartão que está sendo arrastado na variável "draggedCard".
    draggedCard = event.target;
    // Define o efeito permitido para o arrasto como "move".
    event.dataTransfer.effectAllowed = "move";
};

// Define a função "dragOver" que será chamada quando um cartão arrastado estiver sobre uma coluna.
const dragOver = (event) => {
    // Previne o comportamento padrão para permitir o drop.
    event.preventDefault();
};

// Define a função "dragEnter" que será chamada quando um cartão arrastado entrar em uma coluna.
const dragEnter = ({ target }) => {
    // Se o alvo do evento contém a classe "column__cards", adiciona a classe "column--highlight".
    if (target.classList.contains("column__cards")) {
        target.classList.add("column--highlight");
    }
};

// Define a função "dragLeave" que será chamada quando um cartão arrastado sair de uma coluna.
const dragLeave = ({ target }) => {
    // Remove a classe "column--highlight" do alvo do evento.
    target.classList.remove("column--highlight");
};

// Define a função "drop" que será chamada quando um cartão for solto em uma coluna.
const drop = ({ target }) => {
    // Se o alvo do evento contém a classe "column__cards", executa o bloco de código.
    if (target.classList.contains("column__cards")) {
        // Remove a classe "column--highlight" do alvo.
        target.classList.remove("column--highlight");
        // Adiciona o cartão arrastado ao alvo do evento.
        target.append(draggedCard);
    }
};

// Define a função "createCard" que será chamada quando houver um duplo clique em uma coluna.
const createCard = ({ target }) => {
    // Se o alvo do evento não contém a classe "column__cards", retorna sem fazer nada.
    if (!target.classList.contains("column__cards")) return;

    // Cria um novo elemento "section" e o armazena na variável "card".
    const card = document.createElement("section");

    // Define as propriedades do novo cartão: classe, arrastável e editável.
    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";

    // Adiciona um ouvinte de evento que torna o cartão não editável quando perde o foco e o remove se estiver vazio.
    card.addEventListener("focusout", () => {
        card.contentEditable = "false";
        if (!card.textContent) card.remove();
    });

    // Adiciona um ouvinte de evento para iniciar o arrasto do cartão.
    card.addEventListener("dragstart", dragStart);

    // Adiciona o novo cartão ao alvo do evento e coloca o foco nele.
    target.append(card);
    card.focus();
};

// Adiciona ouvintes de eventos para "dragover", "dragenter", "dragleave", "drop" e "dblclick" em cada coluna.
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
});