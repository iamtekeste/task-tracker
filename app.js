window.addEventListener('load', function() {
// By wrapping my app in an IIFE I can avoid global namespace pollution
var TaskTracker = (function () {
    // I am going to cache the DOM elements for performance purposes
    var _tasksDOM = document.getElementById('tasks');
    var _taskNameInput = document.getElementById('task-name');
    var _taskDateInput = document.getElementById('task-date');
    var _taskAssigneeInput = document.getElementById('task-assignee');
    var _submitButton = document.getElementById('submit');
    var template = '<span class="task-name"></span>' +
                   '<span class="task-date"></span>' +
                   '<span class="task-assignee"></span>';
    var tasks = [
        {"name":	"Test	Task	#1",	"date":	"12/01/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#2",	"date":	"12/02/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#3",	"date":	"12/03/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#4",	"date":	"12/04/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#5",	"date":	"12/05/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#6",	"date":	"12/06/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#7",	"date":	"12/07/2012",	"assigned":	"John	Doe"	}
    ];
    var init = function () {
        // wire up the submit button
        _submitButton.addEventListener('click', addTask);
        render();
    };

    var render = function () {
        // let's make sure we don't have anything in there
        _tasksDOM.innerHTML = '';
        for(var i = 0; i < tasks.length; i++) {
            var taskElement = createElement(tasks[i]);
            _tasksDOM.appendChild(taskElement);
        }
    };

    var createElement = function (task) {
        var _taskElementDOM = document.createElement('div');
        _taskElementDOM.classList = 'task-item';
        _taskElementDOM.innerHTML = template;

        _taskElementDOM.querySelector('.task-name').innerText = task.name;
        _taskElementDOM.querySelector('.task-date').innerText = task.date;
        _taskElementDOM.querySelector('.task-assignee').innerText = task.assigned;

        return _taskElementDOM;
    }
    var addTask = function (e) {
        e.preventDefault();
        var newTask = {};
        newTask.name = _taskNameInput.value;
        newTask.date = _taskDateInput.value;
        newTask.assigned = _taskAssigneeInput.value;
        tasks.unshift(newTask);
        //let's clean the form inputs
        cleanUpForm();
        //since we have new task let's render!
        render();
    }

    var cleanUpForm = function () {
       _taskNameInput.value = '';
       _taskDateInput.value = '';
       _taskAssigneeInput.value = '';
    };

    return {
        init: init
    };
})();

// Initialize the app!
TaskTracker.init();

});