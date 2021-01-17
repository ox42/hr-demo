<?php
/**
 * A basic definition of a route, defining how we serve get/post/delete requests.
 * Extended by other classes (including the more specific RestrictedRoute).
 */

namespace Api;

class Route
{
    protected function handleGet()
    {
        $this->notFound();
    }

    protected function handlePost()
    {
        $this->notFound();
    }

    protected function handleDelete()
    {
        $this->notFound();
    }

    public function run()
    {
        $method = strtoupper($_SERVER['REQUEST_METHOD']);

        switch ($method) {
            case 'GET':
                $this->handleGet();
                break;
            case 'POST':
                $this->handlePost();
                break;
            case 'DELETE':
                $this->handleDelete();
                break;
            default:
                $this->notFound();
        }
    }

    public function result($array)
    {
        header('Content-type: application/json');

        //Nothing will actually trigger this, and we can use some sort of a serializer for each class, but
        //for right now, I just want to show that this is something I think about (protecting leaks)
        if (isset($array['password'])) {
            unset($array['password']);
        }

        echo json_encode($array);
    }

    public function error($message)
    {
        http_response_code(400);
        header('Content-type: application/json');

        echo json_encode(array(
            'status' => 'error',
            'message' => $message
        ));
    }

    public function notFound()
    {
        http_response_code(404);
        header('Content-type: application/json');

        echo json_encode(array(
            'status' => 'error',
            'message' => 'Route not found...'
        ));
    }
}
