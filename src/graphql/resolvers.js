const Employee = require('../model/Employee');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

const resolvers = {
    employees: async () => {
        return await Employee.find();
    },

    employee: async ({ eid }) => {
        return await Employee.findById(eid);
    },

    employeeSearchBy: async ({ by }) => {
        const employees = await Employee.find({
            $or: [
                { designation: new RegExp(by, 'i') },
                { department: new RegExp(by, 'i') }
            ]
        });

        if (employees.length === 0) {
            throw new Error(`No employees found for search: ${by}`);
        }

        return employees;
    },

    login: async ({ identifier, password }) => {
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        });
        if (!user) {
            throw new Error("Invalid username or email.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid password.");
        }
        return user;
    },

    addEmployee: async ({
                            first_name,
                            last_name,
                            email,
                            gender,
                            designation,
                            salary,
                            date_of_joining,
                            department,
                            employee_photo
                        }) => {
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) throw new Error(`Employee with email: ${email} already exists!`);

        const newEmployee = new Employee({
            first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo
        });

        return await newEmployee.save();
    },

    addUser: async ({ username, email, password }) => {
        const existingUser = await User.findOne({ username });
        if (existingUser) throw new Error("Username already exists!");

        const newUser = new User({ username, email, password });
        return await newUser.save();
    },

    deleteEmployee: async ({ eid }) => {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) throw new Error("Employee not found!");
        return `Employee with ID ${eid} deleted successfully!`;
    },

    updateEmployee: async ({
                               eid,
                               first_name,
                               last_name,
                               email,
                               gender,
                               designation,
                               salary,
                               date_of_joining,
                               department,
                               employee_photo
                           }) => {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            eid,
            { first_name,
                last_name,
                email,
                gender,
                designation,
                salary,
                date_of_joining,
                department,
                employee_photo,
                updated_at: Date.now() },
            { new: true }
        );

        if (!updatedEmployee) throw new Error("Employee not found!");
        return updatedEmployee;
    }
};

module.exports = resolvers;
