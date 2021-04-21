const mysql = require(`mysql`);
const inquirer = require(`inquirer`);

// establish connection

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Vladimir12putin",
  database: "employee_tracker_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});

// use inquirer

function init() {
  inquirer
    .prompt([
      {
        type: `list`,
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by Manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager",
          "Exit",
        ],
        name: `init`,
      },
    ])
    .then((answers) => {
      if (answers.init == "View all employees") {
        // use connection.query to list out all of the employee names and information about them.
        // use join
        viewAll();
      } else if (answers.init == "View all employees by department") {
        //   join
        // use inquirer to prompt which department then display employees for that department.
      } else if (answers.init == "View all employees by Manager") {
        //   join
        //   use inquirer to ask which manager then display employees for that manager
      } else if (answers.init == "Add employee") {
        //  use CREATE to add data to table
        create();
      } else if (answers.init == "Remove employee") {
        //   use DELETE to remove employee
        remove();
      } else if (answers.init == "Update employee role") {
        //   use UPDATE to update employee role
      } else if (answers.init == "Update employee manager") {
        //   use UPDATE to update manager information
      } else if (answers.init == "Exit") {
        connection.end();
      }
    });
}

const viewAll = () => {
  console.log("-----------------View All Employees-----------------");
  let query = "SELECT first_name, last_name, id FROM employee;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Name:  " +
          res[i].first_name +
          " " +
          res[i].last_name +
          "  ||  " +
          "ID: " +
          res[i].id
      );
    }
  });
};

const remove = () => {
  inquirer
    .prompt([
      {
        type: `input`,
        message:
          "What is the employee ID of the person you would like to remove?",
        name: `remove`,
      },
    ])
    .then((answers) => {
      console.log(answers);
      connection.query(
        `DELETE FROM role WHERE employee_id = ${answers.remove};`,
        (err, res) => {
          if (err) throw err;
        }
      );
      connection.query(
        `DELETE FROM department WHERE employee_id = ${answers.remove};`,
        (err, res) => {
          if (err) throw err;
        }
      );
      connection.query(
        `DELETE FROM employee WHERE id = ${answers.remove};`,
        (err, res) => {
          if (err) throw err;
          console.log("Employee Removed");
          init();
        }
      );
    });
};

// add employee
const create = () => {
  inquirer
    .prompt([
      {
        type: `input`,
        message: "What is the employee department ID?",
        name: `dep_id`,
      },
      {
        type: `input`,
        message: "What is the employee department name?",
        name: `dep_name`,
      },
      {
        type: `input`,
        message: "What is the employee role ID?",
        name: `role_id`,
      },
      {
        type: `input`,
        message: "What is the employee role title?",
        name: `role_title`,
      },
      {
        type: `input`,
        message: "What is the employee salary?",
        name: `role_salary`,
      },
      {
        type: `input`,
        message: "What is the employee first name?",
        name: `emp_fn`,
      },
      {
        type: `input`,
        message: "What is the employee last name?",
        name: `emp_ln`,
      },
      {
        type: `input`,
        message: "What is the employee's manager ID?",
        name: `manager_id`,
      },
    ])
    .then((answers) => {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.emp_fn}', '${answers.emp_ln}', ${answers.role_id}, ${answers.manager_id})`
      ),
        (err, res) => {
          if (err) throw err;
        };
      connection.query(
        `INSERT INTO department (id, name) VALUES (${answers.dep_id}, '${answers.dep_name}')`
      ),
        (err, res) => {
          if (err) throw err;
        };
      connection.query(
        `INSERT INTO role (id, title, salary, department_id) VALUES (${answers.role_id}, '${answers.role_title}', ${answers.role_salary}, ${answers.dep_id})`
      ),
        (err, res) => {
          if (err) throw err;
        };

      init();
    });
};
