import React from 'react';
import { connect } from 'react-redux'
import { Segment, Input, Button } from 'semantic-ui-react';
import imageCompression from 'browser-image-compression';
import * as actions from '../../../actions/messageActions'
import * as chatActions from '../../../actions/chatActions'


function compressFile(imageFile){
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    
    var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    try {
        const compressedFile =  imageCompression(imageFile, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        return compressedFile
    } catch (error) {
        console.log(error);
    }

}


class ChatForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            message: "",
        }
        this.handleFileUpload = this.handleFileUpload.bind(this)

    }

    handleOnChange = (e) => {
        this.setState({
            message: e.target.value
        })
        
    }

    handleOnSubmit = (e) => {
        if (this.state.message == "") {
            return;
        }
        const msg = {
            message: this.state.message,
            user: this.props.user.firstName
        }
        this.props.newMessage(this.props.roomName, msg)
        this.setState({
            message: ""
        })
    }
    onKeyPress = (e) => {
        if(e.which === 13) {
        this.handleOnSubmit();
        }
    }

    async handleFileUpload(e) {
        console.log(e.target.value);
        const imageFile = e.target.files[0];
        console.log(imageFile);
        
        const compressedImg = {
                        file: await compressFile(imageFile), 
                        user: this.props.user,
                        roomName: this.props.roomName
                    }
        // console.log(compressedImg);
        this.props.uploadImage(compressedImg)
        
    }
    

    render() {
        const {search} = this.props
        return (
            
            <Segment className="chatForm">

            <label htmlFor="file-input" style={{margin: "0"}}>
                <img style={{width:"100px"}} src="https://goo.gl/pB9rpQ" />
            </label>
                <input
                    style={{ width: "15%", margin: '0.5em', padding: '0.5em', display: "none"}} 
                    type="file" 
                    accept="image/*"
                    id="file-input"
                    onChange={this.handleFileUpload}
                    />
                <div className="input-group">
                <Input
                    fluid
                    name="chatMessage"
                    style={{ width: "65%", margin: '0.5em'}}
                    value={this.state.message}
                    labelPosition="left"
                    onChange={this.handleOnChange}
                    placeholder="Enter your message"
                    onKeyPress={this.onKeyPress}
                />


                <Button
                    primary
                    // color="grey"
                    content="Send"
                    labelPosition="right"
                    icon="edit"
                    onClick={this.handleOnSubmit}
                />
               </div>
            </Segment>

        )
    }
}

const allActions = {...actions, ...chatActions}
export default connect(null, allActions)(ChatForm)