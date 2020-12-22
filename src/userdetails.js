import React, { Component } from "react";
import "./userdetails.css";
import * as ReactBootStrap from "react-bootstrap";
class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      act: 0,
      index: "",
      title: "Fussion Chart",
      itemsToDelete: [],
    };
  }
  componentDidMount() {
    this.name.focus();
  }
  submitData = (e) => {
    e.preventDefault();
    let data = this.state.data;
    let name = this.name.value;
    let email = this.email.value;
    let interest = this.interest.value;

    // if-else for form validation
    let isValid = true;

    if (!this.name.value) {
      isValid = false;
      alert("Name required");
    }
    if (!this.email.value) {
      isValid = false;
      alert("Email Required");
    }
    if (typeof this.email.value !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(this.email.value)) {
        isValid = false;
        alert("Valid Email Address Required");
      }
    }
    if (!this.interest.value) {
      isValid = false;
      alert("Interest Field is Required");
    }

    if (isValid) {
      // new
      if (this.state.act === 0) {
        let datas = { name, email, interest };
        data.push(datas);
      } else {
        //update
        let index = this.state.index;
        data[index].name = name;
        data[index].email = email;
        data[index].interest = interest;
      }
      this.setState({ data: data, act: 0 });
    }

    alert(
      `Please check your details-
       Name: ${this.name.value},
       Email: ${this.email.value},
       Interest: ${this.interest.value}`
    );

    console.log(this.state);

    this.myForm.reset();
  };

  userRemove = (index) => {
    let data = this.state.data;
    data.splice(index, 1);
    this.setState({
      data: data,
    });
  };

  userUpdate = (index) => {
    let datas = this.state.data[index];
    this.name.value = datas.name;
    this.email.value = datas.email;
    this.interest.value = datas.interest;
    this.setState({ act: 1, index: index });
  };

  multipleDelete = (email) => {
    let currentItems = this.state.itemsToDelete;
    if (currentItems.indexOf(email) > -1) {
      currentItems = currentItems.filter((x) => x !== email);
    } else {
      currentItems.push(email);
    }

    this.setState({ itemsToDelete: currentItems });
  };

  buttonToMultiDelete = () => {
    debugger;
    let deleteChecked = this.state.data;
    // deleteChecked.splice(0, deleteChecked.filter((s)));
    deleteChecked = deleteChecked.filter(
      (x) => !this.state.itemsToDelete.includes(x.email)
    );
    this.setState({ data: deleteChecked, itemsToDelete: [] });
  };

  render() {
    return (
      <div className="container">
        <hr />
        <h1>{this.state.title}</h1>
        <form
          onSubmit={(e) => this.submitData(e)}
          ref="myForm"
          className="myForm"
          ref={(form) => (this.myForm = form)}
        >
          <input
            type="text"
            placeholder="type your name please"
            ref={(input) => (this.name = input)}
          />
          <br></br>
          <br></br>
          <input
            type="email"
            placeholder="type your email address"
            ref={(input) => (this.email = input)}
          />
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="type your field of interest"
            ref={(input) => (this.interest = input)}
          />
          <br></br>
          <br></br>
          <br></br>
          <button type="submit" class="btn btn-primary">
            Click for Submit New Fussion Chart
          </button>
          <br></br>
          <br></br>
          {this.state.itemsToDelete.length > 0 && (
            <button
              type="button"
              class="btn btn-danger btn-sm"
              onClick={() => this.buttonToMultiDelete()}
            >
              Delete All
            </button>
          )}
        </form>
        <hr />
        <ReactBootStrap.Table stripped border hover>
          <thead>
            <tr>
              <th> Fussion Chart #</th>
              <th>Select</th>
              <th>Name</th>
              <th>Email</th>
              <th>Interest</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((rowData, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <div>
                    <input
                      class="form-check-input position-static"
                      type="checkbox"
                      id="blankCheckbox"
                      value="option1"
                      aria-label="..."
                      onClick={() => this.multipleDelete(rowData.email)}
                      checked={
                        this.state.itemsToDelete.indexOf(rowData.email) > -1
                      }
                    />
                  </div>
                </td>
                <td>{rowData.name}</td>
                <td>{rowData.email}</td>
                <td>{rowData.interest}</td>
                <td>
                  <button
                    onClick={() => this.userRemove(index)}
                    class="btn btn-dark btn-sm"
                  >
                    delete
                  </button>

                  <button
                    onClick={() => this.userUpdate(index)}
                    class="btn btn-info btn-sm"
                  >
                    update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
        <hr />
      </div>
    );
  }
}
export default UserDetails;
