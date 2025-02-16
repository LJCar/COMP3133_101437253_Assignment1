# WELCOME TO COMP3133 ASSIGNMENT 1

# SAMPLE GraphQL Calls

# ADD USER
mutation {
addUser(username: "jason", email: "jason@gmail.com", password: "password123") {
username
email
}
}

# LOGIN USER
query {
login(identifier: "jason", password: "password123") {
username
email
}
}

# ADD EMPLOYEE
mutation {
addEmployee(
first_name: "Harry"
last_name: "Tom"
email: "Tom@example.com"
gender: "Male"
designation: "Manager"
salary: 10000
date_of_joining: "2024-01-01"
department: "HR"
employee_photo: "uploads/Tom.jpg"
) {
first_name
last_name
email
designation
department
created_at
}
}

# UPDATE EMPLOYEE
mutation {
updateEmployee(
eid: "67b11e0630ce6bb07a5b5dac"
salary: 9000
) {
first_name
last_name
email
designation
salary
updated_at
}
}

# DELETE EMPLOYEE
mutation {
deleteEmployee(eid: "67b126ad30ce6bb07a5b5db1")
}

# ALL EMPLOYEES
query {
employees {
first_name
last_name
email
designation
department
salary
date_of_joining
created_at
}
}

# SEARCH EMPLOYEE BY ID
query {
employee(eid: "67b11e0630ce6bb07a5b5dac") {
first_name
last_name
email
designation
department
salary
date_of_joining
created_at
}
}

# SEARCH FOR EMPLOYEE BY DEPARTMENT OR DESIGNATION 
query {
employeeSearchBy(by: "Manager") {
first_name
last_name
designation
department
salary
date_of_joining
}
}
