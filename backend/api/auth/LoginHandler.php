<?php
/**
 * A route for authenticating as an administration (HR) account.
 * An initial (admin) account is defined/created in the data/init.sql file
 * We use PDO and own SQL statements (defined in models/) to communicate with db.
 */

namespace Api\Auth;

use Api\Route;
use Models\Account;


class LoginHandler extends Route
{

    protected function handlePost()
    {
        if (empty($_POST['email'])) {
            return $this->error('Invalid email.');
        }

        if (empty($_POST['password'])) {
            return $this->error('Invalid password.');
        }

        $account = Account::findByEmail($_POST['email']);
        if (!empty($account) && Account::verifyPassword($_POST['password'], $account['password'])) {
            $bearer_token = bin2hex(random_bytes(60));
            Account::persistToken($account['id'], $bearer_token);

            return $this->result(array(
                'token' => $bearer_token
            ));

        } else {
            return $this->error('Invalid credentials...');
        }
    }
}
