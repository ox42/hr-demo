<?php
/**
 * A route for listing, creating and deleting employees.
 * We use PDO and own SQL statements (defined in models/) to communicate with db.
 */

namespace Api\Staff;

use Api\RestrictedRoute;
use Models\Department;
use Models\Employee;


class EmployeeHandler extends RestrictedRoute
{

    protected function handleGet()
    {
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            $employee = Employee::findById($_GET['id']);

            if (!empty($employee)) {
                $this->result($employee);
            } else {
                $this->notFound();
            }

        } else if (isset($_GET['department_id']) && is_numeric($_GET['department_id'])) {
            $this->result(Employee::findByDepartmentId($_GET['department_id']));
        } else {
            $this->result(Employee::listAll());
        }
    }

    protected function handlePost()
    {
        if (empty($_POST['name'])) {
            return $this->error('Invalid name.');
        }

        if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->error('Invalid email.');
        }

        if (Employee::findByEmail($_POST['email']) !== false) {
            return $this->error('An employee with that email already exists.');
        }

        if (empty($_POST['department_id']) || !is_numeric($_POST['department_id']) || Department::findById($_POST['department_id']) === false) {
            return $this->error('Invalid department.');
        }

        if (empty($_POST['salary']) || !is_numeric($_POST['salary'])) {
            return $this->error('Invalid salary.');
        }


        $employee = new Employee();
        $employee->name = $_POST['name'];
        $employee->email = $_POST['email'];
        $employee->department_id = $_POST['department_id'];
        $employee->salary = $_POST['salary'];
        $employee->insert();

        $this->result(Employee::findByDepartmentId($_POST['department_id']));
    }

    protected function handleDelete()
    {
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            Employee::deleteById($_GET['id']);

            $this->result(array(
                'status' => 'done'
            ));
        }
    }
}
