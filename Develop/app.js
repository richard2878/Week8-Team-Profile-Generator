const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");

const teamMembers = [];
const idArray= [];
   
    


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const initialQuestions = teamMembers => [
    {
        type: "input",
        name: "name",
        message: "What is your ${teamMembers}'s name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your ${teamMembers}'s id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your ${teamMembers}'s email?",
    },
];

const teamMenu = () => {
    const createManager = async () => {
        const response = await inquirer.prompt([
            ...initialQuestions('manager'),
            {
                type: "input",
                name: "officeNumber",
                message: "What is the manager's office number?"
            }
        ]);

        const { name, id, email, officeNumber} = response;
        const manager = new Manager(name, id, email, officeNumber);

        teamMembers.push(manager);
        idArray.push(id);
        
        createTeam();
    }
    const createEngineer = async () => {
        const response = await inquirer.prompt([
            ...initialQuestions('engineer'),
            {
                type: "input",
                name: "github",
                message: "What is the engineers github username?"
            }
        ]);

        const { name, id, email, github} = response;
        const engineer = new Engineer(name, id, email, github); 
        
        teamMembers.push(engineer);
        idArray.push(id)

        createTeam();
    }
    const createIntern = async () => {
        const response = await inquirer.prompt([
            ...initialQuestions('intern'),
            {
                type: "input",
                name: "school",
                message: "What school did the intern go to?"
            }
        ]);

        const { name, id, email, school} = response;
        const intern = new Intern(name, id, email, school); 
        
        teamMembers.push(intern);
        idArray.push(id)

        createTeam();
    };

    const createTeam = async () => {
        const response = await inquirer.prompt([
            {
                type: "list",
                name: "employeeRole",
                message: "What position would you like to add?",
                choices: [
                    "Engineer", "Intern", "None"
                ]
            }
        ]);

        switch (response.employeeRole) {
            case 'Engineer':
                createEngineer();
                break;

            case 'Intern':
                createIntern();
                break;
            
            default:
                fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');

        }
    };
    createManager();
};

teamMenu();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
