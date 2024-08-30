import React, { useState, useEffect, useMemo } from 'react';
import { Col, Container, Row, Spinner } from "reactstrap";
import BreadCrumb from "Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import axios from "axios";
import moment from 'moment';

const Users = () => {

  document.title = "Home | FFS Admin";

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userList, setUsersList] = useState([]);

  useEffect(() => {
    handleGetUsers();
  }, [setUsersList]);  

  const handleGetUsers = () => {
    setLoading(true);
   /* setTimeout(() => {
        setSuccessful(true);
        setLoading(false);
    }, 5000); */

    //https://api.futureoffinancialservices.org/api/
    //http://localhost:8000/api/

    axios.get('https://api.futureoffinancialservices.org/api/get-registered-users')
    .then(response => {
       // console.log(response);
        const result: any = response;
        setUsersList(result);
        setLoading(false);
    })
    .catch((error) => {
        if (error.response) {
            console.log(error.response.data.message);
            setErrorMsg(error.response.data.message);
            console.log("server error");
        } else if (error.request) {
            console.log("network error");
        } else {
            console.log(error);
        }
        setLoading(false);
  })
};

const handleDelete = () => {

  const obj = {
    id: 1
  }
  axios.post('http://localhost:8000/api/delete-user', obj)
  .then(response => {
      console.log(response);
      
  })
  .catch((error) => {
      if (error.response) {
          console.log(error.response.data.message);
          setErrorMsg(error.response.data.message);
          console.log("server error");
      } else if (error.request) {
          console.log("network error");
      } else {
          console.log(error);
      }
      
})

}
//<span>{moment(cell.getValue()).format("DD-MM-YY HH:mm")}</span>

const columns = useMemo (
  () => [

    {
      header: "ID",
      cell: (cell: any) => {
        return (
          <span className="fw-semibold">{cell.getValue()}</span>
        );
      },
      accessorKey: "id",
      enableColumnFilter: false,
    },
    {
      header: "First Name",
      accessorKey: "firstname",
      enableColumnFilter: false,
    },
    {
      header: "Last Name",
      accessorKey: "lastname",
      enableColumnFilter: false,
    },
    {
      header: "Email",
      accessorKey: "email",
      enableColumnFilter: false,
    },
    {
      header: "Phone Number",
      accessorKey: "phone",
      enableColumnFilter: false,
    },
    {
      header: "Company Name",
      accessorKey: "company_name",
      enableColumnFilter: false,
    },
    {
      header: "Job Title",
      accessorKey: "title",
      enableColumnFilter: false,
    },
    {
      header: "Created",
      accessorKey: "created_at",
      cell: (cell: any) => {
        return (
          <span>{moment(cell.getValue()).format("DD-MM-YY, hh:mm A")}</span>
        );
      },
      enableColumnFilter: false,
    },
  ],
  []
);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Users" pageTitle="Dashboard" />
          <Row className='mt-4 mb-5 px-2'>
            <Col lg={12}>
              {userList.length > 0 && !loading ?
                  <TableContainer
                    columns={(columns || [])}
                    data={(userList || [])}
                    isPagination={userList.length > 20}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={20}
                    SearchPlaceholder='Search...'
                  /> 
                 
                : 
                <div className="text-center"><Spinner animation="border" variant="primary" /></div>
              }
    
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Users;
