var TaskTracker = {
    tasks: [
        {"name":	"Test   Task    #1",	"date":	"12/01/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#2",	"date":	"12/02/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#3",	"date":	"12/03/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#4",	"date":	"12/04/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#5",	"date":	"12/05/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#6",	"date":	"12/06/2012",	"assigned":	"John	Doe"	},
        {"name":	"Test	Task	#7",	"date":	"12/07/2012",	"assigned":	"John	Doe"	}
    ],
    init: function() {
        this.cacheDOM();
        this.setupEventListeners();
        this.render();
    },
    setupEventListeners: function () {
        // wire up the form
        this.form.submit(function (e) {
            e.preventDefault();
            var newTask = this.getNewTask();
            this.addTask(newTask);
        }.bind(this));
    },
    // cache the DOM elements for performance purposes
    cacheDOM: function () {
        this.form = $('#new-task-form');
        this.tasksEl = $('#tasks');
        this.taskNameInput = $('#task-name');
        this.taskDateInput = $('#task-date');
        this.taskAssigneeInput = $('#task-assignee');
    },
    compileTemplate: function (task) {
        var template = $('#task-template').html().trim();
		for(prop in task) {
			if(task.hasOwnProperty(prop)) {
				template = template.replace('{{' + prop.toLowerCase() + '}}', task[prop]);
			}
		}
		return  template;
    },
    createElement: function (task) {
        var  template = this.compileTemplate(task);
        var taskItemEl = $('<div class="task-item"></div>').html(template);
        return taskItemEl;
    },
    render: function () {
        
        for(var i = 0; i < this.tasks.length; i++) {
            var taskItemEl = this.createElement(this.tasks[i]);
            this.tasksEl.append(taskItemEl);
        }
    },
    cleanUpForm: function () {
        this.form.find('input').val('');
    },
    getNewTask: function() {
        var newTask = {};
        newTask.name = this.taskNameInput.val();
        newTask.date = this.taskDateInput.val();
        newTask.assigned = this.taskAssigneeInput.val();
        return newTask;
    },
    addTask: function (newTask) {
        this.tasks.unshift(newTask);

       // create new DOM element and prepend it to the tasks list
        var taskEl = this.createElement(newTask);
        this.tasksEl.prepend(taskEl);

        this.cleanUpForm();
    }
};