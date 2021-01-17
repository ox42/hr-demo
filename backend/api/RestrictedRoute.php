<?php
/**
 * A restricted route which checks for an existing Authentication header (token).
 * Every route (except for /auth/login) extends this class so that auth logic is handled in one place.
 */

namespace Api;

use Models\Account;

class RestrictedRoute extends Route
{
    public function run()
    {
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $token = $_SERVER['HTTP_AUTHORIZATION'];

            if (str_starts_with($token, 'Bearer ')) {
                $token = substr($token, strlen('Bearer '));

                if (Account::findByToken($token)) {
                    return parent::run();
                }
            }
        }

        $this->unauthorized();
    }

    private function unauthorized()
    {
        http_response_code(401);
        header('Content-type: application/json');

        echo json_encode(array(
            'status' => 'error',
            'message' => 'Unauthorized...'
        ));
    }
}
