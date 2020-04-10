
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)

    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            // addTodos();
            createTodo();
        }
    });

});





function addTodos(todos) {
    todos.forEach(function(todo){
       addTodo(todo);
    });
}


function addTodo(todo){
    let newTodo = $("<li><span><i class='far fa-trash-alt'></i></span> " + todo.name + "</li>");
    newTodo.data('id', todo._id);
    $('.list').append(newTodo);
}

// // Edit specific todos by clicking
// $("ul").on("click", "li", function () {
   
//         updateTodo($(this));
       
// });

/*I couldve done above in a simple way by:
1. creating a class (e.g blablabla) in css
2. toggling the class in my jQuery
 	$("li").click(function(){
 		$(this).toggleClass("blablabla");
 	});

It's pretty shorter you see!!!!! */

//Delete Todo
$(".list").on("click", "span", function (e) {
    e.stopPropagation();
    removeTodo($(this).parent());
});


function createTodo(){
    let userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo){
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    })
   
}


function removeTodo(todo){
    let clickedId = todo.data('id');
    let deleteUrl = '/api/todos/' + clickedId;
    if (confirm("Are You Sure?")) {
                $.ajax({
                method: 'DELETE',
                url: deleteUrl
            })
                .then(function (data) {
                    
                        todo.remove();
                
                  
                });
            }
    }


    // function updateTodo (todo){
    //     let updateUrl = '/api/todos/' + todo.data('id');
    //     if ($(this).css("color") === "rgb(255, 0, 0)") {
    //         $(this).css({
    //             color: "black",
    //             textDecoration: "none",
    //         });
    //     }
    //      else {
    //             $(this).css({
    //                 color: "red",
    //                 textDecoration: "line-through",
    //             });
    //         }
    //         $.ajax({
    //             method: 'PUT',
    //             url: updateUrl,
    //         })
            
    // }

    




   