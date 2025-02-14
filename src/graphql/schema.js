const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Employee {
        first_name: String!
        last_name: String!
        email: String
        gender: String
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String
        updated_at: String
    }

    type User {
        username: String!
        email: String!
        password: String!
        created_at: String
        updated_at: String
    }

    type Query {
        login(identifier: String!, password: String!): User
        employees: [Employee]
        employee(eid: ID!): Employee
        employeeSearchBy(by: String!): [Employee]
        
    }

    type Mutation {
        addEmployee(
            first_name: String!
            last_name: String!
            email: String!
            gender: String
            designation: String!
            salary: Float!
            date_of_joining: String!
            department: String!
            employee_photo: String
        ): Employee

        addUser(username: String!, email: String!, password: String!): User
        
        updateEmployee(
            eid: ID!
            first_name: String
            last_name: String
            email: String
            gender: String
            designation: String
            salary: Float
            date_of_joining: String
            department: String
            employee_photo: String
        ): Employee
        
        deleteEmployee(eid: ID!): String
    }
`);

module.exports = schema;
