const inquirer = require('inquirer');

const viewDepo 
const viewRoles 
const viewEmps
const addDepo = inquirer.prompt([
    {

    }
])
const addRole = inquirer.prompt([
    {
        
    }
])
const addEmp = inquirer.prompt([
    {
        
    }
])
const updateEmp = inquirer.prompt([
    {
        
    }
])








const main = inquirer.prompt([

    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update employee role'
        ]

    }
])

main();