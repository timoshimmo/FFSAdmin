import React, { useState, useEffect, useMemo } from 'react';
import { Col, Container, Row, Spinner, Dropdown, UncontrolledDropdown, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from "reactstrap";
import BreadCrumb from "Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import axios from "axios";
import UpdateModal from "../../Components/Common/UpdateModal";
import moment from 'moment';

const Users = () => {

  document.title = "Registered Users | FFS Admin";

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userList, setUsersList] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [isStatusDropdown, setIsStatusDropdown] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [currentStatus, setCurrentStatus] = useState<string>('');

  const [updateStatusVal, setUpdateStatusVal] = useState<string>('');

  //const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const toggleStatusDropdown = () => {
      setIsStatusDropdown(!isStatusDropdown);
      console.log(isStatusDropdown);
      
    /*  if(isStatusDropdown) {
        setIsStatusDropdown(false);
      }
      else {
        setIsStatusDropdown(true);
      }
      */
   };

  useEffect(() => {
    handleGetUsers();
  }, [setUsersList]);  

  const handleGetUsers = () => {
    setLoading(true);

    //https://api.futureoffinancialservices.org/api/get-registered-users
    //http://localhost:8000/api/get-registered-users
    //https://dev-api.futureoffinancialservices.org/api/v1/

    axios.get('https://dev-api.futureoffinancialservices.org/api/v1/register')
    .then(response => {
        console.log(response);
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

const onClickUpdate = (task: any, curStatus: string, updateValue: string) => {
  setSelectedRow(task);
  setUpdateModal(true);
  setCurrentStatus(curStatus);
  setUpdateStatusVal(updateValue);
};


const handleUpdate = () => {
  if (selectedRow) {
    updateStatus(selectedRow, updateStatusVal);
  }
};

const updateStatus = (row: any, statusVal: string) => {

  const obj = {
    first_name: row.first_name,
    last_name: row.last_name,
    company_name: row.company_name,
    title: row.title,
    email: row.email,
    phonenumber: row.phonenumber,
    status: statusVal,
    events: row.events
  }

  console.log(obj);

   /* const obj = {
      status: statusVal,
      row: row
    }; 
    
    http://api.futureoffinancialservices.org/api/update-status/${row?.id}`
    */

      setLoader(true);
      axios.put(`https://dev-api.futureoffinancialservices.org/api/v1/register/${row?.id}`, obj)
      .then(response => {
          console.log(response);
          setLoader(false);
          setUpdateModal(false);
          handleGetUsers();
          
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
          setLoader(false);
    })

}



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

/*
const handleUpdateAll = () => {

  const obj = {
    id: 1
  }

  axios.post('http://localhost:8000/api/update-all', obj)
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

*/

const columns = useMemo(
  () => [
    {
      header: "First Name",
      accessorKey: "first_name",
      enableColumnFilter: false,
      size: 100,
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
      enableColumnFilter: false,
      size: 100,
    },
    {
      header: "Email",
      accessorKey: "email",
      enableColumnFilter: false,
      enableResizing: false, //disable resizing for just this column
      size: 100
    },
    {
      header: "Phone Number",
      accessorKey: "phonenumber",
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
      enableResizing: false, //disable resizing for just this column
      size: 100
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      enableColumnFilter: false,
      enableResizing: false, 
      size: 150,
      cell: (cell: any) => {
        return (
          <span>{moment(cell.getValue()).format("YYYY-MM-DD HH:mm:ss")}</span>
        )
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (cell: any) => {
        switch (cell.getValue()) {
          case "REGISTERED":
            return (<span className="badge bg-info-subtle text-info text-capitalize"> {cell.getValue()}</span>);
          case "PENDING":
            return (<span className="badge bg-warning-subtle  text-warning text-capitalize"> {cell.getValue()}</span>);
          case "DECLINED":
              return (<span className="badge bg-danger-subtle  text-danger text-capitalize"> {cell.getValue()}</span>);
          default:
            return (<span className="badge bg-success-subtle  text-success text-capitalize"> {cell.getValue()}</span>);
        }
      },
      enableColumnFilter: false,
    },
    {
      header: "Action",
      accessorKey: "id",
      enableColumnFilter: false,
      cell: (cell: any) => {
        return (
          /*<Button key={cell.getValue()} onClick={toggleStatusDropdown}>Edit</Button>*/
          <UncontrolledDropdown>
              <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
                  <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              {/* <DropdownToggle caret tag="button" type="button" className="btn">
                
                    <span className="d-flex align-items-center">
                        <span className="text-start">
                          <span className="d-none d-xl-block fs-13 text-muted user-name-sub-text">Edit</span>
                        </span>
                    </span>
                  </DropdownToggle> */}
              <DropdownMenu className="dropdown-menu-center p-0">
                  <DropdownItem className='p-0'>
                      <Button color='transparent'
                            className="btn text-success w-100" type="button"
                            onClick={() => { const rowData = cell.row.original; onClickUpdate(rowData, "approve", "APPROVED"); }}>
                            Approve
                      </Button>
                  </DropdownItem>
                  <hr className='my-0'/>
                  <DropdownItem className='p-0'>
                      <Button color='transparent'
                          className="btn text-danger w-100" type="button"
                          onClick={() => { const rowData = cell.row.original; onClickUpdate(rowData, "decline", "DECLINED"); }}>
                          Decline
                      </Button>
                  </DropdownItem>
                  <hr className='my-0' />
                  <DropdownItem className='p-0'>
                      <Button color='transparent'
                          className="btn text-info rounded-0 w-100" type="button"
                          onClick={() => { const rowData = cell.row.original; onClickUpdate(rowData, "set the status to pending for", "PENDING"); }}>
                          Tentative
                      </Button>
                  </DropdownItem>
                  <hr className='my-0' />
                  <DropdownItem className='p-0'>
                      <Button color='transparent'
                          className="btn text-warning w-100" type="button"
                          onClick={() => { const rowData = cell.row.original; onClickUpdate(rowData, "reset the status of", "REGISTERED"); }}>
                          Reset
                      </Button>
                  </DropdownItem>
              </DropdownMenu>
          </UncontrolledDropdown >
          //<span>{moment(cell.getValue()).format("DD-MM-YY, hh:mm A")}</span>
        );
      },
    },
  ],
  []
  );


  return (
    <React.Fragment>
      <UpdateModal
        show={updateModal}
        onUpdateClick={handleUpdate}
        onCloseClick={() => setUpdateModal(false)}
        statusVal={currentStatus}
        loader={loader}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Users" pageTitle="Dashboard" />
          <Row className='mt-4 mb-5 px-2'>
             {/* <Col lg={12}>
              <Button onClick={handleDelete}>
                 Delete
              </Button>
            </Col> */}
            <Col lg={12}>
              {!loading ?
                userList.length > 0 ? 
                  <TableContainer
                    columns={(columns || [])}
                    data={(userList || [])}
                    isPagination={userList.length > 20}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={50}
                    SearchPlaceholder='Search...'
                  /> 
                  :
                  <div className="d-flex flex-column align-items-center w-100 py-4">
                    <i className={"ri-alert-fill display-1 text-xl text-warning"}></i>
                    <p className='text-muted'>No Data Found</p>
                  </div>
                 
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
