<?php

namespace Models;

class Department
{
    public string $id;
    public string $name;


    public static function findById($id)
    {
        $statement = DB::getInstance()->prepare("SELECT * FROM Department where id = :id");
        $statement->execute(array(':id' => $id));

        return $statement->fetch();
    }

    public static function listAll(): array
    {
        $statement = DB::getInstance()->prepare("SELECT * FROM Department");
        $statement->execute();

        return $statement->fetchAll();
    }

    public function insert()
    {
        $statement = DB::getInstance()->prepare(<<<EOD
            INSERT INTO Department (name, updated_at) 
            VALUES(:name, :updated_at)
        EOD);

        $statement->execute(array(
            ':name' => $this->name,
            ':updated_at' => date('Y-m-d H:i:s')
        ));

        $result = $statement->fetch();

        if (isset($result['id'])) {
            $this->id = $result['id'];
        }
    }

    public static function deleteById($id)
    {
        $statement = DB::getInstance()->prepare("DELETE FROM Department WHERE id = :id");
        $statement->execute(array(
            ':id' => $id
        ));
    }
}
