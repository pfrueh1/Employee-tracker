const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

function viewDepo() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(['id','name'], rows);
        main();
    })
}; 
function viewRoles() {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name as department FROM roles left join departments on roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(['id','title','salary','department'], rows);
        main();
    })
} 
function viewEmps() {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title as role, roles.salary as salary, departments.name as department from employees left join roles on employees.role_id = roles.id left join departments on employees.department_id = 
    departments.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(['id','first_name','last_name','department','role', 'salary'], rows);
        main();
    })
}; 
function addDepo() {
    inquirer.prompt(
    {
        type: 'text',
        name: 'name',
        message: `What is the new department's name?`
    }
)
.then(({name}) => {
    const sql = `INSERT INTO departments (name)
    VALUES (?)`
    const param = name;
    db.query(sql, param, (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log('New department added!')
        main();
    })
})
}
function addRole()  { 

    const departments = []
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        for (let i = 0; i < rows.length; i++) {
            departments.push(rows[i])
        }
        console.log('departments',departments)
    })
     

     
    inquirer.prompt([
    {
        type: 'text',
        name: 'name',
        message: `What is the new role's name?`   
    },
    {
        type: 'list',
        name: 'department',
        message: `What department does the new role belong to?`,
        choices: departments
    },
    {
        type: 'text',
        name: 'salary',
        message: `What is the new role's salary?`   
    }
    ])
    .then(({name, department, salary}) => {
        
        const sqlId = `SELECT id FROM departments WHERE name = ?`
        paramId = department;
        db.query(sqlId, paramId, (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            departmentId = result[0].id

            const sql = `INSERT INTO roles (title, department_id, salary)
            VALUES (?,?,?)`

            const params = [name, departmentId, salary];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.log('New role added!')
                main();
            })
        })



            
        

    })
}
function addEmp()  {
    const roles = []
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        for (let i = 0; i < rows.length; i++) {
            roles.push(rows[i].title)
        }
    })
    inquirer.prompt([
    {
        type: 'text',
        name: 'firstName',
        message: `What is the new empoyee's first name?` 
    },
    {
        type: 'text',
        name: 'lastName',
        message: `What is the new empoyee's last name?` 
    },
    {
        type: 'list',
        name: 'role',
        message: `What is the new empoyee's role?`,
        choices: roles 
    }
])
.then(({firstName, lastName, role}) => {
    let departmentId
    let roleId
    const sqlId = `SELECT * FROM roles WHERE title = ?`
    paramId = role;
    db.query(sqlId, paramId, (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        departmentId = result[0].department_id;
        roleId = result[0].id;

        const sql = `INSERT INTO employees (first_name, last_name, role_id, department_id)
        VALUES (?,?,?,?)`

        const params = [firstName, lastName, roleId, departmentId];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log('New Employee added!')
            main();
        })
    })


})
}
function updateEmp() {
    const employeesArr = []
   
    const sqlemp = `SELECT * FROM employees`;
    db.query(sqlemp, (err, rows1) => {
        if (err) {
            console.log(err)
        }console.log('rows1', rows1)
        for (let i = 0; i <= rows1.length; i++) {

            employeesArr.push(rows1[i].first_name.concat(' ', rows1[i].last_name))

        }
        const rolesArr = []
        const sqlr = `SELECT * FROM roles`;
        db.query(sqlr, (err, rows) => {
            if (err) {
                console.log(err)
            }
            for (let i = 0; i < rows.length; i++) {
                rolesArr.push(rows[i].title)
            }
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: `Which employee would you like to update?`,
                choices: employeesArr 
            },
            {
                type: 'list',
                name: 'role',
                message: `What is the empoyee's new role?`,
                choices: rolesArr 
            }
        
        ])
            .then(({name, role}) => {
        
        const idsql = `SELECT id FROM roles WHERE title = ?`;
        const idparam = role
        db.query(idsql, idparam, (err, result) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log(result)
            main();
        })
            // const nameArr = name.split(' ')
            // const sql = `UPDATE employees SET role_id = ? 
            // WHERE first_name = ? AND last_name = ?`;
            // const params = [roleId, nameArr[0], nameArr[1]]
    })
    })





}








function main()  {
    inquirer.prompt(

    {
        type: 'list',
        name: 'menu',
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
).then(({menu}) => {
    if (menu === 'View all employees') {
        viewEmps();
    } else if (menu === 'View all departments') {
        viewDepo();
    } else if (menu === 'View all roles') {
        viewRoles();
    } else if (menu === 'Add a department') {
        addDepo();
    } else if (menu === 'Add a role') {
        addRole();
    } else if (menu === 'Add an employee'){
        addEmp();
    }
    else if (menu === 'Update employee role') {
        updateEmp();
    }
});
};

main()