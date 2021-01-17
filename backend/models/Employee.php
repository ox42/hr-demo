<?php

namespace Models;

class Employee
{
    public string $id;
    public string $name;
    public string $email;
    public string $salary;
    public int $department_id;


    public static function findById($id)
    {
        $statement = DB::getInstance()->prepare("SELECT * FROM Employee where id = :id");
        $statement->execute(array(':id' => $id));

        return $statement->fetch();
    }

    public static function findByEmail($email)
    {
        $statement = DB::getInstance()->prepare("SELECT * FROM Employee where email = :email");
        $statement->execute(array(':email' => $email));

        return $statement->fetch();
    }

    public static function findByDepartmentId($department_id): array
    {
        $statement = DB::getInstance()->prepare(<<<EOD
            SELECT * FROM Employee 
            WHERE department_id = :department_id 
            ORDER BY name
        EOD
        );

        $statement->execute(array(':department_id' => $department_id));
        return $statement->fetchAll();
    }

    public static function listAll(): array
    {
        $statement = DB::getInstance()->prepare("SELECT * FROM Employee ORDER BY name");
        $statement->execute();

        return $statement->fetchAll();
    }

    public function insert()
    {
        $statement = DB::getInstance()->prepare(<<<EOD
            INSERT INTO Employee (name, email, salary, department_id, updated_at)
            VALUES(:name, :email, :salary, :department_id, :updated_at)
        EOD);

        $statement->execute(array(
            ':name' => $this->name,
            ':email' => $this->email,
            ':salary' => $this->salary,
            ':department_id' => $this->department_id,
            ':updated_at' => date('Y-m-d H:i:s')
        ));

        $result = $statement->fetch();

        if (isset($result['id'])) {
            $this->id = $result['id'];
        }
    }

    public static function deleteById($id)
    {
        $statement = DB::getInstance()->prepare("DELETE FROM Employee WHERE id = :id");
        $statement->execute(array(
            ':id' => $id
        ));
    }
}
