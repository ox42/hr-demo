<?php
/**
 * The main php file, which decides what /api/ route needs to handle the HTTP request.
 * Additionally, sets up valid CORS headers.
 */

declare (strict_types=1);
namespace Api;

use Api\Auth\AccountHandler;
use Api\Auth\LoginHandler;
use Api\Staff\DepartmentHandler;
use Api\Staff\EmployeeHandler;
use Api\Staff\ReportsHandler;

require_once(__DIR__ . "/../vendor/autoload.php");

function isRouteMatch($route): bool
{
    return stristr($_SERVER["REQUEST_URI"], $route) !== false;
}

function identifyHandler(): object
{
    switch ($_SERVER["REQUEST_URI"]) {
        case isRouteMatch('/api/auth/login'):
            return new LoginHandler();

        case isRouteMatch('/api/auth/accounts'):
            return new AccountHandler();

        case isRouteMatch('/api/staff/departments'):
            return new DepartmentHandler();

        case isRouteMatch('/api/staff/employees'):
            return new EmployeeHandler();

        case isRouteMatch('/api/staff/reports'):
            return new ReportsHandler();
    }
}

function setupCorsHeaders() {

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
        exit(0);
    }
}

setupCorsHeaders();
$handler = identifyHandler();

if (!empty($handler)) {
    $handler->run();
} else {
    (new Route())->notFound();
}
