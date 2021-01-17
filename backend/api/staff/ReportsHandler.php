<?php
/**
 * A route for reports (at this point, there are five of them, showing various data about departments and employees).
 * We use PDO and own SQL statements (see the functions at the end of this file) to communicate with db.
 */

namespace Api\Staff;

use Models\DB;
use Api\RestrictedRoute;


class ReportsHandler extends RestrictedRoute
{

    protected function handleGet()
    {
        if (!isset($_GET['type'])) {
            return $this->error('Please provide a report type...');
        }

        switch ($_GET['type']) {
            case 'highest-salary':
                $this->result(array(
                    'name' => 'Highest salary',
                    'description' => 'Lists all departments, with the highest salary in each one.',
                    'data' => $this->highestSalaryReport())
                );
                break;

            case 'costly-departments':
                $this->result(array(
                    'name' => 'Costly departments',
                    'description' => 'Lists departments that have at least 2 employees earning a salary >= 50000.',
                    'data' => $this->costlyDepartmentsReport()));
                break;

            case 'departments-size':
                $this->result(array(
                    'name' => 'Department Size',
                    'description' => 'Lists the number of employees for each department in the company.',
                    'data' => $this->departmentsSizeReport()));
                break;

            case 'departments-spending':
                $this->result(array(
                    'name' => 'Department Spending',
                    'description' => 'Lists all departments, with the total spending (on salaries) for each.',
                    'data' => $this->departmentsSpendingReport()));
                break;

            case 'expensive-employees':
                $this->result(array(
                    'name' => 'Expensive Employees',
                    'description' => 'Lists the employees with the highest salaries (across all departments).',
                    'data' => $this->expensiveEmployeesReport()));
                break;

            default: $this->error('Invalid report type...');
        }
    }

    private function highestSalaryReport(): array
    {
        return $this->fetchReport(<<<EOD
            SELECT d.id, d.name, MAX(e.salary) as max_salary 
            FROM Department d LEFT JOIN Employee e 
                ON d.id = e.department_id 
            GROUP BY d.id, d.name
        EOD);
    }

    private function costlyDepartmentsReport(): array
    {
        return $this->fetchReport(<<<EOD
            SELECT d.id, d.name, COUNT(e.id) as high_paying_employees_count 
            FROM Department d, Employee e 
            WHERE d.id = e.department_id AND e.salary >= 50000 
            GROUP BY d.id, d.name 
            HAVING high_paying_employees_count >= 2
        EOD);
    }

    private function departmentsSizeReport(): array
    {
        return $this->fetchReport(<<<EOD
            SELECT d.id, d.name, COUNT(e.id) as employees_count 
            FROM Department d LEFT JOIN Employee e 
                ON d.id = e.department_id 
            GROUP BY d.id, d.name
        EOD);
    }

    private function departmentsSpendingReport(): array
    {
        return $this->fetchReport(<<<EOD
            SELECT d.id, d.name, SUM(e.salary) as total_spending 
            FROM Department d LEFT JOIN Employee e 
                ON d.id = e.department_id 
            GROUP BY d.id, d.name
        EOD);
    }

    private function expensiveEmployeesReport(): array
    {
        return $this->fetchReport(<<<EOD
            SELECT id, name, email, salary  
            FROM Employee  
            ORDER BY salary DESC
            LIMIT 30
        EOD);
    }

    private function fetchReport($query): array {
        $statement = DB::getInstance()->prepare($query);

        $statement->execute();
        return $statement->fetchAll();
    }
}
