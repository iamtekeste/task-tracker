describe('TaskTracker', function () {
    var sampleTask;
    beforeEach(function () {

        var html = [
            '<form action="#" id="new-task-form">',
            '<input type="text" id="task-name" value="Interview Tekeste" required>',
            '<input type="text" id="task-date" value="10/7/2016" required>',
            '<input type="text" id="task-assignee" value="Pamela" required>',
            '<button type="submit" id="submit">Submit</button>',
            '</form>',
            '<div id="tasks">',
            '</div>'
        ].join('');

        var fixture = jasmine.getFixtures().set(html);
        jasmine.fixt

        sampleTask = {
            name: 'Interview Tekeste',
            date: '10/7/2016',
            assigned: 'Pamela'
        };

        TaskTracker.cacheDOM();
    });

    it('should initialze the app', function () {
        spyOn(TaskTracker, "cacheDOM");
        spyOn(TaskTracker, "render")
        spyOn(TaskTracker, "setupEventListeners");
        TaskTracker.init();
        expect(TaskTracker.cacheDOM).toHaveBeenCalled();
        expect(TaskTracker.render).toHaveBeenCalled();
        expect(TaskTracker.setupEventListeners).toHaveBeenCalled();
    });

    it('should setup event listeners', function () {
        var spyEvent = spyOnEvent('#submit', 'click');
        $('#submit').click();
        expect('click').toHaveBeenTriggeredOn('#submit');
    });

    it('should render the the task list', function () {
        TaskTracker.render();
        // checking if all the task objects in the tasks array are added to the DOM
        expect($('#tasks .task-item')).toHaveLength(TaskTracker.tasks.length);
    });

    it('should create single task item DOM Node', function () {
        var taskEl = TaskTracker.createElement(sampleTask);
        //let's make sure that it indeed contains name, date and assigned span elements
        expect($(taskEl).children('.task-name').length).toEqual(1);
        expect($(taskEl).children('.task-date').length).toEqual(1);
        expect($(taskEl).children('.task-assignee').length).toEqual(1);
    });


    it('should read task from form inputs', function () {

        // check the fixture to see the current value of the inputs
        var currentTask = TaskTracker.getNewTask();
        expect(currentTask).toEqual(sampleTask);
    });

    it('should add new task', function () {
        TaskTracker.setupEventListeners();
        var tasksCount = TaskTracker.tasks.length;
        // we are clicking the submit button which would invoke the addTask method
        $('#submit').click();
        expect(TaskTracker.tasks.length).toEqual(tasksCount + 1);
    });

    it('should clean up form', function () {
        TaskTracker.cleanUpForm();
        expect($('#task-name')).toHaveValue('');
        expect($('#task-assignee')).toHaveValue('');
        expect($('#task-date')).toHaveValue('');
    });
});