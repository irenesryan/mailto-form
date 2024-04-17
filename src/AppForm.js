import React from "react";
import { PrimaryButton, Modal } from "@fluentui/react";

class AppForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormOpen: false,
      inputFields: {
        name: "",
        email: "",
        message: "",
        file: null
      }
    };
  }

  render() {
    const { inputFields } = this.state;
    const inputStyles = { display: 'flex', justifyContent: 'flex-end' };

    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <PrimaryButton style={{ marginRight: '10px' }} onClick={() => this.setState({ isFormOpen: true })}>send new record request</PrimaryButton>
          <PrimaryButton style={{ marginRight: '10px' }}>view</PrimaryButton>
          <PrimaryButton style={{ marginRight: '10px' }} onClick={this.downloadFile}>download</PrimaryButton>
          <PrimaryButton onClick={this.closeWindow}>close window</PrimaryButton>
        </div>
        {this.state.isFormOpen &&
          <Modal isOpen={this.state.isFormOpen} onDismiss={this.closePopup} styles={{ main: { border: 'solid' } }}>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>Send Request</h2>
            <form method="post" encType="multipart/form-data" onSubmit={this.handleFormSubmit} style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', margin: '40px 10px 10px 15px' }}>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={inputFields.name}
                  onChange={this.handleInputChange}
                  style={inputStyles}
                />
              </label>
              <br />
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={inputFields.email}
                  onChange={this.handleInputChange}
                  style={inputStyles}
                />
              </label>
              <br />
              <label>
                Message
                <input
                  type="text"
                  name="message"
                  value={inputFields.message}
                  onChange={this.handleInputChange}
                  style={inputStyles}
                />
              </label>
              <br />
              <label>
                Attach File
                <input id="myFile" name="filename" type="file" onChange={this.handleAttachmentChange} style={inputStyles} />
              </label>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '50px' }}>
                <PrimaryButton type="submit">Send</PrimaryButton>
                <PrimaryButton onClick={this.closePopup}>Cancel</PrimaryButton>
              </div>
            </form>
          </Modal>
        }
      </div>
    );
  }
  
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      inputFields: {
        ...prevState.inputFields,
        [name]: value
      }
    }));
  };

  closePopup = () => {
    console.log('pop up closing')
    this.setState({ isFormOpen: false });
  };

  closeWindow = () => {
    // window.close();
    window.location.href = "about:blank";
  };

  downloadFile = () => {
    alert("download file clicked");
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { inputFields } = this.state;

    // Construct email content
    const message = `New Request for Data Update:\n\nName: ${inputFields.name}\nEmail: ${inputFields.email}\nMessage: ${inputFields.message}`;

    // Construct mailto link
    let mailtoLink = `mailto:irene.ryan@arkonit.se?subject=${encodeURIComponent('New Request for Data Update')}&body=${encodeURIComponent(message)}`;

    //NOTE: mailto does not accept  attachments so we need to use a different method for sending emails with files
    // If attachment exists, append it to the mailto link
    /* console.log(inputFields.file)
    if (inputFields.file) {
      const formData = new FormData();
      formData.append('file', inputFields.file);
      const blob = new Blob([inputFields.file], { type: inputFields.file.type });
      mailtoLink += `&file=${encodeURIComponent(URL.createObjectURL(blob))}`;
    } */

    // Open default email client with mailto link
    window.location.href = mailtoLink;

    // Reset form and close it
    this.setState({
      isFormOpen: false,
      inputFields: {
        name: '',
        email: '',
        message: '',
        file: null
      }
    });
  }

  handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    this.setState(prevState => ({
      inputFields: {
        ...prevState.inputFields,
        file
      }
    }));
  }
  handleFormSubmitFile = () => {
    const { selectedFile } = this.state;

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      window.location.href = `mailto:?subject=Attachment&body=Please see the attached file.&attachment=${url}`;
    } else {
      alert('Please select a file before submitting.');
    }
  }
}
export default AppForm;