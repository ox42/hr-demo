<?php
/**
 * A route for listing, creating and deleting departments.
 * We use PDO and own SQL statements (defined in models/) to communicate with db.
 */

namespace Api\Staff;

use Api\RestrictedRoute;
use Models\Department;


class DepartmentHandler extends RestrictedRoute
{
    protected function handleGet()
    {
        if (!empty($_GET['id']) && is_numeric($_GET['id'])) {
            $department = Department::findById($_GET['id']);

            if (!empty($department)) {
                $this->result($department);
            } else {
                $this->notFound();
            }

        } else {
            $this->result(Department::listAll());
        }
    }

    protected function handlePost()
    {
        if (empty($_POST['name'])) {
            return $this->error('Invalid name.');
        }

        $department = new Department();
        $department->name = $_POST['name'];
        $department->insert();

        $this->result(Department::listAll());
    }

    protected function handleDelete()
    {
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            Department::deleteById($_GET['id']);

            $this->result(array(
                'status' => 'done'
            ));
        }
    }
}
