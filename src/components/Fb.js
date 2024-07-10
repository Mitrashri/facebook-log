import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';


export default class Login extends Component {
    state = {
        auth : false,
        name: '',
        picture:'',
        pages: []
    }
    componentClicked = ()=>{
        console.log("button clicked");
    }
    responseFacebook = (response) => {
        console.log(response);
        if(response.status!=='unknown'){
        this.setState({
            auth: true,
            name: response.name,
            picture: response.picture.data.url,
        });
        this.fetchPages(response.accessToken);
        } else{
            console.log('Facebook login failed')
        }
    };

    fetchPages = (accessToken) =>{
        fetch(`https://graph.facebook.com/v2.11/me/accounts?access_token=${accessToken}`) 
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({ pages: data.data});
          })
    }
    render(){
        let fbData;

        this.state.auth ? 
           fbData = (
            <div>
                <img src={this.state.picture} alt={this.state.name} />
                <h2>Welcome, {this.state.name}</h2>
            </div>
           ):
           fbData = (
            <FacebookLogin
            appId="APP_ID"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} 
            scope="pages_show_list"/>
           );


        return(
           <>
             {fbData}
           </>
        );
    }
}
