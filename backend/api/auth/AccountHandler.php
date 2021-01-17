<?php
/**
 * A route for listing and creating administrative (HR) accounts.
 * An initial (admin) account is defined in the data/init.sql file
 * We use PDO and own SQL statements (defined in models/) to communicate with db.
 */

namespace Api\Auth;

use Api\RestrictedRoute;
use Models\Account;


class AccountHandler extends RestrictedRoute
{
    protected function handleGet()
    {
        $this->result(Account::listAll());
    }


    protected function handlePost()
    {
        if (empty($_POST['name'])) {
            return $this->error('Invalid name.');
        }

        if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->error('Invalid email.');
        }

        if (Account::findByEmail($_POST['email']) !== false) {
            return $this->error('An account with that email already exists.');
        }

        if (empty($_POST['password'])) {
            return $this->error('Invalid password.');
        }

        $account = new Account();
        $account->name = $_POST['name'];
        $account->email = $_POST['email'];
        $account->password = Account::hashPassword($_POST['password']);
        $account->insert();

        $this->result(Account::listAll());
    }


    protected function handleDelete()
    {
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            Account::deleteById($_GET['id']);

            $this->result(array(
                'status' => 'done'
            ));
        }
    }
}
