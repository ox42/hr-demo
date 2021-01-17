<?php

namespace Models;


class Account
{
    public string $id;
    public string $name;
    public string $email;
    public string $password;

    public static function hashPassword($password): string
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    public static function verifyPassword($password, $hash): bool
    {
        return password_verify($password, $hash);
    }

    public static function findByToken($token)
    {
        $statement = DB::getInstance()->prepare("SELECT * FROM Account where token = :token");
        $statement->execute(array(':token' => $token));

        return $statement->fetch();
    }

    public static function findByEmail($email)
    {
        $statement = DB::getInstance()->prepare("SELECT * FROM Account where email = :email");
        $statement->execute(array(':email' => $email));

        return $statement->fetch();
    }

    public static function listAll(): array
    {
        $statement = DB::getInstance()->prepare("SELECT id, name, email FROM Account order by name");
        $statement->execute();

        return $statement->fetchAll();
    }

    public static function persistToken($id, $token)
    {
        $statement = DB::getInstance()->prepare("UPDATE Account set token = :token where id = :id");
        $statement->execute(array(':id' => $id, ':token' => $token));
    }

    public function insert()
    {
        $statement = DB::getInstance()->prepare(<<<EOD
            INSERT INTO Account (name, email, password, updated_at) 
            VALUES(:name, :email, :password, :updated_at)
        EOD);

        $statement->execute(array(
            ':name' => $this->name,
            ':email' => $this->email,
            ':password' => $this->password,
            ':updated_at' => date('Y-m-d H:i:s')
        ));

        $result = $statement->fetch();

        if (isset($result['id'])) {
            $this->id = $result['id'];
        }
    }

    public static function deleteById($id)
    {
        $statement = DB::getInstance()->prepare("DELETE FROM Account WHERE id = :id");
        $statement->execute(array(
            ':id' => $id
        ));
    }
}
