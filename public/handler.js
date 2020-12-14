const todosList = document.querySelectorAll('div.todo-wrapper div input[name="completed"]');

todosList.forEach(todo => {
    todo.addEventListener('click', handleCheckbox);
});

function handleCheckbox(e){
    const form = e.target.closest('form');
    form.submit();
}
