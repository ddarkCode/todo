module.exports = (function utils (){
    const todayTodos = [
        'Avocados are a fruit, not a vegetable.',
        'The Eiffel Tower can be 15 cm taller during the summer',
        'Trypophobia is the fear of closely-packed holes.',
        'Allodoxaphobia is the fear of other people\'s opinions.',
        'Australia is wider than the moon.',
        'Mellifluous\' is a sound that is pleasingly smooth and musical to hear.',
        'The Spice Girls were originally a band called Touch.'

    ]

    const workTodos = [
        'Avocados are a fruit, not a vegetable.',
        'The Eiffel Tower can be 15 cm taller during the summer',
        'Trypophobia is the fear of closely-packed holes.',
        'Allodoxaphobia is the fear of other people\'s opinions.',
        'Australia is wider than the moon.',
        'Mellifluous\' is a sound that is pleasingly smooth and musical to hear.',
        'The Spice Girls were originally a band called Touch.'

    ]
    const getDate = () => {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const getTodos = (todos) => {
        return new Promise((resolve, reject) => {
            resolve(todos)
        }).catch(err => {
            reject(err)
        })
    }

    const postNewTodo = (newItem, todoArr) => {
        todoArr.push(newItem);
    }

    return {
        getDate,
        getTodos,
        postNewTodo,
        todayTodos,
        workTodos
    }
}())