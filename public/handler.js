const todosList = document.querySelectorAll('ul.todo-wrapper li input[name="completed"]');

todosList.forEach(todo => {
    todo.addEventListener('click', handleCheckbox);
});

function handleCheckbox(e){
    const form = e.target.closest('form');
    form.submit();
}
