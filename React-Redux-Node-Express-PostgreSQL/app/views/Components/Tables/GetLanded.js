import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { userListRequest, userDeleteRequest } from './redux/actions';
import { makeSelectUserList, makeSelectUserListLoading } from './redux/selectors';

class GetLanded extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      deleteId: null,
      showDeleteConfirm: false,
      page: 1,
      pageSize: 10,
    };
  }

  componentWillMount() {
    this.props.userList("users/users_getlanded");
  }

  onChangePage = (page) => {
    this.setState({ page });
  }

  onRemove = (deleteId) => () => {
    this.setState({ deleteId, showDeleteConfirm: true });
  }

  handleConfirm = () => {
    this.props.userDelete(this.state.deleteId);
    this.setState({ showDeleteConfirm: false });
  }

  handleCancel = () => this.setState({ showDeleteConfirm: false })

  renderUsers = () => {
    const { users } = this.props;
    const { page, pageSize } = this.state;

    if (!users.size) {
      return (
        <tr>
          <td colSpan="4">
            No Users
          </td>
        </tr>
      );
    }

    return users.slice((page - 1) * pageSize, page * pageSize).map((user) => (
      <tr key={user.get('id')}>
        <td>

            {user.get('first_name')}
            &nbsp;
            {user.get('last_name')}

        </td>
        <td>
          {user.get('email')}
        </td>
        <td>
          {user.get('address')}
        </td>
      </tr>
    ));
  }

  render() {
    const { users, loading } = this.props;
    const { page, pageSize, showDeleteConfirm } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
        {/* <Confirm
          open={showDeleteConfirm}
          content="Are you sure to delete this user?"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        /> */}
              <CardHeader>
                <i className="fa fa-align-justify" /> Get Landed Users
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Address</td>
                    </tr>
                  </thead>

                  <tbody>
                    {this.renderUsers()}
                  </tbody>
                </Table>
                 <Pagination>
                   <PaginationItem>
                     <PaginationLink previous href="#">
                       Prev
                     </PaginationLink>
                   </PaginationItem>
                   <PaginationItem active>
                     <PaginationLink href="#">1</PaginationLink>
                   </PaginationItem>
                   <PaginationItem className="page-item">
                     <PaginationLink href="#">2</PaginationLink>
                   </PaginationItem>
                   <PaginationItem>
                     <PaginationLink href="#">3</PaginationLink>
                   </PaginationItem>
                   <PaginationItem>
                     <PaginationLink href="#">4</PaginationLink>
                   </PaginationItem>
                   <PaginationItem>
                     <PaginationLink next href="#">
                       Next
                     </PaginationLink>
                   </PaginationItem>
                 </Pagination>

                 </CardBody>
               </Card>
             </Col>
           </Row>


      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUserList(),
  loading: makeSelectUserListLoading(),
});

const mapDispatchToProps = {
  userList: userListRequest,
  userDelete: userDeleteRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(GetLanded);
