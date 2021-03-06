<?php

require APPPATH . '/libraries/REST_Controller.php';

class Employee extends REST_Controller {

    function __construct($config = 'rest') {
        parent::__construct($config);
    }

    // show data mahasiswa
    function index_get() {
        $nim = $this->get('idEmployee');
        if ($nim == '') {
            $employee = $this->db->get('employee')->result();
        } else {
            $this->db->where('idEmployee', $nim);
            $employee = $this->db->get('employee')->result();
        }
        $result = array('status' => 'success','data' => $employee);
        $this->response($result,200);
    }

    // insert new data to mahasiswa
    function index_post() {
        $nim = $this->post('idEmployee');
        $data = array(
                    'idEmployee' => $this->post('idEmployee'),
                    'firstName'           => $this->post('firstName'),
                    'lastName'          => $this->post('lastName'),
                    'birthPlace'        => $this->post('birthPlace'),
                    'birthDate'        => $this->post('birthDate'),
                    'gender'        => $this->post('gender'),
                    'streetName'        => $this->post('streetName'),
                    'city'        => $this->post('city'),
                    'province'        => $this->post('province')['name'],
                    'zipcode'        => $this->post('zipcode'),
                    'personalEmail'        => $this->post('personalEmail'),
                    'companyEmail'        => $this->post('companyEmail'),
                    'mobileNumber'        => $this->post('mobileNumber'),
                    'telephoneNumber'        => $this->post('telephoneNumber'),
                    'motherName'        => $this->post('motherName'),
                    'password'        => '12345',
                    'lastUpdate'        => date("Y-m-d h:i:s"),
                    'accountNumber'        => $this->post('accountNumber'),
                    'religion'        => $this->post('religion')['name'],
                    'citizenship'        => $this->post('citizenship'),
                    'workStatus'        => $this->post('workStatus')['name'],
                    'marital' => $this->post('marital')['name'],

                    );
       //fir print_r($data);die();
        if (!empty($nim)) {
            $this->db->where('idEmployee', $nim);
            $update = $this->db->update('employee', $data);
            //print_r($_REQUEST);die("test");
            if ($update) {
                $this->response($data, 200);
            } else {
                $this->response(array('status' => 'fail', 502));
            }
        }else{
            $insert = $this->db->insert('employee', $data);
            if ($insert) {
                $result = array('status' => 'success','data'=>$data);
                $this->response($result, 200);
            } else {
                $this->response(array('status' => 'fail', 502));
            }
        }
        
    }

    // update data mahasiswa
    function index_put() {
        $nim = $this->put('idEmployee');
         $data = array(
                    'firstName'           => $this->post('firstName'),
                    'lastName'          => $this->post('lastName'),
                    'birthPlace'        => $this->post('birthPlace'),
                    'birthDate'        => $this->post('birthDate'),
                    'gender'        => $this->post('gender'),
                    'streetName'        => $this->post('streetName'),
                    'city'        => $this->post('city'),
                    'province'        => $this->post('province'),
                    'zipcode'        => $this->post('zipcode'),
                    'personalEmail'        => $this->post('personalEmail'),
                    'companyEmail'        => $this->post('companyEmail'),
                    'mobileNumber'        => $this->post('mobileNumber'),
                    'telephoneNumber'        => $this->post('telephoneNumber'),
                    'motherName'        => $this->post('motherName'),
                    'password'        => $this->post('password'),
                    'lastUpdate'        => date("Y-m-d h:i:s"),
                    'accountNumber'        => $this->post('accountNumber'),
                    'religion'        => $this->post('religion'),
                    'citizenship'        => $this->post('citizenship'),
                    'workStatus'        => $this->post('workStatus'),
                    );
        $this->db->where('idEmployee', $nim);
        $update = $this->db->update('employee', $data);
        print_r($_REQUEST);die("test");
        if ($update) {
            $this->response($data, 200);
        } else {
            $this->response(array('status' => 'fail', 502));
        }
    }

    // delete mahasiswa
    function index_delete() {
        $nim = $_GET['idEmployee'];
        //print_r($_GET['idEmployee']);die();
        $this->db->where('idEmployee', $nim);
        //$sql = "DELETE FROM `employee` WHERE idEmployee = '".$nim."' ";
        $delete = $this->db->delete('employee');
        //$delete = $this->db->query($sql);
       // print_r($_POST);die();
        if ($delete) {
            $this->response(array('status' => 'success'), 201);
        } else {
            $this->response(array('status' => 'fail', 502));
        }
    }

}