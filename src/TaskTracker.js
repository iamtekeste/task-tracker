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
        // wire up the submit button
        this.submitButton.click(function (e) {
            e.preventDefault();
            var newTask = this.getNewTask();
            this.addTask(newTask);
        }.bind(this));
    },
    // I am going to cache the DOM elements for performance purposes
    cacheDOM: function () {
        this.form = $('#new-task-form');
        this.tasksEl = $('#tasks');
        this.taskNameInput = $('#task-name');
        this.taskDateInput = $('#task-date');
        this.taskAssigneeInput = $('#task-assignee');
        this.submitButton = $('#submit');
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
        var taskItemEl = $('<div class="task-item"></div>')
                            .html(template);
        return taskItemEl;
    },
    render: function () {
        // let's make sure we don't have anything in there
        this.tasksEl.html('');
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
        // let us prepend the new task;
        this.tasks.unshift(newTask);
       //since we have new task let's prepend!
        var taskEl = this.createElement(newTask);
        this.tasksEl.prepend(taskEl);

        //let's clean the form inputs
        this.cleanUpForm();
    }
};